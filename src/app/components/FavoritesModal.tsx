import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ProductCard } from './ProductCard';
import { getAllProducts } from '../data/perfumes';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const { favorites } = useCart();

  if (!isOpen) return null;

  const allProducts = getAllProducts();
  const favoriteProducts = allProducts.filter(product => favorites.includes(product.id));

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="favorites-modal">
        <div className="cart-modal-header">
          <h2 className="cart-modal-title">Улюблене</h2>
          <button className="cart-modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="cart-empty">
            <p>У вас ще немає улюблених товарів</p>
            <button className="btn-primary" onClick={onClose}>
              Продовжити покупки
            </button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}