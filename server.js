/* eslint @typescript-eslint/no-var-requires: "off" */
const express = require('express');
const history = require('connect-history-api-fallback');

const app = express();
const port = process.env.PORT || 3000; 

app.use(history());
app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
