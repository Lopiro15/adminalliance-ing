const Update = {
    template: `<div class="container">
                    <div class="row justify-content-center">
                    <div class="card shadow-lg">
                        <div class="card-header">
                        <h5 class="card-title">Mon Profil</h5>
                        </div>
                        <div class="card-body">
                            <div class="card mb-3">
                            <div class="card-header d-flex justify-content-between">
                                <h5 class="card-title">Informations personnelles</h5>
                                <a href="#" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="getadmin">modifier</a>
                            </div>
                            <div class="card-body">
                                <ul class="list-group">
                                <li class="list-group-item">{{admin.data[0][1]}}</li>
                                <li class="list-group-item">{{admin.data[0][2]}}</li>
                                <li class="list-group-item">{{admin.data[0][3]}}</li>
                                </ul>
                            </div>
                            </div>
                            <div class="card">
                            <div class="card-header d-flex justify-content-between">
                                <h5 class="card-title">Compte</h5>
                                <a href="#" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1" @click="getadmin">modifier le mot de passe</a>
                            </div>
                            <div class="card-body">
                                <ul class="list-group">
                                <li class="list-group-item">{{admin.data[0][3]}}</li>
                                <li class="list-group-item">{{(admin.data[0][5] == 1) ? 'Super Administrateur' : 'Administrateur standard'}}</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                    </div>
                
                    <!-- infos perso -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modifier mes informations</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form  class="container-fluid" id="formulaire" @submit="modifperso">
                            <div class="modal-body">
                            <div class="form-group mb-2">
                                <label for="nom">
                                Nom complet
                                </label>
                                <input type="text" name="nom" class="form-control" required id="nom" v-model="nom" placeholder="Entrez votre nom complet">
                            </div>
                            <div class="form-group mb-2">
                                <label for="contact">
                                Contact
                                </label>
                                <input type="tel" pattern="[0-9]{10}" name="contact" required class="form-control" v-model="contact" id="contact" placeholder="Entrez votre contact" >
                            </div>
                            <div class="form-group mb-2">
                                <label for="email">
                                email
                                </label>
                                <input type="email" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" required v-model="email" name="email" class="form-control" id="email" placeholder="Entrez votre email" >
                            </div>
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            <button type="submit" class="btn btn-primary">Sauvegarder</button>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                
                    <!-- Compte -->
                    <div class="modal fade" data-bs-backdrop="static" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modifier mon mot de passe</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form class="container-fluid" @submit.prevent="modifmdp">
                        <div class="modal-body">
                            <div class="form-group">
                            <label for="mdp0">
                                Ancien Mot de passe
                            </label>
                            <input :type="affichemdp ? 'type' : 'Password'" name="mdp" :class="validmdp ? 'form-control' : 'form-control is-invalid'" id="mdp" v-model="mdp"  placeholder="Mot de passe" required>
                            <div class="invalid-feedback">
                                Mot de passe incorrect
                            </div>
                            </div>
                            <div class="form-group">
                            <label for="mdp1">
                                Nouveau Mot de passe
                            </label>
                            <input :type="affichemdp ? 'type' : 'Password'" @keyup="verif" name="mdp1" class="form-control" id="mdp1" v-model="mdp1" minlength="8" placeholder="Mot de passe" required>
                            </div>
                            <div class="form-group">
                            <label for="mdp2">
                                Confirmer Mot de passe
                            </label>
                            <input :type="affichemdp ? 'type' : 'Password'" @keyup="verif" name="mdp2" :class="identique ?  'form-control is-valid' : 'form-control is-invalid' " id="mdp2" v-model="mdp2" placeholder="confirme mot de passe" required>
                            <div class="invalid-feedback">
                                Les mots de passes doivent etre identiques
                            </div>
                            <div class="valid-feedback">
                                Parfait
                            </div>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" v-model="affichemdp" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                    Afficher les mots de passe
                                </label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            <button type="submit" class="btn btn-primary">Sauvegarder</button>
                        </div>
                        </form>
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>`,
    props: ['id'],
    data() {
        return {
            admin: {},
            nom: '',
            email: '',
            contact: '',
            mdp: '',
            mdp1: '',
            mdp2: '',
            affichemdp: false,
            validmdp: true,
            identique: false,
            teste: '',
        }
    },
    created() {
        axios.get('../api/getAdmin.php?id=' + this.id)
            .then(response => this.admin = response.data)
            .catch(error => console.log(error));
    },
    methods: {
        getadmin() {
            this.nom = this.admin.data[0][1];
            this.email = this.admin.data[0][3];;
            this.contact = this.admin.data[0][2];
        },
        modifperso() {
            var formdata = new FormData();
            formdata.set('nom', this.nom);
            formdata.append('contact', this.contact);
            formdata.append('email', this.email);
            formdata.append('id', this.id);
            axios.post('../api/UpdateAdmin.php', formdata)
                .then(response => this.refresh(response.data.succes))
                .catch(error => console.log(error));
        },
        modifmdp() {
            var formdata = new FormData();
            formdata.set('mdp', this.mdp);
            formdata.append('mdp1', this.mdp1);
            formdata.append('email', this.email);
            formdata.append('id', this.id);
            axios.post('../api/updateMdp.php', formdata)
                .then(response => this.ismdpmodif(response.data.succes))
                .catch(error => console.log(error));
        },
        refresh(succes) {
            if (succes) {
                this.$forceUpdate();
            }
        },
        ismdpmodif(succes) {
            if (succes) {
                this.teste = succes;
                Swal.fire(
                    'Effectué!',
                    'Mot de passe mis à jour avec succes!',
                    'success'
                );
            } else {
                this.validmdp = false;
                Swal.fire(
                    'erreur!',
                    'Mot de passe incorrect!',
                    'warning'
                );
            }
        },
        verif() {
            if (this.mdp1 == this.mdp2) {
                this.identique = true;
            } else {
                this.identique = false;
            }
        }
    }
}

const appprofil = new Vue({
    el: '#appprofil',
    components: { Update },
})