<?php
$username = $_POST['username'];
$pas = $_POST['pas'];
$type = $_POST['usernametype'];

$con = mysqli_connect('localhost', 'root', '123456', 'fristproject');

if ($username) {

    $sql = "SELECT * FROM `user` WHERE $type LIKE '$username' ";

    $selectRes = mysqli_query($con, $sql);

    $row = mysqli_fetch_assoc($selectRes);


    if ($row) {
        mysqli_close($con);
        die("该用户已存在");
    };

    if ($type == 'username') {

        $inserSql = "INSERT INTO `user` VALUES (NULL,'$username' , NULL, NULL, '$pas')";
    } else if ($type == 'telephone') {
        // echo ("php tel");
        $inserSql = "INSERT INTO `user` VALUES (NULL,NULL , '$username', NULL, '$pas')";
    } else if ($type == 'email') {
        // echo ("php e");
        $inserSql = "INSERT INTO `user` VALUES (NULL,NULL , NULL,'$username', '$pas')";
    } else {
        die("未知错误");
    }

    $Res = mysqli_query($con, $inserSql);

    if (!$Res) {

        die("erorr");
    };


    echo json_encode(array('message' => '注册成功', 'code' => '1'),);
    mysqli_close($con);
}
