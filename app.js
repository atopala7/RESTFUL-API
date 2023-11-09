/** Example RESTful Node.js server
 * This server provides a RESTful API for a collection of generic resources
 */

// Import the express module and the routes
const express = require("express");
const routes = require("./routes.js");

// Import the dotenv module so that we can load the port number as an environment variable
const dotenv = require("dotenv");

// Create an express app object
const app = express();

// Set a port for the server to listen on
// If the environment variable PORT exists, use that; otherwise, use 8080
const PORT = process.env.PORT || 8080;

// Bind the root route, redirecting to /resources
app.get("/", (req, res) => {
  res.redirect("/resources");
});

// Bind the resources route
app.use("/resources", routes);

// Create an instance of the server object, having it listen on the specified port
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
