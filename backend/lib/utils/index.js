/**
 * Gets DOM as a string and returned parsed DOM.
 * @param {string} dom
 * @returns
 */
const getDocFromText = (dom) => [...dom.matchAll(/"xsaid"><a href="(.*)"><.*>(.*)<\/s/g)];

/**
 * Calls FxP Thread with unrealistic amount of pages
 * and gets redirected and returned a url with the real
 * amount of pages.
 * @param {string} threadNumber FxP thread id
 * @returns {number}
 */
const getMaxPages = (threadNumber) => {
  const result = threadNumber.match(/var totalpages = (\d+);/);
  return result?.at(1) ?? 1;
};

/**
 * Gets DOM as string and parse it's content to
 * segregate, retrieve and return an array with user objects.
 * @param {string} doc
 * @returns
 */
const getUsersFromPage = (doc) => {  
  const getAllUsers = getDocFromText(doc).map(function(node) {
      return { 
        nickname: node?.at(2),
        href: "https://fxp.co.il/" + node?.at(1)
      };
  });

  return getAllUsers;
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

const getThreadInitiator = (threadNumber) => {
  const regex = /"xsaid" itemprop="author" content="(.*)"><a/;
  const result = threadNumber.match(regex);
  return result?.at(1) ?? null;
}

module.exports = {
  getDocFromText,
  getMaxPages,
  getRandomUsers,
  getUsersFromPage,
  getThreadInitiator
};
