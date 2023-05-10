<template>
  <div class="admin-page-wrap">
    <h1>Trang quản lý người dùng</h1>

    <form class="admin-form" @submit.prevent="addUser">
      <h2 v-if="editingIndex === null">Thêm người dùng mới</h2>
      <h2 v-else>Sửa người dùng</h2>

      <label>
        Tên người dùng:
        <input type="text" v-model="newUser.name" />
      </label>

      <label>
        Email:
        <input type="email" v-model="newUser.email" />
      </label>
      <label>
        Mật khẩu:
        <input type="password" v-model="newUser.password" />
      </label>

      <label>
        Quyền:
        <select v-model="newUser.isAdmin">
          <option value="0">Người dùng</option>
          <option value="1">Quản trị</option>
        </select>
      </label>

      <button v-if="editingIndex === null" type="submit">
        Thêm người dùng
      </button>
      <button v-else type="submit">Sửa người dùng</button>
    </form>

    <h2>Danh sách người dùng</h2>

    <table>
      <thead>
        <tr>
          <th>Tên người dùng</th>
          <th>Email</th>
          <th>Mật Khẩu</th>
          <th>Quyền</th>
          <th>Sửa</th>
          <th>Xóa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>**********</td>
          <td v-if="user.isAdmin == 1">Quản trị</td>
          <td v-else>Người dùng</td>
          <td><button @click="editUser(index)">Sửa</button></td>
          <td><button @click="deleteUser(index)">Xóa</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export default {
  name: "manage-users",
  data() {
    return {
      users: [],
      newUser: {
        name: "",
        email: "",
        password: "",
        isAdmin: 0,
      },
      editingIndex: null,
    };
  },

  mounted() {
    this.loadUsers();
  },

  methods: {
    async loadUsers() {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error(error);
      }
    },

    async addUser() {
      if (this.editingIndex == null) {
        try {
          const response = await axios.post("/api/signup", {
            name: this.newUser.name,
            email: this.newUser.email,
            password: this.newUser.password,
            isAdmin: this.newUser.isAdmin,
          });
          console.log("Signup successful:", response.data);
          // Redirect to login page
          await this.loadUsers();
        } catch (error) {
          console.error("Signup failed:", error.response.data);
          alert("Signup failed. Please try again.");
        }
      } else {
        try {
          if (!this.newUser.name || !this.newUser.email) {
            alert("Vui lòng nhập đầy đủ thông tin người dùng!"); // Kiểm tra các trường input không được trống
            return;
          }

          // Tạo object để gửi đến API
          const user = {
            name: this.newUser.name,
            email: this.newUser.email,
            isAdmin: this.newUser.isAdmin,
          };

          // Nếu password được nhập thì thêm vào object user
          if (this.newUser.password) {
            user.password = this.newUser.password;
          }

          const response = await fetch(`/api/users/${this.newUser.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });

          if (!response.ok) {
            throw new Error("Cập nhật người dùng thất bại!");
          }

          const data = await response.json();
          const index = this.users.findIndex(
            (user) => user.id === this.newUser.id
          );

          if (index !== -1) {
            this.users[index] = data;
          } else {
            this.users.push(data);
          }

          this.newUser.name = "";
          this.newUser.email = "";
          this.newUser.password = "";
          this.newUser.isAdmin = 0;
          alert("Cập nhật người dùng thành công!");
          await this.loadUsers();
          this.editingIndex = null;
        } catch (error) {
          console.error(error);
          alert("Cập nhật người dùng thất bại!");
        }
      }
    },
    async editUser(index) {
      this.editingIndex = index; // Gán giá trị editingIndex bằng index sản phẩm đang được sửa
      this.newUser = Object.assign({}, this.users[index]); // Gán giá trị của sản phẩm đang được sửa cho biến newUser
    },

    async deleteUser(index) {
      try {
        const userId = this.users[index].id;
        await fetch(`/api/users/${userId}`, {
          method: "DELETE",
        });
        this.users.splice(index, 1);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style>
.admin-page-wrap {
  max-width: 800px;
  min-height: 100vh;
  margin: auto;
}
h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
img {
  height: 60px;
  width: 60px;
}
h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.admin-form {
  margin-bottom: 2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 100%;
  margin-bottom: 1rem;
}

button[type="submit"] {
  margin-top: 20px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #0077cc;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ccc;
  padding: 0.5rem;
}

th {
  font-weight: bold;
  background-color: #f2f2f2;
}
</style>
