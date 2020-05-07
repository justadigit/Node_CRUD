const express = require("express");
const app = express();
const { check } = require("express-validator");
const placesController = require("../controllers/places-controllers");
const router = express.Router();

//getting places
router.get('/:pid',placesController.getPlaceById);
router.get('/users/:uid',placesController.getPlacesByUserId);

//create new places
router.post('/',[
    check("title").not().isEmpty(),
    check("description").isLength({min:6}),
    check("address").not().isEmpty(),
    check("creator").not().isEmpty()
],placesController.createPlace);

//delete place
router.delete('/:pid',placesController.deletePlace);

//update place
router.patch('/:pid',[
    check("title").not().isEmpty(),
    check("description").isLength({min:6})
],placesController.updatePlace);

module.exports = router;