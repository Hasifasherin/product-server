import Product from '../model/Product.js';

// CREATE product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: "Product added", product });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET all the  products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ deleted: false });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET one of the product
export const getProductById = async (req, res) => {
  try {
    console.log('im here------------');

    const id = req.query.id;   

    if (!id) {
      return res.status(400).json({
        message: "Product ID is required in query params"
      });
    }

    const product = await Product.findOne({
      _id: id,
      deleted: false
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "successful",
      product
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const id= req.query.id;
    const updateData =req.body;
    if (!id) return res.status(404).json({ 
      success:false,
      message: "Product not found",
     });
    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//  DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product  deleted", product });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
