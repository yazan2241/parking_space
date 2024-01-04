const express = require("express");
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001;
const pages = require('./server/routes/pages');
const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.use("/",pages);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

