import {
  DefaultCrudRepository,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {User, Person} from '../models';
import {LocalDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PersonRepository} from './person.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  public readonly person: BelongsToAccessor<Person, typeof User.prototype.id>;

  constructor(
    @inject('datasources.local') dataSource: LocalDataSource,
    @repository.getter('PersonRepository')
    protected personRepositoryGetter: Getter<PersonRepository>,
  ) {
    super(User, dataSource);
    this.person = this.createBelongsToAccessorFor(
      'person',
      personRepositoryGetter,
    );
  }
}
