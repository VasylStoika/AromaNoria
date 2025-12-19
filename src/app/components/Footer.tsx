import { Instagram, Send } from "lucide-react";

interface FooterProps {
  onContactOpen: () => void;
}

export function Footer({ onContactOpen }: FooterProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
    if (id.includes('products-')) {
      window.location.hash = id;
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-logo">AromaNoria</h3>
            <p className="footer-description">
              Преміальні парфуми від світових брендів. Chanel, Dior, Tom Ford, YSL та інші топові будинки.
            </p>
          </div>
          
          <div>
            <h4 className="footer-title">Магазин</h4>
            <ul className="footer-links">
              <li><a href="#carousel" onClick={(e) => handleNavClick(e, 'carousel')}>Новинки</a></li>
              <li><a href="#products-women" onClick={(e) => handleNavClick(e, 'products-women')}>Жіночі парфуми</a></li>
              <li><a href="#products-men" onClick={(e) => handleNavClick(e, 'products-men')}>Чоловічі парфуми</a></li>
              <li><a href="#products-unisex" onClick={(e) => handleNavClick(e, 'products-unisex')}>Унісекс</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-title">Інформація</h4>
            <ul className="footer-links">
              <li><a href="#">Про нас</a></li>
              <li><a href="#">Доставка та оплата</a></li>
              <li><a href="#">Повернення</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onContactOpen(); }}>Контакти</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="footer-title">Соціальні мережі</h4>
            <div className="footer-social">
              <a href="https://instagram.com/aromanoria" target="_blank" rel="noopener noreferrer" className="social-button" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="https://t.me/aromanoria" target="_blank" rel="noopener noreferrer" className="social-button" aria-label="Telegram">
                <Send />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 AromaNoria. Всі права захищено.</p>
        </div>
      </div>
    </footer>
  );
}