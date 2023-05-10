<template>
  <div id="page-wrap" v-if="product">
    <div id="img-wrap">
      <img v-bind:src="product.imageUrl" />
    </div>
    <div id="product-details">
      <h3>{{ product.name }}</h3>
      <h3 id="price">{{ product.price }}vnđ</h3>
      <p>Đánh giá: {{ product.averageRating }}</p>
      <button
        class="button-detail"
        id="add-to-cart"
        v-if="!itemIsInCart && !showSuccessMessage"
        v-on:click="addToCart"
      >
        Thêm vào giỏ hàng
      </button>
      <button
        id="add-to-cart"
        class="green-button button-detail"
        v-if="!itemIsInCart && showSuccessMessage"
      >
        Thêm vào giỏ hàng thành công!
      </button>
      <button
        id="add-to-cart"
        class="grey-button button-detail"
        v-if="itemIsInCart"
      >
        sản phẩm đã có trong giỏ hàng
      </button>
      <h4>Mô Tả</h4>
      <p v-html="product.description"></p>
    </div>
  </div>
  <NotFound v-else />
</template>

<script>
import axios from "axios";
import NotFound from "./NotFound";

export default {
  name: "ProductDetailPage",
  components: {
    NotFound,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      product: {},
      cartItems: [],
      showSuccessMessage: false,
    };
  },
  computed: {
    itemIsInCart() {
      return this.cartItems.some((item) => item.product.id === this.product.id);
    },
  },
  methods: {
    async addToCart() {
      if (this.user == null) {
        window.alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      } else {
        console.log(this.user.result.id);
        await axios.post(`/api/users/${this.user.result.id}/cart`, {
          productId: this.$route.params.id,
        });
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.$router.push("/products");
        }, 1000);
      }
    },
  },
  async created() {
    const { data: product } = await axios.get(
      `/api/products/${this.$route.params.id}`
    );
    this.product = product;

    const { data: cartItems } = await axios.get(
      `/api/users/${this.user.result.id}/cart`
    );
    this.cartItems = cartItems;
  },
};
</script>

<style scoped>
#page-wrap {
  margin-top: 16px;
  padding: 16px;
  max-width: 600px;
}

#img-wrap {
  text-align: center;
  border-radius: 20px;
  padding: 10px;
}

img {
  width: 400px;
  height: 400px;
}

#product-details {
  padding: 16px;
  position: relative;
}
#product-details h1 {
  text-align: left;
}
#add-to-cart {
  width: 100%;
}

#price {
  position: absolute;
  top: 24px;
  right: 16px;
}
.button-detail {
  background-color: #fb6e2e;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  padding: 16px;
}
</style>
