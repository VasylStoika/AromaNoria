import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

// Інтерфейси даних
interface Address {
  id: string;
  name: string;
  city: string;
  street: string;
  warehouse?: string;
  phone: string;
  isDefault: boolean;
}

interface OrderItem {
  id: number;
  name: string;
  brand: string;
  price: string;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  trackingNumber?: string;
  bonusEarned: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  bonusPoints: number;
  loyaltyLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalSpent: number;
  registrationDate: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  city?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  orders: Order[];
  savedAddresses: Address[];
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  addOrder: (items: OrderItem[], total: number, deliveryAddress: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  getDiscount: () => number;
  useBonusPoints: (points: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Допоміжні функції
const getLoyaltyLevel = (totalSpent: number): 'bronze' | 'silver' | 'gold' | 'platinum' => {
  if (totalSpent >= 50000) return 'platinum';
  if (totalSpent >= 25000) return 'gold';
  if (totalSpent >= 10000) return 'silver';
  return 'bronze';
};

const calculateDiscount = (level: string): number => {
  switch (level) {
    case 'platinum': return 15;
    case 'gold': return 10;
    case 'silver': return 5;
    default: return 0;
  }
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);

  // Перетворює користувача Supabase у формат нашого додатку
  const mapSupabaseUser = (sbUser: SupabaseUser): User => {
    const metadata = sbUser.user_metadata || {};
    return {
      id: sbUser.id,
      name: metadata.name || sbUser.email?.split('@')[0] || 'Користувач',
      email: sbUser.email || '',
      phone: metadata.phone || '',
      address: metadata.address || '',
      city: metadata.city || '',
      bonusPoints: metadata.bonusPoints || 0,
      loyaltyLevel: metadata.loyaltyLevel || 'bronze',
      totalSpent: metadata.totalSpent || 0,
      registrationDate: sbUser.created_at.split('T')[0]
    };
  };

  // 1. Перевірка сесії при завантаженні та підписка на зміни
  useEffect(() => {
    // Отримуємо поточну сесію
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      }
      setLoading(false);
    });

    // Підписуємось на зміни стану авторизації (вхід, вихід, оновлення токена)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(mapSupabaseUser(session.user));
      } else {
        setUser(null);
        // При виході очищаємо замовлення та адреси (опціонально)
        // setOrders([]);
        // setSavedAddresses([]);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Завантаження та збереження локальних даних (Orders, Addresses)
  // В реальному проекті це теж варто перенести в базу даних
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    const savedAddressesList = localStorage.getItem('addresses');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedAddressesList) setSavedAddresses(JSON.parse(savedAddressesList));
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('addresses', JSON.stringify(savedAddresses));
  }, [orders, savedAddresses]);

  // --- Методи Авторизації ---

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            phone: data.phone,
            city: data.city,
            address: data.address,
            bonusPoints: 100, // Бонус за реєстрацію
            loyaltyLevel: 'bronze',
            totalSpent: 0
          }
        }
      });
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    // Оновлюємо локальний стейт для миттєвого відображення
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);

    // Оновлюємо метадані в Supabase
    await supabase.auth.updateUser({
      data: {
        name: updatedUser.name,
        phone: updatedUser.phone,
        city: updatedUser.city,
        address: updatedUser.address,
        bonusPoints: updatedUser.bonusPoints,
        totalSpent: updatedUser.totalSpent,
        loyaltyLevel: updatedUser.loyaltyLevel
      }
    });
  };

  // --- Методи бізнес-логіки (Замовлення, Адреси, Бонуси) ---

  const addOrder = (items: OrderItem[], total: number, deliveryAddress: string) => {
    if (!user) return;
    
    const bonusEarned = Math.floor(total * 0.05);
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items,
      total,
      status: 'processing',
      deliveryAddress,
      bonusEarned
    };
    
    setOrders(prev => [newOrder, ...prev]);
    
    // Оновлюємо статистику користувача
    const newTotalSpent = user.totalSpent + total;
    const newBonusPoints = user.bonusPoints + bonusEarned;
    
    updateProfile({
      totalSpent: newTotalSpent,
      bonusPoints: newBonusPoints,
      loyaltyLevel: getLoyaltyLevel(newTotalSpent)
    });
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...address,
      id: Date.now().toString(),
      isDefault: savedAddresses.length === 0 ? true : address.isDefault
    };
    
    if (newAddress.isDefault) {
      setSavedAddresses(prev => [...prev.map(addr => ({ ...addr, isDefault: false })), newAddress]);
    } else {
      setSavedAddresses(prev => [...prev, newAddress]);
    }
  };

  const removeAddress = (id: string) => {
    setSavedAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setSavedAddresses(prev => prev.map(addr => ({ ...addr, isDefault: addr.id === id })));
  };

  const getDiscount = (): number => {
    if (!user) return 0;
    return calculateDiscount(user.loyaltyLevel);
  };

  const useBonusPoints = (points: number) => {
    if (!user || user.bonusPoints < points) return;
    updateProfile({ bonusPoints: user.bonusPoints - points });
  };

  return (
    <UserContext.Provider value={{
      user,
      loading,
      orders,
      savedAddresses,
      login,
      register,
      loginWithGoogle,
      logout,
      updateProfile,
      addOrder,
      addAddress,
      removeAddress,
      setDefaultAddress,
      getDiscount,
      useBonusPoints
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}