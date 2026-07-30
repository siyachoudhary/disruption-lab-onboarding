import mongoose from "mongoose";

const INACTIVITY_DAYS = Number(process.env.INACTIVITY_DAYS || 180);

// Per-module progress. moduleId maps to the curriculum defined on the client.
const moduleProgressSchema = new mongoose.Schema(
  {
    moduleId: { type: String, required: true },
    lessonsCompleted: { type: [String], default: [] }, // lesson ids read
    quizPassed: { type: Boolean, default: false }, // true only at 100%
    quizBestScore: { type: Number, default: 0 }, // 0..100
    quizAttempts: { type: Number, default: 0 },
    completedAt: { type: Date },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },

    theme: { type: String, enum: ["light", "dark"], default: "light" },

    progress: { type: [moduleProgressSchema], default: [] },

    certificateIssuedAt: { type: Date },

    // Updated on every authenticated request; drives inactivity auto-delete.
    lastActive: { type: Date, default: Date.now },
    remindedAt: { type: Date }, // last time an "off track" email was sent
  },
  { timestamps: true }
);

// TTL index: MongoDB automatically removes a user whose `lastActive` is older
// than INACTIVITY_DAYS. This is the "auto-delete after ~6 months inactivity".
userSchema.index(
  { lastActive: 1 },
  { expireAfterSeconds: INACTIVITY_DAYS * 24 * 60 * 60 }
);

// Never leak the hash to the client.
userSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    theme: this.theme,
    progress: this.progress,
    certificateIssuedAt: this.certificateIssuedAt,
    createdAt: this.createdAt,
  };
};

export const User = mongoose.model("User", userSchema);
