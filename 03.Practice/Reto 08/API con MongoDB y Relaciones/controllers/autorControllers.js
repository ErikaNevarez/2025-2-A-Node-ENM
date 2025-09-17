import Autor from "../models/autor.js";

async function getAutor(req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const autor = await Autor.find()
      .populate('category')
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 });

    const totalResults = await Autor.countDocuments();
    const totalPages = Math.ceil(totalResults / limit);
    res.json({
      autor,
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
async function getAutorById(req, res, next) {
  try {
    const id = req.params.id;
    const autor = await Autor.findById(id).populate('category');
    if (!autor) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(autor);
  } catch (error) {
    next(error);
  }
}

async function getAutorByCategory(req, res, next) {
  try {
    const id = req.params.idCategory;
    const autor = await Autor
      .find({ category: id })
      .populate('category')
      .sort({ name: 1 });
    if (autor.length === 0) {
      return res.status(404).json({ message: 'No books found on this category' });
    }
    res.json(autor);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function createAutor(req, res, next) {
  try {
    const { name, sinopsis, imagesUrl, category } = req.body;

    if (!name || !sinopsis || !imagesUrl || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newAutor = await Autor.create({ name, sinopsis, imagesUrl, category });
    res.status(201).json(newAutor);
  } catch (error) {
    next(error);
  }
}
async function updateAutor(req, res, next) {
  try {
    const id = req.params.id;
    const { name, sinopsis, imagesUrl, category } = req.body;

    if (!name || !sinopsis || !imagesUrl || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedAutor = await Autor.findByIdAndUpdate(id,
      { name, sinopsis, imagesUrl, category },
      { new: true },
    );

    if (!updatedAutor) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(updatedAutor);
  } catch (error) {
    next(error);
  }
}
async function deleteAutor(req, res, next) {
  try {
    const id = req.params.id;
    const deletedAutor = await Autor.findByIdAndDelete(id);
    if (!deletedAutor) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

async function searchAutor(req, res, next) {
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

    const autor = await Autor.find(filters)
      .populate('category')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)

    const totalResults = await Autor.countDocuments(filters);
    const totalPages = Math.ceil(totalResults / parseInt(limit));

    res.status(200).json({
      autor,
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
  getAutor,
  getAutorById,
  getAutorByCategory,
  createAutor,
  updateAutor,
  deleteAutor,
  searchAutor,
}