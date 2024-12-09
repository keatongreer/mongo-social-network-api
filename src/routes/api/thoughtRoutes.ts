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
router.route("/").get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

export { router as thoughtRouter };
