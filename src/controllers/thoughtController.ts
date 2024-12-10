import { Thought, User } from "../models/index.js";
import { Request, Response } from "express";

// get all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get a single thought
export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId }).select(
      "-__v"
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }

    res.json(thought);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// create a new thought and add its id to the associated user
export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);

    const updatedUser = await User.findOneAndUpdate(
      { username: req.body.username },
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found to associate the thought." });
    }

    return res.json({ thought, user: updatedUser });
  } catch (err) {
    console.error("Error creating thought:", err);
    return res.status(500).json({
      message: "An error occurred while creating the thought.",
      error: err,
    });
  }
};
// delete a thought
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });

    if (!thought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }
    res.json({ message: "Thought deleted!" });
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// update a thought
export const updateThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  const { thoughtText } = req.body;

  try {
    if (thoughtText && (thoughtText.length < 1 || thoughtText.length > 280)) {
      return res.status(400).json({
        message: "Thought text must be between 1 and 280 characters.",
      });
    }

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: "Thought not found." });
    }

    return res.status(200).json(updatedThought);
  } catch (error) {
    console.error("Error updating thought:", error);
    return res.status(500).json({
      message: "An error occurred while updating the thought.",
      error,
    });
  }
};

// create a reaction
export const createReaction = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  const reaction = req.body;

  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: reaction } },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: "Thought not found." });
    }

    return res.status(200).json(updatedThought);
  } catch (error) {
    console.error("Error adding reaction:", error);
    return res.status(500).json({
      message: "An error occurred while adding the reaction.",
      error,
    });
  }
};

// delete a reaction
export const deleteReaction = async (req: Request, res: Response) => {
  const { thoughtId, reactionId } = req.params;

  try {
    // Find the thought by its ID
    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: "Thought not found." });
    }

    // Filter out the reaction by its reactionId
    thought.reactions = thought.reactions.filter(
      (reaction: any) =>
        reaction.reactionId && reaction.reactionId.toString() !== reactionId
    );

    // Save the updated thought
    await thought.save();

    return res
      .status(200)
      .json({ message: "Reaction removed successfully.", thought });
  } catch (error) {
    console.error("Error removing reaction:", error);
    return res.status(500).json({
      message: "An error occurred while removing the reaction.",
      error,
    });
  }
};
