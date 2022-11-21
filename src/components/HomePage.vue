<template>
    <div>
          <div class="parent">
            <div class="flex1">
                <img src="./../assets/landing_page.png" alt="Office Image" class="img-fluid">
            </div>
            <div class="flex2">
              <center>
                    <div class="card card-width">
                        <div class="card-header">
                            Welcome to mutuALLY!
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Referral Portal</h5>
                            <p class="card-text">mutuALLY provides a platform where users can seek, provide and manage referrals. Start your journey here and find a potential match...</p>
                        </div>
                        <div id="sign-up-form" class="carousel slide card-body" data-bs-touch="false">
                            <div class="carousel-inner">
                              <div class="carousel-item active">
                                <h2 class="custom-header">Sign Up</h2>
                                <form class="card-body">
                                    <div class="mb-3">
                                        <label for="username" class="form-label">Username</label>
                                        <input type="text" class="form-control" id="username" aria-describedby="username">
                                        <div id="username" class="form-text">This name will be displayed on your profile</div>
                                    </div>
                                    <div class="mb-3">
                                      <label for="email" class="form-label">Email address</label>
                                      <input type="email" class="form-control" id="email">
                                    </div>
                                    <div class="mb-3">
                                      <label for="pwd" class="form-label">Password</label>
                                      <input type="password" class="form-control" id="pwd">
                                    </div>
                                    <center>
                                        <button type="submit" class="btn btn-primary custom-btn">Submit</button>
                                        <br>
                                        <a href="" type="button" data-bs-target="#sign-up-form" data-bs-slide="next">Already a user? Sign In here...</a>
                                    </center>
                                    
                                </form>
                              </div>
                              <div class="carousel-item">
                                <h2 class="custom-header">Sign In</h2>
                                <form class="card-body">
                                    <div class="mb-3">
                                      <label for="email" class="form-label">Email address</label>
                                      <input type="email" class="form-control" id="email">
                                    </div>
                                    <div class="mb-3">
                                      <label for="pwd" class="form-label">Password</label>
                                      <input type="password" class="form-control" id="pwd">
                                    </div>
                                    <center>
                                        <button type="submit" class="btn btn-primary custom-btn">Submit</button>
                                        <br>
                                        <a href="" type="button" data-bs-target="#sign-up-form" data-bs-slide="next">Registering for the first time? <br>Sign Up here...</a>
                                    </center>
                                </form>
                              </div>
                            </div>
                        </div>
                        <div class="card-footer text-muted">
                        </div>
                    </div>
                  </center>
            </div>
          </div>
    </div>
</template>
<script>

export default {
    name: "HomePage",
}
</script>
<style scoped>
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
    .custom-header{
        background-color: #394867;
        color: white;
        text-align:center;
        width: 50%;
        margin: 0 auto;
        border-radius: 10px;
        padding: 7px;
        font-size: 1.2em;
    }
    form a{
        color: #14274E;
        text-decoration: none;
    }
    form{
      text-align: left;
    }
</style>