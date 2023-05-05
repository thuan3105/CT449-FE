<template>
  <div>
    <h1>Đơn hàng của bạn</h1>
    <div class="order-list">
      <div v-for="orther in orthers" :key="orther._id" class="order-item">
        <div class="order-date" @click="showDetail(orther)">
          {{ orther.date }}
        </div>
        <div class="order-total">Tổng tiền: {{ orther.totalPrice }}.000đ</div>
        <div class="order-detail" :class="{ visible: orther.showDetail }">
          <div class="order-detail-item">Name: {{ orther.name }}</div>

          <div class="order-detail-item">Email: {{ orther.email }}</div>
          <div class="order-detail-item">Addres: {{ orther.address }}</div>
          <div
            class="order-detail-item"
            v-for="item in orther.cartItems"
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
  name: "OrtherPage",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      orthers: [],
    };
  },
  async created() {
    try {
      const response = await axios.get(
        `/api/users/${this.user.result.id}/orthers`
      );
      this.orthers = response.data.map((orther) => ({
        ...orther,
        showDetail: false,
      }));
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    showDetail(orther) {
      orther.showDetail = !orther.showDetail;
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
