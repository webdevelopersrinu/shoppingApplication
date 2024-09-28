import user from "../models/user.js";
import { asyncError } from "../utils/asyncError.js";

const addToCard = asyncError(async (req, res, next) => {
  const { userId, itemId, size } = req.body;
  const userData = await user.findById(userId);
  const cardData = await userData.cardData;
  if (cardData[itemId]) {
    if (cardData[itemId][size]) {
      cardData[itemId][size] += 1;
    } else {
      cardData[itemId][size] = 1;
    }
  } else {
    cardData[itemId] = {};
    cardData[itemId][size] = 1;
  }
  await user.findByIdAndUpdate(userId, { cardData });
  res.status(200).json({
    status: "success",
    message: "Added to card",
  });
});

const updateCard = asyncError(async (req, res, next) => {
  const { userId, itemId, size, quantity } = req.body;
  const userData = await user.findById(userId);
  const cardData = await userData.cardData;
  cardData[itemId][size] = quantity;
  await user.findByIdAndUpdate(userId, { cardData });
  res.status(200).json({
    status: "success",
    message: "card updated",
  });
});

const getUserCart = asyncError(async (req, res, next) => {
  const { userId } = req.body;
  const userData = await user.findById(userId);
  const cardData = await userData.cardData;
  res.status(200).json({
    status: "success",
    message: "get card data",
    cardData,
  });
});

export { getUserCart, addToCard, updateCard };
