import mongoose from "mongoose";
import {loadType} from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose); // load mongoose-currency

const daySchema = new Schema(
  {
    date: String,
    revenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100, // convert to USD , v -> value
    },
    expenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100, // convert to USD , v -> value
    },

  },
  {toJSON: {getters: true}} // convert to json and include getters
)

const monthSchema = new Schema(
  {
    month: String,
    revenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100, // convert to USD , v -> value
    },
    expenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100, // convert to USD , v -> value
    },
    operationalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100, // convert to USD , v -> value
    },
    nonOperationalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100, // convert to USD , v -> value
    },

  },
  {toJSON: {getters: true}} // convert to json and include getters
)

const KPISchema = new Schema(
  {
    totalProfit: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100, // convert to USD , v -> value
    },
    totalRevenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100, // convert to USD , v -> value
    },
    totalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100, // convert to USD , v -> value
    },
    expensesByCategory: {
      type: Map,
      of: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100, // convert to USD , v -> value
      }
    },
    monthlyData: [monthSchema],
    dailyData: [daySchema],
  },
  {timestamps: true, toJSON: {getters: true}} // convert to json and include getters and timestamps -> createdAt
)

const KPI = mongoose.model("KPI", KPISchema);
export default KPI;
