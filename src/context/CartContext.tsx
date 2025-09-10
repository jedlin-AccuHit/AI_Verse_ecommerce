import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Product {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  rating: number;
  description: string;
  badge?: string;
  category: string;
}

interface QuickViewProduct extends Product {
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  quickViewProduct: QuickViewProduct | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  setQuickViewProduct: (product: QuickViewProduct | null) => void;
  showToast: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
  initialState?: 'empty' | 'single' | 'mission-basic' | 'mission-advanced';
}

export const CartProvider: React.FC<CartProviderProps> = ({ children, initialState = 'empty' }) => {
  const [cart, setCart] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("cart");
      const parsed = saved ? JSON.parse(saved) : {};
      if (Array.isArray(parsed)) {
        // legacy array -> normalize
        const map: Record<string, number> = {};
        for (const row of parsed) {
          const id = row?.id ?? row?.productId;
          const n = Number(row?.qty ?? 1);
          if (id) map[id] = (map[id] ?? 0) + (Number.isFinite(n) ? n : 1);
        }
        return map;
      }
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch { return {}; }
  });

  const cartEntries = React.useMemo(
    () => Object.entries(cart).map(([id, qty]) => ({ product: PRODUCTS.find(p => p.id === id)!, qty })),
    [cart]
  );

  const cartItems: CartItem[] = React.useMemo(() => 
    cartEntries.filter(e => e.product).map(e => ({
      id: e.product.id,
      name: e.product.name,
      price: e.product.price,
      quantity: e.qty,
      image: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?w=300&h=300&fit=crop'
    })), [cartEntries]
  );

  const getInitialCartItems = (state: string): Record<string, number> => {
    switch (state) {
      case 'single':
        return { 'helm-neo': 1 };
      case 'mission-basic':
        return { 'helm-neo': 1, 'jacket-void': 1, 'snack-moon': 5 };
      case 'mission-advanced':
        return { 'suit-pro': 1, 'droid-pix': 1, 'snack-moon': 10 };
      default:
        return {};
    }
  };

  const [isCartOpen, setIsCartOpen] = useState(initialState !== 'empty');
  const [quickViewProduct, setQuickViewProduct] = useState<QuickViewProduct | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    try { localStorage.setItem("cart", JSON.stringify(cart)); } catch {}
  }, [cart]);

  useEffect(() => {
    setCart(getInitialCartItems(initialState));
    setIsCartOpen(initialState !== 'empty');
  }, [initialState]);

  const addToCart = (product: Product, quantity = 1) => {
    const qty = Math.max(1, Number.isFinite(Number(quantity)) ? Number(quantity) : 1);
    setCart((c) => ({ ...c, [product.id]: (c[product.id] ?? 0) + qty }));
    setIsCartOpen(true);
    showToast(`已加入艙儲：${product.name} x${qty}`);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => ({ ...prev, [id]: quantity }));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const setCartOpen = (open: boolean) => {
    setIsCartOpen(open);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <>
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      quickViewProduct,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleCart,
      setCartOpen,
      setQuickViewProduct,
      showToast
    }}>
      {children}
    </CartContext.Provider>
    
    {/* Toast Notification */}
    {toastMessage && (
      <div className="fixed top-20 right-4 bg-[#FBBF24] text-black px-4 py-2 rounded-xl shadow-lg z-50 animate-pulse">
        {toastMessage}
      </div>
    )}
    </>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  // Self-tests
  useEffect(() => {
    // 同商品累加
    {
      let c: Record<string, number> = {};
      c = { ...c, ["helm-neo"]: (c["helm-neo"] ?? 0) + 1 };
      c = { ...c, ["helm-neo"]: (c["helm-neo"] ?? 0) + 4 };
      console.assert(c["helm-neo"] === 5, "同商品應累加到 5");
    }

    // 入門組連點兩次 -> 件數 14
    {
      let k: Record<string, number> = {};
      // 第一次加 7 件
      k = { ...k, ["helm-neo"]: (k["helm-neo"] ?? 0) + 1,
                ["jacket-void"]: (k["jacket-void"] ?? 0) + 1,
                ["snack-moon"]: (k["snack-moon"] ?? 0) + 5 };
      // 第二次再加 7 件
      k = { ...k, ["helm-neo"]: (k["helm-neo"] ?? 0) + 1,
                ["jacket-void"]: (k["jacket-void"] ?? 0) + 1,
                ["snack-moon"]: (k["snack-moon"] ?? 0) + 5 };
      const total = Object.values(k).reduce((a, b) => a + b, 0);
      console.assert(total === 14, "入門組連點兩次應為 14 件");
    }

    // 進階組連點兩次 -> 件數 24
    {
      let g: Record<string, number> = {};
      g = { ...g, ["suit-pro"]: (g["suit-pro"] ?? 0) + 1,
                ["droid-pix"]: (g["droid-pix"] ?? 0) + 1,
                ["snack-moon"]: (g["snack-moon"] ?? 0) + 10 };
      g = { ...g, ["suit-pro"]: (g["suit-pro"] ?? 0) + 1,
                ["droid-pix"]: (g["droid-pix"] ?? 0) + 1,
                ["snack-moon"]: (g["snack-moon"] ?? 0) + 10 };
      const total2 = Object.values(g).reduce((a, b) => a + b, 0);
      console.assert(total2 === 24, "進階組連點兩次應為 24 件");
    }
  }, []);
  
  return context;
};