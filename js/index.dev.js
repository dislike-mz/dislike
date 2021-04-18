"use strict";

// 第一个tab 切换
var isolation = document.querySelector('.isolation');

isolation.onclick = function () {
  // console.log(this);
  var e = window.event;
  var span = isolation.querySelectorAll('span');

  if (e.target) {
    for (var i = 0; i < span.length; i++) {
      span[i].classList.remove("active");
    }

    e.target.classList.add("active");
  }
}; // 第二个tab切换 隐藏有待修复 因为 navigation 是span和p拼接一起的有一瞬间会undefined 导致onmouseout会报错


var navigation = document.querySelector('.navigation');

navigation.onmouseover = function () {
  var e = window.event;
  var li = navigation.querySelectorAll('li');
  var conceal = document.querySelector('.conceal');
  var div = document.querySelectorAll('.list');

  if (e.target.parentNode.className == "classify") {
    for (var i = 0; i < li.length; i++) {
      li[i].index = i;
      li[i].classList.remove("active1");
      div[i].classList.remove("show");
    }

    e.target.parentNode.classList.add("active1");
    conceal.style.display = "block";
    div[e.target.parentNode.index].classList.add("show");
  }

  div[e.target.parentNode.index].onmouseout = function () {
    for (var _i = 0; _i < li.length; _i++) {
      li[_i].classList.remove("active1");

      div[_i].classList.remove("show");
    }

    conceal.style.display = "none";
  };
}; // 复制过来的轮播图----------------------------------------------


var jsDivBox = document.getElementById("loopDiv"); //图片节点

var jsImg = document.getElementById("pic"); //左右按钮节点

var jsLeft = document.getElementById("left");
var jsRight = document.getElementById("right"); //获取所有的li

var jsUl = document.getElementById("list");
var jsLis = jsUl.getElementsByClassName("choose"); //让第一个小圆点变为红色

jsLis[0].style.backgroundColor = "yellowgreen";
jsLis[0].style.color = "yellowgreen"; //显示当前的图片下标

var currentPage = 0; //启动定时器

var timer = setInterval(func, 3000);

function func() {
  currentPage++;
  changePic();
}

function changePic() {
  if (currentPage == jsLis.length) {
    currentPage = 0;
  }

  if (currentPage == -1) {
    currentPage = jsLis.length - 1;
  } //更换图片
  //"img/1.jpg"


  jsImg.src = "../images/" + currentPage + ".jpg"; //将所有的小圆点颜色清空

  for (var i = 0; i < jsLis.length; i++) {
    jsLis[i].style.backgroundColor = "skyblue";
    jsLis[i].style.color = "skyblue";
  } //改变对应小圆点为红色


  jsLis[currentPage].style.backgroundColor = "yellowgreen";
  jsLis[currentPage].style.color = "yellowgreen";
} //鼠标进入


jsDivBox.addEventListener("mouseover", func1, false);

function func1() {
  //停止定时器
  clearInterval(timer); //显示左右按钮

  jsLeft.style.display = "block";
  jsRight.style.display = "block";
} //鼠标移出


jsDivBox.addEventListener("mouseout", func2, false);

function func2() {
  //重启定时器
  timer = setInterval(func, 3000); //隐藏左右按钮

  jsLeft.style.display = "none";
  jsRight.style.display = "none";
} //点击左右按钮


jsLeft.addEventListener("click", func3, false);

function func3() {
  currentPage--;
  changePic();
}

jsLeft.onmouseover = function () {
  this.style.backgroundColor = "rgba(0,0,0,0.6)";
};

jsLeft.onmouseout = function () {
  this.style.backgroundColor = "rgba(0,0,0,0.2)";
};

jsRight.addEventListener("click", func4, false);

function func4() {
  currentPage++;
  changePic();
}

jsRight.onmouseover = function () {
  this.style.backgroundColor = "rgba(0,0,0,0.6)";
};

jsRight.onmouseout = function () {
  this.style.backgroundColor = "rgba(0,0,0,0.2)";
}; //进入小圆点


for (var j = 0; j < jsLis.length; j++) {
  jsLis[j].onmouseover = function () {
    currentPage = parseInt(this.innerHTML) - 1;
    this.style.color = "yellowgreen";
    changePic();
  };
} // ---------------------------------------------------------------
// 信息区的tab切换


var news = document.querySelector('ul');
var newschildren = news.querySelectorAll('li');

news.onmousemove = function () {
  var e = window.event;
};

var dots = document.querySelector('.dots');
var dot = document.querySelectorAll('.dot');

dots.onclick = function () {
  var e = window.event;

  if (e.target.className == "dot") {
    for (var i = 0; i < dot.length; i++) {
      dot[i].classList.remove("dedede");
    }

    e.target.classList.add("dedede");
  }
};