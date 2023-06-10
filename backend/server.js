const express = require("express"),
  app = express();
const bodyParser = require("body-parser");
const config = require("./lib/config");
const fetcher = require("./lib/service");
const PORT = process.env.PORT || 1234;
const cors = require("cors");
const {
  fxpFetcher,
  getMaxPages,
  getUsersFromPage,
  getRandomUsers,
} = require("./lib/utils");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/thread", async (req, res) => {
  const threadNumber = req.query.t;
  const usersAmount = req.query.amount ?? "1";
  // const threadDoc = await fxpFetcher(threadNumber);
  const maxPages = await getMaxPages(threadNumber);

  const allPromises = [];

  for (let i = 0; i < maxPages; i++) {
    allPromises.push(
      fetcher(config.url.fxp + threadNumber + "&page=" + (i + 1) + "&pp=40")
        .then((res) => {
          return res.text();
        })
        .then((doc) => getUsersFromPage(doc))
    );
  }

  const userResults = await Promise.all(allPromises).then((values) => {
    const results = values.flat();
    const uniqueNames = [];
    const uniqueUsers = [];

    results.forEach((data) => {
      if (!uniqueNames.includes(data.nickname)) {
        uniqueNames.push(data.nickname);
        uniqueUsers.push(data);
      }
    });

    return { count: results.length, unique: uniqueUsers, all: results };
  });

  const randomUsers = getRandomUsers(userResults.unique, usersAmount);

  return res.status(200).json({ ...userResults, random: randomUsers });
});

app.listen(PORT, () => {
  console.log("=~".repeat(15));
  console.log("Server is running " + PORT);
  console.log("- ".repeat(15));
  console.log(
    "Created by Middleware\n  https://www.fxp.co.il/member.php?u=749522"
  );
  console.log("=~".repeat(15));
});
