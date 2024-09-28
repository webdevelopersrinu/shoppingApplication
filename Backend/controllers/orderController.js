import order from "../models/order.js";
import user from "../models/user.js";
import { asyncError } from "../utils/asyncError.js";
import Stripe from "stripe";

// global variables
const currency = "inr";
const deliveryCharge = 10;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// palcing order using COD method
const palceOrder = asyncError(async (req, res, next) => {
  const { userId, items, address, amount } = req.body;
  const orderData = {
    userId,
    items,
    address,
    amount,
    status: "Order Placed",
    paymentMethod: "COD",
    payment: false,
    date: Date.now(),
  };
  const newOrder = new order(orderData);
  await newOrder.save();

  await user.findByIdAndUpdate(userId, { cardData: {} });

  res.status(200).json({
    status: "success",
    message: "Order Placed",
  });
});

// palcing order using Stripe method
const palceOrderStripe = asyncError(async (req, res, next) => {
  const { userId, items, address, amount } = req.body;
  const { origin } = req.headers;
  const orderData = {
    userId,
    items,
    address,
    amount,
    status: "Stripe",
    paymentMethod: "COD",
    payment: false,
    date: Date.now(),
  };
  const newOrder = new order(orderData);
  await newOrder.save();
  const line_items = items.map((item) => ({
    price_data: {
      currency: currency,
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));
  line_items.push({
    price_data: {
      currency: currency,
      product_data: {
        name: "Delivery Charges",
      },
      unit_amount: deliveryCharge * 100,
    },
    quantity: 1,
  });
  const session = await stripe.checkout.sessions.create({
    success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    line_items,
    mode: "payment",
  });
  res.json({ status: "success", session_url: session.url });
});

// palcing order using Razorpay method
const palceOrderRazorpay = asyncError(async (req, res, next) => {});

// all orders data for Admin panel
const allOrders = asyncError(async (req, res, next) => {
  const orders = await order.find();
  res.status(200).json({
    status: "success",
    orders,
  });
});

// user order Data for Forntend
const userOrders = asyncError(async (req, res, next) => {
  const { userId } = req.body;
  const orders = await order.find({ userId });
  res.status(200).json({
    status: "success",
    orders,
  });
});

// update order status

const updateOrderStatus = asyncError(async (req, res, next) => {
  const { orderId, status } = req.body;
  await order.findByIdAndUpdate(orderId, { status });
  res.json({
    success: true,
    message: "status Updated",
  });
});

export {
  palceOrder,
  palceOrderStripe,
  palceOrderRazorpay,
  allOrders,
  userOrders,
  updateOrderStatus,
};
