/*var mongoose = require("mongoose");
var Blog = require("./models/blogs");
var Comment =require("./models/comments");

var data = [
    {
        title: "Live your life", 
        image:"https://images.unsplash.com/photo-1544889871-ae54019ec5ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", 
        body:"This looks like a really healthy body"
        
    },
    {
        title: "Happy!", 
        image:"https://images.unsplash.com/photo-1544896916-d9b02de466cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", 
        body:"This looks like a really healthy body"
        
    },
    {
        title: "Ocean", 
        image:"https://images.unsplash.com/photo-1544886324-044d2b1e5820?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", 
        body:"This looks like a really healthy body"
        
    }
    
    ]

function seedDB(){
    //remove all campgrounds
    Blog.remove({}, function(err){
        if(err){
            console.log(err)
                }
            console.log("Removed blog post")
             data.forEach(function(seed){
            Blog.create(seed, function(err, blog){
                if(err){
                    console.log(err)
                }else{
                    console.log("added a blogpost")
                    //create a comment
                    Comment.create(
                        {
                        text:"This post is awesome but I wish it was written by Shakespeare",
                        author:"Homer"
                    }, function(err,comment){
                        if(err){
                            console.log(err);
                        }
                        blog.comments.push(comment);
                        blog.save();
                        console.log("Created new Comment")
                    })
                }
            })
        });
}); 

//add a few blog posts
  
}

module.exports = seedDB;*/