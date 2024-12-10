import { Router } from "express";
import {
  getAllThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
} from "../../controllers/thoughtController.js";
const router = Router();

// /api/thoughts
router.route("/").get(getAllThoughts).post(createThought); // post requires username in the req body

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(createReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.delete("/:thoughtId/reactions/:reactionId", deleteReaction);

export { router as thoughtRouter };
