import { User } from "./../models/user/user.model";
import { v4 } from "uuid";
import { Room } from "../models/room/room.model";
import CreateUserDto from "../models/user/create-user.dto";

class UserService {
  /** Find all Rooms
   * @return {User[]}
   */
  public async findAll(): Promise<User[]> {
    const users = await User.findAll({
      attributes: ["id", "username", "mobileToken"],
    });
    return users;
  }

  /** Create user
   * @param {CreateUserDto}
   * @param {string} CreateUserDto.username
   * @param {string} CreateUserDto.password
   * @param {string | null} CreateUserDto.mobileToken
   * @return {User}
   */
  public async create(data: CreateUserDto): Promise<User> {
    const user = await User.create({ id: v4(), ...data });
    return user;
  }

  /** Find User by id
   * @param {string} id - user id
   * @return {User | null}
   */
  public async findById(id: string): Promise<User | null> {
    const user = await User.findByPk(id);
    return user;
  }

  /** Find User by username
   * @param {string} username
   * @return {User | null}
   */
  public async findByUsername(username: string): Promise<User | null> {
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Room,
          as: "participants",
        },
        {
          model: Room,
          as: "createdRooms",
        },
      ],
    });
    return user;
  }
}

export default new UserService();
