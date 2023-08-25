import { applicationAuth } from 'cloudport-nodelib/build/middleware';
import { userController } from '../controller';

export const userRoutes = [
  {
    method: 'GET',
    path: '/user/ownedAccounts',
    handler: userController.getOwnedAccounts,
    config: {
      pre: [
        {
          method: applicationAuth
        }
      ]
    }
  }
];
