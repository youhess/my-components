<template>
  <div class="container">
    <CustomTable/>
    <SearchForm/>
  </div>
</template>

<script>
import CustomTable from "../package/CustomTable/index.vue"; // 引入封装好的组件
import SearchForm from "../package/SearchForm/index.vue"; // 引入封装好的组件
  export default {
    name: 'ComponentTest',
    components:{
      CustomTable,
      SearchForm
    }
  };
</script>

<style scoped></style>
