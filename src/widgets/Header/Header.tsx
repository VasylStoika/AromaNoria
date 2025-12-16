import { motion } from 'framer-motion';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/features/cart/model/store';
import { cn } from '@/shared/lib/utils';

export const Header = () => {
  const { items, toggleCart } = useCartStore();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 w-full z-50 glass-panel border-b-0 border-white/5",
        "transition-all duration-300"
      )}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-serif font-bold text-white tracking-widest z-50">
          AURA<span className="text-luxury-gold">.</span>UA
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide text-gray-300 absolute left-1/2 transform -translate-x-1/2">
          {['Каталог', 'Бренди', 'Для неї', 'Для нього', 'Gift Sets'].map((item) => (
            <Link 
              key={item} 
              to="/catalog" 
              className="hover:text-luxury-gold transition-colors relative group"
            >
              {item.toUpperCase()}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <button className="text-gray-300 hover:text-white transition-colors">
            <Search size={20} />
          </button>
          
          <button 
            onClick={toggleCart}
            className="relative text-gray-300 hover:text-luxury-gold transition-colors"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
              >
                {itemCount}
              </motion.span>
            )}
          </button>

          <button className="md:hidden text-gray-300">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </motion.header>
  );
};