'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface MenuCardProps {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
}

export default function MenuCard({ id, name, description, price, imageUrl }: MenuCardProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const handleAddToCart = () => {
    addItem({
      id: `${id}-${Date.now()}`,
      menu_item_id: id,
      name,
      price,
      quantity,
      notes,
    });
    setQuantity(1);
    setNotes('');
    alert('Added to cart!');
  };

  return (
    <div className="glass rounded-xl overflow-hidden flex flex-col hover:neon-border transition-all duration-300">
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="h-48 w-full object-cover" />
      ) : (
        <div className="h-48 w-full bg-gray-50 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-slate-100">{name}</h3>
          <span className="font-medium text-blue-400 neon-text">${price.toFixed(2)}</span>
        </div>
        {description && <p className="text-slate-400 text-sm mb-4 flex-1">{description}</p>}
        
        <div className="mt-auto space-y-3">
          <input
            type="text"
            placeholder="Special instructions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            suppressHydrationWarning
            className="w-full text-sm p-2 bg-zinc-800/50 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-200 placeholder-zinc-500"
          />
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-800/50">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                suppressHydrationWarning
                className="px-3 py-1 text-slate-300 hover:bg-zinc-700/50 rounded-l-lg transition-colors"
              >-</button>
              <span className="px-3 font-medium text-slate-200 w-8 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                suppressHydrationWarning
                className="px-3 py-1 text-slate-300 hover:bg-zinc-700/50 rounded-r-lg transition-colors"
              >+</button>
            </div>
            <button 
              onClick={handleAddToCart}
              suppressHydrationWarning
              className="flex-1 bg-blue-600/80 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:neon-border hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
