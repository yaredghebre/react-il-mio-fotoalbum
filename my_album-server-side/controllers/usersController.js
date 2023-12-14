const prisma = require("../library/PrismaClient");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { matchedData } = require("express-validator");
const usersAuthError = require("../exceptions/usersAuthError");
const NotFound = require("../exceptions/NotFound");

async function index(req, res) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      surname: true,
      role: true,
    },
  });

  res.json({ users });
}

async function show(req, res, next) {
  try {
    const userId = req.params.id;

    const user = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
      include: {
        users: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        role: true,
      },
    });

    if (!user) {
      return next(new usersAuthError("User not found!"));
    }

    res.json({ user });
  } catch (error) {
    return next(
      new usersAuthError("Something went wrong while fetching user data!")
    );
  }
}

async function update(req, res, next) {
  const userId = req.params.id;
  const editUser = req.body;

  try {
    const exisistingUser = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
      include: {
        pictures: true,
      },
    });
    if (!exisistingUser) {
      next(new NotFound("User Not Found!"));
    }

    const editedUser = await prisma.user.update({
      where: {
        id: +userId,
      },
      data: {
        name: editUser.name,
        surname: editUser.surname,
        email: editUser.email,
        // pictures: {
        //   connect: editUser.pictures.map((pictureId) => ({
        //     id: +pictureId,
        //   })),
        // },
      },
    });
    return res.json(editedUser);
  } catch (error) {
    next(new usersAuthError("Something went wrong while updating the User!"));
  }
}

/////////////// R E G I S T E R ///////////////////
async function register(req, res, next) {
  const sanitizedData = matchedData(req);

  try {
    sanitizedData.password = await bcrypt.hash(sanitizedData.password, 10);

    const user = await prisma.user.create({
      data: {
        ...sanitizedData,
      },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        role: true,
      },
    });

    const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ user, token });
  } catch (error) {
    next(new usersAuthError("Something went wrong while registering!"));
  }
}

/////////////////// L O G I N ////////////////////
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return next(new usersAuthError("User not found!"));
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return next(new usersAuthError("Wrong Credentials!"));
    }

    const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    delete user.password;
    res.json({ user, token });
  } catch (error) {
    return next(new usersAuthError("Something went wrong during login!"));
  }
}

module.exports = {
  index,
  show,
  update,
  //   destroy,
  register,
  login,
};
