const { request } = require("express");
const express = require("express");
//const ftlRouter = require("FTLRoutes2");
const matchFTLRoutes = require("./routes/matchFTLRoutes2.js");
const path = require("path");
// const path = require("path");
const app = express();

const port = 3000;
// app.set("views", path.join(dirname__, "views"));
// app.set("view engine", "pug");
//app.use("/v1", ftlRouter);
app.use(matchFTLRoutes);

//app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
