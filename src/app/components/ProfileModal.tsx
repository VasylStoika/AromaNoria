import { X, User as UserIcon, Mail, Phone, MapPin, LogOut, ShoppingBag, Heart, Lock, Package, Star, Gift, MapPinned, Plus, Trash2, CheckCircle2, Truck, Clock, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { 
    user, 
    orders, 
    savedAddresses, 
    login, 
    register, 
    logout, 
    loginWithGoogle, 
    addAddress, 
    removeAddress, 
    setDefaultAddress, 
    getDiscount 
  } = useUser();
  
  const { favorites } = useCart();
  
  const [mode, setMode] = useState<'login' | 'register' | 'profile'>('login');
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'bonuses'>('overview');
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: ''
  });
  
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    city: '',
    street: '',
    warehouse: '',
    phone: '',
    isDefault: false
  });

  if (!isOpen) return null;

  // --- Handlers ---

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await login(loginData.email, loginData.password);
    
    setIsLoading(false);
    
    if (result.success) {
      setMode('profile');
      setLoginData({ email: '', password: '' });
      toast.success('Вітаємо! Ви успішно увійшли.');
    } else {
      toast.error(result.error || 'Невірний email або пароль');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await register(registerData);
    
    setIsLoading(false);
    
    if (result.success) {
      setMode('profile');
      toast.success('Реєстрація успішна! Ласкаво просимо.');
    } else {
      toast.error(result.error || 'Помилка під час реєстрації');
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const result = await loginWithGoogle();
    if (!result.success) {
      setIsLoading(false);
      toast.error(result.error || 'Помилка входу через Google');
    }
  };

  const handleLogout = async () => {
    await logout();
    setMode('login');
    onClose();
    toast.info('Ви вийшли з облікового запису');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(newAddress);
    setNewAddress({
      name: '',
      city: '',
      street: '',
      warehouse: '',
      phone: '',
      isDefault: false
    });
    setShowAddAddress(false);
    toast.success('Адресу успішно додано');
  };

  // --- Helpers ---

  const getLoyaltyColor = (level: string) => {
    switch (level) {
      case 'platinum': return '#E5E4E2';
      case 'gold': return '#FFD700';
      case 'silver': return '#C0C0C0';
      case 'bronze': return '#CD7F32';
      default: return '#CD7F32';
    }
  };

  const getLoyaltyLabel = (level: string) => {
    switch (level) {
      case 'platinum': return 'Платиновий';
      case 'gold': return 'Золотий';
      case 'silver': return 'Срібний';
      case 'bronze': return 'Бронзовий';
      default: return 'Бронзовий';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle2 size={18} color="#22c55e" />;
      case 'shipped': return <Truck size={18} color="#3b82f6" />;
      case 'processing': return <Clock size={18} color="#f59e0b" />;
      default: return <Package size={18} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered': return 'Доставлено';
      case 'shipped': return 'В дорозі';
      case 'processing': return 'Обробляється';
      case 'cancelled': return 'Скасовано';
      default: return status;
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="profile-modal">
        <div className="cart-modal-header">
          <h2 className="cart-modal-title">
            {user ? 'Мій профіль' : mode === 'login' ? 'Вхід' : 'Реєстрація'}
          </h2>
          <button className="cart-modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="profile-content">
          {user ? (
            <>
              {/* Вкладки */}
              <div className="profile-tabs">
                <button
                  className={`profile-tab ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <UserIcon size={18} />
                  Огляд
                </button>
                <button
                  className={`profile-tab ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <Package size={18} />
                  Замовлення ({orders.length})
                </button>
                <button
                  className={`profile-tab ${activeTab === 'addresses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('addresses')}
                >
                  <MapPinned size={18} />
                  Адреси ({savedAddresses.length})
                </button>
                <button
                  className={`profile-tab ${activeTab === 'bonuses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bonuses')}
                >
                  <Gift size={18} />
                  Бонуси
                </button>
              </div>

              {/* Контент вкладок */}
              {activeTab === 'overview' && (
                <div className="profile-view">
                  <div className="profile-header">
                    <div className="profile-avatar">
                      <UserIcon />
                    </div>
                    <h3>{user.name}</h3>
                    <p className="profile-email">{user.email}</p>
                    <div className="loyalty-badge" style={{ backgroundColor: getLoyaltyColor(user.loyaltyLevel) }}>
                      <Star size={14} />
                      {getLoyaltyLabel(user.loyaltyLevel)}
                    </div>
                  </div>

                  <div className="profile-stats">
                    <div className="stat-item">
                      <ShoppingBag />
                      <div>
                        <span className="stat-value">{orders.length}</span>
                        <span className="stat-label">Замовлень</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <Heart />
                      <div>
                        <span className="stat-value">{favorites.length}</span>
                        <span className="stat-label">Улюблених</span>
                      </div>
                    </div>
                    <div className="stat-item">
                      <Gift />
                      <div>
                        <span className="stat-value">{user.bonusPoints}</span>
                        <span className="stat-label">Бонусів</span>
                      </div>
                    </div>
                  </div>

                  <div className="profile-info">
                    <h4>Контактна інформація</h4>
                    <div className="info-item">
                      <Mail />
                      <span>{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="info-item">
                        <Phone />
                        <span>{user.phone}</span>
                      </div>
                    )}
                    {user.city && (
                      <div className="info-item">
                        <MapPin />
                        <span>{user.city}, {user.address}</span>
                      </div>
                    )}
                  </div>

                  <div className="profile-loyalty-info">
                    <h4>Програма лояльності</h4>
                    <div className="loyalty-progress">
                      <div className="loyalty-level-info">
                        <span>Витрачено: {user.totalSpent.toLocaleString('uk-UA')} ₴</span>
                        <span>Знижка: {getDiscount()}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${Math.min((user.totalSpent / 50000) * 100, 100)}%` }}
                        />
                      </div>
                      <p className="loyalty-next">
                        {user.loyaltyLevel === 'platinum' 
                          ? 'Максимальний рівень досягнуто!' 
                          : `Ще ${(user.loyaltyLevel === 'gold' ? 50000 : user.loyaltyLevel === 'silver' ? 25000 : 10000) - user.totalSpent} ₴ до наступного рівня`
                        }
                      </p>
                    </div>
                  </div>

                  <button className="btn-secondary logout-btn" onClick={handleLogout}>
                    <LogOut />
                    Вийти з профілю
                  </button>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="orders-view">
                  {orders.length === 0 ? (
                    <div className="empty-state">
                      <Package size={48} />
                      <p>У вас поки немає замовлень</p>
                    </div>
                  ) : (
                    <div className="orders-list">
                      {orders.map(order => (
                        <div key={order.id} className="order-card">
                          <div className="order-header">
                            <div className="order-info">
                              <span className="order-id">#{order.id}</span>
                              <span className="order-date">{new Date(order.date).toLocaleDateString('uk-UA')}</span>
                            </div>
                            <div className="order-status">
                              {getStatusIcon(order.status)}
                              <span>{getStatusLabel(order.status)}</span>
                            </div>
                          </div>
                          
                          <div className="order-items">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="order-item-mini">
                                <img src={item.image} alt={item.name} />
                                <div className="order-item-details">
                                  <span className="order-item-name">{item.name}</span>
                                  <span className="order-item-qty">x{item.quantity}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="order-footer">
                            <div className="order-delivery">
                              <MapPin size={14} />
                              <span>{order.deliveryAddress}</span>
                            </div>
                            {order.trackingNumber && (
                              <div className="order-tracking">
                                <span>ТТН: {order.trackingNumber}</span>
                              </div>
                            )}
                          </div>

                          <div className="order-total-row">
                            <span>Сума: {order.total.toLocaleString('uk-UA')} ₴</span>
                            <span className="bonus-earned">+{order.bonusEarned} бонусів</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="addresses-view">
                  {!showAddAddress && (
                    <button className="btn-primary add-address-btn" onClick={() => setShowAddAddress(true)}>
                      <Plus size={18} />
                      Додати адресу
                    </button>
                  )}

                  {showAddAddress && (
                    <form onSubmit={handleAddAddress} className="add-address-form">
                      <h4>Нова адреса</h4>
                      <input
                        type="text"
                        placeholder="Назва (Дім, Робота, тощо)"
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Місто"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Вулиця, будинок"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Відділення Нової Пошти"
                        value={newAddress.warehouse}
                        onChange={(e) => setNewAddress({ ...newAddress, warehouse: e.target.value })}
                      />
                      <input
                        type="tel"
                        placeholder="Телефон"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        required
                      />
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={newAddress.isDefault}
                          onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                        />
                        Зробити основною адресою
                      </label>
                      <div className="form-actions">
                        <button type="submit" className="btn-primary">Зберегти</button>
                        <button type="button" className="btn-secondary" onClick={() => setShowAddAddress(false)}>
                          Скасувати
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="addresses-list">
                    {savedAddresses.map(address => (
                      <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
                        <div className="address-header">
                          <h4>{address.name}</h4>
                          {address.isDefault && <span className="default-badge">Основна</span>}
                        </div>
                        <div className="address-details">
                          <p>{address.city}</p>
                          <p>{address.street}</p>
                          {address.warehouse && <p>Відділення: {address.warehouse}</p>}
                          <p>{address.phone}</p>
                        </div>
                        <div className="address-actions">
                          {!address.isDefault && (
                            <button 
                              className="btn-link"
                              onClick={() => setDefaultAddress(address.id)}
                            >
                              Зробити основною
                            </button>
                          )}
                          <button 
                            className="btn-link danger"
                            onClick={() => removeAddress(address.id)}
                          >
                            <Trash2 size={16} />
                            Видалити
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'bonuses' && (
                <div className="bonuses-view">
                  <div className="bonus-card-large">
                    <div className="bonus-header">
                      <Gift size={32} />
                      <h3>{user.bonusPoints} бонусів</h3>
                      <p>1 бонус = 1 ₴</p>
                    </div>
                  </div>

                  <div className="loyalty-levels">
                    <h4>Рівні лояльності</h4>
                    <div className="level-item">
                      <div className="level-badge" style={{ backgroundColor: '#CD7F32' }}>
                        <Star size={16} />
                      </div>
                      <div className="level-info">
                        <span className="level-name">Бронзовий</span>
                        <span className="level-requirement">0 - 9,999 ₴</span>
                      </div>
                      <span className="level-discount">0%</span>
                    </div>
                    <div className="level-item">
                      <div className="level-badge" style={{ backgroundColor: '#C0C0C0' }}>
                        <Star size={16} />
                      </div>
                      <div className="level-info">
                        <span className="level-name">Срібний</span>
                        <span className="level-requirement">10,000 - 24,999 ₴</span>
                      </div>
                      <span className="level-discount">5%</span>
                    </div>
                    <div className="level-item">
                      <div className="level-badge" style={{ backgroundColor: '#FFD700' }}>
                        <Star size={16} />
                      </div>
                      <div className="level-info">
                        <span className="level-name">Золотий</span>
                        <span className="level-requirement">25,000 - 49,999 ₴</span>
                      </div>
                      <span className="level-discount">10%</span>
                    </div>
                    <div className="level-item">
                      <div className="level-badge" style={{ backgroundColor: '#E5E4E2' }}>
                        <Star size={16} />
                      </div>
                      <div className="level-info">
                        <span className="level-name">Платиновий</span>
                        <span className="level-requirement">50,000+ ₴</span>
                      </div>
                      <span className="level-discount">15%</span>
                    </div>
                  </div>

                  <div className="bonus-rules">
                    <h4>Як накопичувати бонуси?</h4>
                    <ul>
                      <li>🎁 100 бонусів за реєстрацію</li>
                      <li>💰 5% від кожної покупки</li>
                      <li>🎂 Бонуси на день народження</li>
                      <li>📢 Участь в акціях і розіграшах</li>
                    </ul>
                  </div>
                </div>
              )}
            </>
          ) : mode === 'login' ? (
            <form onSubmit={handleLogin} className="auth-form">
              <button 
                type="button" 
                className="google-login-btn" 
                onClick={handleGoogleLogin} 
                disabled={isLoading}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isLoading ? 'Зачекайте...' : 'Увійти через Google'}
              </button>

              <div className="divider">
                <span>або</span>
              </div>

              <div className="input-group">
                <div className="input-icon">
                  <Mail />
                </div>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  placeholder="Email"
                  className="styled-input"
                  disabled={isLoading}
                />
              </div>

              <div className="input-group">
                <div className="input-icon">
                  <Lock />
                </div>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  placeholder="Пароль"
                  className="styled-input"
                  disabled={isLoading}
                />
              </div>

              <button type="submit" className="btn-primary auth-submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Увійти'}
              </button>

              <p className="auth-switch">
                Немає облікового запису?{' '}
                <button type="button" onClick={() => setMode('register')} className="switch-link">
                  Зареєструватись
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="auth-form">
              <button 
                type="button" 
                className="google-login-btn" 
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isLoading ? 'Зачекайте...' : 'Зареєструватись через Google'}
              </button>

              <div className="divider">
                <span>або</span>
              </div>

              <div className="input-group">
                <div className="input-icon">
                  <UserIcon />
                </div>
                <input
                  type="text"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                  placeholder="Ім'я та прізвище"
                  className="styled-input"
                  disabled={isLoading}
                />
              </div>

              <div className="input-group">
                <div className="input-icon">
                  <Mail />
                </div>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                  placeholder="Email"
                  className="styled-input"
                  disabled={isLoading}
                />
              </div>

              <div className="input-group">
                <div className="input-icon">
                  <Lock />
                </div>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                  placeholder="Пароль"
                  className="styled-input"
                  disabled={isLoading}
                />
              </div>

              <button type="submit" className="btn-primary auth-submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Зареєструватись'}
              </button>

              <p className="auth-switch">
                Вже є обліковий запис?{' '}
                <button type="button" onClick={() => setMode('login')} className="switch-link">
                  Увійти
                </button>
              </p>
              
              <p className="bonus-info">
                🎁 Отримайте 100 бонусів за реєстрацію!
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}