const Course = require('../models/Course')
const Category = require('../models/Category')
const { findById } = require('../models/User')
const User = require('../models/User')
const { options } = require('../routes/pageRoutes')

exports.createCourse = async (req,res) => {
    
   
   try{
    const course = await Course.create({
      name: req.body.name,
      description : req.body.description,
      category : req.body.category,
      user: req.session.userID
    })
    req.flash("success",`${course.name} has been created successfully`)
    res.status(201).redirect('/courses')
   }
   catch(error){
      req.flash("error",`someting happened ${error} `)
      res.status(400).redirect('/courses')
   }
    
}

exports.getAllCourses = async (req,res) => {
    
   
    try{
     const categorySlug = req.query.categories
     const query = req.query.search
     const category = await Category.findOne({slug:categorySlug})
     let filter = {}
     if (categorySlug)
     {
        filter = {category:category._id}
     }
     if (query){
         filter = {name:query}
     }

     if (!categorySlug && !query){
       
            filter.name="";
            filter.category=null;
       
     }

     const courses = await Course.find({
       $or:[
         {name:{$regex:'.*'+ filter.name + '.*',$options:'i'}},
         {category:filter.category}
       ]
     }).sort('-createdAt').populate('user');
     const categories = await Category.find();
     res.status(200).render('courses',{courses,categories,
        page_name: "courses"
     })
    }
    catch(error){
     res.status(400).json({
         status: "fail",
         error,
     })
    }
     
 }

 exports.getCourse = async (req,res) => {
    
   
    try{
      const user = await User.findById(req.session.userID)
     const course = await Course.findOne({slug:req.params.slug}).populate('user');
     const categories = await Category.find();
     res.status(200).render('course',{
         course,
        page_name: "course",
        user,
        categories
     })
    }
    catch(error){
     res.status(400).json({
         status: "fail",
         error,
     })
    }
     
 }

 exports.enrollCourse = async (req,res) => {
   try{
      const user = await User.findById(req.session.userID)
      await user.courses.push({_id:req.body.course_id})
      await user.save();
    const course = await Course.findOne({slug:req.params.slug}).populate('user');
    res.status(200).redirect('/users/dashboard')
   }
   catch(error){
    res.status(400).json({
        status: "fail",
        error,
    })
   }
    
}

exports.relaseCourse = async (req,res) => {
   try{
      const user = await User.findById(req.session.userID)
      await user.courses.pull({_id:req.body.course_id})
      await user.save();
    const course = await Course.findOne({slug:req.params.slug}).populate('user');
    res.status(200).redirect('/users/dashboard')
   }
   catch(error){
    res.status(400).json({
        status: "fail",
        error,
    })
   }
    
}
exports.deleteCourse = async (req,res) => {
   try{
      const course = await Course.findOneAndDelete({slug:req.params.slug})
      req.flash("error",`${course.name} has been deleted successfully`)
      res.status(200).redirect('/users/dashboard')

   }
   catch(error){
    res.status(400).json({
        status: "fail",
        error,
    })
   }
    
}

exports.updateCourse = async (req,res) => {
   try{
      const course = await Course.findOne({slug:req.params.slug})
      course.name=req.body.name;
      course.category=req.body.category;      
      course.description=req.body.description;
      course.save()

      req.flash("success",`${course.name} has been updated successfully`)
      res.status(200).redirect('/users/dashboard')

   }
   catch(error){
    res.status(400).json({
        status: "fail",
        error,
    })
   }
    
}