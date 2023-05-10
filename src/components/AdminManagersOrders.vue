<template>
  <div>
    <h1>Tất cả đơn hàng</h1>
    <div class="order-list">
      <div v-for="order in orders" :key="order._id" class="order-item">
        <div class="order-date" @click="showDetail(order)">
          {{ order.date }}
        </div>
        <div class="order-total">Tổng tiền: {{ order.totalPrice }}đ</div>
        <div class="order-detail" :class="{ visible: order.showDetail }">
          <div class="order-detail-item">Name: {{ order.name }}</div>

          <div class="order-detail-item">Email: {{ order.email }}</div>
          <div class="order-detail-item">Addres: {{ order.address }}</div>
          <div
            class="order-detail-item"
            v-for="item in order.cartItems"
            :key="item._id"
          >
            <span>{{ item.name }}</span>
            <span class="price">1x{{ item.price }}đ</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "manage-orders",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      orders: [],
    };
  },
  async created() {
    try {
      const response = await axios.get(`/api/orders`);
      this.orders = response.data.map((order) => ({
        ...order,
        showDetail: false,
      }));
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    showDetail(order) {
      order.showDetail = !order.showDetail;
    },
  },
};
</script>
<style>
.order-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  font-size: 18px;
}

.order-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.order-item:hover {
  background-color: #f5f5f5;
}

.order-date {
  font-weight: bold;
  cursor: pointer;
}

.order-detail {
  display: none;
  flex-direction: column;
  font-size: 16px;
}

.order-detail.visible {
  display: flex;
}

.order-detail-item {
  display: flex;
  justify-content: space-between;
}
.order-detail-item span.price {
  margin-left: 10px;
}
</style>
