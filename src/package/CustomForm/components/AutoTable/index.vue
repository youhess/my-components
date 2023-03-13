<template>
  <div class="autoTable">
    <el-table
      ref="autoTable"
      :style="{ width: width || '100%' }"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      :data="tableData"
      :size="size"
      :border="false"
    >
      <span slot="empty">
        <img
          style="width: 230px; height: 150px; margin: 50px auto"
          :src="'https://bluexiidev.obs.cn-east-3.myhuaweicloud.com:443/huawei/center/ad8fbd69e03f7e279ff4e0ce20f992432917d6725492a1a4ef2f157a348e1216.png'"
        />
      </span>
      <!-- 数据栏 -->
      <el-table-column
        v-for="item in tableCols"
        :key="item.id"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :fixed="item.fixed"
        :show-overflow-tooltip="
          item.notShowOverflowTooltip ? !item.notShowOverflowTooltip : true
        "
      >
        <template slot-scope="scope">
          <!-- 输入框 -->
          <el-input
            v-model="scope.row[item.prop]"
            :size="size"
            :maxlength="10"
            :disabled="
              (item.isDisabled && item.isDisabled(scope.row)) || disabled
            "
          />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <div style="display: flex; justify-content: flex-start; gap: 10px">
            <el-button
              v-show="scope.$index + 1 === tableData.length"
              type="text"
              icon="el-icon-circle-plus-outline"
              style="color: #ff1600; font-size: 16px; margin: 0"
              size="small"
              :disabled="disabled"
              @click="addItem(scope)"
            />
            <el-button
              v-show="tableData.length > 1"
              type="text"
              icon="el-icon-remove-outline"
              style="font-size: 16px; margin: 0"
              size="small"
              :disabled="disabled"
              @click="removeItem(scope)"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "AutoTable",
  model: {
    // 定义model
    // 父组件v-model绑定的值传递给props中的value
    prop: "value",
    // 通过emit触发valueChange将内部值传递给父组件v-model绑定的值
    event: "valueChange",
  },
  props: {
    headerCellStyle: {
      type: [Object, Function],
      default: () => ({
        background: "#fafafa",
        color: "#606266",
      }),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    cellStyle: {
      type: [Object, Function],
      default: () => {},
    },
    tableCols: {
      type: Array,
      default: () => [],
    },
    size: { type: String, default: "small" },
    lengthMax: { type: Number, default: 0 },
    lengthMin: { type: Number, default: 0 },
    value: {
      type: Array,
      default: () => [],
    },
    width: { type: String, default: "" },
  },
  data() {
    return {
      tableData: this.value,
      autoRowItem: {},
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.tableData = newVal;
      },
      deep: true,
      immediate: true,
    },
    tableCols: {
      handler(newVal) {
        const rowItem = {};
        // 生成自增对象
        newVal.forEach((item) => {
          rowItem[item.prop] = "";
        });
        this.autoRowItem = rowItem;
      },
      deep: true,
      immediate: true,
    },
    tableData: {
      handler(newVal) {
        // not defined seem as minimum 1
        if (!this.lengthMin) {
          for (const key in this.autoRowItem) {
            this.$set(newVal[0], key, newVal[0][key] || this.autoRowItem[key]);
          }
        }
        // regular
        else {
          for (let i = 0; i < this.lengthMin; i++) {
            for (const key in this.autoRowItem) {
              this.$set(
                newVal[i],
                key,
                newVal[i][key] || this.autoRowItem[key]
              );
            }
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    addItem(scope) {
      //   检查是否符合填写格式

      // const isEmpty = this.isEmptyObject(this.tableData[scope.$index]);

      if (this.lengthMax && this.tableData.length >= this.lengthMax) {
        this.$message({
          message: "已超过最大规定行数",
          type: "warning",
        });
      } else {
        this.tableData.splice(
          scope.$index + 1,
          0,
          JSON.parse(JSON.stringify(this.autoRowItem))
        );
      }
      //  else {
      //   this.$message({
      //     message: "尚有字段未填",
      //     type: "warning",
      //   });
      // }
    },
    removeItem(scope) {
      if (this.lengthMin && this.tableData.length <= this.lengthMin) {
        this.$message({
          message: "不得小于最小规定行数",
          type: "warning",
        });
      } else {
        this.tableData.splice(scope.$index, 1);
      }
    },
    isEmptyObject(obj) {
      for (var key in obj) {
        if (!obj[key]) return true;
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped></style>
