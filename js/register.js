// 注册页面获取表单里的信息
let form = document.querySelector('.Form');
let username = form.querySelector('#UserName');
let pas = form.querySelector('#PassWord');
let again = form.querySelector('#again')

let button = form.querySelector('button');

let Name = /[a-zA-Z]{5,14}|[\u4e00-\u9fa5]{3,6}$/;

let Phone = /^1[3-9]\d{9}$/;

let Email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;


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

}

username.onFocus = ()=>{
    let tempS = type(username.value); 
    let iderorr = form.querySelector('.iderorr');
    if(tempS=="正则错误" ){
        
        iderorr.innerHTML = "用户名格式有误请确认后在输入";
    }else{
        iderorr.innerHTML = "";
    }
}


form.onsubmit = function () {
    let e = window.event;
    e.preventDefault();
    //     console.log(username.value);
    //     // console.log(username.value);
    //     console.log(Name.test(username.value));
    //   console.log(type(username.value));  

    pAjax({
        type: 'post',
        url: '../php/register.php',
        data: {
            username: username.value,
            pas: pas.value,
            usernametype: type(username.value),
        },
    }).then((res) => {

        console.log(JSON.parse(res));
        // console.log(res);
        res = JSON.parse(res);
        // res = JSON.parse(res);
        // console.log(res);
        if (res.code == 1) {
            console.log('注册成功');
        } else {
            console.log('注册失败');
        }

    }).catch((res)=>{
       
        console.log("用户已存在");
    })

}