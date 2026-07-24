'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface Category {
  id: string;
  name: string;
  description: string | null;
  sort_order: number;
}

interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
}

export default function AdminMenuPage() {
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showItemForm, setShowItemForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image_url: '',
    is_available: true,
  });

  // Category form
  const [showCatForm, setShowCatForm] = useState(false);
  const [catFormData, setCatFormData] = useState({ name: '', description: '' });

  const fetchData = async () => {
    const { data: cats } = await supabase.from('categories').select('*').order('sort_order');
    const { data: menuItems } = await supabase.from('menu_items').select('*').order('name');
    if (cats) setCategories(cats);
    if (menuItems) setItems(menuItems as unknown as MenuItem[]);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSaveItem = async () => {
    const payload = {
      name: formData.name,
      description: formData.description || null,
      price: parseFloat(formData.price),
      category_id: formData.category_id,
      image_url: formData.image_url || null,
      is_available: formData.is_available,
    };

    if (editingItem) {
      await supabase.from('menu_items').update(payload).eq('id', editingItem.id);
    } else {
      await supabase.from('menu_items').insert(payload);
    }

    setShowItemForm(false);
    setEditingItem(null);
    setFormData({ name: '', description: '', price: '', category_id: '', image_url: '', is_available: true });
    fetchData();
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    await supabase.from('menu_items').delete().eq('id', id);
    fetchData();
  };

  const handleToggleAvailability = async (id: string, current: boolean) => {
    await supabase.from('menu_items').update({ is_available: !current }).eq('id', id);
    fetchData();
  };

  const startEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      price: String(item.price),
      category_id: item.category_id,
      image_url: item.image_url || '',
      is_available: item.is_available,
    });
    setShowItemForm(true);
  };

  const handleAddCategory = async () => {
    await supabase.from('categories').insert({
      name: catFormData.name,
      description: catFormData.description || null,
      sort_order: categories.length + 1,
    });
    setShowCatForm(false);
    setCatFormData({ name: '', description: '' });
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header + Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-100">Menu Management</h2>
          <p className="text-slate-400 text-sm mt-1">{items.length} items across {categories.length} categories</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCatForm(!showCatForm)}
            className="px-4 py-2 bg-zinc-800 border border-zinc-700 text-slate-300 rounded-lg hover:bg-zinc-700 transition-colors text-sm font-bold"
          >
            + Category
          </button>
          <button
            onClick={() => { setEditingItem(null); setFormData({ name: '', description: '', price: '', category_id: categories[0]?.id || '', image_url: '', is_available: true }); setShowItemForm(true); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            + Add Menu Item
          </button>
        </div>
      </div>

      {/* Category Form Modal */}
      {showCatForm && (
        <div className="glass rounded-xl p-6 border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-slate-100">New Category</h3>
          <input
            type="text"
            placeholder="Category name"
            value={catFormData.name}
            onChange={(e) => setCatFormData({ ...catFormData, name: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-slate-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={catFormData.description}
            onChange={(e) => setCatFormData({ ...catFormData, description: e.target.value })}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-slate-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50"
          />
          <div className="flex gap-3">
            <button onClick={handleAddCategory} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm">Save</button>
            <button onClick={() => setShowCatForm(false)} className="px-4 py-2 text-slate-400 hover:text-white text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Item Form Modal */}
      {showItemForm && (
        <div className="glass rounded-xl p-6 border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-slate-100">
            {editingItem ? 'Edit Item' : 'New Menu Item'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Item name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-slate-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50" />
            <input type="number" step="0.01" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-slate-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50" />
            <select value={formData.category_id} onChange={(e) => setFormData({ ...formData, category_id: e.target.value })} className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500/50">
              <option value="">Select category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input type="text" placeholder="Image URL (optional)" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-slate-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50" />
          </div>
          <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-slate-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 h-20 resize-none" />
          <label className="flex items-center gap-2 text-slate-300 text-sm cursor-pointer">
            <input type="checkbox" checked={formData.is_available} onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })} className="rounded border-zinc-600" />
            Available for ordering
          </label>
          <div className="flex gap-3">
            <button onClick={handleSaveItem} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-500">
              {editingItem ? 'Update' : 'Add Item'}
            </button>
            <button onClick={() => { setShowItemForm(false); setEditingItem(null); }} className="px-4 py-2 text-slate-400 hover:text-white text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Items Table */}
      {categories.map((cat) => {
        const catItems = items.filter((i) => i.category_id === cat.id);
        if (catItems.length === 0) return null;
        return (
          <div key={cat.id} className="glass rounded-xl border border-white/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 bg-zinc-900/50">
              <h3 className="font-bold text-slate-200 uppercase tracking-wider text-sm">{cat.name}</h3>
            </div>
            <div className="divide-y divide-white/5">
              {catItems.map((item) => (
                <div key={item.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-slate-200 font-medium truncate">{item.name}</p>
                      <p className="text-slate-500 text-xs truncate">{item.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <span className="text-blue-400 font-bold">${Number(item.price).toFixed(2)}</span>
                    <button
                      onClick={() => handleToggleAvailability(item.id, item.is_available)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        item.is_available
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {item.is_available ? 'Active' : 'Hidden'}
                    </button>
                    <button onClick={() => startEdit(item)} className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">Edit</button>
                    <button onClick={() => handleDeleteItem(item.id)} className="text-slate-400 hover:text-red-400 text-sm font-medium transition-colors">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
