import { ObjectId } from "mongodb";
import { Thought } from "../models/index.js";
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

// create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
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
