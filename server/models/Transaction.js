import mongoose from "mongoose";
import {loadType} from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose); // load mongoose-currency


const TransactionSchema = new Schema(
  {
    buyer: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100, // convert to USD , v -> value
    },
    amount: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100, // convert to USD , v -> value
    },
    productIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }],
  
  },
  {timestamps: true, toJSON: {getters: true}} // convert to json and include getters and timestamps -> createdAt
)

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
