import { Router } from "express";
const router = Router();

import {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend,
} from "../../controllers/userController.js";

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/
router.post("/:userId/friends", addFriend);

// /api/users/:userId/friends/:friendId
router.delete("/:userId/friends/:friendId", deleteFriend);

export { router as userRouter };
