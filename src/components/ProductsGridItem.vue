<template>
  <div class="product-item">
    <img :src="product.imageUrl" />
    <div class="product-name-wrap">
      <h4 class="product-name">{{ product.name }}</h4>
    </div>

    <p class="product-price">{{ product.price }}VNĐ</p>
    <router-link v-bind:to="'/products/' + product.id">
      <button>Xem chi tiết</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ProductsGridItem",
  props: ["product"],
};
</script>

<style scoped>
.product-item {
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 2px 5px #888;
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  padding: 20px;
  position: relative;
  width: 30%;
}

.product-name {
  margin-bottom: 0;
}
.product-name-wrap {
  height: 70px;
}
img {
  height: 150px;
  width: 150px;
}

a {
  width: 100%;
}

button {
  width: 100%;
}
</style>
