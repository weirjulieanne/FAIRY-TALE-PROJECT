const { request } = require("express");
const express = require("express");
const ftlRouter = require("./routes/FTLroutes2.js");
// const path = require("path");
const app = express();

const port = 3000;
// app.set("views", path.join(dirname__, "views"));
// app.set("view engine", "pug");
app.use(ftlRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
