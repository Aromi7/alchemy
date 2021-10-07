<?php

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    ob_start();
    session_start();

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "alchemy";

    $conn = new mysqli($servername, $username, $password, $dbname);

    //registration
    if(isset($_POST['uemail']) && isset($_POST['uname']) && isset($_POST['upass'])){

        $email = $_POST['uemail'];
        $name = $_POST['uname'];
        $pass = $_POST['upass'];
        $startelems = [
            [
                "name"=>"water",
                "conf"=>null,
                "cons"=>null,
                "img"=>"https://cdn-icons-png.flaticon.com/128/3105/3105807.png",
                "id"=>1
            ],
    
            [
                "name"=>"fire",
                "conf"=>null,
                "cons"=>null,
                "img"=>"https://cdn-icons-png.flaticon.com/128/426/426833.png",
                "id"=>2
            ],
    
            [
                "name"=>"earth",
                "conf"=>null,
                "cons"=>null,
                "img"=>"https://cdn-icons-png.flaticon.com/128/4284/4284458.png",
                "id"=>3
            ],
    
            [
                "name"=>"air",
                "conf"=>null,
                "cons"=>null,
                "img"=>"https://cdn-icons-png.flaticon.com/128/2756/2756521.png",
                "id"=>4
            ]
        ];

        $jsonelems = json_encode($startelems);

        //register
        $check = $conn->query("select * from users");
        while($row = $check->fetch_assoc()){
            if($row['email'] != $email || $row['name'] != $name){
                $conn->query("insert into users (email, name, pass) values('$email', '$name', '$pass')");
                $last_id = $conn->insert_id;

                $_SESSION['login'] = true;
                $_SESSION['id'] = $last_id;

                $conn->query("insert into games (user_id, elems_have) values($last_id, '$jsonelems')");
                header("location: ../html/index.html");
            }else{
                $_SESSION['login'] = false;
                header("location: ../html/log.html");
            }
        }
    }

    //login
    if(isset($_POST['iemail']) && isset($_POST['ipass'])){

        $iemail = $_POST['iemail'];
        $ipass = $_POST['ipass'];

        $check = $conn->query("select id from users where email = '$iemail' and pass = '$ipass'");

        if($check->num_rows > 0){

            $row = $check->fetch_assoc();

            $_SESSION['login'] = true;
            $_SESSION['id'] = $row['id'];

            header("location: ../html/index.html");
        }else{

            $_SESSION['login'] = false;

            header("location: ../html/log.html");
        }

    }

?>