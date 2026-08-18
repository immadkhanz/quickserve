'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function AdminOverview() {
  const supabase = createClient();
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    activeItems: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<
    { id: string; table_number: number; status: string; total_amount: number; created_at: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      // Today's orders
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .gte('created_at', today.toISOString());

      const { data: menuItems } = await supabase
        .from('menu_items')
        .select('id')
        .eq('is_available', true);

      const { data: recent } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      const totalOrders = orders?.length || 0;
      const revenue = orders?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0;
      const pendingOrders = orders?.filter((o) => o.status === 'pending' || o.status === 'preparing').length || 0;

      setStats({
        totalOrders,
        revenue,
        activeItems: menuItems?.length || 0,
        pendingOrders,
      });
      setRecentOrders(recent || []);
      setLoading(false);
    };

    fetchStats();

    // Live subscription
    const channel = supabase
      .channel('admin-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchStats();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-xl hover:neon-border transition-all duration-300">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Orders Today</h3>
          <p className="text-4xl font-black text-slate-100 mt-2 neon-text">{stats.totalOrders}</p>
        </div>
        <div className="glass p-6 rounded-xl hover:neon-border transition-all duration-300">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Revenue Today</h3>
          <p className="text-4xl font-black text-slate-100 mt-2 neon-text">${stats.revenue.toFixed(2)}</p>
        </div>
        <div className="glass p-6 rounded-xl hover:neon-border transition-all duration-300">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Active Menu Items</h3>
          <p className="text-4xl font-black text-slate-100 mt-2 neon-text">{stats.activeItems}</p>
        </div>
        <div className="glass p-6 rounded-xl hover:neon-border transition-all duration-300">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">In Progress</h3>
          <p className="text-4xl font-black text-yellow-400 mt-2">{stats.pendingOrders}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="glass rounded-xl border border-white/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 bg-zinc-900/50">
          <h3 className="font-bold text-slate-200 uppercase tracking-wider text-sm">Recent Orders</h3>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No orders yet</div>
        ) : (
          <div className="divide-y divide-white/5">
            {recentOrders.map((order) => (
              <div key={order.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div>
                  <p className="text-slate-200 font-medium">Table {order.table_number || '—'}</p>
                  <p className="text-slate-500 text-xs">{new Date(order.created_at).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-blue-400 font-bold">${Number(order.total_amount).toFixed(2)}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                    order.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    order.status === 'preparing' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    order.status === 'ready' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    'bg-zinc-700/50 text-slate-400 border border-zinc-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
