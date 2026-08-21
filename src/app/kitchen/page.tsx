'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Clock, ChefHat, CheckCircle, Bell } from 'lucide-react';

type Order = {
  id: string;
  table_number: number;
  total_amount: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
  created_at: string;
};

type OrderItem = {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  notes: string;
  menu_items: { name: string };
};

export default function KitchenPortal() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<Record<string, OrderItem[]>>({});
  const supabase = createClient();

  useEffect(() => {
    fetchActiveOrders();

    // Subscribe to realtime updates on the orders table
    const channel = supabase
      .channel('kitchen-orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Realtime change received!', payload);
          fetchActiveOrders(); // Refresh to get full relations (simpler than manual merging)
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]); // Add supabase to fix missing dependency warning

  // Changed from const arrow function to function declaration to avoid "accessed before declared" error
  async function fetchActiveOrders() {
    // Fetch orders that are not served
    const { data: activeOrders, error } = await supabase
      .from('orders')
      .select('*')
      .neq('status', 'completed')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching orders:', error);
      return;
    }

    setOrders(activeOrders);

    // Fetch items for these orders
    if (activeOrders.length > 0) {
      const orderIds = activeOrders.map(o => o.id);
      const { data: items, error: itemsError } = await supabase
        .from('order_items')
        .select(`
          id, order_id, quantity, notes,
          menu_items (name)
        `)
        .in('order_id', orderIds);

      if (!itemsError && items) {
        const grouped = items.reduce((acc, item) => {
          if (!acc[item.order_id]) acc[item.order_id] = [];
          acc[item.order_id].push(item as unknown as OrderItem);
          return acc;
        }, {} as Record<string, OrderItem[]>);
        setOrderItems(grouped);
      }
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    const updatePayload: Record<string, unknown> = { status: newStatus };
    
    // When starting prep, set estimated ready time to 15 minutes from now
    if (newStatus === 'preparing') {
      // eslint-disable-next-line react-hooks/purity
      const eta = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      updatePayload.estimated_ready_time = eta;
    }

    const { error } = await supabase
      .from('orders')
      .update(updatePayload)
      .eq('id', orderId);

    if (error) {
      console.error('Failed to update status', error);
      alert('Failed to update order status');
    }
  };

  const renderColumn = (status: Order['status'], title: string, icon: React.ReactNode, bgColor: string) => {
    const columnOrders = orders.filter(o => o.status === status);

    return (
      <div className={`flex flex-col glass-panel rounded-2xl p-4 min-h-[70vh] border-t-4 ${bgColor}`}>
        <div className="flex items-center gap-2 mb-6 p-2">
          {icon}
          <h2 className="text-xl font-bold text-slate-100">{title}</h2>
          <span className="ml-auto bg-zinc-800/80 border border-zinc-700 px-3 py-1 rounded-full text-sm font-bold text-slate-200 shadow-sm">
            {columnOrders.length}
          </span>
        </div>

        <div className="space-y-4 flex-1 overflow-y-auto">
          {columnOrders.map((order) => (
            <div key={order.id} className="glass rounded-xl p-5 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:neon-border transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <span className="text-3xl font-black text-slate-100 neon-text">
                  T{order.table_number}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>

              <ul className="space-y-3 mb-6">
                {orderItems[order.id]?.map((item) => (
                  <li key={item.id} className="text-slate-300">
                    <span className="font-bold mr-2 text-blue-400 neon-text">{item.quantity}x</span>
                    <span className="font-medium">{item.menu_items?.name}</span>
                    {item.notes && (
                      <p className="text-sm text-accent italic mt-1 bg-zinc-800/50 border border-zinc-700 p-2 rounded-md">
                        Note: {item.notes}
                      </p>
                    )}
                  </li>
                ))}
              </ul>

              <div className="flex gap-2">
                {status === 'pending' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="flex-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 hover:bg-yellow-500/40 font-bold py-3 rounded-lg transition-all shadow-[0_0_10px_rgba(234,179,8,0.2)] hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]"
                  >
                    Start Prep
                  </button>
                )}
                {status === 'preparing' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'ready')}
                    className="flex-1 bg-blue-500/20 text-blue-400 border border-blue-500/50 hover:bg-blue-500/40 font-bold py-3 rounded-lg transition-all shadow-[0_0_10px_rgba(59,130,246,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                  >
                    Mark Ready
                  </button>
                )}
                {status === 'ready' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'completed')}
                    className="flex-1 bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/40 font-bold py-3 rounded-lg transition-all shadow-[0_0_10px_rgba(34,197,94,0.2)] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                  >
                    Serve Order
                  </button>
                )}
              </div>
            </div>
          ))}
          {columnOrders.length === 0 && (
            <div className="h-full flex items-center justify-center text-slate-500 font-medium">
              No orders
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-transparent p-8">
      <div className="max-w-[1600px] mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-100 flex items-center gap-3">
              <ChefHat className="w-10 h-10 text-blue-400 neon-text" />
              Kitchen Operations
            </h1>
            <p className="text-slate-400 mt-2 text-lg">Live order tracking and fulfillment</p>
          </div>
          <div className="flex items-center gap-3 glass border-green-500/30 text-green-400 px-6 py-3 rounded-full font-bold shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
            Live Sync Active
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {renderColumn('pending', 'New Orders', <Bell className="w-6 h-6 text-red-400" />, 'border-red-500/50 bg-red-950/10')}
          {renderColumn('preparing', 'Preparing', <ChefHat className="w-6 h-6 text-yellow-400" />, 'border-yellow-500/50 bg-yellow-950/10')}
          {renderColumn('ready', 'Ready for Pickup', <CheckCircle className="w-6 h-6 text-green-400" />, 'border-green-500/50 bg-green-950/10')}
        </div>
      </div>
    </div>
  );
}
