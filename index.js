const express = require('express');
const cors = require('cors');
const app = express();

let x = 100; // Initial value of x, you can change this as needed

// // CORS configuration to allow requests only from specific origins
// const allowedOrigins = ['https://hamsterchain.onrender.com', 'https://hamsterchain.org', 'http://localhost:3001/'];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

const port = 3001;

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

app.listen(process.env.PORT || 3001, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );

  const port = this.address().port;
  const mode = app.settings.env;
  const host = `http://localhost:${port}`; // Replace with your host if not localhost

  // Logging the full URL
  console.log(`Express server listening on: ${host}`);
});
