const mongoose = require('mongoose');
const mongoURI ='mongodb+srv://gofood:darsh@cluster0.t9h1vmr.mongodb.net/gofood?retryWrites=true&w=majority'
const mongoDB= async() =>{
    await mongoose.connect(mongoURI,{ useNewUrlParser: true},(err,result)=>{
        if(err){
            console.log("---",err);
        }else{
            console.log("connected");
            const fetched_data = mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(function(err,data){
                if(err){
                    console.log("---",err);
                }else{
                    //console.log(data);
                }
            })
        } 
    });
}

module.exports=mongoDB;
