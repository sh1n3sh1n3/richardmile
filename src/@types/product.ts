// ----------------------------------------------------------------------

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  priceSale?: number;
  colors: string[];
  status: 'sale' | 'new' | '';
  inventoryType: 'low_stock' | 'out_of_stock' | 'in_stock';
  images: string[];
  category: string;
  code: string;
  sku: string;
  tags: string[];
  rating: number;
  priceRange: number[];
  sold: number;
  available: number;
  totalRatings: number;
  totalReviews: number;
  sizes: string[];
  gender: string;
  cover: string;
  newLabel: {
    enabled: boolean;
    content: string;
  };
  saleLabel: {
    enabled: boolean;
    content: string;
  };
}

export interface ICheckoutCartItem {
  id: string;
  name: string;
  cover: string;
  available: number;
  price: number;
  colors: string[];
  size: string;
  quantity: number;
  subTotal: number;
}

export interface ICheckoutBillingAddress {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface ICheckoutState {
  activeStep: number;
  cart: ICheckoutCartItem[];
  subtotal: number;
  total: number;
  discount: number;
  shipping: number;
  billing: ICheckoutBillingAddress | null;
  totalItems: number;
}

export interface IProductState {
  isLoading: boolean;
  error: any;
  products: IProduct[];
  product: IProduct | null;
  checkout: ICheckoutState;
}
