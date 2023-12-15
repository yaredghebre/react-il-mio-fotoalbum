const prisma = require("../library/PrismaClient");
const NotFound = require("../exceptions/NotFound");
const Validation = require("../exceptions/ValidationError");

async function index(req, res, next) {
  const messages = await prisma.message.findMany();
  res.json(messages);
}

async function show(req, res) {
  const messageId = req.params.id;
  const showData = await prisma.message.findUnique({
    where: {
      id: +messageId,
    },
  });

  if (!showData) {
    next(new NotFound("Message Not Found!"));
  }

  return res.json(showData);
}

async function store(req, res, next) {
  const addData = req.body;

  if (!addData.title) {
    return next(new Validation("Title is missing!"));
  }

  const newMessage = await prisma.message.create({
    data: {
      title: addData.title,
      content: addData.content,
    },
  });

  return res.json(newMessage);
}

module.exports = {
  index,
  show,
  store,
};
