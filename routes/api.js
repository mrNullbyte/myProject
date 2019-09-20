var express = require('express');
var router = express.Router();
var app = express()
let User = require('../model/user')
let Article = require('../model/article')
// let generalTools = require('../tools/general-tools');
let ac = require('../tools/ac');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const passport = require('passport');
const auth = require('../tools/auth');
const admin = require('./admin');
const user = require('./user');
var path = require('path');
var bodyParser = require('body-parser')
app.use( express.static( "public" ) );
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
//avatar upload
var storage = multer.diskStorage({
  destination:'./public/uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname+'__'+Date.now()+path.extname(file.originalname))
  },
  // filename: function (req, file, cb) {
  //   cb(null,file.originalname)
  // }
})
var upload = multer({ storage: storage }).single('avatar');
// var storage = multer.memoryStorage()


router.get('/register',(req,res)=>{
  res.render('register', { title: 'register' });
})
router.post('/register', async (req, res, next) => {
  try {
    //console.log(req.body);
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: req.body.password,
      Gender: req.body.Gender,
      mobile: req.body.phoneNumber,
      avatar:"",
      // avatar: req.body.avatar,
      created_at: Date.now()
    })
    user = await user.save();
    // res.json(user);
    res.render('login', {
      title: 'ok',msg:null,success:true
    });
  } catch (err) {
    return res.json({
      success: false,
      msg: "user not save!!!"
    });
  }
  // return res.json({
  //   success: true,
  //   msg: 'user added!!!',
  //   user
  // })
})



// initialize
router.put('/addAdmin', (req, res) => {
  User.findOne({role: 'admin'}, (err, existAdmin) => {
    if (err) return res.json({success: false, msg: 'error'});
    if (existAdmin) return res.status(404).send('NOT FOUND!!!');

    new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName:req.body.userName,
      password: req.body.password,
      avatar: "",
      role: 'admin',
      mobile: req.body.mobile,
      Gender:req.body.Gender
    }).save((err, user) => {
      if (err) return res.json({success: false, msg: 'error'});

      return res.json({success: true, user})
    })

  })
})


// get login page
router.get('/login', function(req, res, next) {
  res.render('login', {msg: null});
});



//authentication
router.post('/panel', passport.authenticate('local'), async (req, res, next) => {


  if (req.user.role === 'user') return res.render('userPanel', {title: 'user panel', user: req.user})
  else return res.render('adminPanel', {
    title: 'admin panel', 
    user: req.user,
    file:null,
    message:null,
    
  })


});

// redirect to panel
router.get('/panel', (req, res, next) => {
  console.log(req.user);
  if(req.user.role==='user'){
    return res.render('userPanel', {
        title: 'user panel', 
        user: req.user,
        file:null,
        message:null,
        
      })
  }else{
    return res.render('adminPanel', {
        title: 'admin panel', 
        user: req.user,
        file:null,
        message:null,
        
      })
  }

  


});


router.post('/uploads', function (req, res, next) {
  upload(req, res, (err) =>{

    if(err){
      res.render('userPanel',{
        file:null,
        message : err,
        title:null
      })
    }else{
      if(req.file==undefined){
        res.render('userPanel',{
          file:null,
          message : "No file selected!!!",
          title:null
        })
      }else{
        res.render('userPanel',{
          message : "File uploaded!!!",
          file:`${req.file.filename}`,
          title:null
        })
        User.findOneAndUpdate({_id:req.user._id},{
          
          $set: {
              avatar:req.file.filename
          }
          }, (err, result) => {
          console.log(result);
          })
      }
    }

  }); 
});

// router.post('/uploads', function (req, res, next) {
//   upload(req, res, (err) =>{

//     if(err){
//       res.render('adminPanel',{
//         file:null,
//         message : err
//       })
//     }else{
//       if(req.file==undefined){
//         res.render('adminPanel',{
//           file:null,
//           message : "No file selected!!!"
//         })
//       }else{
//         res.render('adminPanel',{
//           message : "File uploaded!!!",
//           file:`${req.file.filename}`
//         })
//         User.findOneAndUpdate({role:"admin"},{
          
//           $set: {
//               avatar:req.file.filename
//           }
//           }, (err, result) => {
//           console.log(result);
//           })
//       }
//     }

//   }); 
// });




router.use('/admin', auth.isLogin, ac.routeController(['admin']), admin);
router.use('/user', auth.isLogin, ac.routeController(['user']), user);






// // login user
// router.post('/panel', (req, res) => {
//   console.log(req.body);


//   User.findOne({mobile: req.body.mobile, password: req.body.password}, (err, user) => {
//     if (err) return res.render('login', {msg: 'error in login process'});
//     if (!user) return res.render('login', {msg: 'mobile or password is wrong'});
  
//     res.render('panel', {title: 'dashboard', user});
//   })
// });






// router.post('/addUser',  async (req, res) => {
//     console.log(req.body);
    
//     if (!req.body.firstName || !req.body.mobile || !req.body.lastName || !req.body.password) {
//         return res.json({success: false, msg: "empty field"});
//     };

//     if (req.body.password.length < 8 || req.body.password.length > 20) {
//       return res.json({success: false, msg: "password length"});
//     }

//     User.findOne({mobile: req.body.mobile}, (err, existUser) => {
      
//       if (err) return res.json({success: false, msg: 'user not save', err});
//       if (existUser) return res.json({success: false, msg: 'mobile number already token'})

//       const NEW_USER = new User({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         password: req.body.password,
//         mobile: req.body.mobile
//       });

//       NEW_USER.save((err, user) => {
//         if (err) return res.json({success: false, msg: 'user not save', err});
  
//         return res.json({success: true, msg: 'user added', user})
//       });
//     });
// });

module.exports = router;
