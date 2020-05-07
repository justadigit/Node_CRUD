const { validationResult} = require("express-validator");
const HTTPError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
let DUMMY_PLACES = [
    {
        id:"p1",
        title:"Pyin Oo Lwin",
        description:"Pyin Oo Lwin or Pyin U Lwin, formerly and colloquially referred to as Maymyo",
        location:{
            lati:22.0339247,
            long:96.404657
        },
        address:"a scenic hill town in Mandalay Region",
        creator:"u1"
    }
]

const getPlaceById=(req,res,next)=>{
    const placeId = req.params.pid;
    let place = DUMMY_PLACES.find(p=>p.id==placeId);

    if(!place){
        throw  new HTTPError("Place is not found provided by pid!",404);
    }
    res.json({place}); //=>{place} => { place:place}
};

const getPlacesByUserId = (req,res,next)=>{
    const userid = req.params.uid;
    let places = DUMMY_PLACES.filter(user=>user.creator==userid);
    if(!places || places.length === 0 ){
        return next(new HTTPError("Place is not found provided by uid!",404));
    }
    res.json({places});
};
const createPlace = (req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array() });
    }
    const {title,description,coordinates,address,creator} = req.body;
    const newPlace = {
        id :  uuidv4(),
        title,
        description,
        location:coordinates,
        address,
        creator
    }
    DUMMY_PLACES.push(newPlace);
    res.status(201).json({place : newPlace});
};

//updating place
const updatePlace = (req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({errors:errors.array() });
    }
    const {title,description} = req.body;
    const placeId = req.params.pid;
    
    const updatedPlaceIndex = DUMMY_PLACES.findIndex(p=> p.id==placeId);
    const updatedPlace = {...DUMMY_PLACES.find(p=>p.id==placeId)};
    updatedPlace.title = title;
    updatedPlace.description = description;
    DUMMY_PLACES[updatedPlaceIndex] = updatedPlace; 
    console.log(updatedPlaceIndex);
    res.status(200).json({place:updatedPlace});
}
const deletePlace = (req,res,next)=>{
    const placeId = req.params.pid;
    if(!DUMMY_PLACES.find(p=>p.id == placeId)){
        throw HTTPError('Could not find place you provided',404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p=>p.id !== placeId);
    res.status(200).json({message:"Delete Place Successfully!"});

}


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
