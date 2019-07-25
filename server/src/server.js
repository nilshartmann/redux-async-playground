const db = require("./db");
const largeData = require("./largedata");
const app = require("./app")(db, largeData);

// clear console
// process.stdout.write(process.platform === "win32" ? "\x1Bc" : "\x1B[2J\x1B[3J\x1B[H");

const port = process.env.SERVER_PORT || 7000;

const webserver = app.listen(port, () => {
  console.log(`  📞    Greeting API Server listening on port ${port}`);
});
