import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Order, OrderProduct} from '../models';
import {LocalDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrderProductRepository} from './order-product.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id
> {

  public readonly orderProducts: HasManyRepositoryFactory<OrderProduct, typeof Order.prototype.id>;

  constructor(
    @inject('datasources.local') dataSource: LocalDataSource, @repository.getter('OrderProductRepository') protected orderProductRepositoryGetter: Getter<OrderProductRepository>,
  ) {
    super(Order, dataSource);
    this.orderProducts = this.createHasManyRepositoryFactoryFor('orderProducts', orderProductRepositoryGetter,);
  }
}
