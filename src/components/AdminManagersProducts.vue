<template>
  <div class="admin-page-wrap">
    <h1>Trang quản lý sản phẩm</h1>

    <form class="admin-form" @submit.prevent="addProduct">
      <h2 v-if="this.editingIndex === null">Thêm sản phẩm mới</h2>
      <h2 v-else>Sửa sản phẩm</h2>

      <label>
        Tên sản phẩm:
        <input type="text" v-model="newProduct.name" />
      </label>

      <label>
        Mô tả:
        <textarea v-model="newProduct.description"></textarea>
      </label>
      <label>
        Link hình ảnh:
        <input type="text" v-model="newProduct.imageUrl" />
      </label>

      <label>
        Giá:
        <input type="text" v-model="newProduct.price" />
      </label>

      <button v-if="this.editingIndex === null" type="submit">
        Thêm sản phẩm
      </button>
      <button v-else type="submit">Sửa sản phẩm</button>
    </form>

    <h2>Danh sách sản phẩm</h2>

    <table>
      <thead>
        <tr>
          <th>Hình ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Mô tả</th>
          <th>Giá</th>
          <th>Sửa</th>
          <th>Xóa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td><img :src="product.imageUrl" /></td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td><button @click="editProduct(index)">Sửa</button></td>
          <td><button @click="deleteProduct(index)">Xóa</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  name: "manage-products",
  data() {
    return {
      products: [],
      newProduct: {
        name: "",
        description: "",
        price: 0,
      },
      editingIndex: null,
    };
  },

  mounted() {
    this.loadProducts();
  },

  methods: {
    async loadProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error(error);
      }
    },

    async addProduct() {
      try {
        if (
          !this.newProduct.name ||
          !this.newProduct.description ||
          !this.newProduct.price ||
          !this.newProduct.imageUrl
        ) {
          alert("Vui lòng nhập đầy đủ thông tin sản phẩm!"); // Kiểm tra các trường input không được trống
          return;
        }
        if (this.editingIndex === null) {
          // Thêm sản phẩm mới
          const response = await fetch("/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: uuidv4(),
              name: this.newProduct.name,
              price: this.newProduct.price,
              description: this.newProduct.description,
              imageUrl: this.newProduct.imageUrl,
              averageRating: "5.0",
            }),
          });
          const data = await response.json();
          this.products.push(data);
          await this.loadProducts();
        } else {
          // Cập nhật sản phẩm
          const product = this.products[this.editingIndex];
          const response = await fetch(`/api/products/${product.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: product.id,
              name: this.newProduct.name,
              price: this.newProduct.price,
              description: this.newProduct.description,
              imageUrl: this.newProduct.imageUrl,
              averageRating: product.averageRating,
            }),
          });
          const data = await response.json();
          this.products.splice(this.editingIndex, 1, data);
          this.editingIndex = null;
          await this.loadProducts(); // Reset biến editingIndex sau khi cập nhật sản phẩm
        }
        this.newProduct.name = "";
        this.newProduct.description = "";
        this.newProduct.price = 0;
        this.newProduct.imageUrl = ""; // Reset giá trị của biến newProduct
      } catch (error) {
        console.error(error);
      }
    },
    async editProduct(index) {
      this.editingIndex = index; // Gán giá trị editingIndex bằng index sản phẩm đang được sửa
      this.newProduct = Object.assign({}, this.products[index]); // Gán giá trị của sản phẩm đang được sửa cho biến newProduct
    },

    async deleteProduct(index) {
      try {
        const productId = this.products[index].id;
        await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });
        this.products.splice(index, 1);
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
