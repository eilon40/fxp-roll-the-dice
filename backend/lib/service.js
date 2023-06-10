const config = require("./config");

const fetchOptions = {
  headers: { Cookie: config.cookie },
  credentials: "include",
};

const fetcher = (url) => fetch(url, fetchOptions);

module.exports = fetcher;
