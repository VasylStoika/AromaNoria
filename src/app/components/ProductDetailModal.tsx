import { X, ShoppingCart, Heart, Sparkles, MapPin, Calendar, User, Package, Info, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getProductById, getAllProducts } from '../data/perfumes';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  onProductChange?: (id: number) => void;
}

export function ProductDetailModal({ isOpen, onClose, productId, onProductChange }: ProductDetailModalProps) {
  const product = getProductById(productId);
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const [selectedVolume, setSelectedVolume] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'notes' | 'details'>('description');

  const allProducts = getAllProducts();
  const currentIndex = allProducts.findIndex(p => p.id === productId);
  const hasNext = currentIndex < allProducts.length - 1;
  const hasPrev = currentIndex > 0;

  useEffect(() => {
    setSelectedVolume(0);
    setQuantity(1);
    setActiveTab('description');
  }, [productId]);

  if (!isOpen || !product) return null;

  const currentVolume = product.volumes?.[selectedVolume];
  const currentPrice = currentVolume?.price || 0;
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: `${product.name} ${currentVolume.ml}ml`,
      price: currentPrice.toLocaleString('uk-UA'),
      image: product.image,
      brand: product.brand,
      volume: currentVolume.ml,
      quantity: quantity
    });
    toast.success(`${product.name} додано до кошика`);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id, product.name, product.image);
    if (isFavorite(product.id)) {
      toast.success('Видалено з улюбленого');
    } else {
      toast.success('Додано до улюбленого');
    }
  };

  const handleNext = () => {
    if (hasNext && onProductChange) {
      onProductChange(allProducts[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (hasPrev && onProductChange) {
      onProductChange(allProducts[currentIndex - 1].id);
    }
  };

  return (
    <>
      <div className="modal-overlay-v2 active" onClick={onClose} />
      <div className="product-modal-v2">
        <button className="modal-close-v2" onClick={onClose} aria-label="Закрити">
          <X size={24} />
        </button>

        {/* Navigation Arrows */}
        {hasPrev && (
          <button className="nav-arrow-v2 nav-prev-v2" onClick={handlePrev} aria-label="Попередній">
            <ChevronLeft size={28} />
          </button>
        )}
        {hasNext && (
          <button className="nav-arrow-v2 nav-next-v2" onClick={handleNext} aria-label="Наступний">
            <ChevronRight size={28} />
          </button>
        )}

        <div className="product-modal-layout">
          {/* Left Side - Image Gallery */}
          <div className="product-gallery">
            <div className="product-image-main">
              <img src={product.image} alt={product.name} />
              {product.isNew && (
                <div className="product-new-badge">
                  <Sparkles size={16} />
                  <span>Новинка</span>
                </div>
              )}
              <button 
                className={`favorite-btn-floating ${isFavorite(product.id) ? 'active' : ''}`}
                onClick={handleToggleFavorite}
                aria-label="Додати до улюбленого"
              >
                <Heart size={22} />
              </button>
            </div>
            
            {/* Quick Info Cards */}
            <div className="product-quick-info">
              <div className="quick-info-card">
                <Star size={18} />
                <div>
                  <span className="label">Рейтинг</span>
                  <span className="value">4.8/5</span>
                </div>
              </div>
              <div className="quick-info-card">
                <Package size={18} />
                <div>
                  <span className="label">В наявності</span>
                  <span className="value">Так</span>
                </div>
              </div>
            </div>

            {/* Bottom Controls Row */}
            <div className="product-controls-row">
              {/* Left Side - Quantity & Add to Cart */}
              <div className="controls-left">
                {/* Quantity */}
                <div className="quantity-section-compact">
                  <label className="section-label-compact">Кількість</label>
                  <div className="quantity-selector-compact">
                    <button 
                      className="qty-btn-compact"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <input 
                      type="number" 
                      className="qty-input-compact" 
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                    />
                    <button 
                      className="qty-btn-compact"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Purchase Section */}
                <div className="purchase-section-compact">
                  <div className="price-summary-compact">
                    <span className="price-label-compact">Сума:</span>
                    <span className="price-total-compact">{totalPrice.toLocaleString('uk-UA')} ₴</span>
                  </div>
                  <button className="add-to-cart-btn-compact" onClick={handleAddToCart}>
                    <ShoppingCart size={18} />
                    <span>Додати</span>
                  </button>
                </div>
              </div>

              {/* Right Side - Volume Selection */}
              <div className="controls-right">
                <label className="section-label-compact">Об'єм</label>
                <div className="volume-grid-compact">
                  {product.volumes.map((volume, index) => (
                    <button
                      key={index}
                      className={`volume-card-compact ${selectedVolume === index ? 'selected' : ''}`}
                      onClick={() => setSelectedVolume(index)}
                    >
                      <div className="volume-size-compact">{volume.ml}мл</div>
                      <div className="volume-price-compact">{volume.price.toLocaleString('uk-UA')} ₴</div>
                      {selectedVolume === index && (
                        <div className="volume-check-compact">✓</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="product-info-v2">
            {/* Header */}
            <div className="product-header-v2">
              <div className="product-brand-v2">{product.brand}</div>
              <h1 className="product-name-v2">{product.name}</h1>
              <div className="product-subtitle">
                <span className="concentration-badge">{product.concentration}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="product-tabs-nav">
              <button 
                className={`tab-nav-btn ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                <Info size={18} />
                Опис
              </button>
              <button 
                className={`tab-nav-btn ${activeTab === 'notes' ? 'active' : ''}`}
                onClick={() => setActiveTab('notes')}
              >
                <Sparkles size={18} />
                Ноти
              </button>
              <button 
                className={`tab-nav-btn ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                <Package size={18} />
                Деталі
              </button>
            </div>

            {/* Tab Content */}
            <div className="product-tabs-content">
              {activeTab === 'description' && (
                <div className="tab-content-description">
                  <p>{product.longDescription}</p>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="tab-content-notes">
                  <h3 className="notes-title">Піраміда аромату</h3>
                  <div className="notes-pyramid">
                    <div className="note-layer top">
                      <div className="note-layer-header">
                        <span className="note-layer-icon">🌸</span>
                        <h4>Верхні ноти</h4>
                      </div>
                      <div className="note-chips">
                        {product.notes.top.map((note, index) => (
                          <span key={index} className="note-chip-v2">{note}</span>
                        ))}
                      </div>
                    </div>
                    <div className="note-layer heart">
                      <div className="note-layer-header">
                        <span className="note-layer-icon">💐</span>
                        <h4>Серцеві ноти</h4>
                      </div>
                      <div className="note-chips">
                        {product.notes.heart.map((note, index) => (
                          <span key={index} className="note-chip-v2">{note}</span>
                        ))}
                      </div>
                    </div>
                    <div className="note-layer base">
                      <div className="note-layer-header">
                        <span className="note-layer-icon">🌰</span>
                        <h4>Базові ноти</h4>
                      </div>
                      <div className="note-chips">
                        {product.notes.base.map((note, index) => (
                          <span key={index} className="note-chip-v2">{note}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="tab-content-details">
                  <div className="detail-row">
                    <MapPin size={18} />
                    <span className="detail-label">Країна</span>
                    <span className="detail-value">{product.country}</span>
                  </div>
                  <div className="detail-row">
                    <Calendar size={18} />
                    <span className="detail-label">Рік випуску</span>
                    <span className="detail-value">{product.year}</span>
                  </div>
                  <div className="detail-row">
                    <User size={18} />
                    <span className="detail-label">Парфумер</span>
                    <span className="detail-value">{product.perfumer}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}