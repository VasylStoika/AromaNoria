import { X, Instagram, Send, Phone, Mail, MapPin } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="contact-modal">
        <button className="contact-modal-close" onClick={onClose} aria-label="Закрити">
          <X size={24} />
        </button>

        <div className="contact-modal-content">
          <div className="contact-modal-header">
            <h2>Зв'яжіться з нами</h2>
            <p>Ми завжди раді відповісти на ваші запитання</p>
          </div>

          <div className="contact-cards">
            <a 
              href="https://instagram.com/aromanoria" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-card instagram"
            >
              <div className="contact-card-icon">
                <Instagram size={28} />
              </div>
              <div className="contact-card-info">
                <h3>Instagram</h3>
                <p>@aromanoria</p>
                <span className="contact-card-badge">Найактивніші</span>
              </div>
            </a>

            <a 
              href="https://t.me/aromanoria" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-card telegram"
            >
              <div className="contact-card-icon">
                <Send size={28} />
              </div>
              <div className="contact-card-info">
                <h3>Telegram</h3>
                <p>@aromanoria</p>
                <span className="contact-card-badge">Швидка відповідь</span>
              </div>
            </a>

            <a 
              href="tel:+380501234567" 
              className="contact-card phone"
            >
              <div className="contact-card-icon">
                <Phone size={28} />
              </div>
              <div className="contact-card-info">
                <h3>Телефон</h3>
                <p>+380 (50) 123-45-67</p>
                <span className="contact-card-badge">Пн-Нд 9:00-21:00</span>
              </div>
            </a>

            <a 
              href="mailto:info@aromanoria.com" 
              className="contact-card email"
            >
              <div className="contact-card-icon">
                <Mail size={28} />
              </div>
              <div className="contact-card-info">
                <h3>Email</h3>
                <p>info@aromanoria.com</p>
                <span className="contact-card-badge">Офіційна пошта</span>
              </div>
            </a>
          </div>

          <div className="contact-info-section">
            <div className="contact-info-item">
              <MapPin size={20} />
              <div>
                <h4>Адреса шоу-руму</h4>
                <p>м. Київ, вул. Хрещатик 1, ТРЦ "Глобус"</p>
              </div>
            </div>
          </div>

          <div className="contact-modal-footer">
            <p>Працюємо щодня з 9:00 до 21:00</p>
          </div>
        </div>
      </div>
    </>
  );
}
