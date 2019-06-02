import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class OrderProduct extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  orderId?: number;

  @property({
    type: 'number',
  })
  productId?: number;

  constructor(data?: Partial<OrderProduct>) {
    super(data);
  }
}
