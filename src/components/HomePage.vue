<template>
    <div>
        <nav class="navbar navbar-expand-lg color-set">
            <div class="container-fluid">
                <img src="./../assets/logo.gif" alt="logo" class="logo">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#">Home</a>
                    </li>
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#">Referee Sign In</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Referrer Sign In</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div class="parent">
            <div class="flex1">
                <img src="./../assets/landing_page.png" alt="Office Image" class="img-fluid">
            </div>
            <div class="flex2">
                <center>
                    <div class="card text-center card-width">
                        <div class="card-header">
                            Looking for a referral?
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Continue as a Referee</h5>
                            <p class="card-text">Looking for a referral? Start your journey here and find a potential referrer...</p>
                            <a href="#" class="btn btn-primary custom-btn">Get Started</a>
                        </div>
                        <div class="card-footer text-muted">
                        </div>
                    </div>
                    <br><br>
                    <div class="card text-center card-width">
                        <div class="card-header">
                            Looking for a referee?
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Continue as a Referrer</h5>
                            <p class="card-text">Looking for helping talented candidates find their dream job? Start your journey here...</p>
                            <a href="#" class="btn btn-primary custom-btn">Get Started</a>
                        </div>
                        <div class="card-footer text-muted">
                        </div>
                    </div>
                </center>
            </div>
          </div>
          <FooterComponent/>
    </div>
</template>
<script>
import FooterComponent from './FooterComponent.vue';

export default {
    name: "HomePage",
    components: { FooterComponent }
}
</script>
<style scoped>
    nav li:hover{
        background-color: #394867;
    }
    .parent{
        display: flex;
        flex-direction: row;
        background-color: #F1F6F9;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin: 0;
        padding: 35px 0;
        gap: 30px;
    }
    .flex1{
        width: 900px;
    }
    .flex2{
        width:500px;
    }
    .color-set{
        background-color: #14274E;
    }
    .color-set a{
        color: #F1F6F9;
    }
    .logo{
        height: 75px;
    }
    .navbar-toggler{
        background-color: #F1F6F9;
    }
    .row{
        height: 80vh;
    }
    .card-width{
        width: 400px;
    }
    .card-header,.card-footer{
        background-color: #394867;
        color: white;
        font-weight: 500;
        font-size: 1.1em;
    }
    .card-body{
        background-color: #F0EBE3;
        color: #14274E;
        font-size: 1.1em;
    }
    .custom-btn{
        background-color: #394867;
        width: 150px;
    }
</style>