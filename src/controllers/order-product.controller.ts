import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { OrderProduct } from '../models';
import { OrderProductRepository } from '../repositories';

export class OrderProductController {
  constructor(
    @repository(OrderProductRepository)
    public orderProductRepository: OrderProductRepository,
  ) { }

  @post('/order-products', {
    responses: {
      '200': {
        description: 'OrderProduct model instance',
        content: { 'application/json': { schema: { 'x-ts-type': OrderProduct } } },
      },
    },
  })
  async create(@requestBody() orderProduct: OrderProduct): Promise<OrderProduct> {
    return await this.orderProductRepository.create(orderProduct);
  }

  @get('/order-products/count', {
    responses: {
      '200': {
        description: 'OrderProduct model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(OrderProduct)) where?: Where<OrderProduct>,
  ): Promise<Count> {
    return await this.orderProductRepository.count(where);
  }

  @get('/order-products', {
    responses: {
      '200': {
        description: 'Array of OrderProduct model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': OrderProduct } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(OrderProduct)) filter?: Filter<OrderProduct>,
  ): Promise<OrderProduct[]> {
    return await this.orderProductRepository.find(filter);
  }

  @patch('/order-products', {
    responses: {
      '200': {
        description: 'OrderProduct PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() orderProduct: OrderProduct,
    @param.query.object('where', getWhereSchemaFor(OrderProduct)) where?: Where<OrderProduct>,
  ): Promise<Count> {
    return await this.orderProductRepository.updateAll(orderProduct, where);
  }

  @get('/order-products/{id}', {
    responses: {
      '200': {
        description: 'OrderProduct model instance',
        content: { 'application/json': { schema: { 'x-ts-type': OrderProduct } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<OrderProduct> {
    return await this.orderProductRepository.findById(id);
  }

  @patch('/order-products/{id}', {
    responses: {
      '204': {
        description: 'OrderProduct PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() orderProduct: OrderProduct,
  ): Promise<void> {
    await this.orderProductRepository.updateById(id, orderProduct);
  }

  @put('/order-products/{id}', {
    responses: {
      '204': {
        description: 'OrderProduct PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() orderProduct: OrderProduct,
  ): Promise<void> {
    await this.orderProductRepository.replaceById(id, orderProduct);
  }

  @del('/order-products/{id}', {
    responses: {
      '204': {
        description: 'OrderProduct DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.orderProductRepository.deleteById(id);
  }
}
