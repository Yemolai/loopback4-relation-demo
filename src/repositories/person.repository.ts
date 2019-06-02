import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Person, User} from '../models';
import {LocalDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id
> {

  public readonly users: HasManyRepositoryFactory<User, typeof Person.prototype.id>;

  constructor(
    @inject('datasources.local') dataSource: LocalDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Person, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', userRepositoryGetter,);
  }
}
