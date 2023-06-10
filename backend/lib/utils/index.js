const config = require("../config");
const jsdom = require("jsdom");
const fetcher = require("../service");

/**
 * Gets DOM as a string and returned parsed DOM.
 * @param {string} dom
 * @returns
 */
const getDocFromText = (dom) => new jsdom.JSDOM(dom).window.document;

/**
 * Standard fetcher for FxP.co.il Document
 * @param {string} threadNumber
 * @returns
 */
const fxpFetcher = (threadNumber) =>
  fetcher(config.url.fxp + threadNumber)
    .then((res) => res.text())
    .then((res) => getDocFromText(res));

/**
 * Calls FxP Thread with unrealistic amount of pages
 * and gets redirected and returned a url with the real
 * amount of pages.
 * @param {string} threadNumber FxP thread id
 * @returns {number}
 */
const getMaxPages = async (threadNumber) => {
  const maxPageURL = config.url.fxp + threadNumber + "&page=1000000&pp=40";
  const docResult = await fetch(maxPageURL).then((res) =>
    res.redirected ? res.url : config.url.fxp + threadNumber
  );
  const docResultURL = new URL(docResult).searchParams.get("page");

  if (!docResultURL || isNaN(+docResultURL)) return 1;
  return +docResultURL;
};

/**
 * Gets DOM as string and parse it's content to
 * segregate, retrieve and return an array with user objects.
 * @param {string} doc
 * @returns
 */
const getUsersFromPage = (doc) => {
  const htmlDoc = getDocFromText(doc);
  const getAllUsers = htmlDoc.querySelectorAll("a.username");
  const usersObject = [];
  const uniqueUsers = [];
  let threadInitiator = "";

  getAllUsers.forEach((node, i) => {
    const link = node.href;
    const nickname = node.children[0].children[0].textContent;
    if (i === 0) {
      threadInitiator = nickname;
    } else {
      if (!uniqueUsers.includes(usersObject) && threadInitiator !== nickname) {
        usersObject.push(nickname);
        uniqueUsers.push({ nickname: nickname, href: link });
      }
    }
  });

  return uniqueUsers;
};

/**
 * Gets `getUsersFromPage`'s output and randomize its content.
 * If the required random users is bigger than array's length it returns
 * the array randomized, otherwise it slices the array to the wanted amount.
 * @param {array} usersList
 * @returns
 */
const getRandomUsers = (usersList, usersAmount) => {
  let currentIndex = usersList.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [usersList[currentIndex], usersList[randomIndex]] = [
      usersList[randomIndex],
      usersList[currentIndex],
    ];
  }

  return usersList.length > +usersAmount
    ? usersList
        .slice(0, +usersAmount)
        .map((obj, i) => ({ ...obj, order: i + 1 }))
    : usersList;
};

module.exports = {
  fxpFetcher,
  getDocFromText,
  getMaxPages,
  getRandomUsers,
  getUsersFromPage,
};
