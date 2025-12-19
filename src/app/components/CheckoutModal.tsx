import { X, MapPin, Package } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { searchCities, getWarehouses, City, Warehouse } from '../services/novaposhtaApi';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, addOrder, getDiscount } = useUser();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    paymentMethod: 'card',
    deliveryMethod: 'novaposhta'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Nova Poshta states
  const [citySearch, setCitySearch] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [showCities, setShowCities] = useState(false);
  
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [showWarehouses, setShowWarehouses] = useState(false);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Пошук міст
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (citySearch.length >= 2) {
        setLoadingCities(true);
        // Використовуємо реальний API Нової Пошти
        const results = await searchCities(citySearch);
        setCities(results);
        setShowCities(results.length > 0);
        setLoadingCities(false);
      } else {
        setCities([]);
        setShowCities(false);
        setLoadingCities(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [citySearch]);

  // Завантаження відділень при виборі міста
  useEffect(() => {
    if (selectedCity) {
      setLoadingWarehouses(true);
      // Використовуємо реальний API Нової Пошти
      getWarehouses(selectedCity.Ref).then((results) => {
        setWarehouses(results);
        setLoadingWarehouses(false);
      });
    }
  }, [selectedCity]);

  // Закриття dropdown при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.autocomplete-wrapper')) {
        setShowCities(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Якщо користувач авторизований, зберігаємо замовлення
    if (user) {
      const deliveryAddress = formData.deliveryMethod === 'novaposhta' 
        ? `${selectedCity?.Description}, ${selectedWarehouse?.Description}`
        : formData.address || '';
      
      const orderItems = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }));
      
      addOrder(orderItems, getCartTotal(), deliveryAddress);
    }
    
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      setOrderPlaced(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        paymentMethod: 'card',
        deliveryMethod: 'novaposhta'
      });
      setCitySearch('');
      setSelectedCity(null);
      setSelectedWarehouse(null);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setCitySearch(city.Description);
    setShowCities(false);
    setSelectedWarehouse(null);
  };

  const handleWarehouseSelect = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setShowWarehouses(false);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="checkout-modal">
        <div className="cart-modal-header">
          <h2 className="cart-modal-title">Оформлення замовлення</h2>
          <button className="cart-modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        {orderPlaced ? (
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h3>Замовлення оформлено!</h3>
            <p>Дякуємо за покупку. Ми зв'яжемось з вами найближчим часом.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h3>Контактна інформація</h3>
              <div className="form-group">
                <label htmlFor="name">Ім'я та прізвище *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Іван Петренко"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ivan@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Телефон *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+380 XX XXX XX XX"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Спосіб доставки</h3>
              <div className="delivery-methods">
                <label className="delivery-option">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="novaposhta"
                    checked={formData.deliveryMethod === 'novaposhta'}
                    onChange={handleChange}
                  />
                  <div className="delivery-option-content">
                    <Package />
                    <div>
                      <span>Нова Пошта</span>
                      <small>У відділення</small>
                    </div>
                  </div>
                </label>
                <label className="delivery-option">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="courier"
                    checked={formData.deliveryMethod === 'courier'}
                    onChange={handleChange}
                  />
                  <div className="delivery-option-content">
                    <MapPin />
                    <div>
                      <span>Кур'єр</span>
                      <small>За адресою</small>
                    </div>
                  </div>
                </label>
              </div>

              {formData.deliveryMethod === 'novaposhta' ? (
                <>
                  <div className="form-group">
                    <label htmlFor="city">Місто *</label>
                    <div className="autocomplete-wrapper">
                      <input
                        type="text"
                        id="city"
                        value={citySearch}
                        onChange={(e) => {
                          setCitySearch(e.target.value);
                          setSelectedCity(null);
                        }}
                        onFocus={() => citySearch.length >= 2 && setShowCities(true)}
                        placeholder="Почніть вводити назву міста..."
                        required
                      />
                      {loadingCities && (
                        <div className="autocomplete-loading">
                          Завантаження...
                        </div>
                      )}
                      {showCities && cities.length > 0 && !loadingCities && (
                        <div className="autocomplete-dropdown">
                          {cities.map((city) => (
                            <div
                              key={city.Ref}
                              className="autocomplete-item"
                              onClick={() => handleCitySelect(city)}
                            >
                              <MapPin />
                              <div>
                                <div>{city.Description}</div>
                                <small>{city.Area}</small>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {showCities && cities.length === 0 && !loadingCities && citySearch.length >= 2 && (
                        <div className="autocomplete-dropdown">
                          <div className="autocomplete-no-results">
                            Міста не знайдено
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedCity && (
                    <div className="form-group">
                      <label htmlFor="warehouse">Відділення Нової Пошти *</label>
                      <div className="autocomplete-wrapper">
                        <select
                          id="warehouse"
                          value={selectedWarehouse?.Ref || ''}
                          onChange={(e) => {
                            const warehouse = warehouses.find(w => w.Ref === e.target.value);
                            if (warehouse) handleWarehouseSelect(warehouse);
                          }}
                          required
                          disabled={loadingWarehouses}
                        >
                          <option value="">
                            {loadingWarehouses ? 'Завантаження...' : 'Оберіть відділення'}
                          </option>
                          {warehouses.map((warehouse) => (
                            <option key={warehouse.Ref} value={warehouse.Ref}>
                              {warehouse.Description}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="form-group">
                  <label htmlFor="address">Адреса доставки *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="вул. Хрещатик, 1, кв. 10"
                    required
                  />
                </div>
              )}
            </div>

            <div className="form-section">
              <h3>Спосіб оплати</h3>
              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                  />
                  <span>Банківська карта</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleChange}
                  />
                  <span>Готівкою при отриманні</span>
                </label>
              </div>
            </div>

            <div className="checkout-summary">
              <div className="summary-row">
                <span>Сума замовлення:</span>
                <span>{getCartTotal().toLocaleString('uk-UA')} грн</span>
              </div>
              <div className="summary-row">
                <span>Доставка:</span>
                <span>Безкоштовно</span>
              </div>
              <div className="summary-total">
                <span>Разом:</span>
                <span>{getCartTotal().toLocaleString('uk-UA')} грн</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-primary checkout-submit"
              disabled={formData.deliveryMethod === 'novaposhta' && !selectedWarehouse}
            >
              Підтвердити замовлення
            </button>
          </form>
        )}
      </div>
    </>
  );
}