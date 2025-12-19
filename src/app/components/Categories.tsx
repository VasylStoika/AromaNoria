import { Sparkles, Flame, Leaf } from "lucide-react";

const categories = [
  {
    id: 1,
    icon: Sparkles,
    title: "Свіжі",
    description: "Легкі та освіжаючі аромати для щодня",
    className: "fresh"
  },
  {
    id: 2,
    icon: Flame,
    title: "Пряні",
    description: "Інтенсивні та чуттєві композиції",
    className: "spicy"
  },
  {
    id: 3,
    icon: Leaf,
    title: "Деревні",
    description: "Елегантні та витончені нотки",
    className: "woody"
  }
];

export function Categories() {
  return (
    <section className="categories">
      <div className="section-header">
        <span className="section-label">Знайдіть ваш аромат</span>
        <h2 className="section-title">Категорії ароматів</h2>
      </div>
      
      <div className="categories-grid">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className={`category-card ${category.className}`}
            >
              <div className="category-icon">
                <Icon />
              </div>
              <h3 className="category-title">{category.title}</h3>
              <p className="category-description">{category.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
