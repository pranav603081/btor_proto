import { UserSchema } from 'cloudport-nodelib/build/model';
import { connectToSchema } from 'cloudport-nodelib/build/mongo';
import { UserConstants } from '../constants';

class UserRepository {
  private init;

  constructor() {
    this.init = () => connectToSchema(UserConstants.collection, UserSchema);
  }

}

export const userRepository = new UserRepository();
