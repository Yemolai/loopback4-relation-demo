import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
} from '@loopback/rest';
import {
  User,
  Person,
} from '../models';
import {UserRepository} from '../repositories';

export class UserPersonController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @get('/users/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to User',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Person } },
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.number('id') id: typeof User.prototype.id,
  ): Promise<Person> {
    return await this.userRepository.person(id);
  }
}
