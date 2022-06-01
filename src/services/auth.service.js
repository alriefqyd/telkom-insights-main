const { User, Role } = require("../models/index");

module.exports = {
  login: async function (data) {
    const { email, password } = data;
    let user = await User.findOne({ email }).populate("role");
    if (!user || !(await user.verifyPassword(password)))
      return [null, "Incorrect email or password."];
    if (!user.isEmailVerified)
      return [null, "You must verify your email first."];
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: {
        _id: user.role._id,
        name: user.role.name,
      },
    };
    return [user, null];
  },
  register: async (data) => {
    const { email, name, password, type } = data;
    const user = await User.findOne({ email });
    if (user) return [null, "Email already taken, try use other email."];
    const role = await Role.findOne({ type });
    let newUser = new User();
    newUser.email = email;
    newUser.name = name;
    newUser.role = role;
    newUser.setPassword(password);
    newUser.isEmailVerified = true;
    newUser.save();
    newUser = newUser.toJSON();
    const newData = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: {
        _id: newUser.role._id,
        name: newUser.role.name,
      },
    };
    return [newData, null];
  },
};
