const express = require('express')
const router = express.Router()
const Users = require('../models/user')
// 加密插件
const bcrypt = require('bcrypt')
// 头像插件
const gravatar = require('gravatar');
// token 插件
var jwt = require('jsonwebtoken');

const keys = require('../config/mongokey').addPribateKey

const passPort = require('passport')

// $router GET profile/test
// @desc 返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
  res.json({msg: 'profiles 测试'})
})

// $router POST user/register 注册
// @desc 返回的请求的json数据
// @access public
router.post('/register', (req, res) => {
  // console.log(req.body);
  // 查询数据库中是否拥有邮箱
  Users.findOne({phone:req.body.email})
      .then((user) => {
        if(user) {
          return res.status(400).json({msg:'邮箱已被注册'})
        }else {
          const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
          const newUser = new Users({
            name: req.body.name,
            email:req.body.email,
            avatar,
            password:req.body.password,
            idCart: req.body.idCart
          })

      const saltRounds = 10;
      // 加密
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if (err) throw err;

            newUser.password = hash

            newUser.save()
                   .then(user => res.json(user))
                   .catch(err => console.log(err))
        });
    });
    }
  })
})

// $router POST user/login 登录
// @desc 返回的请求的json数据
// @access public
router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const idCart = req.body.idCart  
  Users.findOne({email, idCart})
       .then(user => {
         if (!user) {
           return res.status(404).json({message: '用户不存在!'})
         }
         console.log('222');
         
        //  判断密码是否正确
         bcrypt.compare(password, user.password, function(err, result) {
           console.log(result);
           
          if(result === true) {
            const userRule = {
              id: user.id,
              name: user.name,
              avatar: user.avatar,
              idCart: user.idCart
            }
            // 生成token
            jwt.sign(userRule,keys,{expiresIn:3600},(err, token) => {
              if (err) throw err
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            })
          } else {
            return res.status(400).json({msg: '密码错误'})
          }
      });
       })
})


// $router GET user/current
// @desc return current user
// @access Private
router.get('/current',passPort.authenticate("jwt",{session:false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    idCart:req.user.idCart
  })
})


module.exports = router