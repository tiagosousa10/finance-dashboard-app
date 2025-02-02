import mongoose from "mongoose";
import {loadType} from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose); // load mongoose-currency


const ProductSchema = new Schema(
  {
    price: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100, // convert to USD , v -> value
    },
    expenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100, // convert to USD , v -> value
    },
    transactions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction"
    }],
  
  },
  {timestamps: true, toJSON: {getters: true}} // convert to json and include getters and timestamps -> createdAt
)

const Product = mongoose.model("Product", ProductSchema);
export default Product;
