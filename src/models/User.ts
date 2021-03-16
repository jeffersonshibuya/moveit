import Adapters from 'next-auth/adapters'
import { EntitySchemaColumnOptions } from 'typeorm'

export default class User extends (<any>Adapters.TypeORM.Models.User.model) {
  constructor(name, email, image, emailVerified) {
    super(name, email, image, emailVerified)
  }
}

type UserSchema = {
  name: string
  target: typeof User
  columns: {
    username?: {
      type: 'varchar'
      nullable: boolean
    }
    name?: EntitySchemaColumnOptions
    email?: EntitySchemaColumnOptions
    image?: EntitySchemaColumnOptions
    emailVerified?: EntitySchemaColumnOptions,
    level?: {
      type: 'int',
      nullable: boolean,
    } 
  }
}

export const UserSchema: UserSchema = {
  name: "User",
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
    level: {
      type: "int",
      nullable: true,
    }
  }
}