<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <?php 
		require_once("../traitement/session_verif_admin.php");
	?>

    <title>Administration</title>


    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>

    <!-- Styles -->
    <link href="../assets/css/bootstrap.css" rel="stylesheet">
    <link href="../assets/css/sidebar.css" rel="stylesheet">
    <link href="../assets/css/sweetalert2.css" rel="stylesheet">
    <link href="../assets/css/style.css" rel="stylesheet">
    
    <script src="../assets/js/popper.js" ></script>
    <script src="../assets/js/jquery.min.js" ></script>
    <script src="../assets/js/bootstrap.js" ></script>
    <script src="../assets/js/sweetalert2.js" ></script>
   
</head>
<body>
    <div id="app">
        <Sidebar Admin = <?php echo "'$types'" ?>></Sidebar>
        <section class="home-section">
            <?php include("../traitement/gesnav.php") ?>
            <div class="container p-4">
                <router-view></router-view>
            </div>
            
        </section>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router@2.0.0/dist/vue-router.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js"></script>
    <script src="../js/app.js" ></script>
    <script src="../assets/js/sidebar.js" defer></script>
    
</body>

</html>
