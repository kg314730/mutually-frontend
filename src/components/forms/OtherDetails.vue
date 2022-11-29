<template>
  <div>
    <div class="parent">
      <h1 class="h4 mb-3 fw-normal">Other Details</h1>
      <!-- {{user}} -->
      <div>
        <img
          src="./../../assets/profile-user.png"
          alt="profile picture"
          id="profile-picture"
          class="img-fluid"
        />
        <div>
          <label for="picture-source">Select Profile Picture</label> <br />
          <input
            type="file"
            class="form-control"
            id="picture-source"
            @change="setProfilePicture"
            accept=".jpg, .jpeg, .jpe .jif, .jfif, .jfi, .png, .gif, .webp, .tiff, .tif, .psd,.raw, .arw, .cr2, .nrw, .k25, .bmp, .dib, .heif, .heic, .svg, .svgz"
          />
          <br />
        </div>
        <div>
          <label for="resume-source">Upload Resume</label> <br />
          <input
            type="file"
            class="form-control"
            id="resume-source"
            @change="setResume"
            accept=".pdf"
          />
          <br />
        </div>
        <div class="checkbox mb-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OtherDetails",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    setProfilePicture: function () {
      let file = document.getElementById("picture-source").files[0];
      if (file)
        document.getElementById("profile-picture").src =
          URL.createObjectURL(file);
      const image_element = document.getElementById("profile-picture");
      fetch(image_element.src)
        .then((res) => res.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.user.profile_picture = reader.result;
            // console.log(reader.result);
          };
          reader.readAsDataURL(blob);
        });
    },
    setResume: function () {
      let file = document.getElementById("resume-source").files[0];
      if (file) {
        const src = URL.createObjectURL(file);
        fetch(src)
          .then((res) => res.blob())
          .then((blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              this.user.resume = reader.result;
              // console.log(reader.result);
            };
            reader.readAsDataURL(blob);
          });
      }
    },
  },
};
</script>

<style scoped>
#profile-picture {
  max-width: 170px;
}
div,
.parent {
  background-color: #f0ebe3;
  color: #14274e;
}
.img-fluid {
  max-block-size: 150px;
  padding: 10px;
}
.options {
  font-size: 2em;
  display: block;
  margin-top: -10px;
  margin-bottom: 65px;
  background-color: #f0ebe3;
}
.left {
  float: left;
}
.right {
  float: right;
}
.padding {
  padding: 50px;
}
</style>
