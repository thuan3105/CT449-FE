<template>
  <div class="product-container">
    <img class="product-image" :src="product.imageUrl" />
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }}đ</p>
    </div>
    <input
      type="number"
      v-bind:value="quantity"
      v-on:input="updateQuantity($event.target.value)"
    />
    <button class="remove-button" @click="remove(product.id)">Xóa</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "CartsListItem",
  props: {
    product: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    remove: {
      type: Function,
      required: true,
    },
    loadData: {
      type: Function,
      required: true,
    },
  },
  methods: {
    updateQuantity(newQuantity) {
      axios
        .patch(`/api/users/${this.user.result.id}/cart/${this.product.id}`, {
          quantity: newQuantity,
        })

        .then((response) => {
          this.loadData();

          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style>
.product-container {
  align-content: "center";
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 16px;
  align-items: center;
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
input[type="number"] {
  width: 60px;
  height: 50px;
  margin: 10px;
}
</style>
