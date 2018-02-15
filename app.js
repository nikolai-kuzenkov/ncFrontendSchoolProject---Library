var express = require('express');
var nodemailer = require("nodemailer");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// Отправка сообщения
app.post('/send', function(req, res){
    var smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com", // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        auth: {
            user: 'aspushkinlibrary@gmail.com',
            pass: 'poltava1709'
        },
    });
    var mailOptions = {
        from: "<Билиотека им. Пушкина <pushkinlibrary@gmail.com>", // адресс который придёт в заглавие
        to:  req.body.email, // Текст Сообщения
        subject:  "Регистрация в библиотеке", // Subject line
        html: "<p><b>"+req.body.name+"</b>, здравствуйте!</p>"+"<p>Благодарим вас за регистрацию в нашей библиотеке. Приятного чтения!</p>"+"<p>С уважением, библиотека им. А.С. Пушкина</p>"// html body
    };
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            res.send("Данные не были отправлены из-за ошибки: "+error);
        }else{
            res.send("Регистрация прошла успешно. На вашу почту выслано письмо с подтверждением.");
        }
    });
});

app.get('/', function(req,res){
    res.sendfile(__dirname + '/public/index.html');
});
app.post('/', function(req,res){
    res.sendfile(__dirname + '/public/blocks/MainPage.html');
});

app.get('/books', function(req,res){
    res.sendfile(__dirname + '/public/index.html');
});
app.post('/books', function(req,res){
    res.sendfile(__dirname + '/public/blocks/GenrePage.html');
});

app.get('/renewalBook', function(req,res){
    res.sendfile(__dirname + '/public/index.html');
});
app.post('/renewalBook', function(req,res){
    res.sendfile(__dirname + '/public/blocks/RenewalPage.html');
});

app.get('/reserveBook', function(req,res){
    res.sendfile(__dirname + '/public/index.html');
});
app.post('/reserveBook', function(req,res){
    res.sendfile(__dirname + '/public/blocks/ReservationPage.html');
});

app.get('/about', function(req,res){
    res.sendfile(__dirname + '/public/index.html');
});
app.post('/about', function(req,res){
    res.sendfile(__dirname + '/public/blocks/AboutPage.html');
});

app.get('/checkIn', function(req,res){
    res.sendfile(__dirname + '/public/index.html');
});
app.post('/checkIn', function(req,res){
    res.sendfile(__dirname + '/public/blocks/RegistrationPage.html');
    console.log('NodeMailer reading console log...' + req.url);
});


app.get('/blocks/MainPage.html', function(req,res){
    res.sendfile(__dirname + '/public/blocks/MainPage.html');
});
app.get('/blocks/GenrePage.html', function(req,res){
    res.sendfile(__dirname + '/public/blocks/GenrePage.html');
});
app.get('/blocks/RenewalPage.html', function(req,res){
    res.sendfile(__dirname + '/public/blocks/RenewalPage.html');
});
app.get('/blocks/ReservationPage.html', function(req,res){
    res.sendfile(__dirname + '/public/blocks/ReservationPage.html');
});
app.get('/blocks/AboutPage.html', function(req,res){
    res.sendfile(__dirname + '/public/blocks/AboutPage.html');
});
app.get('/blocks/RegistrationPage.html', function(req,res){
    res.sendfile(__dirname + '/public/blocks/RegistrationPage.html');
});

/*---------Стили---------*/
app.get('/stylesheets/main.css', function(req,res){
    res.sendfile(__dirname + '/public/stylesheets/main.css');
});
app.get('/stylesheets/bookGenre.css', function(req,res){
    res.sendfile(__dirname + '/public/stylesheets/bookGenre.css');
});
app.get('/stylesheets/preload.css', function(req,res){
    res.sendfile(__dirname + '/public/stylesheets/preload.css');
});
app.get('/fonts/style.css', function(req,res){
    res.sendfile(__dirname + '/public/fonts/style.css');
});
/*---------------------*/

/*---------Изображения---------*/
app.get('/images/lib1.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/lib1.jpg');
});
app.get('/images/lib2.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/lib2.jpg');
});
app.get('/images/lib3.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/lib3.jpg');
});
app.get('/images/lib4.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/lib4.jpg');
});
app.get('/images/lib5.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/lib5.jpg');
});
app.get('/images/Pushkin.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/Pushkin.jpg');
});
app.get('/images/LibrBackground.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/LibrBackground.jpg');
});
app.get('/images/Sauron.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/Sauron.jpg');
});
app.get('/images/Onegin.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/Onegin.jpg');
});
app.get('/images/Holmes&Watson.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/Holmes&Watson.jpg');
});
app.get('/images/Cervantes.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/Cervantes.jpg');
});
app.get('/images/Ivan.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/Ivan.jpg');
});
app.get('/images/History.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/History.jpg');
});
app.get('/images/Sokrat.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/Sokrat.jpg');
});
app.get('/images/Golub.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/Golub.jpg');
});
app.get('/images/Fossil.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/Fossil.jpg');
});
app.get('/images/Cars.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/Cars.jpg');
});
app.get('/images/Future.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/Future.jpg');
});
app.get('/images/Lenin.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/Lenin.jpg');
});
app.get('/images/aboutBack.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/aboutBack.jpg');
});
app.get('/images/formBack.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/formBack.jpg');
});
app.get('/images/PreloadBack2.jpg',function(req,res){
    res.sendfile(__dirname + '/public/images/PreloadBack2.jpg');
});
/*---------------------*/

/*---------Шрифты и иконки---------*/
app.get('/fonts/GoodVibesPro.ttf',function(req,res){
    res.sendfile(__dirname + '/public/fonts/GoodVibesPro.ttf');
});
app.get('/fonts/icomoon.svg', function(req,res){
    res.sendfile(__dirname + '/public/fonts/icomoon.svg');
});
app.get('/fonts/icomoon.eot', function(req,res){
    res.sendfile(__dirname + '/public/fonts/icomoon.eot');
});
app.get('/fonts/icomoon.ttf', function(req,res){
    res.sendfile(__dirname + '/public/fonts/icomoon.ttf');
});
app.get('/fonts/icomoon.woff', function(req,res){
    res.sendfile(__dirname + '/public/fonts/icomoon.woff');
});
/*---------------------------------*/

app.get('/javascripts/main.js', function(req,res){
    res.sendfile(__dirname + '/public/javascripts/main.js');
});
app.get('/dist/jquery.maskedinput.js', function(req,res){
    res.sendfile(__dirname + '/digitalBush-jquery.maskedinput-9672630/dist/jquery.maskedinput.js');
});
app.listen(3000, function () {
    console.log('Listening on port 3000...');
});

module.exports = app;
