const mongoose =require("mongoose");

const database = module.exports =() =>{
    const connectonParams ={
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    try{
        mongoose.connect('mongodb+srv://mehnazfazal952:googoogaagaa@manzoku.knyfgjl.mongodb.net/?retryWrites=true&w=majority',connectonParams);
        console.log("Database connected successfully");
        
    } catch (err) {
        console.log(err);
    }
                 
             
};

// const connectDatabase =( )=>{
    
//     mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}).then((data)=>{
//         console.log(`Mongodb connected with server: ${data.connection.host}`);
//     }).catch((err)=>{
//         console.log(err);
//     })
// }

// module.exports = connectDatabase
//mongodb+srv://mehnazfazal952:<password>@manzoku.knyfgjl.mongodb.net/?retryWrites=true&w=majority