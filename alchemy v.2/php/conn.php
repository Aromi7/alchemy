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

?>