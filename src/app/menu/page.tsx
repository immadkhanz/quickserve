import { createClient } from '@/utils/supabase/server';
import MenuContent from '@/components/MenuContent';
import CartDrawer from '@/components/CartDrawer';

export const dynamic = 'force-dynamic';

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ table?: string }>
}) {
  const resolvedSearchParams = await searchParams;
  const tableNumber = resolvedSearchParams.table ? parseInt(resolvedSearchParams.table, 10) : null;
  const supabase = await createClient();

  // Fetch active categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order');

  // Fetch active menu items
  const { data: menuItems } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_available', true);

  return (
    <div className="min-h-screen bg-transparent pb-24">
      {/* Header */}
      <header className="glass-panel sticky top-0 z-30 border-b-2 border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent neon-text">QuickServe</h1>
            {tableNumber && (
              <p className="text-sm text-blue-300 font-bold flex items-center gap-2 mt-1">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                Ordering for Table {tableNumber}
              </p>
            )}
          </div>
        </div>
      </header>

      <MenuContent 
        categories={categories || []} 
        menuItems={menuItems || []} 
      />

      <CartDrawer tableNumber={tableNumber} />
    </div>
  );
}
