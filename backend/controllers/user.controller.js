import { Salon } from "../models/salon.model.js";
import { User } from "../models/user.model.js";
import asyncErrorHandler from "../utility/asyncErrorHandler.js";
import customError from "../utility/customError.js";

export const slotsAvail = asyncErrorHandler(async (req, res, next) => {
  const { place, date, time } = req.body;
  //find the salon
  const salon = await Salon.findOne({ place });

  //if salon isn't there
  if (!salon) {
    return next(new customError(400, "No Salon found in this location"));
  }
  //check whether the day exist or not
  let index = -1;
  if (salon.info.length > 0) {
    index = salon.info.findIndex((ele) => {
      return ele.date === date;
    });
  }

  // if the day doesn't exist
  if (index !== -1) {
    if (
      salon.info[index].timings[time].available <= 0 ||
      salon.info[index].timings[time].booked >= 3
    ) {
      return next(new customError(400, "No available slots"));
    }
  }
  next();
});

export const bookSlot = asyncErrorHandler(async (req, res, next) => {
  // retrive data from req body
  const { date, place, service, time } = req.body;
  const user = req.user;

  //If the form is isn't fill completly
  if (!date || !place || !service || !time) {
    return next(new customError(400, "Please fill the form completly"));
  }

  let defaultInfo = {
    date,
    dateTotal: 1,
    timings: {
      nine: {
        available: 3,
        booked: 0,
        totalSeats: 3,
        bookedBy: { user: [], service: [] },
      },
      ten: {
        available: 3,
        booked: 0,
        totalSeats: 3,
        bookedBy: { user: [], service: [] },
      },
      eleven: {
        available: 3,
        booked: 0,
        totalSeats: 3,
        bookedBy: { user: [], service: [] },
      },
      one: {
        available: 3,
        booked: 0,
        totalSeats: 3,
        bookedBy: { user: [], service: [] },
      },
      two: {
        available: 3,
        booked: 0,
        totalSeats: 3,
        bookedBy: { user: [], service: [] },
      },
      three: {
        available: 3,
        booked: 0,
        totalSeats: 3,
        bookedBy: { user: [], service: [] },
      },
      four: {
        available: 3,
        booked: 0,
        totalSeats: 3,
        bookedBy: { user: [], service: [] },
      },
      five: {
        available: 3,
        booked: 0,
        totalSeats: 3,
        bookedBy: { user: [], service: [] },
      },
    },
  };

  //find the salon
  const salon = await Salon.findOne({ place });

  //if salon isn't there
  if (!salon) {
    return next(new customError(400, "No Salon found in this location"));
  }

  //check whether the day exist or not
  let index = -1;
  if (salon.info.length > 0) {
    index = salon.info.findIndex((ele) => {
      return ele.date === date;
    });
  }

  // if the day doesn't exist
  if (index === -1) {
    defaultInfo.timings[time].available =
      defaultInfo.timings[time].available - 1;
    defaultInfo.timings[time].booked = defaultInfo.timings[time].booked + 1;
    defaultInfo.timings[time].bookedBy.service.push(service);
    defaultInfo.timings[time].bookedBy.user.push(user);

    salon.info.push(defaultInfo);
  } else {
    if (
      salon.info[index].timings[time].available <= 0 ||
      salon.info[index].timings[time].booked >= 3
    ) {
      return next(new customError(400, "No available slots"));
    }
    salon.info[index].dateTotal = salon.info[index].dateTotal + 1;
    salon.info[index].timings[time].available =
      salon.info[index].timings[time].available - 1;
    salon.info[index].timings[time].booked =
      salon.info[index].timings[time].booked + 1;
    salon.info[index].timings[time].bookedBy.service.push(service);
    salon.info[index].timings[time].bookedBy.user.push(user);
  }

  const id = salon._id;
  const total = salon.total + 1;

  const newSalon = await Salon.findByIdAndUpdate(
    id,
    {
      total,
      info: salon.info,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    sucess: true,
    message: "Slot Booked Succesfully",
  });
});

export const addUser = asyncErrorHandler(async (req, res, next) => {
  const { name, userNumber, place } = req.body;
  if (!name || !userNumber) {
    return next(new customError(400, "PLease fill the form completly"));
  }
  const user = await User.create({ name, userNumber, place });
  const newUser = await User.findOne(user._id);
  if (!newUser) {
    new customError(400, "Error ocuurred while creating user");
  }
  req.user = newUser._id;

  next();
});
