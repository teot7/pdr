import express, { Response } from "express";
import Request from "../types";
import mongoose from "mongoose";
import Vehicle from "../models/vehicle";
import auth from "../middleware/auth";
const router = express.Router();

router.get("/favorites", auth, async (req: Request, res: Response) => {
  try {
    const vehicles = await Vehicle.find({ userId: req.user.userId });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/add", auth, async (req: Request, res: Response) => {
  try {
    const { make, model, year } = req.body;

    if (!(make && model && year)) {
      return res.status(400).send("Make, model and year are required");
    }

    if (!Number.isInteger(year) || year.toString().length !== 4) {
      return res
        .status(400)
        .send("The value for year must be a number of 4 digits");
    }

    const vehicle = await Vehicle.create({
      make,
      model,
      year,
      userId: req.user.userId,
    });

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/update/:id", auth, async (req: Request, res: Response) => {
  try {
    const { make, model, year } = req.body;
    const id = req.params.id;

    if (make === "" || model === "" || year === "") {
      return res.status(400).send("Make, model and year can't be empty value");
    }

    if (year && (!Number.isInteger(year) || year.toString().length !== 4)) {
      return res
        .status(400)
        .send("The value for year must be a number of 4 digits");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("Vehicle ID not valid");
    }

    const vehicle = await Vehicle.findOneAndUpdate(
      {
        _id: id,
        userId: req.user.userId,
      },
      {
        make,
        model,
        year,
      },
      { new: true }
    );

    if (!vehicle) {
      return res.status(404).json("Vehicle not found");
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/delete/:id", auth, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("Vehicle ID not valid");
    }

    const vehicle = await Vehicle.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });

    if (!vehicle) {
      return res.status(400).json("Vehicle not found");
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
