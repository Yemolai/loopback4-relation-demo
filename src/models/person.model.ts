import { Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';

@model({ settings: {} })
export class Person extends Entity {
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
  name: string;

  @hasMany(() => User)
  users: User[];
  [k: string]: any

  constructor(data?: Partial<Person>) {
    super(data);
  }
}
