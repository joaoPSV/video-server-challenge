import { Request, Response, NextFunction } from "express";
import roomService from "../services/room.service";
import userService from "../services/user.service";
import roomUserService from "../services/room-user.service";
import HttpResponse from "../utils/http-response";

class RoomController {
  public async findAll(req: Request, res: Response, next: NextFunction) {
    const rooms = await roomService.findAll();
    return next(HttpResponse.ok("Rooms returned", rooms));
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers["user-id"] as string;

    const user = await userService.findById(userId);
    if (!user) return next(HttpResponse.userNotFound());

    try {
      const room = await roomService.create(req.body, user.id);
      return next(HttpResponse.created("Room created", room));
    } catch (e) {
      return next(HttpResponse.internalServerError());
    }
  }

  public async changeHost(req: Request, res: Response, next: NextFunction) {
    const actualHostId = req.headers["user-id"] as string;
    const { roomId, userId } = req.body;

    const newHost = await userService.findById(userId);
    if (!newHost) return next(HttpResponse.userNotFound());

    const room = await roomService.findById(roomId);
    if (!room) return next(HttpResponse.roomNotFound());

    if (room.hostId !== actualHostId) return next(HttpResponse.notPermission());

    room.hostId = userId;

    try {
      await room.save();
    } catch (e) {
      return next(HttpResponse.internalServerError());
    }

    return next(HttpResponse.ok("Host changed"));
  }

  public async joinRoom(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers["user-id"] as string;
    const roomId = req.params["room"] as string;

    const user = await userService.findById(userId);
    if (!user) return next(HttpResponse.userNotFound());

    const room = await roomService.findById(roomId);
    if (!room) return next(HttpResponse.roomNotFound());

    if (room.participants.length >= room.limit)
      return next(HttpResponse.fullRoom());

    const roomUser = await roomUserService.findByUserIdAndRoomId(
      roomId,
      userId
    );
    if (roomUser) return next(HttpResponse.roomUserAlreadyExists());

    try {
      await roomUserService.create(roomId, userId);
    } catch (e) {
      return next(HttpResponse.internalServerError());
    }

    return next(HttpResponse.ok("Joined"));
  }

  public async leaveRoom(req: Request, res: Response, next: NextFunction) {
    const userId = req.headers["user-id"] as string;
    const roomId = req.params["room"] as string;

    const user = await userService.findById(userId);
    if (!user) return next(HttpResponse.userNotFound());

    const room = await roomService.findById(roomId);
    if (!room) return next(HttpResponse.roomNotFound());

    const roomUser = await roomUserService.findByUserIdAndRoomId(
      roomId,
      userId
    );
    if (!roomUser) return next(HttpResponse.roomUserNotFound);

    try {
      await roomUser.destroy();
    } catch (e) {
      return next(HttpResponse.internalServerError());
    }

    return next(HttpResponse.ok("Left"));
  }

  async findByGuid(req: Request, res: Response, next: NextFunction) {
    const guid = req.params["guid"] as string;

    const room = await roomService.findByGuid(guid);
    if (!room) return next(HttpResponse.roomNotFound());

    return next(HttpResponse.ok("Rooms found", room));
  }

  async findRoomsByUsername(req: Request, res: Response, next: NextFunction) {
    const username = req.params["username"] as string;

    const user = await userService.findByUsername(username);

    if (!user) return next(HttpResponse.userNotFound());

    const rooms = user.createdRooms.concat(user.participants);

    next(
      HttpResponse.ok("Rooms returned", {
        rooms,
      })
    );
  }
}

export default new RoomController();
