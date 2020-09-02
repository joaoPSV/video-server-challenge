import { RoomUser } from "../models/room-user/room-user.model";
import { Room } from "../models/room/room.model";
import { User } from "../models/user/user.model";
import { Sequelize } from "sequelize-typescript";
require("dotenv").config();

const sequelize = new Sequelize({
  database: process.env.CHALLENGE_DATABASE_NAME || "database",
  username: process.env.CHALLENGE_DATABASE_USERNAME || "root",
  password: process.env.CHALLENGE_DATABASE_PASSWORD || "",
  dialect: "mysql",
  host: process.env.CHALLENGE_DATABASE_HOST || "localhost",
});

sequelize.addModels([User, Room, RoomUser]);

export default sequelize;
