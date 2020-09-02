import { Room } from "../room/room.model";
import {
  Model,
  Table,
  Column,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "../user/user.model";

@Table
export class RoomUser extends Model<RoomUser> {
  @ForeignKey(() => Room)
  @Column
  roomId!: string;

  @ForeignKey(() => User)
  @Column
  userId!: string;

  @BelongsTo(() => Room, "roomId")
  room!: Room;

  @BelongsTo(() => User, "userId")
  user!: User;
}
