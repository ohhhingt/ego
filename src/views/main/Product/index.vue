<template>
    <div class="product">
        <ProductHeader />
        <ProductList />
        <ProductPagination />
        <ProductAdd />
        <ProductEditor />
    </div>
</template>

<script>
import ProductHeader from './ProductHeader.vue'
import ProductList from './ProductList.vue'
import ProductPagination from './ProductPagination.vue'
import ProductAdd from './ProductAdd.vue'
import ProductEditor from './ProductEditor.vue'
export default{
    components: {
        ProductHeader,
        ProductList,
        ProductPagination,
        ProductAdd,
        ProductEditor
    }
}
</script>

<style scoped>
.product {
    width: 1200px;
    margin: 0 auto;
}
</style>