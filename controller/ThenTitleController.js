const { load } = require("cheerio");
const axios = require("axios");
const {
  ThenHandleSingleAddress,
  createEndpoints,
} = require("../utils/CommonFunc");
module.exports = (req, res) => {
  const { address } = req.query;
  try {
    if (!address) {
      return res.status(400).send("Address Param is missing ");
    } else {
      if (typeof address == "string") {
        const URL = address.startsWith("www")
          ? `https:${address}`
          : `https://www.${address}`;
        ThenHandleSingleAddress(res, URL);
      } else {
        let title = [];
        let endPoints = [];
        createEndpoints(address, endPoints);
        endPoints.map((endpoint) => {
          axios
            .get(endpoint)
            .then(({ data: data }) => {
              const $ = load(data);
              title.push($("title").html());
              if (title.length == address.length) {
                return res.status(200).send(
                  `<html> <head>server Response</head><body> <h1> Following are the titles of given websites: </h1><ul>
      ${title.map((value) => `<li>${value}</li>`).join("<br>")}
      </ul></body></html>`
                );
              }
            })
            .catch((err) => {
              console.log(err);
              res
                .status(400)
                .send(
                  `<html> <head>server Response</head><body> <h1> Following are the titles of given websites: </h1><ul><li>${err}</li></ul></body></html>`
                );
            });
        });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send(
        `<html> <head>server Response</head><body> <h1> Following are the titles of given websites: </h1><ul><li>${address} - NO RESPONSE</li></ul></body></html>`
      );
  }
};
