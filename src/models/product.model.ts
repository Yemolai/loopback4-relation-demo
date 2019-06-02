import {Entity, model, property, hasMany} from '@loopback/repository';
import {OrderProduct} from './order-product.model';

@model({settings: {}})
export class Product extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  barcode?: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @hasMany(() => OrderProduct)
  productOrders: OrderProduct[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}
