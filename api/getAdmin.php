<?php

include("../traitement/fonction.php"); 
if (isset($_GET)) {
    # code...
    $id = $_GET['id'];
    $sql = "select * from login where Id_admin = ?;";
    $tab = array($id);
    $resultat = traiterselect($sql, $tab);
    $output = array(
        'data' => $resultat,
    );
    echo json_encode($output);
}