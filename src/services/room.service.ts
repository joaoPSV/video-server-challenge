import { Room } from "../models/room/room.model";
import { User } from "../models/user/user.model";

import { Guid } from "guid-typescript";
import { v4 } from "uuid";
import CreateRoomDto from "../models/room/create-room.dto";

class RoomService {
  /** Find all Rooms
   * @return {Room[]}
   */
  public async findAll(): Promise<Room[]> {
    const rooms = await Room.findAll({
      attributes: ["id", "guid", "name", "limit"],
      include: [
        {
          model: User,
          as: "host",
          attributes: ["id", "username"],
        },
        {
          model: User,
          as: "participants",
          attributes: ["id", "username"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return rooms;
  }

  /** Create room
   * @param {CreateRoomDto}
   * @param {CreateRoomDto.limit | null} -> limit of participants
   * @param {CreateRoomDto.name} -> name of room
   * @return {Room | null}
   */
  public async create(data: CreateRoomDto, userId: string): Promise<Room> {
    const room = await Room.create({
      ...data,
      id: v4(),
      guid: Guid.raw(),
      hostId: userId,
    });

    return room;
  }

  /** Find room by id
   * @param {string} id - Room Id
   * @return {Room | null}
   */
  public async findById(id: string): Promise<Room | null> {
    const room = await Room.findOne({ where: { id } });
    return room;
  }

  /** Find room by guid
   * @param {string} guid - Room Guid
   * @return {Room | null}
   */
  public async findByGuid(guid: string): Promise<Room | null> {
    const room = await Room.findOne({ where: { guid } });
    return room;
  }
}

export default new RoomService();
