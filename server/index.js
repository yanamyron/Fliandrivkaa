import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";

dotenv.config();
const app = express();

// Налаштування CORS
const corsOptions = {
  origin: 'https://fliandrivka.netlify.app',
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(router);

// Перевірка підключення до бази даних
db.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(5000, () => console.log('Server running at port 5000'));
