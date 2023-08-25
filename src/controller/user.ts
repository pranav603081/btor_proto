import { userService } from '../services';

export class UserController {
  /**
   *
   * @param userDetails - from user token
   * @returns - list of user owned accounts and opportunities
   */
  async getOwnedAccounts({ userDetails }) {
    return await userService.getOwnedAccounts(userDetails);
  }
}

export const userController = new UserController();
