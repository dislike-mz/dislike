<?php
$userid = $_POST['userid'];
$userpas = $_POST['userpas'];
$type = $_POST['usernametype'];

$con = mysqli_connect('localhost', 'root', '123456', 'fristproject');

if ($userid && $userpas) {
    if ($type == 'username') {

        $inserSql = "SELECT * FROM `user` WHERE `username` LIKE '$userid' AND `pas` LIKE '$userpas'";
    } else if ($type == 'telephone') {
        // echo ("php tel");
        $inserSql = "SELECT * FROM `user` WHERE `telephone` LIKE '$userid' AND `pas` LIKE '$userpas'";
    } else if ($type == 'email') {
        // echo ("php e");
        $inserSql = "SELECT * FROM `user` WHERE `email` LIKE '$userid' AND `pas` LIKE '$userpas'";
    } else {
        die("没有此用户");
    }

    $selectRes = mysqli_query($con, $inserSql);

    $row = mysqli_fetch_assoc($selectRes);

    if ($row) {
        echo json_encode(array('message'=>'注册成功','code'=>'1'),);
        mysqli_close($con);
    }
}
