import orderModel from "../src/models/order.model.js";

export const createOrder = async (req, res) => {
  const userId = req.user._id;
  const foods = req.body;

  const order = await orderModel.create({
    userId,
    foods,
  });

  res.status(201).json({
    message: "order created",
    order,
  });
};

export const success = (req,res)=>{
    const encoded = req.query.data
    console.log(encoded);
    res.send("success")

}
