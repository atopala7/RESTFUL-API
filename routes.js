// This file contains the routes for the application (in this case, just the resources route).
// It is a good idea to separate the routes from the main application file, as it makes the code easier to read and maintain. The routes are exported from this file, and imported into the main application file (app.js) using the require() function. The routes are then bound to the application using the app.use() function.
const resourceRoute = require("./routes/resources.js");
module.exports = resourceRoute;
