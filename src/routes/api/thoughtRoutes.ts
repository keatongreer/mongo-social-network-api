import { Router } from "express";
import {
  getAllThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
} from "../../controllers/thoughtController";
const router = Router();

// /api/thoughts
router.route("/").get(getAllThoughts).post(createThought); // post requires userId in the req body

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post().delete();

export { router as thoughtRouter };
