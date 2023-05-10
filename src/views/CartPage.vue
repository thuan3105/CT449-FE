<template>
  <div id="page-wrap">
    <h1>Giỏ hàng</h1>
    <CartsList
      :cartItems="cartItems"
      :user="this.user"
      :removeFromCart="removeFromCart"
      :loadData="loadData"
    />

    <h3 id="total-price">Tổng tiền: {{ totalPrice }}đ</h3>

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
        (sum, item) =>
          sum + parseFloat(item.product?.price) * parseInt(item.quantity),
        0
      );
      const total = sum > 999 ? sum / 1000 : sum;
      console.log(total.toFixed(3).toString()); // hiển thị kết quả với 3 chữ số thập phân
      return total.toFixed(3).toString();
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async removeFromCart(id) {
      console.log(id);
      const response = await axios.delete(
        `/api/users/${this.user.result.id}/cart/${id}`
      );
      if (response.status === 200) {
        // Xóa sản phẩm khỏi danh sách cartItems
        const index = this.cartItems.findIndex((i) => i.id === id);
        this.cartItems.splice(index, 1);
      }
    },
    async loadData() {
      const result = await axios.get(`/api/users/${this.user.result.id}/cart`);
      const cartItems = result.data;
      this.cartItems = cartItems;
      console.log(cartItems);
    },
  },

  async created() {
    await this.loadData();
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
