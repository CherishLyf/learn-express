var crypto = require('crypto'),   // 生成散列值来加密密码
    User = require('../models/user')

module.exports = function(app) {
  // 首页
  app.get('/', function(req, res){
    res.render('index', { title: '主页' })
  })

  // 注册
  app.get('/reg', function(req, res){
    res.render('reg', { title: '注册' })
  })
  app.post('/reg', function(req, res){
    var name = req.body.name,
        password = req.body.password,
        password_re = req.body['password-repeat'];

    // 检验两次密码输入是否一致
    if(password_re != password) {
      req.flash('err', '两次输入的密码不一致')
      return res.redirect('/reg')  // 返回注册页
    }

    // 生成密码 md5　值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
      name: req.body.name,
      password: password,
      email: req.body.email
    });

    //　检验用户名是否已经存在
    User.get(newUser.name, function(err, user) {
      if(err) {
        req.flash('error', err)
        return res.redirect('/')
      }
      if(user) {
        req.flash('error', '用户已存在！')
        return res.redirect('/reg')   // 返回注册页
      }
      // 如果不存在则新增用户
      newUser.save(function(err, user) {
        if(err) {
          req.flash('error', err)
          return res.redirect('/reg');    // 注册失败返回注册页
        }
        req.session.user = user   // 用户信息存入 session
        req.flash('success', '注册成功')
        res.redirect('/')
      })
    })
  })

  // 登陆
  app.get('/login', function(req, res){
    res.render('login', { title: '登陆' })
  })
  app.post('/reg', function(req, res){

  })

  // 发表文章
  app.get('/post', function(req, res){
    res.render('post', { title: '发表' })
  })
  app.post('/post', function(req, res){

  })

  // 登出
  app.get('/logout', function(req, res){

  })
}
