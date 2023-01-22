import bcrypt from "bcryptjs";

const userData = {
  users: [
    {
      name: "Sayyed Siddique",
      email: "sayyed@mail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: true,
    },
    {
      name: "Sayyed Siddique",
      email: "majed@mail.com",
      password: bcrypt.hashSync("1234", 8),
      isAdmin: false,
    },
  ],
};

export default userData;
