import { Router } from "express";
import userController from "../controllers/user.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import CreateUserDto from "../models/user/create-user.dto";
import UpdateUserDto from "../models/user/update-user.dto";
import LoginUserDto from "../models/user/login-user.dto";

const routes = Router();

// Get users (no auth required): returns a list of all users
routes.get("", userController.findAll);

// Register (no auth required): takes a username, password and optional string for mobile_token. Registers the user and authenticates the client as the newly created user
routes.post("", validationMiddleware(CreateUserDto), userController.create);

// Sign in/authenticate: takes a username and password, and authenticates the user
routes.post("/login", validationMiddleware(LoginUserDto), userController.login);

// Get users (no auth required): takes a username and return the user with matching username
routes.get("/:username", userController.findUserByUsername);

// Update User (must be signed in as the user): updates password and/or mobile_token of the user
routes.put("", validationMiddleware(UpdateUserDto), userController.updateUser);

// Delete User (must be signed in as the user): deletes the user
routes.delete("/v1/users", userController.deleteUser);

export default routes;
