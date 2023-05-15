import { BaseApiImpl } from "services/base-api";
import type { User } from "services/user";
import { caseSerializer } from "utils/case";
interface UserServiceImpl {
  changeHttp(http: BaseApiImpl): void;
  getUsers(): Promise<User[]>;
  getUser(userId: number): Promise<User>;
}
export class UserService implements UserServiceImpl {
  constructor(private http: BaseApiImpl) {
    this.http = http;
  }

  changeHttp(passedHttp: BaseApiImpl) {
    this.http = passedHttp;
  }

  async getUsers(): Promise<User[]> {
    const data = await this.http.get<User[]>("users", {
      params: { _limit: 10 },
    });
    return caseSerializer.serialize(data);
  }

  async getUser(userId: number): Promise<User> {
    const data = await this.http.get<User>("users", { params: { id: userId } });
    return caseSerializer.serialize(data);
  }
}
