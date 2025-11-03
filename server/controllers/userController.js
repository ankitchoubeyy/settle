import User from "../models/UserModel.js";

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    // Extract id from URL
    const { id } = req.params;

    // Find user in MongoDB
    const user = await User.findById(id).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user by ID
export const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete User
export const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const user = await User.findByIdAndDelete(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}