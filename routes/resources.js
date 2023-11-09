/** Resources route
 * This route handles requests for resources
 */

const express = require("express");

// Create a router object to handle routes for resources
const router = express.Router();

// Create an array of resources
// This is a simple array of objects for demonstration purposes; usually, you would use a database to store resources
let resources = [
  {
    id: "1",
    data: "First resource"
  },
  {
    id: "2",
    data: "Second resource"
  },
  {
    id: "4",
    data: "Fourth resource"
  },
  {
    id: "5",
    data: "Fifth resource"
  }
];

// GET: Retrieve a list of all resources
router.get("/", (req, res) => {
  res.send(JSON.stringify(resources));
});

// POST: Create a new resource
router.post("/", (req, res) => {
  // Find the first available ID
  let newID = 1;
  for (resource of resources) {
    console.log("Checking resource ID:", resource.id);
    if (resource.id != newID) {
      console.log("Found available ID:", newID);
      break;
    }
    newID = newID + 1;
  }

  // Extract the data from the query string
  let newData = req.query.data ? req.query.data : "No data provided";

  // Add the new resource to the resources array
  resources.push({
    id: newID.toString(),
    data: newData
  });

  // Sort the resources array by ID, ensuring that the new resource is in the correct position
  resources.sort((a, b) => a.id - b.id);

  res.send(`Created resource ${newID} with data ${newData}.`);
});

// GET by id: Retrieve a specific resource
router.get("/:id", (req, res) => {
  const id = req.params.id;

  // Filter the resources array for the resource with the specified id
  // There should only be one resource returned, since the ID should be unique, but I'm using the filter() method for easy modification of resource lookup (e.g. we could filter by data or some other property)
  let filteredResources = resources.filter((resource) => resource.id == id);

  if (filteredResources.length > 0) res.send(JSON.stringify(filteredResources));
  else throw new Error("No resource found with ID " + id);
});

// DELETE by id: Delete a specific resource
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  // Filter the resources array, removing the resource with the specified id
  let filteredResources = resources.filter((resource) => resource.id != id);

  // If the filtered array is shorter than the original array, a resource was deleted
  if (filteredResources.length < resources.length) {
    resources = filteredResources;
    res.send(`Deleted resource ${id}.`);
  } else throw new Error("No resource found with ID " + id);
});

/**
 * Error-handling middleware
 * https://expressjs.com/en/guide/error-handling.html
 * Intercept any errors that occur in the routes above
 */
router.use((err, req, res, next) => {
  if (err != null) {
    // If there's an error, log it and send an error message to the client
    console.error(err.stack);
    res.status(500).send("Error: " + err.message);
  } else {
    // If no error occurred, continue
    next();
  }
});

// Export the router object
module.exports = router;
