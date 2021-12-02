<?php 
	session_name('admin');
    session_start();
    if(!isset($_SESSION['logged'])|| !$_SESSION['logged']):
        header("Location: index.php");
    endif;
    $login = (isset($_SESSION['email'])) ? $_SESSION['email'] : '' ;
    $types = ($_SESSION['type']) ? 'true' : 'false';
    $id = $_SESSION['Id_admin'];
?>