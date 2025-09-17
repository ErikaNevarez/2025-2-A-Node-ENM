import Libro from '../models/libros.js';

async function getLibros(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const libros = await Libro.find()
      .populate('category')
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 });

    const totalResults = await Libro.countDocuments();
    const totalPages = Math.ceil(totalResults / limit);
    res.json({
      libros,
      pagination: {
        currentPage: page,
        totalPages,
        totalResults,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      }
    });
  } catch (error) {
    next(error);
  }
}
async function getLibroById(req, res, next) {
  try {
    const id = req.params.id;
    const libro = await Libro.findById(id).populate('category');
    if (!libro) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(libro);
  } catch (error) {
    next(error);
  }
}

async function getLibroByCategory(req, res, next) {
  try {
    const id = req.params.idCategory;
    const libros = await Libro
      .find({ category: id })
      .populate('category')
      .sort({ name: 1 });
    if (libros.length === 0) {
      return res.status(404).json({ message: 'No books found on this category' });
    }
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function createLibro(req, res, next) {
  try {
    const { name, sinopsis, imagesUrl, category } = req.body;

    if (!name || !sinopsis || !imagesUrl || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newLibro = await Libro.create({ name, sinopsis, imagesUrl, category });
    res.status(201).json(newLibro);
  } catch (error) {
    next(error);
  }
}
async function updateLibro(req, res, next) {
  try {
    const id = req.params.id;
    const { name, sinopsis, imagesUrl, category } = req.body;

    if (!name || !sinopsis || !imagesUrl || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedLibro = await Libro.findByIdAndUpdate(id,
      { name, sinopsis, imagesUrl, category },
      { new: true },
    );

    if (!updatedLibro) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(updatedLibro);
  } catch (error) {
    next(error);
  }
}
async function deleteLibro(req, res, next) {
  try {
    const id = req.params.id;
    const deletedLibro = await Libro.findByIdAndDelete(id);
    if (!deletedLibro) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function searchLibro(req, res, next) {
  try {
    const {
      q,
      category,
      sort,
      order,
      page = 1,
      limit = 10,
    } = req.query;

    let filters = {};

    if (q) {
      filters.$or = [
        { name: { $regex: q, $options: 'i' } },
        { sinopsis: { $regex: q, $options: 'i' } }
      ]
    }

    if (category) {
      filters.category = category;
    }

    let sortOptions = {};

    if (sort) {
      const sortOrder = order === 'desc' ? -1 : 1;
      sortOptions[sort] = sortOrder;
    } else {
      sortOptions.name = 1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const libros = await Libro.find(filters)
      .populate('category')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)

    const totalResults = await Libro.countDocuments(filters);
    const totalPages = Math.ceil(totalResults / parseInt(limit));

    res.status(200).json({
      libros,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalResults,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    next(error);
  }

}

export {
  getLibros,
  getLibroById,
  getLibroByCategory,
  createLibro,
  updateLibro,
  deleteLibro,
  searchLibro,
}