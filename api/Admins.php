<?php 
include("../traitement/fonction.php"); 
require_once("../traitement/session_verif_admin.php");
$request_method = $_SERVER["REQUEST_METHOD"];
if ($request_method == 'GET') {
    # code...
    $sql = "select * from login where email != ? order by Nom_comp;";
    $tab = array($login);
    $resultat = traiterselect($sql, $tab);
    $output = array(
        'data' => $resultat,
    );
    echo json_encode($output);
} elseif($request_method == 'DELETE') {
    $id = intval($_GET["id"]);
    $sql = "delete from login WHERE Id_admin=?";
    $tab = array($id);
    traiterupdate($sql, $tab);
    $sql = "select * from login order by Nom_comp;";
    $tab = array();
    $resultat = traiterselect($sql, $tab);
    $output = array(
        'data' => $resultat,
    );
    echo json_encode($output);
}else {
    if (!empty($_POST)) {
        # code...
        $mail = $_POST['email'];
        $mdp = $_POST['mdp'];
        $req = "select * from login where email = ?";
        $tabreq = array($mail);
        $resreq = traiterselect($req, $tabreq);
        if (empty($resreq)) {
            # code...
            $mdph = password_hash($mdp, PASSWORD_DEFAULT);
            $sql = "insert into login values(NULL, ?, ?, ?, ?, ?);";
            $tab = array($_POST['nom'], $_POST['contact'],$mail, $mdph, $_POST['type']);
            traiterupdate($sql, $tab);
            $sql = "select * from login order by Nom_comp;";
            $tab = array();
            $resultat = traiterselect($sql, $tab);
            $output = array(
                'data' => $resultat,
            );
            echo json_encode($output);
        }else {
            $output = array(
                'data' => 'admin dejà existant',
            );
            echo json_encode($output);
        }
    }
}