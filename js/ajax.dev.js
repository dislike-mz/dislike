"use strict";

// 封装ajax请求

/* 
    参数：
        【1】请求的地址 
        【2】请求方式（get||post）
        【3】回调函数（用于获取异步代码执行结果），成功，失败
        【4】请求的携带的参数
        【5】设置同步或者异步
    当函数的参数 过多的时候 应该把参数 写成一个对象传递
    {
        url:'请求的地址',  //请求地址是必须
        type:'get',   选填，不填的时候 默认值为get请求 
        data:{username:'aaa',password:'123123'} || "username=aaa&password=123123",  选填，有参数就传递 没有可以不填，需要有默认值为 ''
        async:false, 选填 ，值为布尔值，不填写的时候为 true
        success:fucntion(){},  必填 请求成功之后执行的函数 获取到请求的结果
        error:function(){}  选填 请求失败之后执行的函数
    }
*/
function ajax(obj) {
  // 判断必填的属性 是否有传递
  if (!obj.url) {
    // d当url没有填写的时候 抛出错误
    throw Error("url属性不能为空");
  } // 判断success 是否有传递


  if (!obj.success) {
    throw Error("success属性不能为空");
  } // 当有一些参数没有传递的时候 需要添加默认值


  var option = {
    url: obj.url,
    type: obj.type || "get",
    data: obj.data || "",
    async: obj.async || true,
    success: obj.success,
    error: obj.error || function (err) {
      console.log(err);
    }
  }; // 判断一下 请求方式是否正确 post || get

  if (!(option.type == "get" || option.type == "post")) {
    throw Error("type属性的取值 暂时只支持 get 和 post");
  } // 判断data参数 是否是 对象 或者字符串


  var datatype = Object.prototype.toString.call(option.data);

  if (!(datatype == "[object Object]" || datatype == "[object String]")) {
    throw Error("data参数的格式 暂时只支持对象或者字符串");
  } // 判断 async 是否是布尔值


  if (!(Object.prototype.toString.call(option.async) == "[object Boolean]")) {
    throw Error("async的取值只能为布尔值（true|| false）");
  } // 判断success 是否是函数


  if (!(Object.prototype.toString.call(option.success) == "[object Function]")) {
    throw Error("success 必须是一个函数");
  } // 判断error参数是否为函数


  if (!(Object.prototype.toString.call(option.error) == "[object Function]")) {
    throw Error("error 必须是一个函数");
  } // 如果参数为对象的时候 需要把对象转化为
  // {name:'老谢',age:48}==>name=老谢&age=18
  // "key=value&key=value"


  if (Object.prototype.toString.call(option.data) == "[object Object]") {
    var str = "";

    for (var key in option.data) {
      str += key + "=" + option.data[key] + "&";
    }

    option.data = str.substr(0, str.length - 1);
  }

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    // ajax状态
    if (xhr.readyState == 4 && /^[23]\d{2}$/.test(xhr.status)) {
      // console.log(xhr.responseText);
      option.success(xhr.responseText);
    } // http的状态码为 4 或者 5开头的时候


    if (/^[45]\d{2}$/.test(xhr.status)) {
      option.error(xhr.responseText);
    }
  }; // 判断请求方式


  if (option.type == "get") {
    xhr.open(option.type, "".concat(option.url, "?").concat(option.data), option.async);
    xhr.send();
    return;
  }

  xhr.open(option.type, option.url, option.async);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(option.data);
}

function pAjax(obj) {
  return new Promise(function (resolve, reject) {
    ajax({
      url: obj.url,
      type: obj.type,
      data: obj.data,
      async: obj.async,
      success: function success(res) {
        resolve(res);
      },
      error: function error(err) {
        reject(err);
      }
    });
  });
}