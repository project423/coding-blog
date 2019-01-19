var express = require("express");
var router = express.Router();
var Blog = require("../models/blogs");


//BLOGS
// Route Route
router.get("/", function(req, res){
   Blog.find({}, function(err, blogs){
       if(err){
           console.log("ERROR!");
       } else {
          res.render("blogs/index", {blogs: blogs, currentUser:req.user}); 
       }
   });
});


// NEW ROUTE
router.get("/new",isLoggedIn, function(req, res){
    res.render("blogs/new");
});

// CREATE ROUTE
router.post("/",isLoggedIn, function(req, res){
    // create blog
    
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("blogs/new");
        } else {
            //then, redirect to the index
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
router.get("/:id", function(req, res){
   Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           //console.log(foundBlog);
           res.render("blogs/show", {blog: foundBlog});
       }
   })
});
// EDIT ROUTE
router.get("/:id/edit",isLoggedIn,  function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("blogs/edit", {blog: foundBlog});
        }
    });
})


// UPDATE ROUTE
router.put("/:id" ,isLoggedIn,  function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if(err){
          res.redirect("/blogs");
      }  else {
          res.redirect("/blogs/" + req.params.id);
      }
   });
});

// DELETE ROUTE
router.delete("/:id", isLoggedIn,function(req, res){
   //destroy blog
   Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs");
       }
   })
   //redirect somewhere
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;