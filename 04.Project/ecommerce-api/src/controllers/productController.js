import Product from '../../models/product.js';

async function getProducts(req, res, next) {
  try {
    const products = await Product.find().populate('category').sort({ name: 1 });
    res.json(products);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}
async function getProductById(req, res, next) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

async function getProductByCategory(req, res, next) {
  try {
    const id = req.params.idCategory;
    const products = await Product
      .find({ category: id })
      .populate('category')
      .sort({ name: 1 });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found on this category' });
    }
    res.json(products);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

async function createProduct(req, res, next) {
  try {
    const { name, description, price, stock, imagesUrl, category } = req.body;

    if (!name || !description || !price || !stock || !imagesUrl || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newProduct = await Product.create({ name, description, price, stock, imagesUrl, category });
    res.status(201).json(newProduct);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}
async function updateProduct(req, res, next) {
  try {
    const id = req.params.id;
    const { name, description, price, stock, imagesUrl, category } = req.body;

    if (!name || !description || !price || !stock || !imagesUrl || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id,
      { name, description, price, stock, imagesUrl, category },
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}
async function deleteProduct(req, res, next) {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

export {
  getProducts,
  getProductById,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
}