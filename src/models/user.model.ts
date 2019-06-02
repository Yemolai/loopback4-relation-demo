import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Person } from './person.model';

@model({ settings: {} })
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @belongsTo(() => Person)
  personId: number;

  [k: string]: any

  constructor(data?: Partial<User>) {
    super(data);
  }
}
