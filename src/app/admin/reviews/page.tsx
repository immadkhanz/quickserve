'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  orders: { table_number: number; total_amount: number } | null;
}

export default function AdminReviewsPage() {
  const supabase = createClient();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from('reviews')
        .select('*, orders(table_number, total_amount)')
        .order('created_at', { ascending: false });
      if (data) setReviews(data as unknown as Review[]);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-slate-100">Customer Reviews & Complaints</h2>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-4 rounded-xl">
          <p className="text-sm text-slate-400 uppercase tracking-wider">Total Reviews</p>
          <p className="text-3xl font-black text-slate-100 mt-1">{reviews.length}</p>
        </div>
        <div className="glass p-4 rounded-xl">
          <p className="text-sm text-slate-400 uppercase tracking-wider">Average Rating</p>
          <p className="text-3xl font-black text-yellow-400 mt-1">⭐ {avgRating}</p>
        </div>
        <div className="glass p-4 rounded-xl">
          <p className="text-sm text-slate-400 uppercase tracking-wider">Complaints (1-2★)</p>
          <p className="text-3xl font-black text-red-400 mt-1">{reviews.filter(r => r.rating <= 2).length}</p>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-slate-400">No reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`glass rounded-xl p-5 border ${
                review.rating <= 2 ? 'border-red-500/30' : 'border-white/10'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= review.rating ? 'text-yellow-400' : 'text-zinc-600'}>★</span>
                  ))}
                </div>
                <span className="text-xs text-slate-500">{new Date(review.created_at).toLocaleString()}</span>
              </div>
              {review.comment && (
                <p className="text-slate-300 mt-3 text-sm leading-relaxed">{review.comment}</p>
              )}
              {review.orders && (
                <p className="text-xs text-slate-500 mt-2">
                  Table {review.orders.table_number} • Order Total: ${Number(review.orders.total_amount).toFixed(2)}
                </p>
              )}
              {review.rating <= 2 && (
                <span className="inline-block mt-2 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs font-bold rounded-full border border-red-500/30">
                  ⚠ Complaint
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
