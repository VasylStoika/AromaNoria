import { ShoppingBag, Search, User, Heart } from "lucide-react";
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartOpen: () => void;
  onSearchOpen: () => void;
  onFavoritesOpen: () => void;
  onProfileOpen: () => void;
}

export function Header({ onCartOpen, onSearchOpen, onFavoritesOpen, onProfileOpen }: HeaderProps) {
  const { getCartCount, favorites } = useCart();
  const cartCount = getCartCount();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height
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
    
    // Якщо це категорія продуктів, оновлюємо хеш та прокручуємо до секції
    if (id.startsWith('products-')) {
      window.location.hash = id;
      setTimeout(() => {
        const element = document.getElementById('products');
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="logo">AromaNoria</h1>
          <nav className="nav">
            <a href="#carousel" onClick={(e) => handleNavClick(e, 'carousel')}>Новинки</a>
            <a href="#products-women" onClick={(e) => handleNavClick(e, 'products-women')}>Жіночі</a>
            <a href="#products-men" onClick={(e) => handleNavClick(e, 'products-men')}>Чоловічі</a>
            <a href="#products-unisex" onClick={(e) => handleNavClick(e, 'products-unisex')}>Унісекс</a>
          </nav>
        </div>
        
        <div className="header-actions">
          <button className="icon-button" onClick={onSearchOpen} aria-label="Пошук">
            <Search />
          </button>
          <button className="icon-button hide-mobile" onClick={onFavoritesOpen} aria-label="Улюблене">
            <Heart />
            {favorites.length > 0 && (
              <span className="cart-badge">{favorites.length}</span>
            )}
          </button>
          <button className="icon-button hide-mobile" onClick={onProfileOpen} aria-label="Профіль">
            <User />
          </button>
          <button className="icon-button" onClick={onCartOpen} aria-label="Кошик">
            <ShoppingBag />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}