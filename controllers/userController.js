import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// SIGN UP
export const signUpUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });


    res.json({
      success: true,
      message: "Signup successful",
      user: newUser,
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {    
    const { email, password } = req.body;
    console.log(email,password);
    

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
