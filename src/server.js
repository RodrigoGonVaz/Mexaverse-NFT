// Server.js
const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log(`Listen on http://localhost:${process.env.PORT}`);
});
