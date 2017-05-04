// Requires \\
var express = require('express');
var bodyParser = require('body-parser');

var nodemailer= require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var validator = require('email-validator');

// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes \\
app.get('/', function(req, res){
  res.sendFile('/html/index.html', {root : './public'})
});

app.get('/demo-page', function(req, res){
  res.sendFile('/html/demo-page.html', {root : './public'})
});


app.get('/contact-form', function(req, res){
    res.render('index.html', { title: 'Mailing List', page: 'index.html' })
});

app.post('/contact-form', function (req, res) {
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  var transporter = nodemailer.createTransport('smtps://parkerhardison02@gmail.com:AgeoftheGeek@smtp.gmail.com');
  //Mail options
  var mailOptions = {
      from: req.body.email + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'parkerhardison02@gmail.com',
      subject: 'Thoroughbred Petroleum Demo Mailing List',
      text: 'Email: ' + req.body.email,

  };
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      else {
      console.log('Message sent: ' + info.response);
      }
  });
});



// Creating Server and Listening for Connections \\
var port = 3000;
app.listen(port, function(){
  console.log('Server running on port ' + port);

})