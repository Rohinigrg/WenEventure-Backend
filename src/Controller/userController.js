import User from "../Model/userModel.js";

export const getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send({
      data: users,
      message: "Users retrieved successfully",
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const save = async (req, res) => {
  try {
    const { fullName, userName, email, password } = req.body;

    if (!fullName || !userName || !email || !password) {
      return res.status(400).send({
        message: "All fields are required",
      });
    }

    const user = await User.create({
      fullName,
      userName,
      email,
      password,
    });

    res.status(201).send({
      data: user,
      message: "User saved successfully",
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    res.status(200).send({
      data: user,
      message: "User fetched successfully",
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, userName, email, password } = req.body;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    user.fullName = fullName ?? user.fullName;
    user.userName = userName ?? user.userName;
    user.email = email ?? user.email;
    user.password = password ?? user.password;

    await user.save();

    res.status(200).send({
      data: user,
      message: "User updated successfully",
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    await user.destroy();

    res.status(200).send({
      message: "User deleted successfully",
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from token middleware

    const updateData = {
      fullName: req.body.fullName,
      userName: req.body.userName,
    };

    if (req.file) {
      updateData.avatar = req.file.path.replace(/\\/g, "/");
    }

    await User.update(updateData, {
      where: { id: userId },
    });

    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile update failed" });
  }
};


