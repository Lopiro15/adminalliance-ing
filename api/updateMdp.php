<?php
include("../traitement/fonction.php");
if (isset($_POST)) {
    # code...
    $sql = "select * from login where email=?";
    $tab = array($_POST['email']);
    $resultat = traiterselect($sql, $tab);
    foreach ($resultat as $rs) {
        # code...
        if (password_verify($_POST['mdp'], $rs[4])) {
            # code...
            $mdph = password_hash($_POST['mdp1'], PASSWORD_DEFAULT);
            $req = "update login set Mdp=? where Id_admin=?";
            $tab = array($mdph, $_POST['id']);
            traiterupdate($req, $tab);
            $output = array(
                'succes' => true,
            );
        } else {
            $output = array(
                'succes' => false,
            );
        }
    }
    echo json_encode($output);
}