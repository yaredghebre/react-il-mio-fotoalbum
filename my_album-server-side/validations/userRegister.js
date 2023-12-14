const prisma = require("../library/PrismaClient");

module.exports = {
  name: {
    in: ["body"],
    notEmpty: {
      options: {},
      errorMessage: "Name is required!",
    },
    isLength: {
      options: {
        min: 2,
      },
      errorMessage: "Name must be at least 2 chars long!",
    },
  },
  surname: {
    in: ["body"],
    notEmpty: {
      options: {},
      errorMessage: "Surname is required!",
    },
    isLength: {
      options: {
        min: 2,
      },
      errorMessage: "Surname must be at least 2 chars long!",
    },
  },
  email: {
    in: ["body"],
    notEmpty: "Email is required!",
    isEmail: {
      errorMessage: "Invalid email!",
    },
    custom: {
      options: async (value) => {
        const alreadyExists = await prisma.user.findUnique({
          where: {
            email: value,
          },
        });

        if (alreadyExists) {
          return Promise.reject("This email already exists!");
        }

        return true;
      },
    },
  },
  password: {
    in: ["body"],
    isStrongPassword: {
      options: {
        minLength: 6,
      },
    },
    errorMessage:
      "Password must be of at least 6 digits and contain 1 upper-case letter, 1 number and 1 symbol!",
  },
};
