<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Profile</title>
  <?php 
		require_once("../traitement/session_verif_admin.php");
	?>
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
  <div id="appprofil">
    <?php include("../traitement/gesnav.php") ?>
    <div class="p-3">
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="gestionnaire_index.php">Dashboard</a></li>
        <li class="breadcrumb-item active" aria-current="page">Mon profil</li>
      </ol>
    </nav>
      <Update id = <?php echo ''.$id.'' ?> ></Update>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
  <script src="https://unpkg.com/vue-router@2.0.0/dist/vue-router.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js"></script>
  <script src="../js/profil.js" ></script>
</body>
</html>