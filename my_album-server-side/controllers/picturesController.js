const prisma = require("../library/PrismaClient");
const NotFound = require("../exceptions/NotFound");
const Validation = require("../exceptions/ValidationError");

async function index(req, res, next) {
  // Filters
  const filters = req.query.filter;
  const queryFilter = {};

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
      user: {
        select: {
          id: true,
          name: true,
          surname: true,
          email: true,
          role: true,
        },
      },
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

async function store(req, res, next) {
  const addData = req.body;
  if (!addData.title) {
    return next(new Validation("Title is missing!"));
  }

  const newPicture = await prisma.picture.create({
    data: {
      title: addData.title,
      image: addData.image,
      description: addData.description,
      visible: addData.visible,
      categories: {
        connect: addData.categories.map((categoryId) => ({ id: +categoryId })),
      },
      userId: +addData.userId,
    },
    include: {
      categories: true,
    },
  });

  return res.json(newPicture);
}

async function update(req, res, next) {
  const pictureId = req.params.id;
  const editData = req.body;

  try {
    const exisistingPicture = await prisma.picture.findUnique({
      where: {
        id: +pictureId,
      },
      include: {
        categories: true,
      },
    });

    if (!exisistingPicture) {
      next(new NotFound("Post Not Found"));
    }

    const editedPicture = await prisma.picture.update({
      where: {
        id: +pictureId,
      },
      data: {
        title: editData.title,
        image: editData.image,
        description: editData.description,
        visible: editData.visible,
        categories: {
          connect: editData.categories.map((categoryId) => ({
            id: +categoryId,
          })),
        },
      },
    });
    return res.json(editedPicture);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went while updating the Picture!" });
  }
}

async function destroy(req, res, next) {
  const pictureId = req.params.id;
  const deleteData = req.body;

  try {
    const exisistingPicture = await prisma.picture.findUnique({
      where: {
        id: +pictureId,
      },
      include: {
        categories: true,
      },
    });

    if (!exisistingPicture) {
      next(new NotFound("Post Not Found"));
    }

    const deletedPicture = await prisma.picture.delete({
      where: {
        id: +pictureId,
      },
    });
    return res.json({ message: "Post deleted", deletedPicture });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something when wrong while deleting the Picture" });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
