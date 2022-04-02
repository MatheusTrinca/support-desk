const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const { errorHandler } = require('./middlewares/errorMiddleware');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Support Desk API' });
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));

// 122. 9:40

// https://www.npmjs.com/package/express-async-handler
