// 声明一个window事件
let e = window.event;
// 第一个tab 切换
let isolation = document.querySelector('.isolation');

isolation.onclick = function (e) {
    // console.log(this);
    // let e = window.event;
    let span = isolation.querySelectorAll('span');
    if (e.target) {

        for (let i = 0; i < span.length; i++) {
            span[i].classList.remove("active");
        }
        e.target.classList.add("active");
    }
}

// 第二个tab切换 隐藏有待修复 因为 navigation 是span和p拼接一起的有一瞬间会undefined 导致onmouseout会报错


let navigation = document.querySelector('.navigation');


navigation.onmouseover = function (e) {


    let li = navigation.querySelectorAll('li');
    let conceal = document.querySelector('.conceal');
    let div = document.querySelectorAll('.list');

    if (e.target.parentNode.className == "classify") {

        for (let i = 0; i < li.length; i++) {
            li[i].index = i;
            li[i].classList.remove("active1");
            div[i].classList.remove("show");
        }
        e.target.parentNode.classList.add("active1");
        conceal.style.display = "block";
        div[e.target.parentNode.index].classList.add("show");
    }

    div[e.target.parentNode.index].onmouseout = function () {

        for (let i = 0; i < li.length; i++) {
            li[i].classList.remove("active1");
            div[i].classList.remove("show");
        }
        conceal.style.display = "none";
    }


}

// 复制过来的轮播图----------------------------------------------
let jsDivBox = document.getElementById("loopDiv");
//图片节点
let jsImg = document.getElementById("pic");
//左右按钮节点
let jsLeft = document.getElementById("left");
let jsRight = document.getElementById("right");
//获取所有的li
let jsUl = document.getElementById("list");
let jsLis = jsUl.getElementsByClassName("choose");

//让第一个小圆点变为红色
jsLis[0].style.backgroundColor = "yellowgreen";
jsLis[0].style.color = "yellowgreen"

//显示当前的图片下标
let currentPage = 0;

//启动定时器
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
    }
    //更换图片
    //"img/1.jpg"
    jsImg.src = "../images/" + currentPage + ".jpg";
    //将所有的小圆点颜色清空
    for (var i = 0; i < jsLis.length; i++) {
        jsLis[i].style.backgroundColor = "skyblue";
        jsLis[i].style.color = "skyblue";
    }
    //改变对应小圆点为红色
    jsLis[currentPage].style.backgroundColor = "yellowgreen";
    jsLis[currentPage].style.color = "yellowgreen";
}

//鼠标进入
jsDivBox.addEventListener("mouseover", func1, false);

function func1() {
    //停止定时器
    clearInterval(timer);
    //显示左右按钮
    jsLeft.style.display = "block";
    jsRight.style.display = "block";
}
//鼠标移出
jsDivBox.addEventListener("mouseout", func2, false);

function func2() {
    //重启定时器
    timer = setInterval(func, 3000);

    //隐藏左右按钮
    jsLeft.style.display = "none";
    jsRight.style.display = "none";
}

//点击左右按钮
jsLeft.addEventListener("click", func3, false);

function func3() {
    currentPage--;
    changePic();
}
jsLeft.onmouseover = function () {
    this.style.backgroundColor = "rgba(0,0,0,0.6)";
}
jsLeft.onmouseout = function () {
    this.style.backgroundColor = "rgba(0,0,0,0.2)";
}
jsRight.addEventListener("click", func4, false);

function func4() {
    currentPage++;
    changePic();
}
jsRight.onmouseover = function () {
    this.style.backgroundColor = "rgba(0,0,0,0.6)";
}
jsRight.onmouseout = function () {
    this.style.backgroundColor = "rgba(0,0,0,0.2)";
}

//进入小圆点
for (var j = 0; j < jsLis.length; j++) {
    jsLis[j].onmouseover = function () {
        currentPage = parseInt(this.innerHTML) - 1;
        this.style.color = "yellowgreen"
        changePic();
    };
}
// ---------------------------------------------------------------

// 信息区的tab切换
// li未切换待完善成



let news = document.querySelector('.news');
let newschildren = news.querySelectorAll('.newschildren');

news.onmousemove = function (e) {


    if (e.target.classList == "newschildren") {
        for (let i = 0; i < newschildren.length; i++) {
            newschildren[i].classList.remove("leader2");
        }
        e.target.classList.add("leader2")
    }
}

let dots = document.querySelector('.dots');
let dot = document.querySelectorAll('.dot');

dots.onclick = function (e) {


    if (e.target.className == "dot") {
        for (let i = 0; i < dot.length; i++) {
            dot[i].classList.remove("dedede");
        }
        e.target.classList.add("dedede");
    }
}

// 第一个产品切换 未能完成拖拽效果

let cut = document.querySelector('.cut');
let cutmove = cut.querySelector('.cutmove');
let product = cut.querySelectorAll('.product');
cutmove.left = 0;
let speed = 260;

cut.addEventListener("click", rolling, false);
// cut.addEventListener("")
function rolling(e) {


    if (e.target.className == "L") {
        console.log(product.__proto__);
        cartoon(cutmove, -10);
        cutmove.left -= speed;

    }
    if (e.target.className == "R") {
        console.log(cutmove.offsetLeft + "right");
        cartoon(cutmove, 10);
        cutmove.left += speed;
    }
}



// function cartoon(start, speed) {

//     let temp = cutmove.left;
//     let tomorrow = setInterval(function () {

//         temp -= 10;
//         cutmove.style.left = temp + "px";
//         if (temp == cutmove.left) {
//             clearInterval(tomorrow);
//         }
//     }, 10)
// }


let coproduct = document.querySelector('.coproduct');
let coproductmove = coproduct.querySelector('.coproductmove');
let prodcut2 = coproduct.querySelectorAll('.prodcut2');
coproductmove.left = 0;
let secondspeed = 260;

coproduct.addEventListener("click", rolling2, false);

function rolling2(e) {
    if (e.target.className == "SecondL") {

        cartoon(coproductmove, -10, );
        coproductmove.left -= secondspeed;

    }
    if (e.target.className == "SecondR") {

        cartoon(coproductmove, 10);
        coproductmove.left += secondspeed;
    }
}


//封装一个左右点击方法 
function cartoon(start, speed) {
    let temp = start.left;
    let aaa = setInterval(function () {

        temp += speed;
        start.style.left = temp + "px";

        if (temp == start.left) {
            clearInterval(aaa);
        }

    }, 10)
}

// 商品展览区右侧
let electorate = document.querySelector(".electorate"); 
let Top = document.querySelectorAll('.top');
Top.forEach((item,index)=>{
    item.onclick = qiehuan;
})


function qiehuan (e) {
    let spanS = this.querySelectorAll('.prodcut3');
    let triangle =this.querySelector('i');
    if (e.target.classList == "prodcut3") {
        for (let i = 0; i < spanS.length; i++) {
            spanS[i].classList.remove('active3');
            spanS[i].index = i + 1;
        }
        e.target.classList.add('active3');
        triangle.style.left = e.target.index * 86.5 + "px"
    }
}