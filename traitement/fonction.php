<?php 
function logoucrealog(){
	$cnx = connexion();
	$sql = "select * from login;";
	try {
		$resultat = $cnx->query($sql);
		$nbCol = $resultat->columnCount();
		$rows = $resultat->fetch(PDO::FETCH_NUM);
	} catch (Exception $e) {
		$msg = $e->getMessage();
   		echo "<script type='text/javascript'>alert('$msg')</script> ";
		die();
	}
	if(empty($rows)):
        header('Location: crealog.php');
    endif;
	return 1;
};
function connexion(){
	$nomUtilisateur = "root";
 	$motDePasse = "";      
 	$serveur = "localhost";
 	$BD = "db_admin_alliance";
 	$DSN = 'mysql:host=' . $serveur . ';dbname=' . $BD . ';charset=utf8';
 	try {
    	$idCnx = new PDO( $DSN, $nomUtilisateur, $motDePasse );
  	} 
 	catch ( Exception $e ) {
 		$msg = $e->getMessage();
   		echo "<script type='text/javascript'>alert('$msg')</script> ";
   		die();
 	}
 	return $idCnx;
};
function traiterselect($sql, $tab){
	$cnx = connexion();
	try {
		$req = $cnx->prepare($sql);
        $req->execute($tab);
        $resultat = $req->fetchAll(PDO::FETCH_NUM);
	} catch (Exception $e) {
		$msg = $e->getMessage();
   		echo "<script type='text/javascript'>alert('$msg')</script> ";
		die();
	}
		return $resultat;
};
function traiterupdate($sql, $tab){
	$idcnx = connexion();
	try {
		$stmt = $idcnx->prepare($sql);
		$stmt->execute($tab);
	} catch (Exception $e) {
		$msg = $e->getMessage();
   		echo "<script type='text/javascript'>alert('$msg')</script> ";
		die();
	}
	
	return 1;
};
?>