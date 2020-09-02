import { RoomUser } from "../room-user/room-user.model";
import { DataTypes } from "sequelize";
import { hashSync, compare } from "bcrypt";
import {
  Table,
  Column,
  Model,
  BelongsToMany,
  HasMany,
  BeforeCreate,
  BeforeUpdate,
} from "sequelize-typescript";
import { Room } from "../room/room.model";

@Table({
  tableName: "users",
})
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    unique: true,
    allowNull: false,
  })
  id!: string;

  @Column({
    unique: true,
    allowNull: false,
    type: DataTypes.STRING,
  })
  username!: string;

  @Column({
    allowNull: false,
    type: DataTypes.STRING,
  })
  password!: string;

  @Column({
    allowNull: true,
    type: DataTypes.STRING,
  })
  mobileToken?: string;

  @BelongsToMany(() => Room, () => RoomUser)
  participants!: Room[];

  @HasMany(() => Room, "hostId")
  createdRooms!: Room[];

  @BeforeUpdate
  @BeforeCreate
  static hashPassword(user: User) {
    user.password = hashSync(user.password, 10);
  }

  public checkPassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
