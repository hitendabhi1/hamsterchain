const express = require('express');
const cors = require('cors');
const app = express();

let x = 100; // Initial value of x, you can change this as needed

// // Middleware to allow requests only from hamsterchain.org
// app.use((req, res, next) => {
//   const allowedOrigin = 'hamsterchain.org';
//   const origin = req.get('origin');

//   if (origin && origin.includes(allowedOrigin)) {
//     next();
//   } else {
//     res.status(403).send('Access forbidden');
//   }
// });

// Function to increase x by 8 to 12% every day
const increaseXDaily = () => {
  const percentageIncrease = (Math.random() * (12 - 8) + 8) / 100;
  x += x * percentageIncrease;
};

// Function to increase x by a random number between 10 and 60 every 10 seconds
const increaseXEvery10Seconds = () => {
  const randomIncrease = Math.random() * (60 - 10) + 10;
  x += randomIncrease;
};

// Schedule the daily increase at midnight
const scheduleDailyIncrease = () => {
  const now = new Date();
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );
  const timeUntilMidnight = nextMidnight.getTime() - now.getTime();

  setTimeout(() => {
    increaseXDaily();
    scheduleDailyIncrease();
  }, timeUntilMidnight);
};

// Schedule the 10 seconds interval increase
setInterval(increaseXEvery10Seconds, 10000);

// Start the daily increase schedule
scheduleDailyIncrease();

// Route to get the current value of x
app.get('/get-number', (req, res) => {
  res.json({ number: x });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
