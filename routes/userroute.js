const Student = require("../models/usermodel");
const route = require('express').Router();


route.post('/addStudent',async(req,res)=>{
    try{
        const student = new Student({
            Name:req.body.Name,
            Rollno:req.body.Rollno,
            Gender:req.body.Gender,
            Standard:req.body.Standard,
            Age:req.body.Age
        });
        const result = await student.save();
        if(result){
            res.status(200).json({status:true,message:'Success'});
        }else{
            res.status(400).json({status:false,message:'failed'});
        }

    }catch(err){
        console.log("Error",err)
    }
});
//Getting students based on Gender
route.get('/getStudent',async(req,res)=>{
    try{
        let gender = req.body.Gender;
        //const result =await Student.find({Gender:req.body.Gender}).exec();
        let query = [{$match:{$and:[{Gender:gender},{Standard:req.body.Standard}]}}]; //stage match
     
        const result = await Student.aggregate(query);
    if(result){
        res.status(200).json({status:true,message:'success',result:result});
    }else{
        res.status(400).json({status:false,message:'failed'});
    }
    }catch(err){
        console.log(err);
    }
    
})



route.get('/getByGroup',async(req,res)=>{
    try{
       let query = [{
        $group:{_id:{Standard:'$Standard',Name:'$Name'}}  //group stage
    }]
       const result = await Student.aggregate(query);
       if(result){
         res.status(200).json({status:true,message:'success',result:result})
       }else{
        res.status(400).json({status:false,message:'Failed'})
       }
    }catch(err){
        console.log("Error",err);
    }
});

route.get('/getByGroupAndMatch',async(req,res)=>{
    try{
        let query = [
            //stage 1
              //{$match:{'Gender':req.body.Gender}},
              //stage 2
              {$group:{_id:{Gender:'$Gender',English:'$Age'}}},
              {$match:{'_id.Gender':req.body.Gender}},
            ];
        const result = await Student.aggregate(query);
        if(result){
            res.status(200).json({status:true,message:'success',result:result})
          }else{
           res.status(400).json({status:false,message:'Failed'})
          }
    }catch(err){
        console.log("Error",err);
    }
});

route.get('/getByCount',async(req,res)=>{
    try{
        //const result = await Student.find().count();
        let query = [
            {$match:{SS:{$gte:'90'}}},//stage 1
            {$group:{_id:{Age:'$Age'}}},//stage 2
            {$count:'Total'}  //stage 3
        ]
        const result = await Student.aggregate(query);
        if(result){
            res.status(200).json({status:true,message:'success',result:result})
          }else{
           res.status(400).json({status:false,message:'Failed'})
          }


    }catch(err){
        console.log("Error",err);
    }

});

route.get('/getBySort',async(req,res)=>{
    try{
        let query = [
            {$match:{Gender:{$ne:'male'}}},
            {$sort:{Rollno:1,Name:1}   //1-ascending,-1-decesding
        }]
        const result = await Student.aggregate(query);
        if(result){
            res.status(200).json({status:true,message:'success',result:result})
          }else{
           res.status(400).json({status:false,message:'Failed'})
          }


    }catch(err){
        console.log((err));
    }
})
route.get('/getSum',async(req,res)=>{
    try{
        let query = [{
            $group:{_id:'$Gender',
            //count:{$sum:1}}
            avgEnglishMarks:{$avg:'$Age'}
        }
        }
        
        ]
        const result = await Student.aggregate(query);
        if(result){
            res.status(200).json({status:true,message:'success',result:result})
          }else{
           res.status(400).json({status:false,message:'Failed'})
          }


    }catch(err){
        console.log(err);
    }
})
//Unary Operators $type,$or,$lt,$gt,$and,$multiply

route.get('/Unary',async(req,res)=>{
    try{
        let query = [
            {
                $project:{
                    _id:0,Name:1,Age:{$type:"$Age"},Name:{$type:"Name"}
                }
    }]
        const result = await Student.aggregate(query);
        if(result){
            res.status(200).json({status:true,message:'success',result:result})
          }else{
           res.status(400).json({status:false,message:'Failed'})
          }


    }catch(err){
        console.log(err);
    }
})


module.exports = route;