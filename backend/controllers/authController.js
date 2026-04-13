const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");

exports.registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User exists");
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashed });

  if (user) {
    res.status(201).json({
      message: "User registered",
      user: {
        id: user._id,
        email: user.email,
        streakCount: user.streakCount
      },
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    // Gamification Streak Logic
    const now = new Date();
    const lastActive = new Date(user.lastActiveDate || now);

    const msPerDay = 1000 * 60 * 60 * 24;
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const lastActiveStart = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate()).getTime();
    
    const diffDays = Math.round((todayStart - lastActiveStart) / msPerDay);

    if (diffDays === 1) {
        user.streakCount += 1;
    } else if (diffDays > 1) {
        user.streakCount = 1; // Lost the streak
    } else if (!user.streakCount) {
        user.streakCount = 1; // First day log
    }

    // Update lastActiveDate
    user.lastActiveDate = Date.now();
    await user.save();

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        streakCount: user.streakCount
      },
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    res.status(400);
    throw new Error("Please provide email and new password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found in system");
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();

  res.json({ message: "Password updated successfully" });
});