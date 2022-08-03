import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

//intialized app
const app = express();

// loaed env varibal
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`erver is listening on port:${PORT}`));
