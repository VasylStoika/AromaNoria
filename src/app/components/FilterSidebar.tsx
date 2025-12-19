import { useState } from 'react';
import { X, Search } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: FilterState) => void;
  allBrands: string[];
  allNotes: string[];
}

export interface FilterState {
  sortBy: string;
  priceRange: [number, number];
  brands: string[];
  concentrations: string[];
  notes: string[];
}

const CONCENTRATIONS = ['Eau de Parfum', 'Eau de Toilette'];
const SORT_OPTIONS = [
  { value: 'popular', label: 'Популярні' },
  { value: 'price-asc', label: 'Дешевші спочатку' },
  { value: 'price-desc', label: 'Дорожчі спочатку' },
  { value: 'name-asc', label: 'А - Я' },
  { value: 'name-desc', label: 'Я - А' },
];

export function FilterSidebar({ 
  isOpen, 
  onClose, 
  onFiltersChange,
  allBrands,
  allNotes
}: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'popular',
    priceRange: [0, 20000],
    brands: [],
    concentrations: [],
    notes: []
  });

  const [brandSearch, setBrandSearch] = useState('');
  const [noteSearch, setNoteSearch] = useState('');

  const handleSortChange = (value: string) => {
    const newFilters = { ...filters, sortBy: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceChange = (index: number, value: number) => {
    const newRange: [number, number] = [...filters.priceRange] as [number, number];
    newRange[index] = value;
    const newFilters = { ...filters, priceRange: newRange };
    setFilters(newFilters);
  };

  const handlePriceChangeEnd = () => {
    onFiltersChange(filters);
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    const newFilters = { ...filters, brands: newBrands };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleConcentrationToggle = (concentration: string) => {
    const newConcentrations = filters.concentrations.includes(concentration)
      ? filters.concentrations.filter(c => c !== concentration)
      : [...filters.concentrations, concentration];
    const newFilters = { ...filters, concentrations: newConcentrations };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleNoteToggle = (note: string) => {
    const newNotes = filters.notes.includes(note)
      ? filters.notes.filter(n => n !== note)
      : [...filters.notes, note];
    const newFilters = { ...filters, notes: newNotes };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      sortBy: 'popular',
      priceRange: [0, 20000] as [number, number],
      brands: [],
      concentrations: [],
      notes: []
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
    setBrandSearch('');
    setNoteSearch('');
  };

  const activeFiltersCount = 
    filters.brands.length + 
    filters.concentrations.length + 
    filters.notes.length +
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 20000 ? 1 : 0);

  const filteredBrands = allBrands.filter(brand => 
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const filteredNotes = allNotes.filter(note => 
    note.toLowerCase().includes(noteSearch.toLowerCase())
  );

  return (
    <>
      <div className={`filter-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <aside className={`filter-sidebar-v2 ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="filter-header-v2">
          <div>
            <h2>Фільтри</h2>
            {activeFiltersCount > 0 && (
              <span className="filter-count">{activeFiltersCount}</span>
            )}
          </div>
          <button onClick={onClose} aria-label="Закрити">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="filter-content-v2">
          {/* Sort */}
          <div className="filter-group-v2">
            <h3>Сортування</h3>
            <div className="sort-chips">
              {SORT_OPTIONS.map(option => (
                <button
                  key={option.value}
                  className={`chip ${filters.sortBy === option.value ? 'active' : ''}`}
                  onClick={() => handleSortChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="filter-group-v2">
            <h3>Ціна</h3>
            <div className="price-display-v2">
              <span>{filters.priceRange[0].toLocaleString()} ₴</span>
              <span className="separator">—</span>
              <span>{filters.priceRange[1].toLocaleString()} ₴</span>
            </div>
            <div className="price-slider-v2">
              <input
                type="range"
                min="0"
                max="20000"
                step="500"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                onMouseUp={handlePriceChangeEnd}
                onTouchEnd={handlePriceChangeEnd}
                className="range-min"
              />
              <input
                type="range"
                min="0"
                max="20000"
                step="500"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                onMouseUp={handlePriceChangeEnd}
                onTouchEnd={handlePriceChangeEnd}
                className="range-max"
              />
              <div 
                className="range-track"
                style={{
                  left: `${(filters.priceRange[0] / 20000) * 100}%`,
                  right: `${100 - (filters.priceRange[1] / 20000) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Brands */}
          <div className="filter-group-v2">
            <h3>
              Бренд
              {filters.brands.length > 0 && (
                <span className="count">({filters.brands.length})</span>
              )}
            </h3>
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Пошук..."
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
              />
            </div>
            <div className="checkbox-grid">
              {filteredBrands.map(brand => (
                <label key={brand} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                  />
                  <span className="checkmark" />
                  <span className="label">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Concentration */}
          <div className="filter-group-v2">
            <h3>
              Концентрація
              {filters.concentrations.length > 0 && (
                <span className="count">({filters.concentrations.length})</span>
              )}
            </h3>
            <div className="checkbox-grid">
              {CONCENTRATIONS.map(concentration => (
                <label key={concentration} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={filters.concentrations.includes(concentration)}
                    onChange={() => handleConcentrationToggle(concentration)}
                  />
                  <span className="checkmark" />
                  <span className="label">{concentration}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="filter-group-v2">
            <h3>
              Ноти аромату
              {filters.notes.length > 0 && (
                <span className="count">({filters.notes.length})</span>
              )}
            </h3>
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Пошук..."
                value={noteSearch}
                onChange={(e) => setNoteSearch(e.target.value)}
              />
            </div>
            <div className="notes-chips">
              {filteredNotes.slice(0, 20).map(note => (
                <button
                  key={note}
                  className={`note-chip ${filters.notes.includes(note) ? 'active' : ''}`}
                  onClick={() => handleNoteToggle(note)}
                >
                  {note}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="filter-footer-v2">
          <button className="btn-reset" onClick={handleResetFilters}>
            Скинути
          </button>
          <button className="btn-apply" onClick={onClose}>
            Застосувати
          </button>
        </div>
      </aside>
    </>
  );
}
