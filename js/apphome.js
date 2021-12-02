const Login = {
    template: ` <div class="container-fluid">
                    <div class="row justify-content-center">
                        <div class="col-md-6 pt-lg-5">
                            <div class="card shadow-lg">
                                <div class="card-header bienvenue-header">Authentification</div>
                                <div class="card-body">
                                    <form >
                                        <div class="form-group mb-2">
                                            <label for="exampleInputEmail1">Email</label>
                                            <input type="email" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" class="form-control" id="Email" aria-describedby="emailHelp" v-model="email" placeholder="Entrez votre email" name="email" required>
                                        </div>
                                        <div class="form-group mb-2">
                                            <label for="exampleInputPassword1">Mot de passe</label>
                                            <input :type="visible ? 'text' : 'password'" :class="valid ? 'form-control' : 'form-control is-invalid'" id="Password" v-model="mdp"  placeholder="mot de passe" name="mdp" required="">
                                            <div class="invalid-feedback">
                                                Email ou mot de passe incorrect!
                                            </div>
                                        </div>
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="checkbox" v-model="visible" id="flexCheckDefault">
                                            <label class="form-check-label" for="flexCheckDefault">
                                                Afficher le mot de passe
                                            </label>
                                        </div>
                                    </form>
                                    <div class="form-group">
                                        <button @click="login" class="btn text-center border rounded" data-bs-hover-animate="swing"  style=" color: white; font-weight: bold; background-color: #fb842a;">Connection</button>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>`,
    data() {
        return {
            valid: true,
            email: '',
            mdp: '',
            visible: false,
        }
    },
    methods: {
        login() {
            var formdata = new FormData();
            formdata.set('email', this.email);
            formdata.append('mdp', this.mdp);
            axios.get('api/login.php?email=' + this.email + '&mdp=' + this.mdp)
                .then(response => this.traitement(response.data.valide))
                .catch(error => console.log(error));
        },
        traitement(statut) {
            if (statut) {
                window.location.href = "pages/gestionnaire_index.php";
            } else {
                this.valid = false;
            }
        }
    }
}

const apphome = new Vue({
    el: '#apphome',
    components: { Login },
})