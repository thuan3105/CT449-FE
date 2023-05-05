<template>
  <div id="page-wrap">
    <h1>Giỏ hàng</h1>
    <CartsList
      :cartItems="cartItems"
      v-on:remove-from-cart="($event) => removeFromCart($event)"
    />
    <h3 id="total-price">Tổng tiền: {{ totalPrice }}.000đ</h3>
    <router-link to="/checkout"
      ><button id="checkout-button">Xác nhận đơn hàng</button></router-link
    >
  </div>
</template>
<script>
import axios from "axios";
import CartsList from "@/components/CartsList.vue";

export default {
  name: "CartPage",
  components: {
    CartsList,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    totalPrice() {
      const sum = this.cartItems.reduce(
        (sum, item) => sum + parseFloat(item.price),
        0
      );
      const total = sum > 999 ? sum / 1000 : sum;
      console.log(total.toFixed(3).toString()); // hiển thị kết quả với 3 chữ số thập phân
      return total.toFixed(3).toString();
    },
  },
  methods: {
    async removeFromCart(productId) {
      const result = await axios.delete(
        `/api/users/${this.user.result.id}/cart/${productId}`
      );
      this.cartItems = result.data;
    },
  },
  async created() {
    const result = await axios.get(`/api/users/${this.user.result.id}/cart`);
    const cartItems = result.data;
    this.cartItems = cartItems;
  },
};
</script>

<style scoped>
h1 {
  border-bottom: 1px solid black;
  margin: 0;
  margin-top: 16px;
  padding: 16px;
}
#total-price {
  padding: 16px;
  text-align: right;
}

#checkout-button {
  border: none;
  width: 100%;
  margin-bottom: 20px;
  background-color: red;
  color: white;
}
</style>
