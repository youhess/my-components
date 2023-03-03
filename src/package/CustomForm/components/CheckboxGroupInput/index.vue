<template>
  <div class="radio-group-input">
    <!-- TODO 基于{label:"",value:"",extraTxt:""}的radiogroup双向绑定 -->
    <!--  :disabled="radioDisabled" -->
    <el-checkbox-group
      v-model="checkboxValue"
      :size="size"
      :style="{ width: width ? width : '100%' }"
      @change="change"
    >
      <template>
        <el-row>
          <el-col
            v-for="o_item in options"
            :key="o_item.value"
            :span="o_item.extraTxt?null:vertical ? 24 : o_item.span ? o_item.span : 4"
          >
            <el-checkbox
              :disabled="o_item.disabled||disabled"
              style="margin-right: 12px; padding: 3px 0"
              :label="o_item.value"
            >
              {{ o_item.label }}
              <el-input
                v-if="o_item.isRequired && !disabled"
                v-model="o_item.extraTxt"
                :disabled="disabled"
              />
              <div
                v-else-if="o_item.extraTxt"
                class="ml-4px"
                style="text-decoration: underline;display: inline-block;"
              >
                {{ o_item.extraTxt }}
              </div>
            </el-checkbox>
          </el-col>
        </el-row>
      </template>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  name: "CheckboxGroupInput",
  model: {
    // 定义model
    // 父组件v-model绑定的值传递给props中的value
    prop: "value",
    // 通过emit触发valueChange将内部值传递给父组件v-model绑定的值
    event: "valueChange",
  },
  props: {
    size: {
      type: String,
      default: "small",
    },
    width: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkboxValue: [],
      inputValue: "",
      valueChild: this.value,
    };
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal && newVal.length > 0) { this.checkboxValue = newVal.map((item) => item.value); }
      },
      deep: true,
      immediate: true,
    },
    // 填空发生更新时 同步至双项绑定
    options: {
      handler() {
        this.valueChild = this.handleValueRes(this.checkboxValue);
        this.$emit("valueChange", this.valueChild);
      },
      deep: true,
    },
  },
  methods: {
    change(data) {
      this.valueChild = this.handleValueRes(data);
      this.$emit("valueChange", this.valueChild);
      this.$emit("change", data);
    },

    handleValueRes(data) {
      const valueRes = [];
      data.forEach((d_item) => {
        const res = this.options.find((o_item) => o_item.value === d_item);
        if (res) {
          const { value, extraTxt } = res;
          valueRes.push({ value, label: extraTxt || "" });
        }
      });
      return valueRes;
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-input__inner {
  border-radius: 0px;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  /*outline: medium;*/
}
</style>
