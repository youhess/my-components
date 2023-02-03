<template>
  <div>
    <el-input
      v-model="filterText"
      size="small"
      :placeholder="placeholder"
    />
    <el-tree
      ref="tree"
      style="margin-top: 24px"
      :data="data"
      :props="defaultProps"
      :expand-on-click-node="expandOnClickNode"
      :node-key="nodeKey"
      :show-checkbox="showCheckbox"
      check-strictly
      :default-checked-keys="defaultCheckedKeys"
      :default-expanded-keys="defaultExpandedKeys"
      :filter-node-method="filterNode"
      @check="checkedClick"
    />
  </div>
</template>
<script>
export default {
  name: "BluexiiCustomTree",
  model: {
    // 需要双向绑定的 props 变量名称，也就是父组件通过 v-model 与子组件双向绑定的变量
    prop: "treeData",
    // 定义由 $emit 传递变量的名称
    event: "treeDataChange",
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    treeData: {
      type: Array,
      default: () => [],
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: "childs",
          label: "name",
        };
      },
    },
    defaultCheckedKeys: {
      type: Array,
      default: () => [],
    },

    defaultExpandedKeys: {
      type: Array,
      default: () => [],
    },
    showCheckbox: {
      type: Boolean,
      default: true,
    },
    expandOnClickNode: {
      type: Boolean,
      default: false,
    },
    nodeKey: {
      type: String,
      default: "id",
    },
    placeholder: {
      type: String,
      default: "请输入名称",
    },
  },
  data() {
    return {
      filterText: "", // 树形搜索
      sonTreeData: this.treeData, // 树形搜索
    };
  },
  // 监听输入值，给到:filter-node-method
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    treeData: {
      // 这里箭头函数指向可能会出现问题
      handler: function(newVal) {
        this.sonTreeData = newVal;
      },
      deep: true,
    },
    sonTreeData: {
      // 这里箭头函数指向可能会出现问题
      handler: function(newVal) {
        // 回显
        this.$refs.tree.setCheckedKeys(newVal);
        this.$emit("treeDataChange", newVal);
      },
      deep: true,
    },
  },
  methods: {
    checkedClick(data, { checkedKeys }) {
      // 自定义勾选效果方法
      if (checkedKeys.includes(data[this.nodeKey])) {
        // 选中
        const node = this.$refs.tree.getNode(data[this.nodeKey]); // getNode(node-key)
        this.selectChildren(data, true); // 选中子节点
        this.parentNodesChange(node); // 选中父节点
      } else {
        this.selectChildren(data, false); // 取消子节点
      }
      // 获取全选的keys
      const keysArr = this.$refs.tree.getCheckedKeys();
      this.sonTreeData = keysArr;
      // this.$emit("click", keysArr);
    },
    setCheckedKeys(val) {
      this.$refs.tree.setCheckedKeys(val);
    },
    selectChildren(data, checked) {
      data &&
        data[this.defaultProps["children"]] &&
        data[this.defaultProps["children"]].map((item) => {
          this.$refs.tree.setChecked(item[this.nodeKey], checked);
          if (data[this.defaultProps["children"]]) {
            this.selectChildren(item, checked);
          }
        });
    },
    // 父级递归
    parentNodesChange(node) {
      if (node.parent) {
        for (const key in node) {
          if (key === "id") {
            // console.log(node[key]);
            this.$refs.tree.setChecked(node, true);
          }
        }
        if (node.parent && node[this.nodeKey] !== 0) {
          this.parentNodesChange(node.parent);
        }
      }
    },
    // 过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },
  },
};
</script>
<style lang="scss" scoped></style>
