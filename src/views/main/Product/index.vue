<template>
    <div class="product">
        <ProductHeader />
        <ProductList />
        <ProductPagination />
        <ProductAdd />
    </div>
</template>

<script>
import ProductHeader from './ProductHeader.vue'
import ProductList from './ProductList.vue'
import ProductPagination from './ProductPagination.vue'
import ProductAdd from './ProductAdd.vue'
export default{
    components: {
        ProductHeader,
        ProductList,
        ProductPagination,
        ProductAdd
    }
}
</script>

<style scoped>
.product {
    width: 1200px;
    margin: 0 auto;
}
</style>