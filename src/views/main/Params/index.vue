<template>
    <div class="params">
        <PubHeader :searchHandle="$api.paramsVagueSearch" />
        <ParamsList />
        <PubPagination :total="2" />
        <ParamsAdd/>
        <ParamsEditor />
    </div>
</template>

<script>
import ParamsList from './ParamsList.vue'
import PubPagination from '@/components/PubPagination.vue'
import PubHeader from '@/components/PubHeader.vue'
import ParamsAdd from './ParamsAdd.vue'
import ParamsEditor from './ParamsEditor.vue'
export default{
    components:{
        ParamsList,
        PubPagination,
        PubHeader,
        ParamsAdd,
        ParamsEditor
    }
}
</script>

<style scoped>
.params {
    width: 1200px;
    margin: 0 auto;
}
</style>