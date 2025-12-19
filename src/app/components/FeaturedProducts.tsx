import { useState, useEffect, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { getProductsByCategory, getAllProducts } from '../data/perfumes';
import { FilterSidebar, FilterState } from './FilterSidebar';
import { SlidersHorizontal } from 'lucide-react';

interface FeaturedProductsProps {
  onAddToCart?: (product: { id: number; name: string; image: string }) => void;
  onProductClick?: (productId: number, sectionId?: string) => void;
}

export function FeaturedProducts({ onAddToCart, onProductClick }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'women' | 'men' | 'unisex'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'popular',
    priceRange: [0, 20000],
    brands: [],
    concentrations: [],
    notes: []
  });

  // Отримуємо продукти в залежності від активної категорії
  const products = activeTab === 'all' ? getAllProducts() : getProductsByCategory(activeTab);

  // Отримуємо всі унікальні бренди
  const allBrands = useMemo(() => {
    const brands = new Set(getAllProducts().map(p => p.brand));
    return Array.from(brands).sort();
  }, []);

  // Отримуємо всі унікальні ноти
  const allNotes = useMemo(() => {
    const notes = new Set<string>();
    getAllProducts().forEach(p => {
      if (p.notes) {
        p.notes.top?.forEach(n => notes.add(n));
        p.notes.heart?.forEach(n => notes.add(n));
        p.notes.base?.forEach(n => notes.add(n));
      }
    });
    return Array.from(notes).sort();
  }, []);

  // Фільтрація та сортування продуктів
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Фільтр по ціні
    result = result.filter(p => {
      const price = parseInt(p.price.replace(',', ''));
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Фільтр по брендах
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }

    // Фільтр по концентрації
    if (filters.concentrations.length > 0) {
      result = result.filter(p => filters.concentrations.includes(p.concentration || ''));
    }

    // Фільтр по нотах
    if (filters.notes.length > 0) {
      result = result.filter(p => {
        if (!p.notes) return false;
        const productNotes = [
          ...(p.notes.top || []),
          ...(p.notes.heart || []),
          ...(p.notes.base || [])
        ];
        return filters.notes.some(note => productNotes.includes(note));
      });
    }

    // Сортування
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => {
          const priceA = parseInt(a.price.replace(',', ''));
          const priceB = parseInt(b.price.replace(',', ''));
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        result.sort((a, b) => {
          const priceA = parseInt(a.price.replace(',', ''));
          const priceB = parseInt(b.price.replace(',', ''));
          return priceB - priceA;
        });
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'popular':
      default:
        // Залишаємо початковий порядок (популярні першими)
        break;
    }

    return result;
  }, [products, filters]);

  useEffect(() => {
    // Слухаємо хеш зміни для навігації з хедера
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#products-women') {
        setActiveTab('women');
      } else if (hash === '#products-men') {
        setActiveTab('men');
      } else if (hash === '#products-unisex') {
        setActiveTab('unisex');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Перевірка при завантаженні

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabClick = (tab: 'all' | 'women' | 'men' | 'unisex') => {
    setActiveTab(tab);
    // Не оновлюємо хеш при кліку на локальні табси
  };

  return (
    <section className="products" id="products">
      {/* Додаткові якорі для навігації */}
      <div id="products-women" style={{ position: 'absolute', top: '-80px' }}></div>
      <div id="products-men" style={{ position: 'absolute', top: '-80px' }}></div>
      <div id="products-unisex" style={{ position: 'absolute', top: '-80px' }}></div>
      
      <div className="section-header">
        <span className="section-label">Обрані парфуми</span>
        <h2 className="section-title">Наша колекція</h2>
      </div>

      <div className="products-controls">
        <div className="products-tabs">
          <button 
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => handleTabClick('all')}
          >
            Всі
          </button>
          <button 
            className={`tab-button ${activeTab === 'women' ? 'active' : ''}`}
            onClick={() => handleTabClick('women')}
          >
            Жіночі
          </button>
          <button 
            className={`tab-button ${activeTab === 'men' ? 'active' : ''}`}
            onClick={() => handleTabClick('men')}
          >
            Чоловічі
          </button>
          <button 
            className={`tab-button ${activeTab === 'unisex' ? 'active' : ''}`}
            onClick={() => handleTabClick('unisex')}
          >
            Унісекс
          </button>
        </div>

        <button className="filter-toggle-btn" onClick={() => setIsFilterOpen(true)}>
          <SlidersHorizontal size={20} />
          Фільтри
          {(filters.brands.length + filters.concentrations.length + filters.notes.length > 0 ||
            filters.priceRange[0] !== 0 || filters.priceRange[1] !== 20000) && (
            <span className="filter-badge">
              {filters.brands.length + filters.concentrations.length + filters.notes.length +
                (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 20000 ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      <div className="products-results-info">
        <p>Знайдено {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : filteredProducts.length < 5 ? 'товари' : 'товарів'}</p>
      </div>
      
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            {...product} 
            onAddToCart={onAddToCart} 
            onProductClick={(id) => onProductClick?.(id, 'products')} 
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products-message">
          <p>На жаль, за обраними фільтрами нічого не знайдено</p>
          <button onClick={() => setFilters({
            sortBy: 'popular',
            priceRange: [0, 20000],
            brands: [],
            concentrations: [],
            notes: []
          })}>
            Скинути фільтри
          </button>
        </div>
      )}

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFiltersChange={setFilters}
        allBrands={allBrands}
        allNotes={allNotes}
      />
    </section>
  );
}