<template>
  <div class="product-container">
    <img class="product-image" :src="product.imageUrl" />
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }}đ</p>
    </div>
    <button
      class="remove-button"
      v-on:click="$emit('remove-from-cart', product.id)"
    >
      Xóa
    </button>
  </div>
</template>
<script>
export default {
  name: "CartsListItem",
  props: ["product"],
};
</script>
<style>
.product-container {
  align-content: "center";
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 16px;
  width: 100%;
}

.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}
.details-wrap {
  padding: 0 16px;
  flex: 3;
}
.remove-button {
  margin: auto;
  background-color: red;
  color: wheat;
  border: none;
}
</style>
