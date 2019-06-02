import { Entity, model, property, hasMany } from '@loopback/repository';
import { OrderProduct } from './order-product.model';

@model({ settings: {} })
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: false,
    default: "pending",
  })
  status: string;

  @hasMany(() => OrderProduct)
  orderProducts: OrderProduct[];

  constructor(data?: Partial<Order>) {
    super(data);
  }
}
