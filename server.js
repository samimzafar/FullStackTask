require("dotenv").config();
const express = require("express");
const { AsyncTitleRoute, ThenTitleRoute } = require("./routes");

const app = express();
const port = process.env.PORT || 5000;
const asyncURL = process.env.ASYNC_URL;
const thenURL = process.env.THEN_URL;

app.use(express.json());
app.use(asyncURL, AsyncTitleRoute);
app.use(thenURL, ThenTitleRoute);
app.use("*", (req, res) => res.status(404).send("Address does not exists"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
