const express = require("express");
const userRouter = express.Router();
const {
  appRoutePostTimestampMiddleware,
} = require("../middleware/appMiddleware");

const userController = require("../controllers/userController");

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el endpoint de abajo: PUNTO B - TP
userRouter.get("/api/users", userController.getUserAll);

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el endpoint de abajo: PUNTO D - TP
userRouter.get(
  "/api/users/:username/messages/inbox",
  userController.receivedMessagesById
);

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el endpoint de abajo: PUNTO E - TP
userRouter.get(
  "/api/users/:username/messages/sent",
  userController.sentMessagesById
);

// ---------------------------------------------------------------------------------------------------------------------------------------------------
// con el endpoint de abajo: PUNTO F - TP
userRouter.post(
  "/api/users/:username/messages",
  userController.SendMessageToId
);

module.exports = userRouter;
