<?php
include("../traitement/fonction.php");
if (isset($_POST)) {
    # code...
    $sql = "update login set Nom_comp=?, Contact_admin=?, Email=? where Id_admin=?";
    $tab = array($_POST['nom'], $_POST['contact'], $_POST['email'], $_POST['id']);
    traiterupdate($sql, $tab);
    $output = array(
        'succes' => true
    );

    echo json_encode($output);
}