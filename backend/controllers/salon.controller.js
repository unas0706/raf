import { Admin } from "../models/admin.model.js";
import { Salon } from "../models/salon.model.js";
import { User } from "../models/user.model.js";
import asyncErrorHandler from "../utility/asyncErrorHandler.js";
import customError from "../utility/customError.js";

export const getSalon = asyncErrorHandler(async (req, res, next) => {
  const place = req.params.place;

  if (!place) {
    return next(new customError(400, "PLease select the place"));
  }
  const admin = await Admin.findOne({ place });

  if (!admin) {
    return next(new customError(400, "No admin found"));
  }
  const salon = await Salon.findOne({ admin: admin._id })
    .populate("admin")
    .exec();
  if (!salon) {
    return next(new customError(400, "No salon found"));
  }
  res.status(200).json({
    sucess: true,
    salon,
  });
});

export const addAdmin = asyncErrorHandler(async (req, res, next) => {
  const { ownerName, place, number, password, email } = req.body;
  if (!ownerName || !place || !number || !password || !email) {
    return next(new customError(400, "PLease fill the form completly"));
  }
  const admin = await Admin.create(req.body);
  if (!admin) {
    return next(new customError(400, "Error ocuured while creating admin"));
  }
  res.status(201).json({
    sucess: true,
    admin,
  });
});

export const addSalon = asyncErrorHandler(async (req, res, next) => {
  const { place } = req.body;
  // const defaultInfo = [
  //   {
  //     date: Date.now(),
  //     dateTotal: 0,
  //     timings: {
  //       nine: {
  //         available: 3,
  //         booked: 0,
  //         totalSeats: 3,
  //         bookedBy: { user: null, service: [] },
  //       },
  //       ten: {
  //         available: 3,
  //         booked: 0,
  //         totalSeats: 3,
  //         bookedBy: { user: null, service: [] },
  //       },
  //       eleven: {
  //         available: 3,
  //         booked: 0,
  //         totalSeats: 3,
  //         bookedBy: { user: null, service: [] },
  //       },
  //       one: {
  //         available: 3,
  //         booked: 0,
  //         totalSeats: 3,
  //         bookedBy: { user: null, service: [] },
  //       },
  //       two: {
  //         available: 3,
  //         booked: 0,
  //         totalSeats: 3,
  //         bookedBy: { user: null, service: [] },
  //       },
  //       three: {
  //         available: 3,
  //         booked: 0,
  //         totalSeats: 3,
  //         bookedBy: { user: null, service: [] },
  //       },
  //       four: {
  //         available: 3,
  //         booked: 0,
  //         totalSeats: 3,
  //         bookedBy: { user: null, service: [] },
  //       },
  //       five: {
  //         available: 3,
  //         booked: 0,
  //         totalSeats: 3,
  //         bookedBy: { user: null, service: [] },
  //       },
  //     },
  //   },
  // ];

  if (!place) {
    return next(new customError(400, "Please Enter the place"));
  }
  const admin = await Admin.findOne({ place });
  if (!admin) {
    return next(new customError(400, "No admin found"));
  }
  const salon = await Salon.create({
    place,
    admin: admin._id,
    // info: defaultInfo,
  });
  const newSalon = await Salon.findById(salon._id).populate("admin").exec();
  if (!newSalon) {
    return next(
      new customError(400, "Error ocuurred while creating salon model")
    );
  }
  res.status(201).json({
    sucess: true,
    newSalon,
  });
});

export const getAllAdmins = asyncErrorHandler(async (req, res, next) => {
  const admins = await Admin.find();
  if (!admins) {
    return next(new customError(400, "Error occured"));
  }
  res.status(200).json({
    sucess: true,
    admins,
  });
});

export const getAllSaloon = asyncErrorHandler(async (req, res, next) => {
  const salons = await Salon.find().populate("admin").exec();
  if (!salons) {
    return next(new customError(400, "Error occured"));
  }
  res.status(200).json({
    sucess: true,
    salons,
  });
});

export const getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new customError(400, "Error occured"));
  }
  res.status(200).json({
    sucess: true,
    users,
  });
});
