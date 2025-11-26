import CartItem from "../model/Cart.js";
import Product from "../model/Product.js";


//get cart items
export const getCart =async (req , res) =>{
    try{
        const cart =await CartItem.find({userId: req.userId}).populate('productId');
        res.json(cart);
    }catch (err){
        res.status(500).json({message:err.message});
    }
};


//Post 
export const addToCart = async (req, res) => {
    try{
        const {productId} = req.body;

        //check the product exist 
        let cartItem = await CartItem.findOne({ userId: req.userId, productId });

        if(cartItem){
            cartItem.qty +=1;
            await cartItem.save();
        }else{
            cartItem = await cartItem.create({ userId: req.userId, productId, qty: 1 });
    }

    const updatedCart = await CartItem.find({ userId: req.userId }).populate('productId');
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

     
//update quantities
export const updateCartQty = async (req, res) => {
  try {
    const { id } = req.params; // cart item id
    const { action } = req.body; // 'increase' or 'decrease'

    const cartItem = await CartItem.findById(id);
    if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

    if (action === 'increase') cartItem.qty += 1;
    if (action === 'decrease' && cartItem.qty > 1) cartItem.qty -= 1;

    await cartItem.save();

    const updatedCart = await CartItem.find({ userId: req.userId }).populate('productId');
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove an item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params; // cart item id
    await CartItem.findByIdAndDelete(id);

    const updatedCart = await CartItem.find({ userId: req.userId }).populate('productId');
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};