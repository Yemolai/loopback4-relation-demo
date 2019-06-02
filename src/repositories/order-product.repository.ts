import {DefaultCrudRepository} from '@loopback/repository';
import {OrderProduct} from '../models';
import {LocalDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OrderProductRepository extends DefaultCrudRepository<
  OrderProduct,
  typeof OrderProduct.prototype.id
> {
  constructor(
    @inject('datasources.local') dataSource: LocalDataSource,
  ) {
    super(OrderProduct, dataSource);
  }
}
