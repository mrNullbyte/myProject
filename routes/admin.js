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
  


// router.get('/getAllUsers', (req, res) => {  
//   res.render('getAllUsers');
// })

router.get('/showGetAllUsers', (req, res) => {
  console.log("users");
  User.find({role:"user"},{_id:0,__v:0,password:0,created_at:0,update_at:0}, (err, users) => {

    if (err) return res.json({success: false, msg: 'can not get data'})
    
    return res.json({success: true, users});
  })  
}) 

// router.post('/addUser', async (req, res) => {
//   console.log(req.body);
//   let newUser = new User({
//       firstName:req.body.firstname,
//       lastName:req.body.lastname,
//       mobile:req.body.mobile,
//       password:req.body.mobile,
//       role:"user"
//   })
//   let user;
//   try {
//       user = await newUser.save();
//   } catch (err) {
//       return res.json({
//           success: false,
//           msg: "user not save!!!"
//       });
//   }
//   return res.json({
//       success: true,
//       msg: 'user added!!!',
//       user
//   })

// })

router.get('/', function(req, res) {////
  console.log(""); 
  User.findOne({role:"admin"},{__v:0,_id:0,created_at:0,update_at:0}, (err, admin) => {
    // res.json(users);
    // console.log(users);
    return res.json({success: true, admin}); 
});
});

router.get('/show', function(req, res) {////
  console.log("show"); 
  User.findOne({role:"admin"},{__v:0,_id:0,created_at:0,update_at:0}, (err, users) => {
    // res.json(users);
    // console.log(users);
    return res.json({success: true, users}); 
});
});

router.post('/editAdmin', (req, res) => {////
  console.log("edit Admin");
  console.log(req.body);
  if (req.body.userName === User.find({
          userName: req.body.userName
      })) {
      console.log("user exist!!!");

  }
  User.findOneAndUpdate({
      role: "admin"
  }, {
      $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          mobile: req.body.mobile,
          password: req.body.password,
          Gender: req.body.Gender
      }
  }, (err, result) => {
      console.log(result);
  })
});








////////////////////////////////////////////////////////////////////////////////////////////////////////////////


router.get('/addArticleAdmin', (req, res) => {////
  res.render('addArticleAdmin', {
      title: "add Article Admin"
  })
});
// router.get('/panel', (req, res) => {////
//   // res.redirect('../panel')
//   console.log(req.session.passport);
//   // console.log(req.user);
//   // if(req.session.passport){
//   //   res.redirect('../api')
//   // }
  
// });
router.post('/addNewCommetn',(req, res) => {////
  console.log("****************************Start addNewCommentAdmin****************************");
  console.log(req.body);
  console.log(req.user);
  // con  sole.log(req);
  
  console.log("****************************End addNewCommentAdmin****************************");

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

router.get('/viewCommentAdmin', (req, res) => {////
  console.log("view comment Admin !!!!! ");
  // console.log(req.user);
  // let userInfo = req.user;
  Comments.find({}, (err, comment) => {
      console.log(comment);
      if (err) return res.json({
          success: false,
          msg: 'can not get comment'
      })
      // res.render('addArticle',{title:"add Article",comment})
      return res.json({
          success: true,
          comment,
          // userInfo
      });
  })
});


router.delete('/deleteAdminCommetn', (req, res) => {////
  console.log("delete comment Admin !!!!! ");
  console.log(req.body);
  Comments.findOneAndRemove({_id:req.body.commentID}).exec((err, comment) => {
      console.log(comment);
      if (err) return res.json({
          success: false,
          msg: 'can not get comment'
      })
      return res.json({
          success: true,
          comment
      });
  })
});
// redirect to panel
// router.get('/panel', (req, res, next) => {


//   return res.render('adminPanel', {
//    title: 'admin panel', 
//    user: req.user,
//    file:null,
//    message:null,
   
//  })


// });


router.post('/addNewArticle',upload.single('artimg'), (req, res) => {////
  console.log("addNewArticleAdmin");
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
      res.redirect('addArticleAdmin')
      // return res.json({
      //     success: true,
      //     article
      // })
  })

});

router.get('/viewArticleAdmin', (req, res) => {////
  console.log("view Article Admin !!!!! ");
  
  Article.find({author_ID: req.user._id}).populate('author_ID').exec(

    (err, posts)=>{
        return res.json({
            success: true,
            posts,
            
        });
     }
  // res.render('addArticle',{title:"add Article",posts})
 
)
});
router.get('/viewAllArticleAdmin', (req, res) => {////
  console.log("view All Article Admin !!!!! ");
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

router.post('/editPosts',upload.single('artimg'), (req, res) => {
  console.log("edit post");
  console.log(req.body);
  console.log(req.file);


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
router.post('/deleteAdminPost', (req, res) => {
  console.log("delete admin post!!!!");
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
                res.render('singlePagePostAdmin', {
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



////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// router.get('/logout', (req, res)=>{
//   req.session.destroy();
//   res.send("logout!!!");
// })
// router.put('/editUserAdmin', (req, res) => {
//   console.log("edit admin");
//   console.log(req.body);
  
//   User.findOneAndUpdate({role:"admin"},{
//       $set: {
//           firstName : req.body.firstname,
//           lastName : req.body.lastname,
//           userName : req.body.userName,
//           password  : req.body.password,
//           // role : "admin",
//           mobile : req.body.mobile
//       }
//   }, (err, result) => {
//       console.log(result);
//   })
// });

router.post('/editUserA', (req, res) => {
  console.log("edit users");
  console.log(req.body);
  
  User.findOneAndUpdate({role:"user",userName:req.body.userName},{
      $set: {
          firstName : req.body.firstName,
          lastName : req.body.lastName,
          userName : req.body.userName,
          mobile : req.body.mobile,
          Gender : req.body.Gender,
      }
  }, (err, result) => {
      console.log(result);
  })
});

router.post('/userResetPassword', (req, res) => {
  
  console.log(req.body);
  
  User.findOneAndUpdate({userName:req.body.userName,role:'user'},{
    
      $set: {
          password : req.body.mobile
      }
  }, (err, users) => {
      console.log(users);
      res.json({success: true, users})
  })
  console.log("change password user!!!!");
});


router.post('/deleteUserA', (req, res) => {
  console.log("delete users ad");
  console.log(req.body);
  
  User.deleteOne({ userName: req.body.userName, role:'user' },{
    // console.log(err);
    // console.log("deleted user!!!");
  }, (err, users) => {
    console.log(users);
    res.json({success: true, users})
})
  
});

module.exports = router;
