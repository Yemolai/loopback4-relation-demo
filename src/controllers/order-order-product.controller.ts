import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Order,
  OrderProduct,
} from '../models';
import { OrderRepository } from '../repositories';

export class OrderOrderProductController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/order-products', {
    responses: {
      '200': {
        description: 'Array of OrderProduct\'s belonging to Order',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': OrderProduct } },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<OrderProduct>,
  ): Promise<OrderProduct[]> {
    return await this.orderRepository.orderProducts(id).find(filter);
  }

  @post('/orders/{id}/order-products', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: { 'application/json': { schema: { 'x-ts-type': OrderProduct } } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Order.prototype.id,
    @requestBody() orderProduct: OrderProduct,
  ): Promise<OrderProduct> {
    return await this.orderRepository.orderProducts(id).create(orderProduct);
  }

  @patch('/orders/{id}/order-products', {
    responses: {
      '200': {
        description: 'Order.OrderProduct PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody() orderProduct: Partial<OrderProduct>,
    @param.query.object('where', getWhereSchemaFor(OrderProduct)) where?: Where<OrderProduct>,
  ): Promise<Count> {
    return await this.orderRepository.orderProducts(id).patch(orderProduct, where);
  }

  @del('/orders/{id}/order-products', {
    responses: {
      '200': {
        description: 'Order.OrderProduct DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(OrderProduct)) where?: Where<OrderProduct>,
  ): Promise<Count> {
    return await this.orderRepository.orderProducts(id).delete(where);
  }
}
