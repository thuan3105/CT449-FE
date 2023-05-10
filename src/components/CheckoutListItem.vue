<template>
  <div>
    <h3>Danh sách sản phẩm</h3>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        <span class="name">{{ item.name }}:</span>
        <span>{{ item.price }}đ</span>
      </li>
    </ul>
    <h4 id="total-price">Tổng tiền: {{ this.totalPrice }}đ</h4>
  </div>
</template>

<script>
export default {
  name: "CheckoutList",
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style scoped>
li {
  display: flex;
  justify-content: start;
  margin-bottom: 10px;
}
li span.name {
  width: 200px;
}
#total-price {
  text-align: center;
}
</style>
