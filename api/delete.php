<?php 
    $message = '';
    if (isset($_POST['uriimg'])) {
        # code...
        unlink($_POST['uriimg']);
        $message = "success";
    };

    $output = array('message' => $message, );

    echo json_encode($output);
?>