import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartModal({ isOpen, onClose, onCheckout }: CartModalProps) {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    onCheckout();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="cart-modal">
        <div className="cart-modal-header">
          <h2 className="cart-modal-title">Ваш кошик</h2>
          <button className="cart-modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Ваш кошик порожній</p>
            <button className="btn-primary" onClick={onClose}>
              Продовжити покупки
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-brand">{item.brand}</p>
                    <p className="cart-item-price">{item.price} грн</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        <Minus />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        <Plus />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="cart-item-remove"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Всього:</span>
                <span className="cart-total-price">
                  {getCartTotal().toLocaleString('uk-UA')} грн
                </span>
              </div>
              <button className="btn-primary cart-checkout" onClick={handleCheckout}>
                Оформити замовлення
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}