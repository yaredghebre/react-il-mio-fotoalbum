const prisma = require("../library/PrismaClient");
const NotFound = require("../exceptions/NotFound");

async function index(req, res, next) {
  // Filters
  const filters = req.query.filter;
  const queryFilter = { visible: true };

  // Pagination
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
  }

  return res.json(showData);
}

module.exports = { index, show };
