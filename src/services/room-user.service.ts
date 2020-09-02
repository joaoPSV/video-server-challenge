import { RoomUser } from "../models/room-user/room-user.model";

class RoomUserService {
  /**
   * @param {string} roomId -
   * @param {string} userId -
   * @return {RoomUser} - Created Room User relation.
   */
  public async create(roomId: string, userId: string): Promise<RoomUser> {
    const roomUser = await RoomUser.create({
      roomId,
      userId,
    });
    return roomUser;
  }

  /**
   * @param {string} roomId - Room
   * @param {string} userId - User to participate of room
   * @return {RoomUser} - Found Room User relation.
   */
  public async findByUserIdAndRoomId(
    roomId: string,
    userId: string
  ): Promise<RoomUser | null> {
    const roomUser = await RoomUser.findOne({
      where: {
        roomId,
        userId,
      },
    });
    return roomUser;
  }
}

export default new RoomUserService();
