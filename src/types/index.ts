export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  expirationDate: string;
  discountPercentage: number;
  imageUrl: string;
  category: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  username: string;
  isAdmin: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
} 