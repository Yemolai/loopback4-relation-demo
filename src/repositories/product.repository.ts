import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Product, OrderProduct} from '../models';
import {LocalDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrderProductRepository} from './order-product.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id
> {

  public readonly orderProducts: HasManyRepositoryFactory<OrderProduct, typeof Product.prototype.id>;

  constructor(
    @inject('datasources.local') dataSource: LocalDataSource, @repository.getter('OrderProductRepository') protected orderProductRepositoryGetter: Getter<OrderProductRepository>,
  ) {
    super(Product, dataSource);
    this.orderProducts = this.createHasManyRepositoryFactoryFor('orderProducts', orderProductRepositoryGetter,);
  }
}
