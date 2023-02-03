<template>
  <section class="ces-table-page">
    <!-- 表格操作按钮 -->
    <section
      v-if="isHandle && tableHandles && tableHandles.length > 0"
      class="handle-wrapper"
    >
      <template>
        <span v-for="(item, index) in tableHandles" :key="index">
          <el-button
            v-if="item.isShown ? item.isShown() : true"
            :size="item.size || size"
            :type="item.type"
            :icon="item.icon"
            :plain="item.plain"
            :round="item.round"
            :circle="item.circle"
            :loading="item.loading"
            style="margin-right: 10px"
            :style="(item.handlestyle && item.handlestyle()) || item.style"
            :class="(item.handleclass && item.handleclass()) || item.class"
            :disabled="item.isDisabled && item.isDisabled()"
            @click="item.handle()"
            >{{ item.label }}
          </el-button>
        </span>
      </template>
    </section>
    <!-- 数据表格 -->
    <section class="ces-table">
      <div v-if="isFilterColumn" class="filter-column">
        <el-popover placement="bottom" width="150" trigger="click">
          <el-checkbox-group v-model="filterColumnItems">
            <el-checkbox
              v-for="(item, index) in tableCols"
              :key="index"
              :label="item.label"
              :disabled="filterColumnDisabledArr.includes(item.label)"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>

          <div slot="reference">
            <!-- <i class="el-icon-s-operation"></i> -->
            <div>
              <svg-icon
                style="width: 16px; height: 16px; cursor: pointer"
                icon-class="selectList"
              />
            </div>
          </div>
        </el-popover>
      </div>
      <el-table
        ref="cesTable"
        :key="newTableKey"
        v-loading="loading"
        style="width: 100%"
        :header-cell-style="headerCellStyle"
        :data="tableData"
        :size="size"
        :border="isBorder"
        :row-key="rowKey"
        :tree-props="treeProps"
        :default-selections="defaultSelections"
        :expand-row-keys="expandRowKeys"
        :row-class-name="tableRowClassName"
        :cell-class-name="tableCellClassName"
        @cell-dblclick="tabClick"
        @select="select"
        @select-all="selectAll"
        @selection-change="selectionChange"
        @row-click="rowClick"
      >
        <span slot="empty">
          <img
            style="width: 230px; height: 150px; margin: 50px auto"
            :src="'https://bluexiidev.obs.cn-east-3.myhuaweicloud.com:443/huawei/center/ad8fbd69e03f7e279ff4e0ce20f992432917d6725492a1a4ef2f157a348e1216.png'"
          />
        </span>
        <!-- 选择项 -->
        <el-table-column
          v-if="isSelection"
          type="selection"
          :reserve-selection="reserveSection"
          align="center"
          width="50"
        />
        <!-- 序号 -->
        <el-table-column
          v-if="isIndex"
          type="index"
          :label="indexLabel"
          align="center"
          width="50"
        >
          <template scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <!-- 数据栏 -->
        <el-table-column
          v-for="item in changedTableCols"
          :key="item.id"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :fixed="item.fixed"
          :show-overflow-tooltip="
            item.notShowOverflowTooltip ? !item.notShowOverflowTooltip : true
          "
          :render-header="item.require ? renderHeader : null"
        >
          <!-- 自定表头 -->
          <template v-if="item.isHeaderOptions" slot="header">
            <div style="display: flex; align-items: center; gap: 6px">
              <div class="left-header-wrapper">
                <!-- 启用 tooltip-->
                <el-tooltip
                  v-if="item.isHeaderOptions['isTooltip']"
                  class="item"
                  effect="dark"
                  :content="item.isHeaderOptions['headerTooltipContent']"
                  placement="top-start"
                >
                  <span style="display: flex; align-items: center; gap: 6px">
                    <span>{{ item.label }}</span>
                    <i :class="item.isHeaderOptions['icon']" />
                  </span>
                </el-tooltip>
                <!-- 不起用tooltip -->
                <div v-else>
                  <span style="display: flex; align-items: center; gap: 6px">
                    <span>{{ item.label }}</span>
                    <i :class="item.isHeaderOptions['icon']" />
                  </span>
                </div>
              </div>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- html -->
            <span v-if="item.type === 'Html'" v-html="item.html(scope.row)" />
            <!-- 按钮 -->
            <span v-if="item.type === 'Button'">
              <template>
                <span
                  v-for="(btn, index) in item.btnList.slice(
                    0,
                    item.maxShowNum && item.isCollapse
                      ? item.maxShowNum
                      : item.btnList.length
                  )"
                  :key="index"
                >
                  <el-button
                    v-if="btn.isShown ? btn.isShown(scope.row) : true"
                    :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
                    :type="btn.type"
                    :size="btn.size || size"
                    :icon="btn.icon"
                    :plain="btn.plain"
                    :round="btn.round"
                    :circle="btn.circle"
                    :loading="btn.loading"
                    style="margin-right: 10px"
                    :style="
                      (btn.handlestyle && btn.handlestyle(scope.row)) ||
                      btn.style
                    "
                    :class="
                      (btn.handleclass && btn.handleclass(scope.row)) ||
                      btn.class
                    "
                    @click="btn.handle(scope.row)"
                    >{{
                      (btn.formatter && btn.formatter(scope.row)) || btn.label
                    }}
                  </el-button>
                </span>
                <el-dropdown
                  v-if="
                    item.isCollapse && item.btnList.length !== item.maxShowNum
                  "
                  trigger="click"
                >
                  <el-button
                    :type="item.collapseButton['type']"
                    :size="item.collapseButton['size'] || size"
                    :icon="item.collapseButton['prefixIcon']"
                    :plain="item.collapseButton['plain']"
                    :round="item.collapseButton['round']"
                    :circle="item.collapseButton['circle']"
                    :loading="item.collapseButton['loading']"
                    :disabled="
                      item.collapseButton['isDisabled'] &&
                      item.collapseButton['isDisabled'](scope.row)
                    "
                    style="margin-right: 10px"
                    :style="
                      (item.collapseButton['handlestyle'] &&
                        item.collapseButton['handlestyle'](scope.row)) ||
                      item.collapseButton['style']
                    "
                    :class="
                      (item.collapseButton['handleclass'] &&
                        item.collapseButton['handleclass'](scope.row)) ||
                      item.collapseButton['class']
                    "
                    >{{
                      (item.collapseButton["formatter"] &&
                        item.collapseButton["formatter"](scope.row)) ||
                      item.collapseButton["label"]
                    }}
                    <i
                      v-if="item.collapseButton['suffix']"
                      :class="item.collapseButton['suffix']"
                    />
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(btn, index) in item.btnList.slice(
                        item.maxShowNum,
                        item.btnList.length
                      )"
                      :key="index"
                    >
                      <el-button
                        v-if="btn.isShown ? btn.isShown(scope.row) : true"
                        :disabled="btn.isDisabled && btn.isDisabled(scope.row)"
                        :type="btn.type"
                        :size="btn.size || size"
                        :icon="btn.icon"
                        :plain="btn.plain"
                        :round="btn.round"
                        :circle="btn.circle"
                        :loading="btn.loading"
                        style="margin-right: 10px"
                        :style="
                          (btn.handlestyle && btn.handlestyle(scope.row)) ||
                          btn.style
                        "
                        :class="
                          (btn.handleclass && btn.handleclass(scope.row)) ||
                          btn.class
                        "
                        @click="btn.handle(scope.row)"
                        >{{
                          (btn.formatter && btn.formatter(scope.row)) ||
                          btn.label
                        }}
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </span>
            <!-- 输入框 -->
            <el-input
              v-if="item.type === 'Input'"
              v-model="scope.row[item.prop]"
              :size="size"
              :disabled="item.isDisabled && item.isDisabled(scope.row)"
              @focus="item.focus && item.focus(scope.row)"
            />
            <!-- 下拉框 -->
            <el-select
              v-if="item.type === 'Select'"
              v-model="scope.row[item.prop]"
              :size="size"
              :props="item.props"
              :disabled="item.isDisabled && item.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            >
              <el-option
                v-for="op in item.options"
                :key="op[item.props.value]"
                :label="op[item.props.label]"
                :value="op[item.props.value]"
              />
            </el-select>
            <!-- 单选 -->
            <el-radio-group
              v-if="item.type === 'Radio'"
              v-model="scope.row[item.prop]"
              :disabled="item.isDisabled && item.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            >
              <el-radio
                v-for="(ra, index) in item.radios"
                :key="index"
                :label="ra.value"
                >{{ ra.label }}</el-radio
              >
            </el-radio-group>
            <!-- 复选框 -->
            <el-checkbox-group
              v-if="item.type === 'Checkbox'"
              v-model="scope.row[item.prop]"
              :disabled="item.isDisabled && item.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            >
              <el-checkbox
                v-for="(ra, index) in item.checkboxs"
                :key="index"
                :label="ra.value"
                >{{ ra.label }}
              </el-checkbox>
            </el-checkbox-group>
            <!-- 评价 -->
            <el-rate
              v-if="item.type === 'Rate'"
              v-model="scope.row[item.prop]"
              :disabled="item.isDisabled && item.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            />
            <!-- 开关 -->
            <el-switch
              v-if="item.type === 'Switch'"
              v-model="scope.row[item.prop]"
              :disabled="item.isDisabled && item.isDisabled(scope.row)"
              :active-value="item.activeValue"
              :inactive-value="item.inactiveValue"
              @change="item.change && item.change(scope.row)"
            />
            <!-- 图像 -->
            <div v-if="item.type === 'Image'">
              <!-- <img
                :src="scope.row[item.prop]"
                @click="item.handle && item.handle(scope.row)"
              /> -->
              <!-- 是数组图片和字符串图片地址的区别 -->
              <el-image
                fit="contain"
                :class="item.class"
                :style="item.style"
                :src="
                  scope.row[item.prop] instanceof Array
                    ? scope.row[item.prop][0]
                    : scope.row[item.prop]
                "
                :preview-src-list="
                  scope.row[item.prop] instanceof Array
                    ? scope.row[item.prop]
                    : [scope.row[item.prop]]
                "
              >
                <div slot="error">
                  <div style="color: rgba(144, 147, 153, 0.8)">未上传</div>
                </div>

                <!-- @click="item.handle && item.handle(scope.row)" -->
              </el-image>
            </div>
            <!-- 滑块 -->
            <el-slider
              v-if="item.type === 'Slider'"
              v-model="scope.row[item.prop]"
              :disabled="item.isDisabled && item.isDisabled(scope.row)"
              @change="item.change && item.change(scope.row)"
            />
            <!-- BxTag -->
            <BxTag
              v-if="item.type === 'BxTag'"
              :status="item.status && item.status(scope.row)"
              :txt="item.txt && item.txt(scope.row)"
            />
            <!-- Array -->
            <span
              v-if="item.type === 'Array'"
              :style="item.handlestyle && item.handlestyle(scope.row)"
              :class="item.handleclass && item.handleclass(scope.row)"
            >
              <el-tooltip
                v-if="scope.row[item.prop] && scope.row[item.prop].length > 0"
                placement="top"
              >
                <div slot="content">
                  <div
                    v-for="(item_array, index) in scope.row[item.prop]"
                    :key="index"
                  >
                    {{
                      (item.tooltipFormatter &&
                        item.tooltipFormatter(item_array)) ||
                      item_array
                    }}<br />
                  </div>
                </div>
                <span>
                  {{
                    (item.formatter && item.formatter(scope.row)) ||
                    scope.row[item.prop][0]
                  }}
                </span>
              </el-tooltip>
              <span v-else style="color: rgba(144, 147, 153, 0.8)"> 无 </span>
            </span>
            <!-- 双击input -->
            <span
              v-if="item.type === 'dbClickInput'"
              :style="item.handlestyle && item.handlestyle(scope.row)"
              :class="item.handleclass && item.handleclass(scope.row)"
            >
              <!-- <div v-if="scope.row[item.prop]"> -->
              <div
                v-if="
                  scope.row.index === dbClickRowIndex &&
                  scope.column.index === dbClickCellIndex
                "
              >
                <el-input
                  v-model.number="scope.row[item.prop]"
                  v-focus
                  size="mini"
                  @blur="inputBlur(scope.row)"
                />
              </div>
              <div v-else class="cursor-pointer">
                {{ scope.row[item.prop] }}
              </div>
              <!-- </div> -->
              <!-- <span v-else style="color:rgba(144,147,153, 0.8)">
                无
              </span> -->
            </span>
            <!-- 默认 -->
            <span
              v-if="!item.type"
              :style="item.handlestyle && item.handlestyle(scope.row)"
              :class="item.handleclass && item.handleclass(scope.row)"
            >
              <!-- tooltip -->
              <el-tooltip v-if="item.isTooltip" placement="top">
                <div slot="content">
                  <span
                    v-html="
                      item.formatterTooltip && item.formatterTooltip(scope.row)
                    "
                  />
                </div>
                <!-- mian -->
                <span>
                  <span
                    v-if="
                      (item.formatter && item.formatter(scope.row)) ||
                      scope.row[item.prop]
                    "
                  >
                    {{
                      (item.formatter && item.formatter(scope.row)) ||
                      scope.row[item.prop]
                    }}
                  </span>
                  <span v-else style="color: rgba(144, 147, 153, 0.8)">
                    无
                  </span>
                </span>
              </el-tooltip>
              <!-- none tooltop -->
              <span v-else>
                <span
                  v-if="
                    (item.formatter && item.formatter(scope.row)) ||
                    scope.row[item.prop]
                  "
                >
                  {{
                    (item.formatter && item.formatter(scope.row)) ||
                    scope.row[item.prop]
                  }}
                </span>
                <span v-else style="color: rgba(144, 147, 153, 0.8)"> 无 </span>
              </span>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!-- 分页 -->
    <section v-if="isPagination" class="ces-pagination-wrapper">
      <el-pagination
        class="ces-pagination"
        layout="total,sizes ,prev, pager, next,jumper"
        :page-size="newPagination.pageSize"
        :current-page="newPagination.pageNum"
        :total="newPagination.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </section>
  </section>
