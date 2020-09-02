import { Router } from "express";
import roomController from "../controllers/room.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import CreateRoomDto from "../models/room/create-room.dto";
import ChangeHostRoomDto from "../models/room/change-host-room.dto";

const routes = Router();

// Find all rooms
routes.get("", roomController.findAll);

// Create a room (signed in as a user): creates a room hosted by the current user, with an optional capacity limit. Default is 5.
routes.post("", validationMiddleware(CreateRoomDto), roomController.create);

// Change host (must be signin as the host): changes the host of the user from the current user to another user
routes.patch(
  "",
  validationMiddleware(ChangeHostRoomDto),
  roomController.changeHost
);

// Join (signed in as a user): joins the room as the current user
routes.patch("/join/:room", roomController.joinRoom);

// leave (signed in as a user): leaves the room as the current user
routes.patch("/leave/:room", roomController.leaveRoom);

// Search for the rooms that a user is in: given a username, returns a list of rooms that the user is in.
routes.get("/users/:username", roomController.findRoomsByUsername);

// given a room guid, gets information about a room
routes.get("/:guid", roomController.findByGuid);

export default routes;
