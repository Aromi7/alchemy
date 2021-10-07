<?php

    //register
    $check = $conn->query("select * from users");
    while($row = $check->fetch_assoc()){
        if($row['email'] != $email || $row['name'] != $name){
            $conn->query("insert into users (email, name, pass) values('$email', '$name', '$pass')");
            $last_id = $conn->insert_id;

            $_SESSION['login'] = true;
            $_SESSION['id'] = $last_id;

            $conn->query("insert into games (user_id, elems_have) values($last_id, '$jsonelems')");
            header("location: ../../html/index.html");
        }else{
            $_SESSION['login'] = false;
            header("location: ../../html/log.html");
        }
    }

?>