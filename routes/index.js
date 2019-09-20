var express = require('express');
var router = express.Router();
const Article = require('../model/article');
const User = require('../model/user');
const Comments = require('../model/comment');
/* GET home page. */
function gregorian_to_jalali(gy,gm,gd){
  var g_d_m,jy,jm,jd,gy2,days;
  g_d_m=[0,31,59,90,120,151,181,212,243,273,304,334];
  if(gy > 1600){
   jy=979;
   gy-=1600;
  }else{
   jy=0;
   gy-=621;
  }
  gy2=(gm > 2)?(gy+1):gy;
  days=(365*gy) +(parseInt((gy2+3)/4)) -(parseInt((gy2+99)/100)) +(parseInt((gy2+399)/400)) -80 +gd +g_d_m[gm-1];
  jy+=33*(parseInt(days/12053)); 
  days%=12053;
  jy+=4*(parseInt(days/1461));
  days%=1461;
  if(days > 365){
   jy+=parseInt((days-1)/365);
   days=(days-1)%365;
  }
  jm=(days < 186)?1+parseInt(days/31):7+parseInt((days-186)/30);
  jd=1+((days < 186)?(days%31):((days-186)%30));
  return [jy,jm,jd];
 }
router.get('/', function(req, res, next) {
 
  Article.find({}).populate('author_ID',{password:0}).exec(

    (err, posts)=>{
      // let i=0;
      // for( i =0 ; i < posts.length;i++){
      //     let dt = new Date(posts[i].created_at);
      //     posts[i].created_at = gregorian_to_jalali(dt.getFullYear(), dt.getMonth() + 1, dt.getDate())
      // }
      res.render('index', { title: 'blog' ,success: true,posts});
        
    }       
)


});

// router.get('/singel-post-member', function(req, res, next) {

//   Article.find({}).populate('author_ID',{password:0}).exec(

//     (err, posts)=>{
//       res.render('singel-post-member', { title: 'single post' ,success: true});
        
//     }       
// )


// });

router.get('/singel-post-member/:id', (req, res) => {

  Article.find({_id: req.params.id}).populate('author_ID',{password:0}).exec(

    (err, posts)=>{
      Comments.find({article_ID:req.params.id}).populate('author_ID').exec(

        (err, comment)=>{
          // res.render('singel-post-member', {
          //     title: "show posts",
          //     posts,
          //     user,
          //     comment
          // })
          res.render('singel-post-member', { title: 'single post' ,success: true,posts,comment});

         }


      ) 
        
    })
//   Article.find({
//       _id: req.params.id
//   }, (err, posts) => {
//       console.log(posts);
//       User.find({_id:posts[0].author_ID}, (err, user) => {
//         console.log(user);
      
            
//       })

// });
})

router.get('/logout', function(req, res) {
  req.logout();
  console.log("logout");
  console.log(req.session.passport);
  res.redirect('./api/login') 
    
});

module.exports = router;
