const express=require("express")
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const path=require("path");
const {check,validationResult} =require("express-validator");



const Todo=require("./models/todos");
const HttpError=require("./models/HttpError");
const User=require("./models/user"); 
const checkAuth=require("./check-auth");

const app=express();

app.use(bodyParser.json());

app.use(express.static(path.join('public')))


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
//     res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
//     res.setHeader("Access-Control-Allow-Origin", "*");
// res.setHeader("Access-Control-Allow-Credentials", "true");
// res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,DELETE,PUT");
// res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     next();
// });


app.post("/signup",
    [
        check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({min:6})
    ],
    async(req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            next(new HttpError("Invalid inputs passed",422));
        }
    const {name,email,password}=req.body;

    let existinqUser;
    try{
        existinqUser=await User.findOne({email:email});
    }
    catch(err){
        return next(new HttpError("SignUp failed,please try again later",500));
    }

    if(existinqUser){
        return next(new HttpError("User exists",422));
    }

    let hashedPassword;
    hashedPassword= await bcrypt.hash(password,12);

    const newUser=new User({
        name,
        email,
        password: hashedPassword,
        todos:[]
    });

        try{
            await newUser.save();
        }catch(err){
            return next(new HttpError("Creating User failed",500));
        }

        let token;
        token=jwt.sign({userId:newUser.id,email:newUser.email},
            "Secret_Key",
            {expiresIn:"1h"}
            )


        res.json({userId:newUser.id,email:newUser.email,token:token});

});

app.post("/login",async(req,res,next)=>{
    const {email,password}=req.body;
    
    let existinqUser;

    try{
        existinqUser=await User.findOne({email:email});
    }
    catch(err){
        return next(new HttpError("SignUp failed,please try again later",500));
    }

    if(!existinqUser){
        return next(new HttpError("Ivalid credentials",401));
    }

    let isValidPassword= await bcrypt.compare(password,existinqUser.password)
    
    if(!isValidPassword){
        return next(new HttpError("Ivalid credentials",401));
    }

    let token;
    token=jwt.sign({userId:existinqUser.id,email:existinqUser.email},
        "Secret_Key",
        {expiresIn:"1h"}
        )

    res.json({userId:existinqUser.id,email:existinqUser.email,token:token});


     
})

// app.use(checkAuth);

app.get("/list/:uid",async(req,res,next)=>{
    const userId=req.params.uid;

    let todos;
    try{
         todos=await Todo.find({creator:userId});
    }
    catch(err){
        console.log(err);
        const error=new new HttpError("Couldnt able to load TodoList",500);
       return next(error);
    }

    // if(!todos || todos.length===0){
    //     const error=new new HttpError("Couldnt find the todos",404);
    //    return next(error);
    // }

    res.json({todos:todos.map(todo=>todo.toObject())});

    // let userWithtodos;
    // try{
    //     userWithtodos=await User.findById(userId).populate("todos");
    // }
    // catch(err){
    //         console.log(err);
    //         const error=new new HttpError("Couldnt able to load TodoList",500);
    //        return next(error);
    //     }
    //     if(!userWithtodos || userWithtodos.todos.length===0){
    //             const error=new new HttpError("Couldnt find the todos",404);
    //            return next(error);
    //         }
    //         res.json({todos:userWithtodos.todos.map(todo=>todo.toObject())});

});

app.post("/add",checkAuth,async(req,res,next)=>{
   const {title,creator}=req.body;

    const newTodo=new Todo({
        title,
        creator
    });
    
    let user;

    try{
        user=await User.findById(creator);
    }catch(err){
        return next(new HttpError("adding todo failed",500));
    }

    if(!user){
        return next(new HttpError("Couldnt find user",404));
    }

    if(newTodo.creator.toString() !==req.userData.userId){
        return next(new HttpError("Your are not allowed to add ",401));

    }


    // let response;
    try{
        //  response=await newTodo.save();
        const sess=await mongoose.startSession();
        sess.startTransaction();
        await newTodo.save({session:sess});
        user.todos.push(newTodo);
        await user.save({session:sess});
        await sess.commitTransaction();
    }
    catch(err){
        console.log(err);
        const error=new HttpError("Couldnt able to store new Todo",500);
       return next(error);
    }
    // console.log(response); 
    res.json({todo: 'todo added successfully'});


});

app.delete("/todo/:id",checkAuth,async(req,res,next)=>{
    const id=req.params.id;

    let todo;
    try{
        todo=await Todo.findById(id).populate("creator");
    }
    catch(err){
        console.log(err);
        const error=new HttpError("Something went wrong",500);
        return next(error);
    }

    if(!todo){
        const error=new HttpError("todo doesnt exist",404);
        return next(error);
    }

//    console.log(todo.creator._id.toString());
//    console.log(req.userData.userId);

    if(todo.creator._id.toString() !==req.userData.userId){
        return next(new HttpError("Your are not allowed to delete ",403));

    }

    try{
        const sess=await mongoose.startSession();
        sess.startTransaction();
       await todo.remove({session:sess});
        todo.creator.todos.pull(todo);
        await todo.creator.save({session:sess});
        await sess.commitTransaction();


    }catch(err){
        console.log(err);
        const error=new HttpError("Something went wrong",500);
        return next(error);
    }



    res.json({respose: 'todo deleted successfully'})

});

app.use((req,res,next)=>{
    res.sendFile(path.resolve(__dirname,'public','index.html'))
});


app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message:error.message || "An unknow error occured"});
});



mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-0cbra.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    app.listen(process.env.PORT || 5000,()=>{
        console.log("Server started");
    });
})
.catch(err=>{
    console.log(err);
});



