import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import listEndpoints from "express-list-endpoints";
import clientRouter from "./routes/client.js";
import managementRouter from "./routes/management.js";
import generalRouter from "./routes/general.js";
import salesRouter from "./routes/sales.js";

//data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import {
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/client", clientRouter);
app.use("/management", managementRouter);
app.use("/general", generalRouter);
app.use("/sales", salesRouter);

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server listening on Port: ${PORT}`));
    console.table(listEndpoints(app));
  })
  .catch((error) => console.log(error));
