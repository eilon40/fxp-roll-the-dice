const express = require("express"),
  app = express();
const bodyParser = require("body-parser");
const config = require("./lib/config");
const fetcher = require("./lib/service");
const PORT = process.env.PORT || 1234;
const cors = require("cors");
const {
  getMaxPages,
  getUsersFromPage,
  getRandomUsers,
  getThreadInitiator
} = require("./lib/utils");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/thread", async (req, res) => {
  console.time("thread");
  const threadNumber = req.query.t;
  const usersAmount = req.query.amount ?? "1";
  const pageRequest = fetcher(config.url.fxp + threadNumber + "&page=1&pp=40");
  const threadInitiator = await pageRequest.then(getThreadInitiator);
  const allPromises = [pageRequest.then(getUsersFromPage)];
  const maxPages = await pageRequest.then(getMaxPages);

  if (maxPages > 1) {
    for (let i = 2; i < maxPages; i++) {
      allPromises.push(
        fetcher(config.url.fxp + threadNumber + "&page=" + i + "&pp=40")
          .then(getUsersFromPage)
      );
    }
  }
  
  const userResults = await Promise.all(allPromises).then((values) => {
    const results = values.flat().filter(data => data.nickname !== threadInitiator);
    const uniqueNames = [];
    const uniqueUsers = results.filter(function(element) {
      const isDuplicate = uniqueNames.includes(element.nickname);
    
      if (!isDuplicate) {
        uniqueNames.push(element.nickname);
        return true;
      }
    
      return false;
    });
    
    return { count: results.length, unique: uniqueUsers, all: results };
  });

  const randomUsers = getRandomUsers(userResults.unique, usersAmount);
  console.timeEnd("thread");
  return res.status(200).json({ ...userResults, random: randomUsers });
});

app.get("/something", async (req, res) => {
  console.time("something");
  const threadNumber = req.query.t;
  const pageRequest = fetcher(config.url.fxp + threadNumber + "&page=1&pp=40");
  const threadInitiator = await pageRequest.then(getThreadInitiator);
  const allPromises = [pageRequest.then(getUsersFromPage)];
  const maxPages = await pageRequest.then(getMaxPages);

  if (maxPages > 1) {
    for (let i = 2; i < maxPages; i++) {
      allPromises.push(
        fetcher(config.url.fxp + threadNumber + "&page=" + i + "&pp=40")
          .then(getUsersFromPage)
      );
    }
  }
  
  const userResults = await Promise.all(allPromises);
  const results = userResults.flat().filter(data => data.nickname !== threadInitiator);
  
  const count = results.reduce((accumulator, value) => {
    return {...accumulator, [value.nickname]: (accumulator[value.nickname] || 0) + 1};
  }, {});
  console.timeEnd("something");
  return res.status(200).json(count);
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
