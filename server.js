var express = require('express');
var fs = require("fs");
var app = express();
var data = require('./data.json');
var formidable= require("formidable");
var output = [];
var successed = 0;
// var cors = require('cors');
// app.use(cors())
app.use(express.static('./public'));
app.get('/api',function(req,res){
    res.json({name:"get",a:1,b:2})
});
app.post('/api',function(req,res){
    res.json({post:"get",a:1,b:2})
});
app.post('/upload',function(req,res){

    var form = new formidable.IncomingForm();
    form.uploadDir = "./public/upload";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if(output.length==0){
            output= new Array(fields.total);
        }
        output[fields.index]=files.data;
        ++successed;
        if(successed == fields.total){
            function read(i){
                var data = fs.readFileSync(output[i].path);
                fs.appendFile('./public/upload/'+fields.name,data,function(){});
                fs.unlink(output[i].path,function(){});
                i++;
                if(i<successed){
                    read(i);
                }else{
                    successed=0;
                    output=[];
                    return;
                }
            }
            read(0);
        }
        res.end("1");
    });
});
app.get('/api/xml',function(req,res){
    var data = fs.readFileSync('./data/data.json');
    res.end(data);
});
app.get('/api/benc',function(req,res){
    var data = fs.readFileSync('./data/1.txt');
    res.end(data);
//res.json({name:"get",a:1,b:2})
});
app.get('/a.js',function(req,res){
    var callback = req.query.callback;
    res.end(`
    ${callback}({a:1,b:1})
    `)
    // res.end(`
    // body{background:red;}
    // `)
});
app.get('/waterfall',function(req,res){
    var {page,pageSize,callback} = req.query;
    var start = (page-1)*pageSize;
    var end = page*pageSize;
    var json = data.slice(start,end);
    if(callback){
        res.end(`${callback}(${JSON.stringify(json)})`)
    }else{
        res.json(json)
    }
});
app.listen(8080);//1024-65535