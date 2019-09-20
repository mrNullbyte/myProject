var express = require('express');
var router = express.Router();
var app = express();
const fs = require('fs');
const User = require('../model/user');
const Article = require('../model/article');
const Comments = require('../model/comment');
var bodyParser = require('body-parser')
app.use( express.static( "public" ) );
app.use(bodyParser.urlencoded({ extended: false }))
var path = require('path');
// let generalTools = require('../tools/general-tools');
const passport = require('passport');
const auth = require('../tools/auth');
var multer = require('multer')
var upload = multer({
    dest: 'uploads/articleImage/'
})

//avatar upload 
var storage = multer.diskStorage({
    destination:'./public/uploads/articleImage',
    filename: function (req, file, cb) {
      cb(null, file.fieldname+'__'+Date.now()+path.extname(file.originalname))
    },
    // filename: function (req, file, cb) {
    //   cb(null,file.originalname)
    // }
  })
  var upload = multer({ storage: storage });
  // var storage = multer.memoryStorage()
  



router.get('/show', (req, res) => {
    // console.log(req.user);

    console.log("show users");
    User.findOne({
        role: "user",
        mobile: req.user.mobile
    }, {
        _id: 0,
        __v: 0,
        created_at: 0,
        update_at: 0
    }, (err, users) => {

        if (err) return res.json({
            success: false,
            msg: 'can not get data'
        })

        return res.json({
            success: true,
            users
        });
    })
});

router.post('/editUsers', (req, res) => {
    console.log("edit users");
    console.log(req.body);
    if (req.body.userName === User.find({
            userName: req.body.userName
        })) {
        console.log("user name duplicated!!!");

    }
    User.findOneAndUpdate({
        role: "user"
    }, {
        $set: {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            userName: req.body.userName,
            mobile: req.body.mobile,
            password: req.body.password,
            Gender: req.body.Gender
        }
    }, (err, result) => {
        console.log(result);
    })
});




router.delete('/deleteUser', (req, res) => {
    console.log(req.body.mobile);

    User.deleteOne({
        mobile: req.body.mobile
    }, (err, result) => {
        res.json({
            msg: "deleted!!!",
            result
        })
    });
});

router.get('/addArticle', (req, res) => {
    res.render('addArticle', {
        title: "add Article"
    })
});


router.post('/addNewArticle',upload.single('artimg'), (req, res) => {
    // upload(req, res, (err) =>{
    //     // res.send(req.file)
        // console.log(req.file);  
    // })
    // console.log(images);
    console.log("addNewArticle");
    // console.log(req);
    
    // console.log(req.body);  
    
    new Article({
        author_ID: req.user._id,
        articleTitle: req.body.title,
        articleContent: req.body.content,
        articleImage: req.file.filename ,
        views: "10"
    }).save((err, article) => {
        if (err) return res.json({
            success: false,
            msg: err
        });
        console.log("save");
        console.log(err);
        res.redirect('addArticle')
        // return res.json({
        //     success: true,
        //     article
        // })
    })

});

router.get('/viewArticle', (req, res) => {
    console.log("view Article !!!!! ");
    console.log(req.user);
    let userInfo = req.user;
    Article.find({
        author_ID: req.user._id
    }, (err, posts) => {
        console.log(posts);
        if (err) return res.json({
            success: false,
            msg: 'can not get posts'
        })
        // res.render('addArticle',{title:"add Article",posts})
        return res.json({
            success: true,
            posts,
            userInfo
        });
    })
});
router.get('/viewAllArticleUser', (req, res) => {////
    console.log("view All Article User !!!!! ");
    // console.log(req.user);
    Article.find({}).populate('author_ID').exec(

            (err, posts)=>{
                return res.json({
                    success: true,
                    posts,
                    
                });
             }
          // res.render('addArticle',{title:"add Article",posts})
         
        )
   
  
    
});

router.get('/viewArticleSort', (req, res) => {
    console.log(req.params);
  
    console.log("view Article sorted !!!!! ");
  
    Article.find({}).sort({
            'created_at': 'desc'
        }).populate('author_ID').exec(

            (err, posts)=>{
                return res.json({
                    success: true,
                    posts,
                    
                });
             }
          // res.render('addArticle',{title:"add Article",posts})
         
        )
});

// router.get('/viewArticleSort', (req, res) => {
//     console.log(req.params);

//     console.log("view Article sorted !!!!! ");
//     console.log(req.user);
//     let userInfo = req.user;

//     Article.find({
//             author_ID: req.user._id
//         }).sort({
//             'created_at': 'desc'
//         })
//         .exec(function (err, posts) {
//             console.log(posts);
//             if (err) return res.json({
//                 success: false,
//                 msg: 'can not get posts'
//             })
//             // res.render('addArticle',{title:"add Article",posts})
//             return res.json({
//                 success: true,
//                 posts,
//                 userInfo
//             });

//         });
// });

router.put('/editPosts', (req, res) => {
    console.log("edit post");
    console.log(req.body.titlePost);

    Article.findOneAndUpdate({
        _id: req.body.postId
    }, {
        $set: {
            articleTitle: req.body.titlePost,
            articleContent: req.body.contentPost
        }
    }, (err, result) => {
        console.log(result);
    })
});
router.post('/deleteUserPost', (req, res) => {
    console.log("delete user post!!!!");
    console.log(req.body);

    Article.deleteOne({
        _id: req.body.postId,
        
    }, function (err) {
        console.log(err);
    });
    
});
router.get('/showpost:id', (req, res) => {
    Article.find({
        _id: req.params.id
    }, (err, posts) => {
        console.log(posts);
        User.find({_id:posts[0].author_ID}, (err, user) => {
          console.log(user);
        
              Comments.find({article_ID:req.params.id}).populate('author_ID').exec(
  
                (err, comment)=>{
                  res.render('singlePagePostUser', {
                      title: "show posts",
                      posts,
                      user,
                      comment
                  })
                 }
  
  
              ) 
        })
  
  });
  })
// router.get('/showpost:id', (req, res) => {
//     let user = [req.user];
//     console.log(user);    
//     Article.find({
//         _id: req.params.id
//     }, (err, posts) => {
//         console.log(posts);
//         res.render('singlePagePost', {
//             title: "show posts",
//             posts,
//             user
//         })
//     })

// });

router.post('/addNewCommetnUser',(req, res) => {////
    console.log("****************************Start addNewCommentUser****************************");
    console.log(req.body);
    console.log(req.user);
    // con  sole.log(req);
    
    console.log("****************************End addNewCommentUser****************************");
  
    new Comments({
        author_ID: req.user._id,
        article_ID: req.body.postId,
        comment: req.body.comment,
        
    }).save((err, commnet) => {
        if (err) return res.json({
            success: false,
            msg: err
        });
        console.log("save commnet");
        console.log(err);
        // res.redirect('addArticleAdmin')
        return res.json({
            success: true,
            commnet
        })
    })
  
  });
  
//   router.get('/viewCommentUser', (req, res) => {////
//     console.log("view comment User !!!!! ");
//     // console.log(req.user);
//     // let userInfo = req.user;
//     Comments.find({}, (err, comment) => {
//         console.log(comment);
//         if (err) return res.json({
//             success: false,
//             msg: 'can not get comment'
//         })
//         // res.render('addArticle',{title:"add Article",comment})
//         return res.json({
//             success: true,
//             comment,
//             // userInfo
//         });
//     })
//   });


module.exports = router;