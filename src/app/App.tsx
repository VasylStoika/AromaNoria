import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Categories } from './components/Categories';
import { ProductCarousel } from './components/ProductCarousel';
import { FeaturedProducts } from './components/FeaturedProducts';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';
import { SearchModal } from './components/SearchModal';
import { FavoritesModal } from './components/FavoritesModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ProfileModal } from './components/ProfileModal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ContactModal } from './components/ContactModal';
import { Toast } from './components/Toast';
import { Toaster } from './components/ui/sonner';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import './styles/main.css';
import './styles/additions.css';
import './styles/filters.css';
import './styles/contact-modal.css';
import './styles/product-detail.css';
import './styles/product-page.css';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number>(1);
  const [returnToSection, setReturnToSection] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [toastData, setToastData] = useState({
    isVisible: false,
    message: '',
    productName: '',
    productImage: ''
  });

  const handleAddToCart = (product: { id: number; name: string; image: string }) => {
    setToastData({
      isVisible: true,
      message: 'Товар додано в кошик!',
      productName: product.name,
      productImage: product.image
    });
  };

  const handleProductClick = (productId: number, sectionId?: string) => {
    // Зберігаємо поточну позицію скролу
    setScrollPosition(window.scrollY);
    setSelectedProductId(productId);
    setIsProductDetailOpen(true);
    setReturnToSection(sectionId || null);
  };

  const handleProductDetailClose = () => {
    setIsProductDetailOpen(false);
    
    // Відновлюємо позицію скролу
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 50);
  };

  // Блокуємо скрол body коли відкрита детальна сторінка
  useEffect(() => {
    if (isProductDetailOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isProductDetailOpen, scrollPosition]);

  return (
    <UserProvider>
      <CartProvider>
        <div>
          {!isProductDetailOpen && (
            <>
              <Header 
                onCartOpen={() => setIsCartOpen(true)}
                onSearchOpen={() => setIsSearchOpen(true)}
                onFavoritesOpen={() => setIsFavoritesOpen(true)}
                onProfileOpen={() => setIsProfileOpen(true)}
              />
              <main>
                <Hero />
                <ProductCarousel onAddToCart={handleAddToCart} onProductClick={handleProductClick} />
                <Categories />
                <FeaturedProducts onAddToCart={handleAddToCart} onProductClick={handleProductClick} />
              </main>
              <Footer onContactOpen={() => setIsContactOpen(true)} />
            </>
          )}
          
          {isProductDetailOpen && (
            <ProductDetailPage 
              productId={selectedProductId}
              onClose={handleProductDetailClose}
            />
          )}
          
          <CartModal 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)}
            onCheckout={() => setIsCheckoutOpen(true)}
          />
          <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          <FavoritesModal isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />
          <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
          <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
          <Toast 
            message={toastData.message}
            isVisible={toastData.isVisible}
            productName={toastData.productName}
            productImage={toastData.productImage}
            onClose={() => setToastData({ ...toastData, isVisible: false })}
          />
          <Toaster />
        </div>
      </CartProvider>
    </UserProvider>
  );
}