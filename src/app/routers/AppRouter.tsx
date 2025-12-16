import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/home/HomePage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<div className="container mx-auto px-6 py-20 text-center">Каталог (в разработке)</div>} />
      <Route path="*" element={<div className="container mx-auto px-6 py-20 text-center">Страница не найдена</div>} />
    </Routes>
  );
};