const express = require('express')
const router = express.Router()
const Profiles = require('../models/profile')
const passPort = require('passport')

// $router GET profile/test
// @desc 返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
  res.json({msg: 'profiles 测试'})
})

// $router POST profile/add
// @desc 添加信息
// @access Private
router.post('/add',passPort.authenticate("jwt",{session:false}), (req, res) => {
  const  profieInfo = {}

  if (req.body.type) profieInfo.type = req.body.type
  if (req.body.describes) profieInfo.describes = req.body.describes
  if (req.body.incomes) profieInfo.incomes = req.body.incomes
  if (req.body.expends) profieInfo.expends = req.body.expends
  if (req.body.cash) profieInfo.cash = req.body.cash
  if (req.body.remarks) profieInfo.remarks = req.body.remarks

  new Profiles(profieInfo).save().then(profile => {
    res.json(profile)
  })
})

// $router GET profile
// @desc 获取所有信息
// @access Private
router.get('/', passPort.authenticate("jwt",{session:false}), (req, res) => {
  Profiles.find()
          .then(profile => {
            if (!profile) {
              return res.status(400).json('没有任何信息')
            }

            res.json(profile)
          })
          .catch(err => {
            
            res.status(400).json(err)
          })
})

// $router GET profile/:id
// @desc 获取单个信息
// @access Private
router.get('/:id', passPort.authenticate("jwt",{session:false}), (req, res) => {
  Profiles.findOne({'_id':req.params.id})
  .then(profile => {
    if (!profile) {
      return res.status(400).json('没有任何信息')
    }

    res.json(profile)
  })
  .catch(err => {
    
    res.status(400).json(err)
  })
})


// $router GET profile/edit
// @desc 更新信息
// @access Private
router.post('/edit/:id', passPort.authenticate("jwt",{session:false}), (req, res) => {

  const  profieInfo = {}

  if (req.body.type) profieInfo.type = req.body.type
  if (req.body.describes) profieInfo.describes = req.body.describes
  if (req.body.incomes) profieInfo.incomes = req.body.incomes
  if (req.body.expends) profieInfo.expends = req.body.expends
  if (req.body.cash) profieInfo.cash = req.body.cash
  if (req.body.remarks) profieInfo.remarks = req.body.remarks

  Profiles.findOneAndUpdate(
    {_id:req.params.id},
    {$set:profieInfo},
    {new:true}
        ).then(profile => res.json(profile))
})

// $router DELETE profile/delete/:id
// @desc 获取单个信息
// @access Private
router.delete('/delete/:id', passPort.authenticate("jwt",{session:false}), (req, res) => {
  Profiles.findOneAndRemove({'_id': req.params.id})
          .then(profile => {
            if (profile) {
              res.status(200).json({
                code: 0,
                profile,
                msg:'删除成功'
              })
            } else {
              res.status(200).json({
                code: 1,
                msg:'已被删除'
              })
            }
          })
          .catch(err => {
            res.status(400).json({
              code: 1,
              msg: '删除失败',
              errMsg: err.message
            })

          })
})

module.exports = router