import { X, Search } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getAllProducts } from '../data/perfumes';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const allProducts = getAllProducts();

  const filteredProducts = query
    ? allProducts.filter(
        product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="search-modal">
        <div className="search-modal-header">
          <div className="search-input-wrapper">
            <Search />
            <input
              type="text"
              placeholder="Шукати парфуми..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
          </div>
          <button className="search-modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        {query && (
          <div className="search-results">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} className="search-result-item">
                  <div className="search-result-image">
                    <ImageWithFallback src={product.image} alt={product.name} />
                  </div>
                  <div className="search-result-details">
                    <h3>{product.name}</h3>
                    <p className="search-result-brand">{product.brand}</p>
                    <p className="search-result-price">{product.price} грн</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="search-no-results">
                <p>Нічого не знайдено</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}