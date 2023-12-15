const prisma = require("../library/PrismaClient");
const NotFound = require("../exceptions/NotFound");

// INDEX GUEST
async function index(req, res, next) {
  const filters = req.query.filter;
  const queryFilter = { visible: true };

  const page = req.query.page || 1;
  const perPage = 25;

  if (filters && filters.title) {
    queryFilter.title = {
      contains: filters.title,
    };
  }

  const total = await prisma.picture.count({ where: queryFilter });
  const data = await prisma.picture.findMany({
    skip: (page - 1) * perPage,
    take: perPage,
    where: queryFilter,
    include: {
      categories: true,
    },
  });

  if (data.length === 0) {
    return next(new NotFound("No Posts Found"));
  }
  return res.json({ data, page, perPage, total });
}

// SHOW GUEST
async function show(req, res, next) {
  const pictureId = req.params.id;
  const showData = await prisma.picture.findUnique({
    where: {
      id: +pictureId,
      visible: true,
    },
    include: {
      categories: true,
    },
  });

  if (!showData) {
    next(new NotFound("Post Not Found"));
    return;
  }

  return res.json(showData);
}

module.exports = { index, show };
