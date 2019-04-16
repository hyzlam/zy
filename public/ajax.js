function ajax(json){
    var url = json.url;
    var method = json.method||"get";
    var dataType = json.dataType||"json";
    var data = json.data||{};
    var success = json.success;
    //sendData记录参数字符串
    var sendData = "";
    if(!url){
        console.error("url必须传入");
        return;
    }
    if(!success){
        console.error("success必须传入");
        return;
    }
    //分析data不能直接传,必须转成city=广州&future=3
    for(var key in data){
        sendData+=key+"="+data[key]+"&";
    }
    //字符串高级操作
    sendData = sendData.slice(0,-1);
    if(dataType=="json"){
        //如果你的dataType传入的json,表示同源
        var xhr;
        if(XMLHttpRequest){
            //标准写法
            xhr = new XMLHttpRequest();
        }else{
            //针对ie5,6
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if(method=="get"){
            //如果是get请求,参数要拼接在url上
            url = url+"?"+sendData;
        }
        xhr.open(method,url);
        if(method=="post"){
            //如果是post请求,需要设置请求头'Content-Type',"application/x-www-form-urlencoded"
            xhr.setRequestHeader('Content-Type',"application/x-www-form-urlencoded");
            xhr.send(sendData)
        }else{
            xhr.send(null)
        }

        xhr.onreadystatechange = function(){
            if(xhr.readyState==4&&xhr.status==200){
                //把得到的结果转成json格式
                success(JSON.parse(xhr.responseText));
            }

        }
    }
    else if(dataType=="jsonp"){
        //如果你的dataType传入的jsonp,表示跨域
        //必须有一个全局的函数,函数名:不能同名
        //生成一个随机的函数名,该函数名每次调用都不同,函数名必须符合变量命名规则,不能有"."
        var callback = "ajax"+Math.random().toString().slice(2)+(new Date()).getTime();
        //生成一个全局函数,函数名就是前面的callback变量指代的内容
        window[callback]=function(data){
            //调用我定义的callback函数,就会调用success函数,并传入实参
            success(data);
            //script标签使用完后删除
            document.body.removeChild(tag);
        };
        //必须有一个script标签,该标签的src指向api接口地址
        var tag = document.createElement('script');
        tag.src = url+"?"+sendData+"&"+"callback="+callback;
        document.body.appendChild(tag)
    }
    else{
        return false;
    }

}