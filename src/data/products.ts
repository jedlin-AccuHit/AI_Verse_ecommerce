import { Shield, Zap, Cpu } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  rating: number;
  description: string;
  badge?: string;
  category: string;
  icon: React.ComponentType<any>;
}

export const PRODUCTS: Product[] = [
  {
    id: 'suit-pro',
    name: 'Astra MkII 太空服',
    subtitle: '耐輻射｜零重力彈性',
    price: 32800,
    rating: 4.8,
    description: '採用最新奈米纖維技術，提供完美的輻射防護與靈活性，適合長時間太空任務。配備智能溫控系統。',
    badge: '人氣',
    category: '裝備',
    icon: Shield
  },
  {
    id: 'helm-neo',
    name: 'Nebula 防護頭盔',
    subtitle: 'HUD顯示｜氧氣循環',
    price: 11800,
    rating: 4.9,
    description: '配備先進的抬頭顯示器和高效氧氣循環系統，確保任務期間的安全與便利。支援語音控制。',
    category: '裝備',
    icon: Shield
  },
  {
    id: 'jacket-void',
    name: 'VOID 外太空外套',
    subtitle: '溫控｜輕量化',
    price: 5200,
    rating: 4.7,
    description: '智能溫控技術結合輕量化設計，在極端環境下保持舒適體感。防微隕石撞擊。',
    badge: '新品',
    category: '服飾',
    icon: Shield
  },
  {
    id: 'droid-pix',
    name: 'PIX 行星勘探球',
    subtitle: '自動導航｜數據收集',
    price: 15600,
    rating: 4.6,
    description: '自主飛行的勘探設備，能夠收集行星表面數據並自動回傳基地。配備AI分析引擎。',
    category: '電子',
    icon: Cpu
  },
  {
    id: 'snack-moon',
    name: '月塵能量棒',
    subtitle: '高能量｜長效持久',
    price: 180,
    rating: 4.5,
    description: '專為太空人設計的高能量食品，一根可維持8小時的體力需求。富含必需胺基酸。',
    category: '補給',
    icon: Zap
  },
  {
    id: 'light-aurora',
    name: 'Aurora 艙內燈飾',
    subtitle: '情境照明｜節能LED',
    price: 3200,
    rating: 4.4,
    description: '模擬極光效果的艙內照明系統，提升太空旅行的舒適感與美感。支援音樂同步。',
    category: '電子',
    icon: Zap
  }
];

export const CATEGORIES = ["全部", "裝備", "服飾", "補給", "電子"] as const;
export type Category = typeof CATEGORIES[number];