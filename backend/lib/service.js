const config = require("./config");

const fetchOptions = {
  headers: { Cookie: config.cookie },
  credentials: "include",
};

const fetcher = (url) => fetch(url, fetchOptions).then(response => response.text());

module.exports = fetcher;
