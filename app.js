const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const placeRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/users-routes');
const HTTPError = require("./models/http-error");


app.use(bodyParser.json());
//users routes
app.use('/api/users',userRoutes);

//places routes
app.use('/api/places',placeRoutes); //=> router => /api/places/

app.use((res,req,next)=>{
    const error = new HTTPError("Could Not Find This Route!",404);
    throw error;
});

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "An Unknown Error is occured!"});
});

app.listen(5000);