const { load } = require("cheerio");
const axios = require("axios");
const AsyncHandleSingleAddress = async (res, URL) => {
  const { data } = await axios.get(URL);
  const $ = load(data);
  const title = $("title").html();
  res
    .status(200)
    .send(
      `<html> <head>server Response</head><body> <h1> Following are the titles of given websites: </h1><ul><li>${title}</li></ul></body></html>`
    );
};
const ThenHandleSingleAddress = (res, URL) => {
  axios
    .get(URL)
    .then(({ data: data }) => {
      const $ = load(data);
      const title = $("title").html();
      res
        .status(200)
        .send(
          `<html> <head>server Response</head><body> <h1> Following are the titles of given websites: </h1><ul><li>${title}</li></ul></body></html>`
        );
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .send(
          `<html> <head>server Response</head><body> <h1> Following are the titles of given websites: </h1><ul><li>${err}</li></ul></body></html>`
        );
    });
};

const createEndpoints = (address, endPoints) => {
  address.map((val) =>
    endPoints.push(
      val.startsWith("www") ? `https://${val}` : `https://www.${val}`
    )
  );
};

module.exports = {
  AsyncHandleSingleAddress,
  ThenHandleSingleAddress,
  createEndpoints,
};
