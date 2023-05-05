<template>
  <div v-if="cartItems.length > 0">
    <CartsListItem
      v-for="product in cartItems"
      v-on:remove-from-cart="$emit('remove-from-cart', $event)"
      :key="product.id"
      :product="product"
    />
  </div>
  <p v-else>Chưa có sản phẩm trong giỏ hàng!</p>
</template>
<script>
import CartsListItem from "./CartsListItem.vue";
export default {
  name: "CartsList",
  props: ["cartItems"],
  components: {
    CartsListItem,
  },
};
</script>
<style></style>
