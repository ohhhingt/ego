<template>
    <div class="detail-wrap">
        <div class="detail-left">
            <div class="product-board">
                <img src="../../../../assets/地球.webp" alt="" :style="{ width: '100%', height: '100%' }"  >
                <ul>
                    <!-- active-class="active" 指定了当链接对应的路
                    由处于激活状态时，应用于该链接的 CSS 类名 -->
                    <!-- tag="li" 这个属性指定了渲染的 HTML 标签 -->
                    <router-link
                        active-class="active"
                        tag="li"
                        v-for="(item, index) in detailsNav" 
                        :key="index"
                        :to="/details/+item.id"
                    >
                        {{ item.title }}
                    </router-link>
                </ul>
            </div>
        </div>
        <!-- 右侧渲染出口 -->
        <div class="detail-right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default{
    data() {
        return {
            detailsNav: [
                {
                    title: '开放产品',
                    id: 'openproduct'
                },
                {
                    title: '品牌营销',
                    id: 'logo'
                },
                {
                    title: '使命必达',
                    id: 'golife'
                },
                {
                    title: '勇攀高峰',
                    id: 'heigh'
                }
            ]
        }
    }
}
</script>

<style>
.detail-wrap {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 20px;
}

.detail-left {
    float: left;
    width: 200px;
    text-align: center;
}

.detail-right {
    float: left;
    width: 980px;
    margin-left: 20px;
}

.product-board {
    background: #fff;
    padding-bottom: 20px;
}

.product-board ul {
    margin-top: 20px;
}

.product-board li {
    text-align: center;
    padding: 10px 15px;
    cursor: pointer;
}

.product-board li.active,
.product-board li:hover {
    background: #4fc08d;
    color: #fff;
}

.product-board li a {
    display: block;
}

.sales-board {
    background: #fff;
}

.sales-board-form {
    padding: 10px 20px;
    font-size: 14px;
}

.sales-board-intro h2 {
    font-size: 20px;
    padding: 20px;
}

.sales-board-intro p {
    background: #f7fcff;
    padding: 10px 20px;
    color: #999;
    line-height: 1.8;
}

.sales-board-form {
    padding: 10px 20px;
    font-size: 14px;
}

.sales-board-line {
    clear: both;
    padding-bottom: 20px;
}

.sales-board-line-left {
    display: inline-block;
    margin-right: 10px;
}

.sales-board-line-right {
    display: inline-block;
    width: 75%;
}

.sales-board-des {
    border-top: 20px solid #fff;
    background: #fff;
    padding: 15px 20px;
}

.sales-board-des p {
    line-height: 1.6;
}

.sales-board-des h2 {
    font-size: 20px;
    padding-bottom: 15px;
}

.sales-board-des h3 {
    font-size: 18px;
    font-weight: bold;
    padding: 20px 10px 0;
}

.sales-board-des li {
    padding: 15px 0;
}

.sales-board-table {
    width: 100%;
    margin-top: 20px;
}

.sales-board-table th {
    background: #4fc08d;
    color: #fff;
}

.sales-board-table td {
    border: 1px solid #f0f2f5;
    padding: 15px;
}
</style>