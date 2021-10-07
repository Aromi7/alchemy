<?php

    include "../conn.php";

    $json = $conn->query("select elems_have from games where user_id = $_SESSION[id]");

    if($json->num_rows > 0){

        $inf = $json->fetch_assoc();
        $elems = json_decode($inf['elems_have']);

    }

    echo json_encode($elems);

?>