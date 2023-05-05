<template>
  <div id="page-wrap">
    <div class="search-results">
      <h2>Kết quả tìm kiếm cho "{{ searchTerm }}"</h2>
      <div v-if="products.length === 0">
        <p>Không có sản phẩm nào phù hợp với từ khóa "{{ searchTerm }}"</p>
      </div>

      <div class="grid-wrap">
        <ProductsGridItem
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductsGridItem from "../components/ProductsGridItem.vue";
export default {
  data() {
    return {
      products: [],
    };
  },
  props: {
    searchTerm: {
      type: String,
      required: true,
    },
  },
  components: {
    ProductsGridItem,
  },
  watch: {
    searchTerm: {
      handler: "fetchData",
      immediate: true,
    },
  },
  methods: {
    async fetchData() {
      if (this.searchTerm.trim() === "") {
        return;
      }
      try {
        const response = await axios.get(
          `/api/products/search/${this.searchTerm}`
        );
        this.products = response.data;
        console.log(this.products);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.grid-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 16px;
}
</style>
