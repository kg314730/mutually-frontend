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
                        <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
                    </li>
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#sign-up-form">Sign Up</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#footer">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
    </div>
</template>
<script>
export default {
    name: 'NavComp',
}
</script>

<style scoped>
    nav li:hover{
        background-color: #394867;
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
</style>