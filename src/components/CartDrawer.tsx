'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, X } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function CartDrawer({ tableNumber }: { tableNumber: number | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { items, total, removeItem, updateQuantity, clearCart } = useCart();
  const supabase = createClient();
  const router = useRouter();

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    setIsSubmitting(true);

    try {
      // 1. Create the order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          table_number: tableNumber,
          total_amount: total,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create the order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        unit_price: item.price,
        notes: item.notes
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      setIsOpen(false);
      // Redirect to order tracking page
      router.push(`/order/${orderData.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600/80 text-white p-4 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:bg-blue-500 transition-all duration-300 hover:scale-110 z-40 flex items-center justify-center hover:neon-border"
      >
        <ShoppingCart className="w-6 h-6" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.8)]">
            {items.length}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md glass-panel z-50 transform transition-transform duration-500 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-900/50">
          <h2 className="text-2xl font-bold text-slate-100 neon-text">Your Cart</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
              <ShoppingCart className="w-16 h-16 mb-4 opacity-30" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex flex-col gap-2 border-b border-white/5 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-slate-200">{item.name}</h4>
                      <div className="text-sm text-slate-400">${item.price.toFixed(2)} each</div>
                      {item.notes && <div className="text-xs text-accent italic mt-1">Note: {item.notes}</div>}
                    </div>
                    <div className="font-bold text-blue-400 neon-text">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-800/50">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-slate-300 hover:bg-zinc-700/50 rounded-l-lg transition-colors"
                      >-</button>
                      <span className="px-3 text-sm font-medium text-slate-200 w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-slate-300 hover:bg-zinc-700/50 rounded-r-lg transition-colors"
                      >+</button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 text-sm font-medium hover:text-red-300 transition-colors hover:shadow-[0_0_10px_rgba(248,113,113,0.5)]"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-zinc-900/80">
          <div className="flex justify-between items-center mb-4 text-lg">
            <span className="font-medium text-slate-400">Total</span>
            <span className="font-bold text-2xl text-blue-400 neon-text">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={items.length === 0 || isSubmitting}
            suppressHydrationWarning
            className="w-full bg-blue-600/80 text-white font-bold py-4 px-4 rounded-xl hover:bg-blue-500 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed transition-all duration-300 hover:neon-border hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
          >
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </>
  );
}
