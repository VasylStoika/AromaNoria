import { ProductCard } from './ProductCard';
import { TOP_PERFUMES } from '../data/perfumes';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface ProductCarouselProps {
  onAddToCart?: (product: { id: number; name: string; image: string }) => void;
  onProductClick?: (productId: number, sectionId?: string) => void;
}

export function ProductCarousel({ onAddToCart, onProductClick }: ProductCarouselProps) {
  return (
    <section className="carousel-section" id="carousel">
      <div className="section-header">
        <span className="section-label">
          Топ продажів AromaNoria
        </span>
        <h2 className="section-title">
          Найпопулярніші парфуми
        </h2>
        <p className="section-description">
          Перетягніть мишкою для перегляду колекції
        </p>
      </div>
      
      <div className="carousel-wrapper">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {TOP_PERFUMES.map((product) => (
              <CarouselItem key={product.id}>
                <div className="carousel-card-wrapper">
                  <ProductCard 
                    {...product} 
                    onAddToCart={onAddToCart} 
                    onProductClick={(id) => onProductClick?.(id, 'carousel')} 
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="carousel-nav">
            <CarouselPrevious className="carousel-nav-prev" />
            <CarouselNext className="carousel-nav-next" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}