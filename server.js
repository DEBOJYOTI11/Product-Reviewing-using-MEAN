var express =  require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var conn = require('./config/connect');
var product = require('./models/schema');
var productModel = mongoose.model('product' , product , 'pro');

var app = express();
// app.set('view engine', 'ejs');
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//app.use(session());

// var p = new productModel({
//     name: 'Moto G 4',
//     type:'gadgets',
//     picture: 'http://www.siyawoman.com/wp-content/uploads/2015/09/product.png',
// });
// p.save();

function isAuth(req){
    return true;
    /*
    if(req.session.user)
        return true;
    else
        return false;*/
}

app.post('/login' , function(){
    userModel.findOne({username:req.body.username , password:sha1(req.body.password)},function(err,doc){
        if(err){
         //   res.staus(200).json(err);
         res.json(err);
        }
        if(!doc){
           // res.status(401).json({msg:'Wrong username or password'});
           res.json({msg:'Wrong username or password'});
        }
        req.seesion.user = req.body.username;
    });
});

app.get('/products' , function(req,res){
    productModel.find({} ,function( err,doc){
        console.log('/product is called');
        res.json(doc);
    });
});

app.get('/products/:id',function(req,res){
    productModel.findById({_id:req.params.id }, function(err,doc){
        res.json(doc);
    });
});

app.post('/product/:id' , function(req,res){
console.log("Comments  = " + req.body.email + req.body.comment + req.body.stars +  "  // ");
if(req.body.email==undefined || req.body.email==undefined || req.body.email==undefined ){
    res.json({'failed':true});
}
else{
productModel.findByIdAndUpdate(
        req.params.id,
        {$push: {comments: {email:req.body.email , comment:req.body.comment , stars:req.body.stars} }},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            if(err){
                console.log(err);
                res.json(err);
                process.exit(1);
            }
            res.json(model);
            console.log(model);
        }
    );
}
});
app.post('/interested/:id' , function(req,res){
 productModel.findByIdAndUpdate(
        req.params.id,
        {$push: {interested: {email:req.body.email }}},
        {safe: true, upsert: true, new : true},
        function(err, model) {
            if(err){
                console.log(err);
                res.json(err);
                process.exit(1);
            }
            res.json(model);
            console.log(model);
        }
    );
});
app.get('/search/:name' , function(req,res){
    var mo='a';
    productModel.find({name: new RegExp(req.params.name , 'i')} , function(err,data){
        if(err){
            return res.json({err:'AN error occured'})
        }
        console.log('/search/name');        
        return res.json(data);
        
    });
});

app.get('*', function(req, res){
    if(isAuth())
        res.json()
    res.sendfile('./public/index.html');
});


















// app.get('/:id' ,function(req,res){ 
//     res.render('./public/index'); 
// });
// app.get('/contact' , function(req,res){
//     res.render('./public/index');
// });
// app.get('/about',function(){  
//     res.render('./public/about');
// });
// app.get('/blog',function(req,res){
//     res.render('./public/blog');
// });

app.listen(3000);
console.log('Server listening on port 3000');
