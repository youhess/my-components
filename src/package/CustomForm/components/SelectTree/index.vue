<template>
  <div v-click-outside="handleClickOutside" class="select-tree">
    <el-input
      v-model="selectParam"
      class="select-param-input"
      :placeholder="placeholder"
      :disabled="disabled"
      @click.native="handleInput"
      @input="filterInput"
      @blur="completeParam"
      @mouseenter.native="paramInputHover"
      @mouseleave.native="paramInputOut"
    >
      <i
        slot="suffix"
        class="el-input__icon"
        :class="icon"
        @click="iconClick(icon)"
      />
    </el-input>
    <div
      v-show="treeShowFlag"
      style="position: absolute; z-index: 3333; width: 100%"
    >
      <div class="triangle"><span /></div>
      <div class="drop-down-div">
        <el-tree
          ref="tree"
          :data="data"
          :props="treeProps"
          :filter-node-method="filterNode"
          :node-key="nodeKey"
          highlight-current
          class="drop-down-tree"
          @node-click="nodeClick"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SelectTree",
  // 声明指令
  directives: {
    "click-outside": {
      bind(el, binding) {
        function eventHandler(e) {
          if (el.contains(e.target)) {
            return false;
          }
          // 如果绑定的参数是函数，正常情况也应该是函数，执行
          if (binding.value && typeof binding.value === "function") {
            binding.value(e);
          }
        }
        // 用于销毁前注销事件监听
        el.__click_outside__ = eventHandler;
        // 添加事件监听
        document.addEventListener("click", eventHandler);
      },
      unbind(el) {
        // 移除事件监听
        document.removeEventListener("click", el.__click_outside__);
        // 删除无用属性
        delete el.__click_outside__;
      },
    },
  },
  model: {
    // 定义model
    // 父组件v-model绑定的值传递给props中的value
    prop: "value",
    // 通过emit触发valueChange将内部值传递给父组件v-model绑定的值
    event: "valueChange",
  },
  props: {
    data: {
      default: () => [],
      type: [Array, Object],
    },
    // value监听的是父组件的v-model
    value: {
      default: "",
      type: [String, Number],
    },
    customId: {
      default: "id",
      type: [String, Number],
    },
    nodeKey: {
      default: "id",
      type: String,
    },
    placeholder: {
      default: "请选择",
      type: String,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
    treeProps: {
      default: () => {
        return {
          children: "childs",
          label: "name",
        };
      },
      type: Object,
    },
  },
  data() {
    return {
      treeShowFlag: false,
      selectParam: "",
      icon: "el-icon-arrow-down",
    };
  },
  watch: {
    treeShowFlag(val) {
      this.icon = val ? "el-icon-arrow-up" : "el-icon-arrow-down";
    },
    value: {
      handler() {
        // 回显
        this.$nextTick(() => {
          this.selectParam = this.value
            ? this.getTreeName(this.getTraverseNodeNodeTree(), this.value)
            : "";
          this.$refs.tree.setCurrentKey(this.value);
        });
      },
      immediate: true,
    },
    data: {
      handler() {
        // 回显
        this.$nextTick(() => {
          this.selectParam = this.value
            ? this.getTreeName(this.getTraverseNodeNodeTree(), this.value)
            : "";
          this.$refs.tree.setCurrentKey(this.value);
        });
      },
    },
  },
  methods: {
    completeParam() {
      const isCurrentDataExist =
        this.setCurrentData() && this.setCurrentData().length > 0;
      if (isCurrentDataExist) {
        // when 检索出树后，value没有被选择。 then 去除selectParam的值
        this.selectParam = this.value
          ? this.getTreeName(this.getTraverseNodeNodeTree(), this.value)
          : "";
      } else {
        // when 树不存在 then 去除selectParam,value的值。
        this.selectParam = "";
        this.$emit("valueChange", "");
        // 内容清除后显示所有数据
        this.filterInput(this.selectParam);
      }
    },
    // 点击外部区域收起下拉框
    // todo 未对其进行配置时，不触发
    handleClickOutside() {
      this.treeShowFlag = false;
    },
    // 点击输入框展开/收起下拉框
    handleInput() {
      // disabled时候不可以跳出
      if (!this.disabled) {
        this.treeShowFlag = !this.treeShowFlag;
      }
    },
    // 输入文字进行模糊查询
    filterInput(val) {
      this.treeShowFlag = true;
      this.$refs.tree.filter(val);
      if (!val) {
        this.$emit("valueChange", "");
      }
    },
    // 鼠标悬浮，如果由内容的话就显示清除图标
    paramInputHover() {
      if (this.selectParam !== "") {
        this.icon = "el-icon-circle-close";
      }
    },
    // 鼠标由悬浮离开，如果图标显示的是清除的话，就换成原来的图标
    paramInputOut() {
      if (this.icon === "el-icon-circle-close") {
        this.icon = this.treeShowFlag
          ? "el-icon-arrow-up"
          : "el-icon-arrow-down";
      }
    },
    // 点击清除图标时清除输入框的内容
    iconClick(icon) {
      if (icon === "el-icon-circle-close") {
        // disabled时候不可以删除
        if (!this.disabled) {
          // 由于此事件会同时触发handleInput(),所以将treeShowFlag设为false，防止出现下拉列表
          this.treeShowFlag = false;
          this.selectParam = "";
          // 双向绑定清空
          this.$emit("valueChange", "");
          // 内容清除后显示所有数据
          this.filterInput(this.selectParam);
        }
      }
    },
    // 节点过滤（模糊查询）
    filterNode(value, data, node) {
      if (!value) return true;
      return node.label.indexOf(value) !== -1;
    },
    // 树形节点点击事件
    nodeClick(val, node) {
      // 通过$emit触发valueChange（model内定义）事件，将内部值传递给给父组件
      this.$nextTick(() => {
        this.selectParam = node.label;
      });
      // 选择后直接将label给 selectParam
      this.$emit("valueChange", val[this.customId]);
      this.$emit("change", val);
    },
    // 获取树过滤后 data
    setCurrentData() {
      const traverseNode = function (node) {
        if (Object.prototype.toString.call(node) === "[object Array]") {
          return node.map((t) => traverseNode(t));
        }
        const data = {
          id: node.key,
          label: node.label,
          visible: node.visible,
          children: [],
        };
        const childNodes = node.childNodes;
        childNodes.forEach((child) => {
          const item = traverseNode(child);
          if (item.visible) {
            data.visible = true;
          }
          data.children.push(item);
        });
        return data;
      };
      const traverseVisible = function (arr) {
        return arr.filter((t) => {
          const visible = t.visible;
          if (!visible) {
            return false;
          }
          if (t.children) {
            t.children = traverseVisible(t.children);
          }
          delete t.visible;
          return visible;
        });
      };
      // el-tree的数据是用内部实现的一个node-store存储的，没有直接对外提供过滤后的数据，但是可以通过refs拿到带visible属性的所有节点数据：this.$refs.tree.store.root.childNodes
      const data = traverseNode(this.$refs.tree.store.root.childNodes);
      //   this.currentTree = traverseVisible(data);
      return traverseVisible(data);
    },
    // 获取处理过的树
    getTraverseNodeNodeTree() {
      const traverseNode = function (node) {
        if (Object.prototype.toString.call(node) === "[object Array]") {
          return node.map((t) => traverseNode(t));
        }
        const data = {
          id: node.key,
          label: node.label,
          visible: node.visible,
          children: [],
        };
        const childNodes = node.childNodes;
        childNodes.forEach((child) => {
          const item = traverseNode(child);
          if (item.visible) {
            data.visible = true;
          }
          data.children.push(item);
        });
        return data;
      };
      return traverseNode(this.$refs.tree.store.root.childNodes);
    },
    // 查找树中对应id
    getTreeName(list, id) {
      for (let i = 0; i < list.length; i++) {
        const a = list[i];
        if (a["id"] === id) {
          return a["label"];
        } else {
          if (a["children"] && a["children"].length > 0) {
            const res = this.getTreeName(a["children"], id);
            if (res) {
              return res;
            }
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.select-tree {
  width: 100%;
  display: inline-block;
  transition: 0.5s;
  .select-param-input {
    width: 100%;
    ::v-deep .el-input__inner {
      cursor: pointer;
    }
    ::v-deep .el-input__suffix-inner {
      cursor: pointer;
    }
  }
}
.drop-down-div {
  border-radius: 3px;
  max-height: 200px;
  min-width: 200px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 2px 8px 1px rgba(0, 0, 0, 0.2);
}
.drop-down-div .drop-down-tree {
  overflow: auto;
}
.triangle {
  width: 0;
  height: 0;
  border-width: 0 8px 7px;
  border-style: solid;
  border-color: transparent transparent rgb(220, 223, 230);
  margin-left: 60px;
  margin-top: 3px;
  position: relative;
}
.triangle span {
  display: block;
  width: 0;
  height: 0;
  border-width: 0 7px 6px;
  border-style: solid;
  border-color: transparent transparent rgb(255, 255, 255);
  position: absolute;
  top: 1px;
  left: -7px;
}
</style>
