"use strict";

// 注册页面获取表单里的信息
var form = document.querySelector('.Form');
var username = form.querySelector('#UserName');
var pas = form.querySelector('#PassWord');
var again = form.querySelector('#again');
var verification = form.querySelector('.verification-code');
var button = form.querySelector('button');
var Name = /[a-zA-Z]{5,14}|[\u4e00-\u9fa5]{3,6}$/;
var Phone = /^1[3-9]\d{7}$/;
var Email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
var PassWord = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/; // 区分输入的账户类型

function type(username) {
  if (Phone.test(username)) {
    return "telephone";
  } else if (Email.test(username)) {
    return "email";
  } else if (Name.test(username)) {
    return "username";
  } else {
    return "正则错误";
  }
} // 起始全部输入给个false 当输入符合条件在变为 true
// username.judge = "false";
// pas.judge = "false";
// again.judge = "false";
// verification.judge = "false";
// id输入格式错误的处理


username.onblur = function () {
  // console.log(this);
  var tempS = type(username.value);
  var iderorr = form.querySelector('.iderorr');
  iderorr.style.color = "#fc595a";
  this.judge = false;

  if (tempS == "正则错误" && username.value == "") {
    iderorr.innerHTML = "亲，用户名还未输入";
  } else if (tempS == "正则错误") {
    iderorr.innerHTML = "用户名格式有误请确认后在输入";
  } else {
    iderorr.style.color = "#58bc58";
    iderorr.innerHTML = "&radic;";
    this.judge = true;
  }
}; // 密码输入格式错误


pas.onblur = function () {
  var paserorr = form.querySelector('.paserorr');
  paserorr.style.color = "#fc595a";
  this.judge = false;

  if (!PassWord.test(pas.value) && pas.value == "") {
    paserorr.innerHTML = "亲，密码还未输入";
  } else if (!PassWord.test(pas.value)) {
    paserorr.innerHTML = "请设置6位到20位包含数字和字母的密码";
  } else {
    paserorr.style.color = "#58bc58";
    paserorr.innerHTML = "&radic;";
    this.judge = true;
  }
}; // 核对密码错误


again.onblur = function () {
  var againerorr = form.querySelector('.againerorr');
  againerorr.style.color = "#fc595a";
  this.judge = false;

  if (pas.value == "") {
    againerorr.innerHTML = "亲，密码还未填，无法核对";
  } else if (again.value == "") {
    againerorr.innerHTML = "亲，还没核对密码";
  } else if (again.value !== pas.value) {
    againerorr.innerHTML = "亲，两次密码都不同请确认后重新输入";
    again.value = "";
  } else {
    againerorr.style.color = "#58bc58";
    againerorr.innerHTML = "&radic;";
    this.judge = true;
  }
}; // 验证码部分


var temp = "";

function VerificationSpan() {
  var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  temp = ""; // console.log(arr.length);

  for (var i = 0; i < 5; i++) {
    temp += arr[parseInt(Math.random() * 62)];
  }

  return temp;
}

verification.onclick = function () {
  verification.innerHTML = VerificationSpan();
};

var change = form.querySelector('.change');

change.onclick = function () {
  verification.innerHTML = VerificationSpan();
};

var VC = form.querySelector('#VC');
var VCerorr = form.querySelector('.VCerorr');

VC.onblur = function () {
  this.judge = false;

  if (VC.value == "") {
    return;
  } else if (VC.value != temp) {
    VCerorr.style.color = "#fc595a";
    VCerorr.innerHTML = "&times;";
  } else {
    VCerorr.style.color = "#58bc58";
    VCerorr.innerHTML = "&radic;";
    this.judge = true;
  }
}; // 复选框打勾


var CB = form.querySelector('#CB');

form.onsubmit = function () {
  var e = window.event;
  e.preventDefault();

  if (username.judge == true && pas.judge == true && again.judge == true && VC.judge == true && CB.checked == true) {
    pAjax({
      type: 'post',
      url: '../php/register.php',
      data: {
        username: username.value,
        pas: pas.value,
        usernametype: type(username.value)
      }
    }).then(function (res) {
      console.log(JSON.parse(res)); // console.log(res);

      res = JSON.parse(res); // res = JSON.parse(res);
      // console.log(res);

      if (res.code == 1) {
        console.log('注册成功');
      } else {
        console.log('注册失败');
      }
    })["catch"](function (res) {
      console.log("用户已存在");
    });
  } else {
    alert("请检查是否填好信息，并阅读条款打勾！");
  }
}; // 表单提交
// form.onsubmit = function () {
//     let e = window.event;
//     e.preventDefault();
//     //     console.log(username.value);
//     //     // console.log(username.value);
//     //     console.log(Name.test(username.value));
//     //   console.log(type(username.value));  
//     pAjax({
//         type: 'post',
//         url: '../php/register.php',
//         data: {
//             username: username.value,
//             pas: pas.value,
//             usernametype: type(username.value),
//         },
//     }).then((res) => {
//         console.log(JSON.parse(res));
//         // console.log(res);
//         res = JSON.parse(res);
//         // res = JSON.parse(res);
//         // console.log(res);
//         if (res.code == 1) {
//             console.log('注册成功');
//         } else {
//             console.log('注册失败');
//         }
//     }).catch((res) => {
//         console.log("用户已存在");
//     })
// }