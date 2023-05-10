<template>
  <div v-if="cartItems.length > 0">
    <CartsListItem
      v-for="item in cartItems"
      :key="item.product.id"
      :product="item.product"
      :quantity="item.quantity"
      :user="user"
      :remove="removeFromCartHandler"
      :loadData="loadData"
    />
  </div>
  <p v-else>Chưa có sản phẩm trong giỏ hàng!</p>
</template>
<script>
import CartsListItem from "./CartsListItem.vue";
export default {
  name: "CartsList",
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    removeFromCart: {
      type: Function,
      required: true,
    },
    loadData: {
      type: Function,
      required: true,
    },
  },
  methods: {
    removeFromCartHandler(id) {
      this.removeFromCart(id);
    },
  },
  components: {
    CartsListItem,
  },
};
</script>
<style></style>
