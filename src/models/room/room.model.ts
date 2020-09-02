import { DataTypes } from "sequelize";
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { User } from "../user/user.model";
import { RoomUser } from "../room-user/room-user.model";

@Table({
  tableName: "rooms",
})
export class Room extends Model<Room> implements Model {
  @Column({
    primaryKey: true,
    unique: true,
    allowNull: false,
    type: DataTypes.STRING,
  })
  id!: string;

  @Column({
    type: DataTypes.STRING,
    unique: true,
  })
  guid!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataTypes.INTEGER,
    defaultValue: 5,
  })
  limit!: number;

  @ForeignKey(() => User)
  @Column
  hostId!: string;

  @BelongsTo(() => User, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  host!: User;

  @BelongsToMany(() => User, () => RoomUser)
  participants!: User[];
}