</template>

<script>
import BxTag from "./components/BxTag";
export default {
  name: "BluexiiCustomTable",
  components: {
    BxTag,
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.getElementsByTagName("input")[0].focus();
        // el.querySelector("input").focus();
      },
    },
  },
  props: {
    // 表格型号：mini,medium,small
    size: { type: String, default: "medium" },
    isBorder: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    tableKey: { type: Number, default: 0 },
    // 树形结构设置
    treeProps: {
      type: Object,
      default: () => ({ children: "children", hasChildren: "hasChildren" }),
    },
    rowKey: {
      type: String,
      default: "id",
    },
    // 表格操作
    isHandle: { type: Boolean, default: false },
    tableHandles: { type: Array, default: () => [] },
    expandRowKeys: { type: Array, default: () => [] },
    // 表格数据
    tableData: { type: Array, default: () => [] },
    // 表格列配置
    tableCols: { type: Array, default: () => [] },
    // 是否显示表格复选框
    isSelection: { type: Boolean, default: false },
    isFilterColumn: { type: Boolean, default: false },
    filterColumnDisabledArr: { type: Array, default: () => [] },
    filterColumnItemArr: { type: Array, default: () => [] },
    // 储备
    reserveSection: { type: Boolean, default: false },
    defaultSelections: { type: [Array, Object], default: () => null },
    // 是否显示表格索引
    isIndex: { type: Boolean, default: false },
    indexLabel: { type: String, default: "序号" },
    // 是否显示分页
    isPagination: { type: Boolean, default: true },
    // 分页数据
    pagination: {
      type: Object,
      default: () => ({ pageSize: 10, pageNum: 1, total: 0 }),
    },
    headerCellStyle: {
      type: Object,
      default: () => ({
        background: "#fafafa",
        color: "#606266",
      }),
    },
  },
  data() {
    return {
      dbClickRowIndex: null, // 当前点击的行索引
      dbClickCellIndex: null, // 当前点击的列索引
      // label 必须唯一 唯一值
      filterColumnItems: this.filterColumnItemArr,
      defaultTableCols: this.tableCols, // defaultTableCols
      changedTableCols: this.tableCols, // 默认表头 Default header
      newTableKey: this.tableKey,
      newPagination: this.pagination,
    };
  },
  watch: {
    defaultSelections(val) {
      this.$nextTick(function () {
        if (Array.isArray(val)) {
          val.forEach((row) => {
            this.$refs.cesTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.cesTable.toggleRowSelection(val);
        }
      });
    },
    filterColumnItems(valArr) {
      this.changedTableCols = this.defaultTableCols.filter(
        (item) => valArr.indexOf(item.label) >= 0
      );
      this.newTableKey = this.newTableKey + 1; // 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    },
    tableKey(newVal) {
      this.newTableKey = newVal;
    },
    newPagination: {
      handler(newVal) {
        this.$emit("update:pagination", newVal);
      },
      deep: true,
    },
  },
  mounted() {
    this.handleChangedTableCols(this.filterColumnItems);
    this.monitoring(); // 注册监听事件
  },
  methods: {
    // 首次过滤[]为默认全选
    handleChangedTableCols(valArr) {
      //  没有配置filterColumnItemArr 默认为全选
      if (valArr && valArr.length === 0) {
        this.filterColumnItems = this.tableCols.map((item) => item.label);
      }
      this.changedTableCols = this.defaultTableCols.filter(
        (item) => valArr.indexOf(item.label) >= 0
      );
      this.newTableKey = this.newTableKey + 1; // 为了保证table 每次都会重渲 In order to ensure the table will be re-rendered each time
    },
    // 控制input显示 row 当前行 column 当前列
    // props: row, column, cell, event
    tabClick(row, column) {
      this.dbClickRowIndex = row.index;
      this.dbClickCellIndex = column.index;
    },
    // 失去焦点初始化
    inputBlur(row) {
      // TODO 向外抛出 失焦行信息
      this.$emit("inputBlur", row);
      this.dbClickRowIndex = null;
      this.dbClickCellIndex = null;
    },
    // 把每一行的索引放进row
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },

    // 把每一列的索引放进column
    tableCellClassName({ column, columnIndex }) {
      column.index = columnIndex;
    },
    // 表格勾选
    select(rows, row) {
      this.$emit("select", rows, row);
    },
    // 全选
    selectAll(rows) {
      this.$emit("select", rows);
    },
    selectionChange(val) {
      this.$emit("selectionChange", val);
    },
    rowClick(val) {
      this.$emit("rowClick", val);
    },
    //
    handleCurrentChange(val) {
      this.newPagination.pageNum = val;
      this.$emit("refresh");
    },
    handleSizeChange(val) {
      this.newPagination.pageSize = val;
      this.$emit("refresh");
    },
    clearSelection() {
      this.$refs.cesTable.clearSelection();
    },
    toggleRowSelection(res) {
      this.$refs.cesTable.toggleRowSelection(res.row, res.isSelected);
    },
    // tableRowClassName({rowIndex}) {
    //     if (rowIndex % 2 === 0) {
    //         return "stripe-row";
    //     }
    //     return "";
    // }
    renderHeader(h, obj) {
      return h("span", { class: "ces-table-require" }, obj.column.label);
    },
    monitoring() {
      // 监听事件
      this.$on("toggleRowSelection", (res) => {
        // console.log("方法1:触发监听事件监听成功");
        // console.log("res", res);
        this.$refs.cesTable.toggleRowSelection(res.row, res.isSelected);
      });
      // 监听事件
      this.$on("clearSelection", () => {
        // console.log("方法1:触发监听事件监听成功");
        // console.log("res", res);
        this.$refs.cesTable.clearSelection();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.ces-table-require::before {
  content: "*";
  color: red;
}
.ces-table {
  position: relative;
  .filter-column {
    position: absolute;
    z-index: 1000;
    right: 12px;
    top: 12px;
  }
}

// .el-pagination {
//   float: right;
//   margin-right: 10px;
//   margin-top: 5px;
// }

.handle-wrapper {
  margin-bottom: 24px;
}

/* 修复loding居左的问题 */
::v-deep .el-loading-spinner {
  left: calc(50% - 25px);
}
.ces-pagination-wrapper {
  margin-top: 12px;
  .ces-pagination {
    display: flex;
    justify-content: flex-end;
    height: 100%;
    align-items: center;
    margin-bottom: 24px;
    margin-right: 10px;
    margin-top: 5px;
  }
}
</style>
