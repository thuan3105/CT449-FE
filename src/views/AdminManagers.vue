<template>
  <div class="nav-container">
    <nav class="navbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <button
            class="admin-btn"
            :class="{ active: selectedOption === 'products' }"
            @click="selectedOption = 'products'"
          >
            Quản lý sản phẩm
          </button>
        </li>
        <li class="nav-item">
          <button
            class="admin-btn"
            :class="{ active: selectedOption === 'users' }"
            @click="selectedOption = 'users'"
          >
            Quản lý người dùng
          </button>
        </li>
        <li class="nav-item">
          <button
            class="admin-btn"
            :class="{ active: selectedOption === 'orders' }"
            @click="selectedOption = 'orders'"
          >
            Quản lý đơn hàng
          </button>
        </li>
      </ul>
    </nav>
  </div>
  <manage-products v-if="selectedOption === 'products'" />
  <manage-users v-if="selectedOption === 'users'" />
  <manage-orders v-if="selectedOption === 'orders'" />
</template>

<script>
import ManageProducts from "../components/AdminManagersProducts.vue";
import ManageUsers from "../components/AdminManagersUsers.vue";
import ManageOrders from "../components/AdminManagersOrders.vue";

export default {
  components: {
    ManageProducts,
    ManageUsers,
    ManageOrders,
  },
  data() {
    return {
      selectedOption: "products",
    };
  },
};
</script>
<style>
.nav-container {
  margin: 0 auto;
  width: 600px;
  background-color: #ffd400;
  height: 60px;
  border-radius: 0 0 20px 20px;
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar-nav {
  display: flex;
  list-style: none;
  justify-content: space-between;

  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0 10px 10px 10px;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
}

.nav-link:hover {
  background-color: #ddd;
  color: #333;
  border-radius: 0.25rem;
}
.admin-btn {
  background-color: #ffd400;
  color: rgb(0, 0, 0);
  border: none;
}
</style>
