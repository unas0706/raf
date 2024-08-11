import mongoose from "mongoose";

const infoSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true,
  },
  dateTotal: {
    type: Number,
    default: 0,
    min: 0,
  },
  timings: {
    nine: {
      available: {
        type: Number,
        default: 3,
        max: 3,
        min: 0,
      },
      booked: {
        type: Number,
        default: 0,
        min: 0,
        max: 3,
      },
      totalSeats: {
        type: Number,
        default: 3,
      },
      bookedBy: {
        user: [
          {
            type: mongoose.Types.ObjectId,
            ref: "User",
          },
        ],
        service: [
          {
            type: String,
          },
        ],
      },
    },
    ten: {
      available: {
        type: Number,
        default: 3,
        max: 3,
        min: 0,
      },
      booked: {
        type: Number,
        default: 0,
        min: 0,
        max: 3,
      },
      totalSeats: {
        type: Number,
        default: 3,
      },
      bookedBy: {
        user: [
          {
            type: mongoose.Types.ObjectId,
            ref: "User",
          },
        ],
        service: [
          {
            type: String,
          },
        ],
      },
    },
    eleven: {
      available: {
        type: Number,
        default: 3,
        max: 3,
        min: 0,
      },
      booked: {
        type: Number,
        default: 0,
        min: 0,
        max: 3,
      },
      totalSeats: {
        type: Number,
        default: 3,
      },
      bookedBy: {
        user: [
          {
            type: mongoose.Types.ObjectId,
            ref: "User",
          },
        ],
        service: [
          {
            type: String,
          },
        ],
      },
    },
    one: {
      available: {
        type: Number,
        default: 3,
        max: 3,
        min: 0,
      },
      booked: {
        type: Number,
        default: 0,
        min: 0,
        max: 3,
      },
      totalSeats: {
        type: Number,
        default: 3,
      },
      bookedBy: {
        user: [
          {
            type: mongoose.Types.ObjectId,
            ref: "User",
          },
        ],
        service: [
          {
            type: String,
          },
        ],
      },
    },
    two: {
      available: {
        type: Number,
        default: 3,
        max: 3,
        min: 0,
      },
      booked: {
        type: Number,
        default: 0,
        min: 0,
        max: 3,
      },
      totalSeats: {
        type: Number,
        default: 3,
      },
      bookedBy: {
        user: [
          {
            type: mongoose.Types.ObjectId,
            ref: "User",
          },
        ],
        service: [
          {
            type: String,
          },
        ],
      },
    },
    three: {
      available: {
        type: Number,
        default: 3,
        max: 3,
        min: 0,
      },
      booked: {
        type: Number,
        default: 0,
        min: 0,
        max: 3,
      },
      totalSeats: {
        type: Number,
        default: 3,
      },
      bookedBy: {
        user: [
          {
            type: mongoose.Types.ObjectId,
            ref: "User",
          },
        ],
        service: [
          {
            type: String,
          },
        ],
      },
    },
    four: {
      available: {
        type: Number,
        default: 3,
        max: 3,
        min: 0,
      },
      booked: {
        type: Number,
        default: 0,
        min: 0,
        max: 3,
      },
      totalSeats: {
        type: Number,
        default: 3,
      },
      bookedBy: {
        user: [
          {
            type: mongoose.Types.ObjectId,
            ref: "User",
          },
        ],
        service: [
          {
            type: String,
          },
        ],
      },
    },
    five: {
      available: {
        type: Number,
        default: 3,
        max: 3,
        min: 0,
      },
      booked: {
        type: Number,
        default: 0,
        min: 0,
        max: 3,
      },
      totalSeats: {
        type: Number,
        default: 3,
      },
      bookedBy: {
        user: [
          {
            type: mongoose.Types.ObjectId,
            ref: "User",
          },
        ],
        service: [
          {
            type: String,
          },
        ],
      },
    },
  },
});

const salonSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "admin",
  },
  place: {
    type: String,
    unique: [true, "Salon already exist"],
    required: true,
  },
  total: {
    type: Number,
    default: 0,
    min: 0,
  },
  info: [infoSchema],
});

export const Salon = mongoose.model("salon", salonSchema);
