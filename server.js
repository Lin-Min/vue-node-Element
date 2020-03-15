const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = require('./config/mongokey').mongoUrl
const users = require('./routers/users')
const profiles = require('./routers/profile')
const history = require('connect-history-api-fallback');
const cors = require('cors')
// 验证token插件
const passport = require('passport')

mongoose.set('useFindAndModify', false)

const app = express()

app.use(cors({credentials: true, origin: 'http://localhost:8080'}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(history())
// 初始化
app.use(passport.initialize());

mongoose.connect(db, { useNewUrlParser: true,  useUnifiedTopology: true })
        .then( () => {
          console.log('Mongoose 连接成功'); 
      }).catch(err => {
          console.log(err);
      })

require('./config/passports')(passport)
// app.get('/', (req, res) => {
//   res.send('Hello World')
// })

app.use('/api/user', users)
app.use('/api/profile', profiles)

const port = 3000

app.listen(port, () => {
  console.log('Server running...');
})