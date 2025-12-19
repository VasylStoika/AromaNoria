import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';


const logoImage = "/logo.png";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-animated">
        <div className="hero-bg-overlay" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1760108503346-ee992c0e1200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZXJmdW1lJTIwYWJzdHJhY3QlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2NjAyODQxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Luxury Perfume Background"
          className="hero-bg-image"
        />
      </div>
      
      <div className="hero-container-centered">
        <div className="hero-content-centered">
          <div className="hero-logo">
            <img
              src={logoImage}
              alt="AromaNoria Logo"
              className="hero-logo-image"
            />
          </div>
          
          <h1 className="hero-title">
            Відкрийте світ<br />
            <span className="hero-title-gradient">преміальних ароматів</span>
          </h1>
          
          <p className="hero-description">
            Ексклюзивна колекція найкращих парфумів від світових будинків.<br />
            <strong>Chanel, Dior, Tom Ford</strong> та інші топові бренди.
          </p>
          
          <div className="hero-buttons">
            <a href="#carousel" className="hero-btn-primary">
              <span>Переглянути колекцію</span>
              <ArrowRight size={20} />
            </a>
            <a href="#products" className="hero-btn-secondary">
              Дізнатись більше
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}