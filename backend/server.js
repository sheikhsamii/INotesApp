import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './connection/db.js';
import NotesRoute from './routes/notes.js';
import UserRoute from './routes/users.js';
import authRoute from './routes/auth.js';

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 7000;
connectDB(); 
//Available Routes
app.use('/api/notes', NotesRoute);
app.use('/api/users', UserRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Notes Server Backend Running on  ${PORT}`)
})