import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2000&auto=format&fit=crop" 
          alt="Luxury Perfume" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-transparent" />
        <div className="absolute inset-0 bg-luxury-black/20" /> {/* Extra dim */}
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-luxury-gold text-sm md:text-base font-medium tracking-[0.4em] mb-6 uppercase">
            Exclusive Fragrance Collection
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight">
            Розкрий свою <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
              індивідуальність
            </span>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center mt-12">
             <Link 
               to="/catalog"
               className="group relative px-10 py-4 bg-luxury-gold text-luxury-black font-semibold tracking-wide overflow-hidden min-w-[200px]"
             >
               <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                 КАТАЛОГ
               </span>
               <div className="absolute inset-0 bg-luxury-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
             </Link>
             
             <button className="px-10 py-4 border border-white/20 text-white hover:bg-white/5 transition-all backdrop-blur-sm min-w-[200px] hover:border-luxury-gold/50">
               ПІДІБРАТИ АРОМАТ
             </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};