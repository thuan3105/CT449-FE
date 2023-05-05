<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="login">
      <h2>Đăng nhập</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Đăng nhập</button>
      <div>
        <router-link to="/signup" id="signup-link">
          <h4>Đăng ký nếu chưa có tài khoản</h4>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      // Send login request to server
      axios
        .post("/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
          this.$emit("updateUser", response.data);
          this.$router.push("/products");
          // Redirect to home page or dashboard
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.login-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 400px;
  padding: 40px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 5px;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
button[type="submit"] {
  display: block;
  margin-top: 20px;
  padding: 10px;
  background-color: #f96f3a;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin: 10px auto;
}
#signup-link {
  text-decoration: none;
  color: rgb(72, 152, 255);
  text-align: center;
}
</style>
