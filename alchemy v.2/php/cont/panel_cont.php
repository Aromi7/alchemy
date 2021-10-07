<?php

    include "../conn.php";

    //registration
    if(isset($_POST['uemail']) && isset($_POST['uname']) && isset($_POST['upass'])){
        $email = $_POST['uemail'];
        $name = $_POST['uname'];
        $pass = $_POST['upass'];
        $startelems = [
            [
                "name"=>"water",
                "conf"=>"NaN",
                "cons"=>"NaN",
                "img"=>"https://cdn-icons-png.flaticon.com/128/3105/3105807.png",
                "id"=>0
            ],
    
            [
                "name"=>"fire",
                "conf"=>"NaN",
                "cons"=>"NaN",
                "img"=>"https://cdn-icons-png.flaticon.com/128/426/426833.png",
                "id"=>1
            ],
    
            [
                "name"=>"earth",
                "conf"=>"NaN",
                "cons"=>"NaN",
                "img"=>"https://cdn-icons-png.flaticon.com/128/4284/4284458.png",
                "id"=>2
            ],
    
            [
                "name"=>"air",
                "conf"=>"NaN",
                "cons"=>"NaN",
                "img"=>"https://cdn-icons-png.flaticon.com/128/2756/2756521.png",
                "id"=>3
            ]
        ];

        $jsonelems = json_encode($startelems);

        include "../model/register_mod.php";

    }


    //login
    if(isset($_POST['iemail']) && isset($_POST['ipass'])){

        $iemail = $_POST['iemail'];
        $ipass = $_POST['ipass'];

        $check = $conn->query("select id from users where email = '$iemail' and pass = '$ipass'");

        include "../model/login_mod.php";
    }

?>