const express = require('express');
const colors = require('colors');
const PORT = process.env.PORT || 5000;
const { errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');

// DB Connection
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Bem-Vindo(a) ao Support Desk API' });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));

//

// https://www.npmjs.com/package/express-async-handler
