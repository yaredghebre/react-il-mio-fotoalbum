const prisma = require("../library/PrismaClient");
const Validation = require("../exceptions/ValidationError");

const { validationResult } = require("express-validator");

async function index() {
  const categories = await prisma.category.findMany();
  return categories;
}

async function store(req, res, next) {
  const validation = validationResult(req);
  const addData = req.body;

  if (!addData.name) {
    return next(new Validation("Name is missing!"));
  }

  let picturesConnection = {};
  if (addData.pictures && Array.isArray(addData.pictures)) {
    picturesConnection = {
      connect: addData.pictures.map((picture) => ({ id: picture })),
    };
  }

  const newCategory = await prisma.category.create({
    data: {
      name: addData.name,
      ...picturesConnection,
    },
  });

  return res.json(newCategory);
}

module.exports = {
  index,
  store,
};
