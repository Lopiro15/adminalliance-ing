<nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container-fluid ">
      <a class="navbar-brand" href="#">AllianceGroupe</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto  mb-2 mb-lg-0 ">
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <?php echo $login ?>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item om" href="./../pages/profil.php">Modifier mon profil</a>
                  <a class="dropdown-item om" href="./../traitement/deco.php">Se deconnecter</a>
              </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>