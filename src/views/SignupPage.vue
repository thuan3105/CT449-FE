<template>
  <div class="signup-container">
    <form class="signup-form" @submit.prevent="signup">
      <h2>Đăng ký</h2>
      <div class="form-group">
        <label for="text">Name</label>
        <input type="name" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          v-model="confirmPassword"
          required
        />
      </div>
      <button type="submit">Đăng ký</button>
      <div>
        <router-link to="/login" id="login-link">
          <h4>Đăng nhập với tài khoản</h4>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "signupPage",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async signup() {
      console.log(this.name);
      console.log(this.email);
      console.log(this.password);
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        const response = await axios.post("/api/signup", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        console.log("Signup successful:", response.data);
        // Redirect to login page
        this.$router.push("/login");
      } catch (error) {
        console.error("Signup failed:", error.response.data);
        alert("Signup failed. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.signup-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.signup-form {
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
input[type="name"],
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
#login-link {
  text-decoration: none;
  color: rgb(72, 152, 255);
  text-align: center;
}
</style>
