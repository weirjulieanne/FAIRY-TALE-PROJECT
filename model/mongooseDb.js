const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/FTL";
mongoose.connect(dbUrl);

module.exports = mongoose;
