const mongoose = require('mongoose');
const mongoURI ='mongodb+srv://gofood:darsh@cluster0.t9h1vmr.mongodb.net/?retryWrites=true&w=majority'
const mongoDB= async() =>{
    await mongoose.connect(mongoURI,{ useNewUrlParser: true},(err,result)=>{
        if(err){
            console.log("---",err)
        }else{
            console.log("connected")
        } 
    });
}

module.exports=mongoDB;
