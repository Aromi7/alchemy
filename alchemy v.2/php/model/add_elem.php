<?php

    include "../conn.php";

    $conf = $_GET['conf'];
    $cons = $_GET['cons'];

    $results = $conn->query("select id, name, img from elements where conf = '$conf' and cons = '$cons' or conf = '$cons' and cons = '$conf'");

    if($results->num_rows > 0){

        $res = $results->fetch_assoc();
        $obj_name = json_encode($res['name']);
        $obj_img = json_encode($res['img']);
        $obj_id = json_encode($res['id']);

        $el_name = json_decode($obj_name);
        $el_img = json_decode($obj_img);
        $el_id = json_decode($obj_id) - 1;

        $new_el = [
            "name"=>"$el_name",
            "conf"=>"$conf",
            "cons"=>"$cons",
            "img"=>"$el_img",
            "id"=>$el_id
        ];
    
        echo json_encode($new_el);

    }

?>