<?php 
    $image = '';
    if (isset($_FILES['file']['name'])) {
        # code...
        if (isset($_POST['uriimg'])) {
            # code...
            unlink($_POST['uriimg']);
        };
        $image_name = $_FILES['file']['name'];
        $extension = pathinfo($image_name, PATHINFO_EXTENSION);
        $upload_path = '../assets/img/' . time() . '.' . $extension;
        if (move_uploaded_file($_FILES['file']['tmp_name'], $upload_path)) {
            # code...
            $image = $upload_path;
            $message = 'success';
        }
    }else {
        $message = 'error';
    };

    $output = array(
        'message' => $message,
        'image' => $image
    );

    echo json_encode($output);
?>