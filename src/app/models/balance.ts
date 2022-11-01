import { Brand } from './brand';
import { Product } from './product';
export interface Balance {
  marca: Brand;
  product: { original: Product[] };
}
