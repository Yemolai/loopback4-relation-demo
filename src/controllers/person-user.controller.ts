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
  Person,
  User,
} from '../models';
import { PersonRepository } from '../repositories';

export class PersonUserController {
  constructor(
    @repository(PersonRepository) protected personRepository: PersonRepository,
  ) { }

  @get('/people/{id}/users', {
    responses: {
      '200': {
        description: 'Array of User\'s belonging to Person',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': User } },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return await this.personRepository.users(id).find(filter);
  }

  @post('/people/{id}/users', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: { 'application/json': { schema: { 'x-ts-type': User } } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Person.prototype.id,
    @requestBody() user: User,
  ): Promise<User> {
    return await this.personRepository.users(id).create(user);
  }

  @patch('/people/{id}/users', {
    responses: {
      '200': {
        description: 'Person.User PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody() user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.personRepository.users(id).patch(user, where);
  }

  @del('/people/{id}/users', {
    responses: {
      '200': {
        description: 'Person.User DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where,
  ): Promise<Count> {
    return await this.personRepository.users(id).delete(where);
  }
}
