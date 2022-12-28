<template>
  <div class="search-form">
    <el-form
      class="form"
      ref="refForm"
      :size="formSize"
      inline
      :label-width="labelWidth"
    >
      <el-form-item
        v-for="item in searchForm"
        :label="item.label"
        :key="item.prop"
        class="form-item"
      >
        <!-- 输入框 -->
        <el-input
          v-if="item.type === 'Input'"
          v-model="sonSearchData[item.prop]"
          :style="{ width: item.width }"
          :size="itemSize ? itemSize : item.size"
          :placeholder="item.placeholder"
          @change="item.change && item.change(sonSearchData[item.prop])"
          :clearable="clearable"
        ></el-input>
        <!-- 下拉框 -->
        <el-select
          v-if="item.type === 'Select'"
          v-model="sonSearchData[item.prop]"
          @change="item.change && item.change(sonSearchData[item.prop])"
          :size="itemSize ? itemSize : item.size"
          :style="{ width: item.width }"
          :placeholder="item.placeholder"
          :filterable="item.filterable"
          :multiple="item.multiple"
          :remote="item.remote"
          :reserve-keyword="item.reserveKeyword"
          :clearable="clearable"
          :remote-method="
            item.remoteMethod && item.remoteMethod(sonSearchData[item.prop])
          "
        >
          <el-option
            v-for="op in item.options"
            :label="op.label"
            :value="op.value"
            :key="op.value"
          ></el-option>
        </el-select>
        <!-- 单选 -->
        <el-radio-group
          v-if="item.type === 'Radio'"
          @change="item.change && item.change(sonSearchData[item.prop])"
          v-model="sonSearchData[item.prop]"
          :size="itemSize ? itemSize : item.size"
          :style="{ width: item.width }"
        >
          <el-radio
            v-for="ra in item.radios"
            :label="ra.value"
            :key="ra.value"
            >{{ ra.label }}</el-radio
          >
        </el-radio-group>
        <!-- 单选按钮 -->
        <el-radio-group
          v-if="item.type === 'RadioButton'"
          v-model="sonSearchData[item.prop]"
          :size="itemSize ? itemSize : item.size"
          :style="{ width: item.width }"
          @change="item.change && item.change(sonSearchData[item.prop])"
        >
          <el-radio-button
            v-for="ra in item.radios"
            :label="ra.value"
            :key="ra.value"
            >{{ ra.label }}</el-radio-button
          >
        </el-radio-group>
        <!-- 复选框 -->
        <el-checkbox-group
          v-if="item.type === 'Checkbox'"
          v-model="sonSearchData[item.prop]"
          @change="item.change && item.change(sonSearchData[item.prop])"
          :size="itemSize ? itemSize : item.size"
          :clearable="clearable"
          :style="{ width: item.width }"
        >
          <el-checkbox
            v-for="ch in item.checkboxs"
            :label="ch.value"
            :key="ch.value"
            >{{ ch.label }}</el-checkbox
          >
        </el-checkbox-group>
        <!-- 日期 -->
        <el-date-picker
          v-if="item.type === 'Date'"
          v-model="sonSearchData[item.prop]"
          :placeholder="item.placeholder"
          @change="item.change && item.change(sonSearchData[item.prop])"
          :size="itemSize ? itemSize : item.size"
          type="date"
          :style="{ width: item.width }"
          :picker-options="item.pickerOptions"
        ></el-date-picker>
        <!-- 时间 -->
        <el-time-picker
          v-if="item.type === 'Time'"
          v-model="sonSearchData[item.prop]"
          @change="item.change && item.change(sonSearchData[item.prop])"
          :size="itemSize ? itemSize : item.size"
          :picker-options="item.pickerOptions"
          :placeholder="item.placeholder"
          :style="{ width: item.width }"
        >
        </el-time-picker>
        <!-- 日期时间 -->
        <el-date-picker
          v-if="item.type === 'DateTime'"
          type="datetime"
          :placeholder="item.placeholder"
          v-model="sonSearchData[item.prop]"
          @change="item.change && item.change(sonSearchData[item.prop])"
          :disabled="item.disable && item.disable(sonSearchData[item.prop])"
          :picker-options="item.pickerOptions"
          :size="itemSize ? itemSize : item.size"
          :style="{ width: item.width }"
        ></el-date-picker>
        <!-- 日期范围 -->
        <el-date-picker
          v-if="item.type === 'Datetimerange'"
          type="datetimerange"
          v-model="sonSearchData[item.prop]"
          range-separator="~"
          :start-placeholder="item.startPlaceholder"
          :end-placeholder="item.endPlaceholder"
          :value-format="item.valueFormat"
          :picker-options="item.pickerOptions"
          :size="itemSize ? itemSize : item.size"
          @change="item.change && item.change(sonSearchData[item.prop])"
        >
        </el-date-picker>
        <!-- 滑块 -->
        <el-slider
          v-if="item.type === 'Slider'"
          v-model="sonSearchData[item.prop]"
          :size="itemSize ? itemSize : item.size"
          :style="{ width: item.width }"
          @change="item.change && item.change(sonSearchData[item.prop])"
        ></el-slider>
        <!-- 开关 -->
        <div v-if="item.type === 'Switch'" :style="{ width: item.width }">
          <el-switch
            v-model="sonSearchData[item.prop]"
            :size="itemSize ? itemSize : item.size"
            @change="item.change && item.change(sonSearchData[item.prop])"
          ></el-switch>
        </div>
      </el-form-item>
      <template v-if="isHandle">
        <el-form-item
          inline
          class="form-item"
          v-for="(item, index) in searchHandle"
          :key="index"
        >
          <el-button
            v-if="item.isPermitted ? item.isPermitted() : true"
            :type="item.type"
            :size="itemSize ? itemSize : item.size || formSize"
            @click="item.handle()"
            >{{ item.label }}</el-button
          >
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "BluexiiSearchForm",
  props: {
    isHandle: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: String,
      default: "50px",
    },
    // 表单大小设置
    formSize: {
      type: String,
      default: "mini",
    },
    itemSize: {
      type: String,
      default: "mini",
    },
    searchForm: {
      type: Array,
      default: () => [],
    },
    searchHandle: {
      type: Array,
      default: () => [],
    },
    searchData: {
      type: Object,
      default: () => {},
    },
    clearable: {
      type: Boolean,
      default: true,
    },
  },
  model: {
    // 需要双向绑定的 props 变量名称，也就是父组件通过 v-model 与子组件双向绑定的变量
    prop: "searchData",
    // 定义由 $emit 传递变量的名称
    event: "searchDataChange",
  },
  data() {
    return {
      // 子组件不能修改 props 下的变量，所以定义一个临时变量
      sonSearchData: this.searchData,
    };
  },
  watch: {
    sonSearchData: {
      // 这里箭头函数指向可能会出现问题
      handler: function (newVal) {
        this.$emit("searchDataChange", newVal);
      },
      deep: true,
    },
  },
  methods: {},
};
</script>
<style lang="scss">
.search-form {
  display: flex;
  align-items: center;
  .form {
    .form-item {
      // .el-form-item__label {
      //   width: 80px !important;
      // }
      margin-right: 12px;
    }
  }
}
</style>
