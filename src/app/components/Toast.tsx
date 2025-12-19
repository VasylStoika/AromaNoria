import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  productName?: string;
  productImage?: string;
}

export function Toast({ message, isVisible, onClose, productName, productImage }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="toast">
      <div className="toast-content">
        <CheckCircle className="toast-icon" />
        {productImage && (
          <div className="toast-image">
            <img src={productImage} alt={productName} />
          </div>
        )}
        <div className="toast-text">
          <p className="toast-title">{message}</p>
          {productName && <p className="toast-product">{productName}</p>}
        </div>
      </div>
      <button className="toast-close" onClick={onClose}>
        <X />
      </button>
    </div>
  );
}
