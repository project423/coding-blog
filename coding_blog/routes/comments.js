var express = require("express");
var router = express.Router({mergeParams: true});
var Blog = require("../models/blogs");
var Comment = require("../models/comments");

//Comments New
router.get("/new",function(req,res){
    //find campground by ID
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {blog:blog});
        }
    })
   
    
    
});

//Comments Create
router.post("/", function(req,res){
    //look up blog using ID
    Blog.findById(req.params.id, function(err,blog){
        if(err){
            console.log(err);
            res.redirect("/blogs")
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                }else{
                    blog.comments.push(comment);
                    blog.save();
                    res.redirect("/blogs/"+ blog._id)
                }
            })
        }
    })
    
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else{
           res.redirect("/blogs/" +req.params.id);
       }
   }) 
});


//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;


