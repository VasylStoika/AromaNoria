import { Heart, ShoppingBag, Sparkles } from "lucide-react";
import { useState, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  brand: string;
  price: string;
  isNew?: boolean;
  onAddToCart?: (product: { id: number; name: string; image: string }) => void;
  onProductClick?: (id: number) => void;
}

export function ProductCard({ id, image, name, brand, price, isNew, onAddToCart, onProductClick }: ProductCardProps) {
  const { addToCart, toggleFavorite, favorites } = useCart();
  const isFavorite = favorites.includes(id);
  const [isAdding, setIsAdding] = useState(false);
  
  // Для відстеження drag vs click
  const dragStartPos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Запобігаємо відкриттю деталей при додаванні в кошик
    setIsAdding(true);
    addToCart({ id, image, name, brand, price });
    
    if (onAddToCart) {
      onAddToCart({ id, name, image });
    }

    // Анімація
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Запобігаємо відкриттю деталей
    toggleFavorite(id);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const deltaX = Math.abs(e.clientX - dragStartPos.current.x);
    const deltaY = Math.abs(e.clientY - dragStartPos.current.y);
    
    // Якщо миша переміщена більше ніж на 5 пікселів - це drag
    if (deltaX > 5 || deltaY > 5) {
      isDragging.current = true;
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Відкриваємо товар тільки якщо це був справжній клік, а не drag
    if (!isDragging.current && onProductClick) {
      onProductClick(id);
    }
    isDragging.current = false;
  };

  return (
    <div className="product-card-premium" onClick={handleCardClick} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
      <div className="product-image-wrapper-premium">
        {/* Gradient Overlay */}
        <div className="product-image-overlay"></div>
        
        <ImageWithFallback
          src={image}
          alt={name}
          className="product-image-premium"
        />
        
        {/* Top Badges Row */}
        <div className="product-badges-row">
          {isNew && (
            <span className="product-badge-new">
              <Sparkles size={12} />
              <span>New</span>
            </span>
          )}
          <button 
            className={`product-favorite-premium ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
          >
            <Heart size={16} fill={isFavorite ? '#ff4757' : 'none'} stroke={isFavorite ? '#ff4757' : 'currentColor'} />
          </button>
        </div>

        {/* Hover Action Button */}
        <button 
          className={`product-quick-add ${isAdding ? 'adding' : ''}`}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          <ShoppingBag size={16} />
          <span>{isAdding ? 'Додано!' : 'Швидка покупка'}</span>
        </button>
      </div>
      
      {/* Product Info */}
      <div className="product-info-premium">
        <div className="product-brand-premium">{brand}</div>
        <h3 className="product-name-premium">{name}</h3>
        <div className="product-price-row">
          <span className="product-price-premium">{price} ₴</span>
          <button 
            className="product-details-btn"
            onClick={handleCardClick}
          >
            Деталі →
          </button>
        </div>
      </div>
    </div>
  );
}