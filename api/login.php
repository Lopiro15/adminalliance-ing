<?php 
	include("../traitement/fonction.php");
	if (isset($_GET)) {
        # code...
        $mail = $_GET['email'];
		$mdp = $_GET['mdp'];
		$sql = "select * from login where email=?";
		$tab = array($mail);
		$res = traiterselect($sql, $tab);
		if (empty($res)) {
			# code...
			$output = array('valide' => false );
		}else {
			foreach ($res as $rs) {
				# code...
				if (password_verify($mdp, $rs[4])):
					session_name('admin');
					session_start();
					$_SESSION['Id_admin'] = $rs[0];
    				$_SESSION['email'] = $mail;
    				$_SESSION['mdp'] = $mdp;
    				$_SESSION['logged'] = true;
					$_SESSION['type'] = $rs[5];
					$output = array('valide' => true );
				else:
					$output = array('valide' => false );
				endif;
			}
		}
		echo json_encode($output);
    }
?>