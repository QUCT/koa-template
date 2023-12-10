import User from "../model/User";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../db";

interface Iuser {
  userName?: string;
  email?: string;
  password?: string;
}

class UserService {
  getService() {
    return User.findAll();
  }

  async createUser(payload: Iuser) {
    await sequelize.transaction(async (t) => {
      await User.create({
        user_name: payload.userName,
        email: payload.email,
        password: payload.password,
        user_id: uuidv4(),
        membership_type: "0",
        registration_date: new Date(),
      });
    });

    return User.findAll();
  }

  async login(payload: Iuser) {
    const user = await User.findAll({ where: { user_name: payload.userName } });
    return user;
  }
}

export default new UserService();
