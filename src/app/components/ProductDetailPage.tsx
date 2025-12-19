import { useState } from 'react';
import { X, Heart, ShoppingCart, ChevronDown, Droplet, Flower2, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getProductById } from '../data/perfumes';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import '../styles/product-detail-luxury.css';

interface ProductDetailPageProps {
  productId: number;
  onClose: () => void;
}

export function ProductDetailPage({ productId, onClose }: ProductDetailPageProps) {
  const product = getProductById(productId);
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const [selectedVolume, setSelectedVolume] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  if (!product) {
    return null;
  }

  const currentVolume = product.volumes[selectedVolume];
  const displayPrice = currentVolume.price * quantity;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      image: product.image,
      name: `${product.name} (${currentVolume.ml}ml)`,
      brand: product.brand,
      price: currentVolume.price.toString(),
      quantity: quantity
    });
    toast.success('✓ Додано до кошика');
    
    // Закриваємо детальну сторінку після додавання
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="product-overlay" onClick={onClose}>
      <motion.div 
        className="product-detail"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <button className="product__close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>

        <div className="product__container">
          {/* LEFT: Image Section (Sticky) */}
          <div className="product__gallery">
            <div className="product__image-wrapper">
              <img 
                src={product.image} 
                alt={product.name}
                className="product__image"
              />
              {product.isNew && (
                <div className="product__badge">Нова Колекція</div>
              )}
            </div>

            {/* Metadata Cards */}
            <div className="product__meta-grid">
              <div className="product__meta-card">
                <span className="product__meta-label">Походження</span>
                <span className="product__meta-value">{product.country}</span>
              </div>
              <div className="product__meta-card">
                <span className="product__meta-label">Рік</span>
                <span className="product__meta-value">{product.year}</span>
              </div>
              <div className="product__meta-card">
                <span className="product__meta-label">Парфумер</span>
                <span className="product__meta-value">{product.perfumer}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Details Section (Scrollable) */}
          <div className="product__content">
            {/* Header */}
            <motion.div 
              className="product__header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="product__brand">{product.brand}</p>
              <h1 className="product__name">{product.name}</h1>
              <p className="product__concentration">{product.concentration}</p>
            </motion.div>

            {/* BUYING SECTION */}
            <motion.div 
              className="product__buy-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Volume Selector */}
              <div className="product__volume-selector">
                <label className="product__label">Оберіть Об'єм</label>
                <div className="product__volume-options">
                  {product.volumes.map((volume, index) => (
                    <button
                      key={index}
                      className={`product__volume-btn ${selectedVolume === index ? 'product__volume-btn--active' : ''}`}
                      onClick={() => setSelectedVolume(index)}
                    >
                      <span className="product__volume-ml">{volume.ml} ml</span>
                      <span className="product__volume-price">{volume.price.toLocaleString('uk-UA')} ₴</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Price */}
              <div className="product__quantity-row">
                <div className="product__quantity">
                  <label className="product__label">Кількість</label>
                  <div className="product__quantity-controls">
                    <button 
                      className="product__qty-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      −
                    </button>
                    <span className="product__qty-value">{quantity}</span>
                    <button 
                      className="product__qty-btn"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="product__price-display">
                  <span className="product__price-label">Загальна Вартість</span>
                  <span className="product__price">{displayPrice.toLocaleString('uk-UA')} ₴</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="product__actions">
                <motion.button 
                  className="product__buy-btn"
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={20} />
                  <span>Додати в Кошик</span>
                </motion.button>
                <motion.button 
                  className={`product__favorite-btn ${isFavorite(product.id) ? 'product__favorite-btn--active' : ''}`}
                  onClick={() => toggleFavorite(product.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart size={20} fill={isFavorite(product.id) ? '#000' : 'none'} />
                </motion.button>
              </div>
            </motion.div>

            {/* STORYTELLING SECTION */}
            
            {/* About the Perfume */}
            <motion.div 
              className="product__story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="product__section-title">Про Цей Аромат</h2>
              <p className="product__description">{product.longDescription}</p>
            </motion.div>

            {/* Olfactory Pyramid */}
            <motion.div 
              className="product__pyramid-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="product__section-title">Ольфакторна Піраміда</h2>
              <div className="product__pyramid">
                {/* Top Notes */}
                <div className="product__note-layer product__note-layer--top">
                  <div className="product__note-icon">
                    <Wind size={24} />
                  </div>
                  <div className="product__note-content">
                    <h3 className="product__note-title">Верхні Ноти</h3>
                    <p className="product__note-description">Перше враження, випаровується за 15-30 хвилин</p>
                    <div className="product__note-tags">
                      {product.notes.top.map((note, idx) => (
                        <span key={idx} className="product__note-tag">{note}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Heart Notes */}
                <div className="product__note-layer product__note-layer--heart">
                  <div className="product__note-icon">
                    <Flower2 size={24} />
                  </div>
                  <div className="product__note-content">
                    <h3 className="product__note-title">Серцеві Ноти</h3>
                    <p className="product__note-description">Душа аромату, тримається 2-4 години</p>
                    <div className="product__note-tags">
                      {product.notes.heart.map((note, idx) => (
                        <span key={idx} className="product__note-tag">{note}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Base Notes */}
                <div className="product__note-layer product__note-layer--base">
                  <div className="product__note-icon">
                    <Droplet size={24} />
                  </div>
                  <div className="product__note-content">
                    <h3 className="product__note-title">Базові Ноти</h3>
                    <p className="product__note-description">Основа та тривале враження, до 24 годин</p>
                    <div className="product__note-tags">
                      {product.notes.base.map((note, idx) => (
                        <span key={idx} className="product__note-tag">{note}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Accordion Details */}
            <motion.div 
              className="product__accordion"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Perfumer */}
              <div className="product__accordion-item">
                <button 
                  className={`product__accordion-trigger ${openAccordion === 'perfumer' ? 'product__accordion-trigger--open' : ''}`}
                  onClick={() => toggleAccordion('perfumer')}
                >
                  <span>Парфумер</span>
                  <ChevronDown className="product__accordion-icon" />
                </button>
                <AnimatePresence>
                  {openAccordion === 'perfumer' && (
                    <motion.div
                      className="product__accordion-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p><strong>Творець:</strong> {product.perfumer}</p>
                      <p>Майстер-парфумер, відомий створенням витончених ароматів, які передають сутність розкоші та елегантності.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* History */}
              <div className="product__accordion-item">
                <button 
                  className={`product__accordion-trigger ${openAccordion === 'history' ? 'product__accordion-trigger--open' : ''}`}
                  onClick={() => toggleAccordion('history')}
                >
                  <span>Історія та Спадщина</span>
                  <ChevronDown className="product__accordion-icon" />
                </button>
                <AnimatePresence>
                  {openAccordion === 'history' && (
                    <motion.div
                      className="product__accordion-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p><strong>Рік випуску:</strong> {product.year}</p>
                      <p><strong>Країна походження:</strong> {product.country}</p>
                      <p>Цей аромат представляє віху у парфумерії, поєднуючи традиційні техніки з сучасними інноваціями.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Ingredients */}
              <div className="product__accordion-item">
                <button 
                  className={`product__accordion-trigger ${openAccordion === 'ingredients' ? 'product__accordion-trigger--open' : ''}`}
                  onClick={() => toggleAccordion('ingredients')}
                >
                  <span>Склад та Композиція</span>
                  <ChevronDown className="product__accordion-icon" />
                </button>
                <AnimatePresence>
                  {openAccordion === 'ingredients' && (
                    <motion.div
                      className="product__accordion-content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="product__ingredients">
                        <div>
                          <strong>Верхні ноти:</strong> {product.notes.top.join(', ')}
                        </div>
                        <div>
                          <strong>Серцеві ноти:</strong> {product.notes.heart.join(', ')}
                        </div>
                        <div>
                          <strong>Базові ноти:</strong> {product.notes.base.join(', ')}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}