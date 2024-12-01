const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//Index Route  //Create route validateListing,
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,  upload.single("listing[image]"), wrapAsync(listingController.createListing));

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route //Update route //Delete Route 
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner,  upload.single("listing[image]"), 
    validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;

// router.post('/', async (req, res) => {
//     try {
//         const { name, category } = req.body; // Get name and category from form
//         const newListing = new Listing({ name, category }); // Create a new listing
//         await newListing.save(); // Save the listing to the database
//         res.redirect('/listings'); // Redirect to the listings page
//     } catch (err) {
//         console.error(err);
//         res.render('listings/error.ejs'); // Render an error page if something goes wrong
//     }
// });

// module.exports = router;