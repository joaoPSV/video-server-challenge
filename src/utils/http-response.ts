class HttpResponse {
  status: number;
  message: string;
  data?: any;
  authorization?: string;

  constructor(
    status: number,
    message: string,
    data?: any,
    authorization?: string
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.authorization = authorization;
  }

  static ok = (message: string, data?: any, authorization?: string) => {
    return new HttpResponse(200, message, data, authorization);
  };

  static created = (message: string, data?: any, authorization?: string) => {
    return new HttpResponse(201, message, data, authorization);
  };

  static userNotFound = () => {
    return new HttpResponse(404, "User not Found!");
  };

  static wrongPassword = () => {
    return new HttpResponse(403, "Wrong password");
  };

  static roomNotFound = () => {
    return new HttpResponse(404, "Room not Found!");
  };

  static roomUserNotFound = () => {
    return new HttpResponse(404, "User is not participating in this room!");
  };

  static roomUserAlreadyExists = () => {
    return new HttpResponse(403, "User is already participating in this room!");
  };

  static notPermission = () => {
    return new HttpResponse(403, "You dont have permission to this action");
  };

  static missingPermission = () => {
    return new HttpResponse(
      401,
      "Missing necessary permissions to connect to this endpoint"
    );
  };

  static fullRoom = () => {
    return new HttpResponse(403, "The room is full");
  };

  static internalServerError = () => {
    return new HttpResponse(500, "Something went wrong!");
  };
}

export default HttpResponse;
