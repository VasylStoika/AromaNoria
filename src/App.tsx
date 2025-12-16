import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@/app/routers/AppRouter';
import { Header } from '@/widgets/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-luxury-black text-gray-200 selection:bg-luxury-gold selection:text-black">
        <Header />
        <main>
          <AppRouter />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;