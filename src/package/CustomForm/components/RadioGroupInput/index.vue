<template>
  <div class="radio-group-input">
    <!-- TODO 基于{label:"",value:"",extraTxt:""}的radiogroup双向绑定 -->
    <!--  :disabled="radioDisabled" -->
    <el-radio-group
      v-model="radioValue"
      :size="size"
      :style="{ width: width ? width : '100%' }"
      @input="input"
    >
      <template>
        <el-row>
          <el-col
            v-for="ra in radios"
            :key="ra.value"
            :span="ra.extraTxt?null:vertical ? 24 : ra.span ? ra.span : 4"
          >
            <el-radio
              :disabled="ra.disabled||disabled"
              style="margin-right: 12px; padding: 3px 0"
              :label="ra.value"
            >
              {{ ra.label }}
              <el-input
                v-if="ra.isRequired && !disabled"
                v-model="ra.extraTxt"
                :disabled="disabled"
              />
              <div
                v-else-if="ra.extraTxt"
                class="ml-4px"
                style="text-decoration: underline;display: inline-block;"
              >
                {{ ra.extraTxt }}
              </div>
            </el-radio>
          </el-col>
        </el-row>
      </template>
    </el-radio-group>
  </div>
</template>
<script>
export default {
  name: "RadioGroupInput",
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
    radios: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => {},
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      radioValue: "",
      inputValue: "",
      valueChild: this.value,
    };
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal && newVal["value"]) { this.radioValue = newVal["value"]; }
      },
      deep: true,
      immediate: true,
    },
    // 填空发生更新时 同步至双项绑定
    radios: {
      handler() {
        // 查找匹配的对象
        const { value, extraTxt } =
        this.radios.find((item) => item.value === this.radioValue) || {};
        this.valueChild = { value, label: extraTxt || "" };
        this.$emit("valueChange", this.valueChild);
      },
      deep: true,
    },
  },
  methods: {
    input(data) {
      // 查找匹配的对象
      const { value, extraTxt } =
        this.radios.find((item) => item.value === data) || {};
      this.valueChild = { value, label: extraTxt || "" };
      this.$emit("valueChange", this.valueChild);
      this.$emit("input", data);
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
