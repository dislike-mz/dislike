let enter = document.querySelector('.enter');
let userid = enter.querySelector('#userid');
let userpas = enter.querySelector('#userpas');

let Name = /[a-zA-Z]{5,14}|[\u4e00-\u9fa5]{3,6}$/;

let Phone = /^1[3-9]\d{7}$/;

let Email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

let PassWord = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/

// 区分输入的账户类型
function type(userid) {
    if (Phone.test(userid)) {
        return "telephone";
    } else if (Email.test(userid)) {
        return "email";
    } else if (Name.test(userid)) {
        return "username";
    } else {
        alert("用户名格式有误，请重新输入");
        return ;
    }

}

// id输入格式错误的处理
userid.onbulr= function(){
    type(userid);
}

// 调教信息登录
enter.onsubmit = () => {
    let e = window.event;
    e.preventDefault();

    pAjax({
        type:'post',
        url:'../php/login_in.php',
        data:{
            userid:userid.value,
            userpas:userpas.value,
            usernametype:type(userid.value)
        }
    }).then((res)=>{
        console.log(JSON.parse(res));
        res = JSON.parse(res);

        if(res.code == 1){
            
        }else{
            console.log('注册失败');
        }
    }).catch((res)=>{
        console.log("数据库连接错误");
    })
}