<template>
  <div class="container">
    <CustomTable
      ref="CustomTable"
      size="small"
      :is-index="false"
      :loading="tableLoading"
      :is-border="false"
      :table-data="tableData"
      :table-cols="tableCols"
      :is-pagination="true"
      :pagination.sync="pagination"
      :is-handle="true"
      :table-handles="tableHandles"
      @refresh="getTable"
    />

    <SearchForm />
  </div>
</template>

<script>
import CustomTable from "../package/CustomTable/index.vue"; // 引入封装好的组件
import SearchForm from "../package/SearchForm/index.vue"; // 引入封装好的组件
export default {
  name: "ComponentTest",
  components: {
    CustomTable,
    SearchForm,
  },
  data() {
    return {
      // 表格============================
      tableLoading: false,
      tableData: [],
      tableCols: [
        { label: "姓名", prop: "nickname" },
        { label: "账号", prop: "username" },
        { label: "角色", prop: "roles" },
        { label: "创建时间", prop: "createTime" },
        {
          label: "操作",
          type: "Button",
          width: "100",
          fixed: "right",
          name: "option",
          btnList: [
            {
              label: "编 辑",
              type: "text",
              size: "small",
              handle: this.showCreateForm,
            },
            {
              label: "删 除",
              type: "text",
              size: "small",
              handle: this.handleDelete,
            },
          ],
        },
      ],
      tableHandles: [
        // 这是表格和表单之间的一个按钮
        {
          label: "新 建",
          type: "primary",
          size: "small",
          handle: this.showCreateForm,
        },
      ],
      pagination: {
        // 分页数据
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
    };
  },
};
</script>

<style scoped></style>
