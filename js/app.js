const Sidebar = {
    template: ` <div class="sidebar">
                    <div class="logo-details">
                        <i class='bx bxl-vuejs icon'></i>
                        <div class="logo_name">Administration</div>
                        <i class='bx bx-menu' id="btn" ></i>
                    </div>
                    <ul class="nav-list">
                        <li>
                            <router-link to="/">
                                <i class='bx bxs-news'></i>
                                <span class="links_name">Actualités</span>
                            </router-link>
                            <span class="tooltip">Actualités</span>
                        </li>
                        <li>
                            <router-link to="/formation">
                                <i class='bx bxs-school'></i>
                                <span class="links_name">Formations</span>
                            </router-link>
                            <span class="tooltip">Formations</span>
                        </li>
                        <li v-if="this.super">
                            <router-link to="/administrateur">
                                <i class='bx bxs-user'></i>
                                <span class="links_name">Administrateurs</span>
                            </router-link>
                            <span class="tooltip">Administrateurs</span>
                        </li>
                    </ul>
                </div>`,
    props: ['Admin'],
    data() {
        return {
            super: false,
        }
    },
    created() {
        if (this.Admin == "true") {
            this.super = true;
        } else {
            this.super = false;
        }
    }
}

const AddActualite = {
    template: `<div>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Ajouter
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" data-bs-backdrop="static" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Mise a jour actualité</h5>
                                </div>
                                <div class="modal-body">
                                    <form @submit="ActuStore">
                                        <div class="form-group mb-3">
                                            <label for="name">Nom du post</label>
                                            <input type="text" name="name" required class="form-control" id="name" v-model="namepost">
                                        </div>
                                        <div class="form-group mb-3">
                                            <label for="formFile" class="form-label">Image</label>
                                            <div class="d-flex justify-content-between">
                                                <input class="form-control" :disabled="verifupload" required type="file" id="formFile" ref='file' accept="image/*">
                                                <a class = "btn btn-primary ms-2" v-if="!verifupload" @click="uploadimage">charger</a>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="desc">Description</label>
                                            <textarea name="desc" required class="form-control" id="desc" rows="4" v-model="descriptionpost"></textarea>
                                        </div>
                                        <div class="d-flex justify-content-sm-end mt-3">
                                            <div class="p-2"><button type="button" class="btn btn-secondary"  data-bs-dismiss="modal">Fermer</button></div>
                                            <div class="p-2"><button type="submit" :disabled="!verifupload" class="btn btn-primary">Ajouter</button></div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`,
    data() {
        return {
            namepost: '',
            uriimg: '',
            descriptionpost: '',
            file: '',
            verifupload: false,
        }
    },
    methods: {
        uploadimage() {
            this.file = this.$refs.file.files[0];

            var formData = new FormData();
            formData.append('file', this.file);

            axios.post('../api/upload.php', formData, {
                    header: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => this.uriimg = response.data.image)
                .catch(error => console.log(error));
            this.$refs.file.value = '';
            this.verifupload = true;

        },
        ActuStore() {
            axios.post('http://127.0.0.1:5000/actualites', null, {
                params: {
                    namepost: this.namepost,
                    uriimg: this.uriimg,
                    descriptionpost: this.descriptionpost,
                }
            }).then(response => this.verif(response)).catch(error => console.log(error));

        },
        verif(rep) {
            if (rep.status == 404) {
                Swal.fire(
                    'Erreur!',
                    'Cette Actualité existe déjà',
                    'warning'
                );
            } else {
                this.$emit('Actu-added', rep);
                this.namepost = '';
                this.uriimg = '';
                this.descriptionpost = '';
                this.verifupload = false;
            }
        }
    }
}

const Actualite = {
    components: { AddActualite },
    template: `<div class="container">
        <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card shadow-lg">
                <div class="card-header bienvenue-header">Liste des Actualités</div>

                <div class="card-body">
                    <AddActualite class="mb-3" @Actu-added="refresh"></AddActualite>
                    
                    <table class="table table-primary .table-hover table-responsive-md  ">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Url image</th>
                                <th scope="col">Description</th>
                                <th scope="col" class="d-flex justify-content-sm-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(actualite, index) in actualites.data" :key="actualite.namepost">
                                <th scope="row">{{ index + 1}}</th>
                                <td>{{ actualite.namepost }}</td>
                                <td>{{ actualite.uriimg }}</td>
                                <td>{{ actualite.descriptionpost }}</td>
                                <td class="d-flex justify-content-sm-end">
                                    <button type="button" class="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#EditModal" @click="getActualite(index)">
                                        Editer
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deleteActu(index)">Supprimer</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="modal fade" id="EditModal" tabindex="-1" aria-labelledby="EditModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="EditModalLabel">Modifier la ville</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form @submit="UpdateActu">
                                    <div class="form-group mb-3">
                                        <label for="name">Nom du post</label>
                                        <input type="text" name="name" disabled="true" required class="form-control" id="name" v-model="namepost">
                                    </div>
                                    <div class="form-group mb-3">
                                        <label for="formFile" class="form-label">Image</label>
                                        <div class="d-flex justify-content-between">
                                            <input class="form-control"  type="file" id="formFileEdit" ref='fileEdit' accept="image/*">
                                            <a class = "btn btn-primary ms-2" @click="uploadimageedit">modifier</a>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="desc">Description</label>
                                        <textarea name="desc" required class="form-control" id="desc" rows="4" v-model="descriptionpost"></textarea>
                                    </div>
                                    <div class="d-flex justify-content-sm-end mt-3">
                                        <div class="p-2"><button type="button" class="btn btn-secondary"  data-bs-dismiss="modal">Fermer</button></div>
                                        <div class="p-2"><button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Enregistrer</button></div>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-sm-between"> 
                </div>
            </div>
        </div>
        </div>
        </div>`,
    data() {
        return {
            actualites: {},
            indice: 0,
            uriimg: '',
            namepost: '',
            descriptionpost: '',
            ActuToEdit: {},
        }
    },
    created() {
        axios.get('http://127.0.0.1:5000/actualites')
            .then(response => this.donnees(response.data))
            .catch(error => console.log(error));
    },
    methods: {
        refresh(actualites) {
            this.$forceUpdate();
            this.actualites = actualites.data;
        },
        donnees(donee) {
            this.actualites = donee;
            this.ActuToEdit = donee;
        },
        getActualite(id) {
            this.indice = id;
            this.uriimg = this.ActuToEdit.data[id].uriimg;
            this.namepost = this.ActuToEdit.data[id].namepost;
            this.descriptionpost = this.ActuToEdit.data[id].descriptionpost;
        },
        uploadimageedit() {
            this.file = this.$refs.fileEdit.files[0];
            var formData = new FormData();
            formData.set('uriimg', this.uriimg);
            formData.append('file', this.file);

            axios.post('../api/upload.php', formData, {
                    header: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => this.uriimg = response.data.image)
                .catch(error => console.log(error));
            this.$refs.fileEdit.value = '';

        },
        UpdateActu() {
            axios.put('http://127.0.0.1:5000/actualites', {
                    namepost: this.namepost,
                    uriimg: this.uriimg,
                    descriptionpost: this.descriptionpost
                })
                .then(response => this.actualites = response.data)
                .catch(error => console.log(error));
            this.namepost = '';
            this.uriimg = '';
            this.descriptionpost = '';
        },
        deleteActu(id) {
            this.getActualite(id);
            Swal.fire({
                title: 'Etes vous sûre?',
                text: "Cette action est irréversible",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmer',
                cancelButtonText: 'Annuler'
            }).then((result) => {
                if (result.isConfirmed) {
                    var formData = new FormData();
                    formData.set('uriimg', this.uriimg);
                    axios.post('../api/delete.php', formData, {
                            header: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => this.delete(this.namepost, response.data.message))
                        .catch(error => console.log(error));
                    Swal.fire(
                        'Effectué!',
                        'L\'actualité été supprimée.',
                        'success'
                    );
                }
            });
        },
        delete(id, message) {
            console.log(message);

            axios.delete('http://127.0.0.1:5000/actualites', { data: { namepost: id } })
                .then(response => this.actualites = response.data)
                .catch(error => console.log(error));
        }
    }

}

const AddFormation = {
    template: `<div>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Ajouter
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" data-bs-backdrop="static" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Mise a jour formation</h5>
                                </div>
                                <div class="modal-body">
                                    <form @submit="ActuStore">
                                        <div class="form-group mb-3">
                                            <label for="name">Nom de la formation</label>
                                            <input type="text" name="name" required class="form-control" id="name" v-model="nameformation">
                                        </div>
                                        <div class="form-group mb-3">
                                            <label for="formFile" class="form-label">Image</label>
                                            <div class="d-flex justify-content-between">
                                                <input class="form-control" :disabled="verifupload" required type="file" id="formFile" ref='file' accept="image/*">
                                                <a class = "btn btn-primary ms-2" v-if="!verifupload" @click="uploadimage">charger</a>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="desc">Description</label>
                                            <textarea name="desc" required class="form-control" id="desc" rows="4" v-model="descriptionformation"></textarea>
                                        </div>
                                        <div class="d-flex justify-content-sm-end mt-3">
                                            <div class="p-2"><button type="button" class="btn btn-secondary"  data-bs-dismiss="modal">Fermer</button></div>
                                            <div class="p-2"><button type="submit" :disabled="!verifupload" class="btn btn-primary">Ajouter</button></div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`,
    data() {
        return {
            nameformation: '',
            uriimg: '',
            descriptionformation: '',
            file: '',
            verifupload: false,
        }
    },
    methods: {
        uploadimage() {
            this.file = this.$refs.file.files[0];

            var formData = new FormData();
            formData.append('file', this.file);

            axios.post('../api/upload.php', formData, {
                    header: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => this.uriimg = response.data.image)
                .catch(error => console.log(error));
            this.$refs.file.value = '';
            this.verifupload = true;

        },
        ActuStore() {
            axios.post('http://127.0.0.1:5000/formations', null, {
                params: {
                    nameformation: this.nameformation,
                    uriimg: this.uriimg,
                    descriptionformation: this.descriptionformation,
                }
            }).then(response => this.verif(response)).catch(error => console.log(error));
        },
        verif(rep) {
            if (rep.status == 404) {
                Swal.fire(
                    'Erreur!',
                    'Cette Fomation existe déjà',
                    'warning'
                );
            } else {
                this.$emit('Actu-added', rep);
                this.nameformation = '';
                this.uriimg = '';
                this.descriptionformation = '';
                this.verifupload = false;
            }
        }
    }
}

const Formation = {
    components: { AddFormation },
    template: `<div class="container">
        <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card shadow-lg">
                <div class="card-header bienvenue-header">Liste des Formations</div>

                <div class="card-body">
                    <AddFormation class="mb-3" @Actu-added="refresh"></AddFormation>
                    
                    <table class="table table-primary .table-hover table-responsive-md  ">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Url image</th>
                                <th scope="col">Description</th>
                                <th scope="col" class="d-flex justify-content-sm-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(Formation, index) in formations.data" :key="Formation.nameformation">
                                <th scope="row">{{ index + 1}}</th>
                                <td>{{ Formation.nameformation }}</td>
                                <td>{{ Formation.uriimg }}</td>
                                <td>{{ Formation.descriptionformation }}</td>
                                <td class="d-flex justify-content-sm-end">
                                    <button type="button" class="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#EditModal" @click="getFormation(index)">
                                        Editer
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="deleteActu(index)">Supprimer</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="modal fade" id="EditModal" tabindex="-1" aria-labelledby="EditModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="EditModalLabel">Modifier la ville</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form @submit="UpdateActu">
                                    <div class="form-group mb-3">
                                        <label for="name">Nom du post</label>
                                        <input type="text" name="name" disabled="true" required class="form-control" id="name" v-model="nameformation">
                                    </div>
                                    <div class="form-group mb-3">
                                        <label for="formFile" class="form-label">Image</label>
                                        <div class="d-flex justify-content-between">
                                            <input class="form-control"  type="file" id="formFileEdit" ref='fileEdit' accept="image/*">
                                            <a class = "btn btn-primary ms-2" @click="uploadimageedit">modifier</a>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="desc">Description</label>
                                        <textarea name="desc" required class="form-control" id="desc" rows="4" v-model="descriptionformation"></textarea>
                                    </div>
                                    <div class="d-flex justify-content-sm-end mt-3">
                                        <div class="p-2"><button type="button" class="btn btn-secondary"  data-bs-dismiss="modal">Fermer</button></div>
                                        <div class="p-2"><button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Enregistrer</button></div>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-sm-between"> 
                </div>
            </div>
        </div>
        </div>
        </div>`,
    data() {
        return {
            formations: {},
            indice: 0,
            uriimg: '',
            nameformation: '',
            descriptionformation: '',
            ActuToEdit: {},
        }
    },
    created() {
        axios.get('http://127.0.0.1:5000/formations')
            .then(response => this.donnees(response.data))
            .catch(error => console.log(error));
    },
    methods: {
        refresh(formations) {
            this.$forceUpdate();
            this.formations = formations.data;
        },
        donnees(donee) {
            this.formations = donee;
            this.ActuToEdit = donee;
        },
        getFormation(id) {
            this.indice = id;
            this.uriimg = this.ActuToEdit.data[id].uriimg;
            this.nameformation = this.ActuToEdit.data[id].nameformation;
            this.descriptionformation = this.ActuToEdit.data[id].descriptionformation;
        },
        uploadimageedit() {
            this.file = this.$refs.fileEdit.files[0];
            var formData = new FormData();
            formData.set('uriimg', this.uriimg);
            formData.append('file', this.file);

            axios.post('../api/upload.php', formData, {
                    header: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => this.uriimg = response.data.image)
                .catch(error => console.log(error));
            this.$refs.fileEdit.value = '';

        },
        UpdateActu() {
            axios.put('http://127.0.0.1:5000/formations', {
                    nameformation: this.nameformation,
                    uriimg: this.uriimg,
                    descriptionformation: this.descriptionformation
                })
                .then(response => this.formations = response.data)
                .catch(error => console.log(error));
            this.nameformation = '';
            this.uriimg = '';
            this.descriptionformation = '';
        },
        deleteActu(id) {
            this.getFormation(id);
            Swal.fire({
                title: 'Etes vous sûre?',
                text: "Cette action est irréversible",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmer',
                cancelButtonText: 'Annuler'
            }).then((result) => {
                if (result.isConfirmed) {
                    var formData = new FormData();
                    formData.set('uriimg', this.uriimg);
                    axios.post('../api/delete.php', formData, {
                            header: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => this.delete(this.nameformation, response.data.message))
                        .catch(error => console.log(error));
                    Swal.fire(
                        'Effectué!',
                        'La formation a été supprimée.',
                        'success'
                    );
                }
            });
        },
        delete(id, message) {
            console.log(message);
            axios.delete('http://127.0.0.1:5000/formations', { data: { nameformation: id } })
                .then(response => this.formations = response.data)
                .catch(error => console.log(error));
        }
    }

}

const AddAdministrateur = {
    template: ` <div> 
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Ajouter
                        </button>
                        
                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Mise à jour Administrateurs</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            <form  class="container-fluid" @submit="AdminStore">
                                    <div class="form-group mb-2">
                                        <label for="nom">
                                            Nom Complet
                                        </label>
                                        <input type="text" required name="nom" class="form-control" v-model="nom" id="nom" placeholder="Entrez votre nom complet">
                                    </div>
                                    <div class="form-group mb-2">
                                    <label for="contact">
                                        Contact
                                    </label>
                                    <input type="tel" required pattern="[0-9]{10}" name="contact" v-model="contact" class="form-control" id="contact" placeholder="Entrez votre contact">
                                </div>
                                <div class="form-group mb-2">
                                    <label for="email">
                                        Email
                                    </label>
                                    <input type="email" required name="email" v-model="email" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" class="form-control" id="mail" placeholder="Entrez votre adresse mail">
                                </div>

                                <div class="form-group mb-2">
                                    <label for="mdp1">
                                        Mot de passe
                                    </label>
                                    <input :type="affichemdp? 'text' : 'Password'" @keyup="verif" name="mdp1" class="form-control" v-model="mdp1" id="mdp1" minlength="8" placeholder="Mot de passe" required>
                                    </div>
                                <div class="form-group mb-2">
                                    <label for="mdp2">
                                        Confirmer Mot de passe
                                    </label>
                                    <input :type="affichemdp? 'text' : 'Password'" @keyup="verif" name="mdp2" :class="valid? 'form-control is-valid' : 'form-control is-invalid'" v-model="mdp2"  id="mdp2" placeholder="confirme mot de passe" required>
                                    <div class="valid-feedback">
                                        Parfait!
                                    </div>  
                                    <div class="invalid-feedback">
                                        Les Mots de passes doivent etre identique!
                                    </div>
                                    </div>
                                    <div class="form-check mb-2">
                                        <input class="form-check-input" @click='voirmdp' type="checkbox" v-model="affichemdp" id="flexCheckDefault">
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Afficher les mots de passes
                                        </label>
                                    </div>
                                    <div class="form-group mb-2">
                                    <label for="type">
                                    Type d'administrateur
                                </label>
                                    <select class="form-select" name="type" v-model="typeAdmin" aria-label="Default select example">
                                    <option  value="0">Admin standard</option>
                                    <option value="1">Super admin</option>
                                </select>
                                    </div>
                                <div class="d-flex justify-content-sm-end mt-3">
                                <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Fermer</button>
                                <button type="submit" :disabled="!valid" class="btn btn-primary text-center border rounded" >Enregistrer</button>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                </div>`,
    data() {
        return {
            mdp1: '',
            mdp2: '',
            affichemdp: false,
            valid: false,
            nom: '',
            contact: '',
            email: '',
            typeAdmin: 0,
            show: false,
        }
    },
    methods: {
        verif() {
            if (this.mdp1 == this.mdp2) {
                this.valid = true;
            } else {
                this.valid = false;
            }
        },
        voirmdp() {
            this.show = !this.show;
            this.affichemdp = !this.affichemdp;
        },
        AdminStore() {
            var formdata = new FormData();
            formdata.set('nom', this.nom);
            formdata.append('contact', this.contact);
            formdata.append('email', this.email);
            formdata.append('mdp', this.mdp1);
            formdata.append('type', this.typeAdmin);
            axios.post('../api/Admins.php', formdata)
                .then(response => this.verif(response))
                .catch(error => console.log(error));
        },
        Verif(rep) {
            if (rep.data == "admin dejà existant") {
                Swal.fire(
                    'Erreur!',
                    'Cet mail est déjà utilisé.',
                    'warning'
                );
            } else {
                this.$emit('Admin-added', rep)
            }
        }
    }
}

const Administrateur = {
    components: { AddAdministrateur },
    template: `<div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <div class="card shadow-lg">
                                <div class="card-header bienvenue-header">Liste des autres Administrateurs</div>

                                <div class="card-body">
                                    <AddAdministrateur @Admin-added="refresh" class="mb-3" ></AddAdministrateur>
                                    <table class="table table-primary .table-hover table-responsive-md  ">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Nom</th>
                                                <th scope="col">Contact</th>
                                                <th scope="col">Mail</th>
                                                <th scope="col">Role</th>
                                                <th scope="col" class="d-flex justify-content-sm-end">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(administrateur, index) in administrateurs.data" :key="administrateur[0]">
                                                <th scope="row">{{ index + 1}}</th>
                                                <td>{{ administrateur[1] }}</td>
                                                <td>{{ administrateur[2] }}</td>
                                                <td>{{ administrateur[3] }}</td>
                                                <td>{{ (administrateur[5] == 1) ? 'Super Administrateur' : 'Administrateur standard' }}</td>
                                                <td class="d-flex justify-content-sm-end">
                                                    <button type="button" class="btn btn-danger" @click="deleteAdmin(administrateur[0])">Supprimer</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="card-footer d-flex justify-content-sm-between"> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`,
    data() {
        return {
            administrateurs: {},
            message: '',
        }
    },
    created() {
        axios.get('../api/Admins.php')
            .then(response => this.administrateurs = response.data)
            .catch(error => console.log(error));
    },
    methods: {
        deleteAdmin(id) {
            Swal.fire({
                title: 'Etes vous sûre?',
                text: "Cette action est irréversible",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmer',
                cancelButtonText: 'Annuler'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete('../api/Admins.php?id=' + id)
                        .then(response => this.administrateurs = response.data)
                        .catch(error => console.log(error));
                    Swal.fire(
                        'Effectué!',
                        'L\'administrateur a été supprimée.',
                        'success'
                    );
                }
            });
        },
        refresh(data) {
            this.administrateurs = data.data;
        }
    }
}





const routes = [
    { path: '/', component: Actualite },
    { path: '/formation', component: Formation },
    { path: '/administrateur', component: Administrateur }
]


const router = new VueRouter({
    routes // short for `routes: routes`
})


const app = new Vue({
    el: '#app',
    components: { Sidebar },
    data: {
        type: false,
    },
    router: router
})