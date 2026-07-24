'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface OrderItem {
  id: string;
  quantity: number;
  unit_price: number;
  notes: string | null;
  menu_items: { name: string };
}

interface Order {
  id: string;
  table_number: number;
  status: string;
  total_amount: number;
  estimated_ready_time: string | null;
  created_at: string;
}

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.id as string;
  const supabase = createClient();

  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Review state
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data: orderData } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (orderData) setOrder(orderData);

      const { data: itemsData } = await supabase
        .from('order_items')
        .select('*, menu_items(name)')
        .eq('order_id', orderId);

      if (itemsData) setItems(itemsData as unknown as OrderItem[]);
      setLoading(false);
    };

    fetchOrder();

    // Real-time subscription for order updates
    const channel = supabase
      .channel(`order-${orderId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` },
        (payload) => {
          setOrder(payload.new as Order);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId, supabase]);

  const handleSubmitReview = async () => {
    if (rating === 0) return;
    await supabase.from('reviews').insert({
      order_id: orderId,
      rating,
      comment: comment || null,
    });
    setReviewSubmitted(true);
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'pending': return 0;
      case 'preparing': return 1;
      case 'ready': return 2;
      case 'completed': return 3;
      default: return 0;
    }
  };

  const getTimeRemaining = () => {
    if (!order?.estimated_ready_time) return null;
    const now = new Date();
    const ready = new Date(order.estimated_ready_time);
    const diff = Math.max(0, Math.round((ready.getTime() - now.getTime()) / 60000));
    return diff;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-slate-300 text-lg">Order not found.</p>
        <Link href="/" className="text-blue-400 hover:text-blue-300">Go Home</Link>
      </div>
    );
  }

  const step = getStatusStep(order.status);
  const steps = ['Order Placed', 'Preparing', 'Ready', 'Completed'];
  const timeRemaining = getTimeRemaining();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent neon-text">
            QuickServe
          </Link>
          <p className="text-slate-400 mt-2 text-sm">Table {order.table_number} • Order #{order.id.slice(0, 8).toUpperCase()}</p>
        </div>

        {/* Estimated Time Card */}
        {order.status !== 'completed' && (
          <div className="glass rounded-2xl p-6 mb-8 text-center border border-white/10">
            {timeRemaining !== null && timeRemaining > 0 ? (
              <>
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Estimated Time</p>
                <p className="text-5xl font-black text-blue-400 neon-text">{timeRemaining}</p>
                <p className="text-slate-400 text-sm mt-1">minutes remaining</p>
              </>
            ) : order.status === 'ready' ? (
              <>
                <p className="text-3xl font-black text-green-400 neon-text">🎉 Ready!</p>
                <p className="text-slate-400 text-sm mt-2">Your order is ready for pickup</p>
              </>
            ) : (
              <>
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Status</p>
                <p className="text-2xl font-bold text-blue-300 capitalize">{order.status}</p>
                <p className="text-slate-500 text-sm mt-2">Estimated time will appear when kitchen starts preparing</p>
              </>
            )}
          </div>
        )}

        {/* Progress Steps */}
        <div className="glass rounded-2xl p-6 mb-8 border border-white/10">
          <div className="flex items-center justify-between relative">
            {/* Progress Line Background */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-zinc-700" />
            {/* Progress Line Active */}
            <div
              className="absolute top-5 left-0 h-0.5 bg-blue-500 transition-all duration-700 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
              style={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((label, i) => (
              <div key={label} className="relative flex flex-col items-center z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                    i <= step
                      ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.6)]'
                      : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                  }`}
                >
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`mt-2 text-xs font-medium ${i <= step ? 'text-blue-300' : 'text-zinc-500'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Itemized Bill */}
        <div className="glass rounded-2xl p-6 mb-8 border border-white/10">
          <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Your Receipt
          </h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b border-white/5 pb-3">
                <div>
                  <p className="text-slate-200 font-medium">{item.menu_items?.name || 'Item'}</p>
                  <p className="text-slate-500 text-xs">Qty: {item.quantity} × ${Number(item.unit_price).toFixed(2)}</p>
                  {item.notes && <p className="text-xs text-purple-400 italic mt-0.5">Note: {item.notes}</p>}
                </div>
                <span className="text-blue-400 font-bold">${(item.quantity * Number(item.unit_price)).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
            <span className="text-slate-400 font-medium">Total</span>
            <span className="text-2xl font-black text-blue-400 neon-text">${Number(order.total_amount).toFixed(2)}</span>
          </div>
          <p className="text-xs text-slate-600 mt-2">Order placed at {new Date(order.created_at).toLocaleString()}</p>
        </div>

        {/* Review Section */}
        {order.status === 'completed' && !reviewSubmitted && (
          <div className="glass rounded-2xl p-6 border border-white/10">
            {!showReview ? (
              <button
                onClick={() => setShowReview(true)}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)]"
              >
                ⭐ Leave a Review or Complaint
              </button>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-100">How was your experience?</h3>
                {/* Star Rating */}
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-3xl transition-all ${
                        star <= rating ? 'text-yellow-400 scale-110 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'text-zinc-600 hover:text-zinc-400'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your experience, or report a complaint..."
                  className="w-full h-28 p-3 glass rounded-xl text-slate-200 placeholder-slate-500 border border-white/10 focus:border-blue-500/50 focus:outline-none resize-none"
                />
                <button
                  onClick={handleSubmitReview}
                  disabled={rating === 0}
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 disabled:bg-zinc-700 disabled:text-zinc-500 transition-all"
                >
                  Submit Review
                </button>
              </div>
            )}
          </div>
        )}

        {reviewSubmitted && (
          <div className="glass rounded-2xl p-6 text-center border border-green-500/20">
            <p className="text-green-400 font-bold text-lg">✅ Thank you for your feedback!</p>
            <p className="text-slate-400 text-sm mt-2">We appreciate you dining with us.</p>
          </div>
        )}

        {/* Back link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-slate-500 hover:text-blue-400 text-sm transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
