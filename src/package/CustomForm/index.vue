<template>
  <div class="custom-form">
    <el-form
      ref="ruleCustomForm"
      :label-position="labelPosition"
      :model="customForm"
      label-width="100px"
      class="demo-ruleForm"
      :size="size"
    >
      <!-- Layout 布局 -->
      <el-row>
        <template>
          <div
            v-for="item in formConfigSon"
            :key="item.id"
          >
            <el-col :span="item.span ? item.span : 24">
              <!-- 自定义item slot -->
              <template v-if="item.type === 'Slot' || item.type === 'slot'">
                <div>
                  <slot
                    :name="item.name"
                  >我是{{ item.name }}内容区域，请填写自定义item</slot>
                </div>
              </template>

              <template v-else>
                <el-form-item
                  :label="item.name"
                  :prop="item.prop"
                  :rules="item.rules ? item.rules : customFormrules[item.prop]"
                >
                  <!-- 输入框 -->
                  <el-input
                    v-if="item.type == 'input' || item.type == 'Input'"
                    v-model="customForm[item.prop]"
                    :style="{ width: item.width ? item.width : '100%' }"
                    clearable
                    :maxlength="item.maxlength"
                    :show-word-limit="item.showWordLimit"
                    :disabled="
                      (item.handledisabled &&
                        item.handledisabled(customForm[item.prop])) ||
                        item.disabled
                    "
                    :size="size"
                    :placeholder="`请输入${item.name}`"
                    @change="item.change && item.change(customForm[item.prop])"
                    @input="item.input && item.input(customForm[item.prop])"
                  >
                    <template
                      v-if="item.prependConfig"
                      slot="prepend"
                    >
                      <span v-if="item.prependConfig['label']">
                        {{ item.prependConfig["label"] }}
                      </span>
                      <el-button
                        v-if="item.prependConfig['icon']"
                        :icon="item.prependConfig['icon']"
                      />
                    </template>
                    <template
                      v-if="item.appendConfig"
                      slot="append"
                    >
                      <span v-if="item.appendConfig['label']">
                        {{ item.appendConfig["label"] }}
                      </span>
                      <el-button
                        v-if="item.appendConfig['icon']"
                        :icon="item.appendConfig['icon']"
                      />
                    </template>
                  </el-input>
                  <!-- 计数器 -->
                  <el-input-number
                    v-if="
                      item.type == 'inputNumber' || item.type == 'InputNumber'
                    "
                    v-model="customForm[item.prop]"
                    :size="size"
                    :step="item.step"
                    :step-strictly="item.stepStrictly"
                    :precision="item.precision"
                    :max="item.max"
                    :controls-position="item.controlsPosition"
                    :controls="item.controls"
                    :style="{ width: item.width ? item.width : '100%' }"
                    :disabled="
                      (item.handledisabled &&
                        item.handledisabled(customForm[item.prop])) ||
                        item.disabled
                    "
                    @change="item.change && item.change(customForm[item.prop])"
                  />
                  <!-- 下拉 -->
                  <el-select
                    v-if="item.type === 'select' || item.type == 'Select'"
                    v-model="customForm[item.prop]"
                    v-el-select-lazyloading="item.lazyloading"
                    clearable
                    :style="{ width: item.width ? item.width : '100%' }"
                    :size="size"
                    :multiple="item.multiple"
                    :filterable="item.filterable"
                    :reserve-keyword="item.reserveKeyword"
                    :loading="item.loading"
                    :disabled="
                      (item.handledisabled &&
                        item.handledisabled(customForm[item.prop])) ||
                        item.disabled
                    "
                    :remote="item.remote"
                    :remote-method="item.remoteMethod"
                    :placeholder="`请输入${item.name}`"
                    @change="item.change && item.change(customForm[item.prop])"
                  >
                    <el-option
                      v-for="op in item.options"
                      :key="op.value"
                      :label="op.label"
                      :value="op.value"
                    />
                  </el-select>
                  <!-- 文本域 多行输入 -->
                  <el-input
                    v-if="item.type === 'textarea' || item.type == 'Textarea'"
                    v-model="customForm[item.prop]"
                    clearable
                    :style="{ width: item.width ? item.width : '100%' }"
                    :size="size"
                    type="textarea"
                    :disabled="
                      (item.handledisabled &&
                        item.handledisabled(customForm[item.prop])) ||
                        item.disabled
                    "
                    :autosize="item.autosize"
                    :rows="item.rows"
                    :maxlength="item.maxlength"
                    :placeholder="`请输入${item.name}`"
                    :show-word-limit="item.showWordLimit"
                    @change="item.change && item.change(customForm[item.prop])"
                    @input="item.input && item.input(customForm[item.prop])"
                  />
                  <!-- 图片 -->
                  <upload-images
                    v-if="item.type === 'image' || item.type == 'Image'"
                    v-model="customForm[item.prop]"
                    :limit="item.limit"
                    :disabled="
                      (item.handledisabled &&
                        item.handledisabled(customForm[item.prop])) ||
                        item.disabled
                    "
                    :handle-upload="handleUpload"
                  />
                  <!-- 日期时间 -->
                  <el-date-picker
                    v-if="
                      item.type === 'datetimePicker' ||
                        item.type === 'DatetimePicker'
                    "
                    v-model="customForm[item.prop]"
                    :type="item.isRange ? 'datetimerange' : 'datetime'"
                    :prefix-icon="
                      item.prefixIcon ? item.prefixIcon : 'el-icon-date'
                    "
                    :start-placeholder="`开始${item.name}`"
                    :end-placeholder="`截止${item.name}`"
                    :placeholder="`选择${item.name}`"
                    :size="size"
                    :disabled="
                      (item.handledisabled &&
                        item.handledisabled(customForm[item.prop])) ||
                        item.disabled
                    "
                    :range-separator="
                      item.rangeSeparator ? item.rangeSeparator : '~'
                    "
                    :value-format="
                      item.valueFormat
                        ? item.valueFormat
                        : 'yyyy-MM-dd HH:mm:ss'
                    "
                    :style="{ width: item.width ? item.width : '100%' }"
                    :picker-options="item.pickerOptions"
                    @change="item.change && item.change(customForm[item.prop])"
                  />
                  <!-- 日期 -->
                  <el-date-picker
                    v-if="
                      item.type === 'datePicker' || item.type === 'DatePicker'
                    "
                    v-model="customForm[item.prop]"
                    :type="item.isRange ? 'daterange' : 'date'"
                    :prefix-icon="
                      item.prefixIcon ? item.prefixIcon : 'el-icon-date'
                    "
                    :start-placeholder="`开始${item.name}`"
                    :end-placeholder="`截止${item.name}`"
                    :placeholder="`请选择${item.name}`"
                    :size="size"
                    :disabled="
                      (item.handledisabled &&
                        item.handledisabled(customForm[item.prop])) ||
                        item.disabled
                    "
                    :range-separator="
                      item.rangeSeparator ? item.rangeSeparator : '~'
                    "
                    :value-format="
                      item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'
                    "
                    :style="{ width: item.width ? item.width : '100%' }"
                    :picker-options="item.pickerOptions"
                    @change="item.change && item.change(customForm[item.prop])"
                  />
                  <!-- 单选按钮 -->
                  <el-radio-group
                    v-if="
                      item.type === 'radioGroup' || item.type === 'RadioGroup'
                    "
                    v-model="customForm[item.prop]"
                    :size="item.size"
                    :style="{ width: item.width ? item.width : '100%' }"
                    :disabled="
                      (item.handledisabled &&
                        item.handledisabled(customForm[item.prop])) ||
                        item.disabled
                    "
                    @input="item.input && item.input(customForm[item.prop])"
                  >
                    <div
                      style="
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                      "
                    >
                      <el-radio
                        v-for="ra in item.radios"
                        :key="ra.value"
                        :disabled="ra.disabled"
                        style="margin-right: 12px; padding: 3px 0"
                        :label="ra.value"
                      >{{ ra.label }}</el-radio>
                    </div>
                  </el-radio-group>
                  <!-- 单选按钮样式 -->
                  <el-radio-group
                    v-if="
                      item.type === 'radioGroupButton' ||
                        item.type === 'RadioGroupButton'
                    "
                    v-model="customForm[item.prop]"
                    :size="item.size"
                    :style="{ width: item.width ? item.width : '100%' }"
                    :disabled="
                      (item.handledisabled &&
                        item.handledisabled(customForm[item.prop])) ||
                        item.disabled
                    "
                    @input="item.input && item.input(customForm[item.prop])"
                  >
                    <div
                      style="
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                      "
                    >
                      <el-radio-button
                        v-for="ra in item.radios"
                        :key="ra.value"
                        :label="ra.value"
                        :disabled="ra.disabled"
                      >{{ ra.label }}</el-radio-button>
                    </div>
                  </el-radio-group>
                  <!-- 开关 -->
                  <el-switch
                    v-if="item.type === 'switch' || item.type === 'Switch'"
                    v-model="customForm[item.prop]"
                    :disabled="
                      (item.handledisabled &&
                        item.handledisabled(customForm[item.prop])) ||
                        item.disabled
                    "
                    :active-value="item.activeValue"
                    :inactive-value="item.inactiveValue"
                    @change="item.change && item.change(customForm[item.prop])"
                  />
                  <!-- selectTree -->
                  <select-tree
                    v-if="
                      item.type === 'selectTree' || item.type == 'SelectTree'
                    "
                    v-model="customForm[item.prop]"
                    :placeholder="`请选择${item.name}`"
                    :tree-props="item.treeProps"
                    :data="item.data"
                    :disabled="
                      (item.handledisabled &&
                        item.handledisabled(customForm[item.prop])) ||
                        item.disabled
                    "
                    :node-key="item.nodeKey"
                    :custom-id="item.customId"
                    @change="item.change && item.change(customForm[item.prop])"
                  />
                  <!-- tip 提示语  -->
                  <template>
                    <div
                      v-if="item.tip"
                      style="color: #e6a23c; line-height: 26px; margin: 0"
                    >
                      {{ item.tip }}
                    </div>
                  </template>
                </el-form-item>
              </template>
            </el-col>
          </div>
        </template>
      </el-row>
    </el-form>

    <div
      v-if="isHandle"
      class="footer"
    >
      <span
        v-for="(item, index) in handleConfig"
        :key="index"
      >
        <el-button
          v-if="item.isShow ? item.isShow() : true"
          :type="item.type"
          :size="item.size || size"
          :disabled="
            (item.handledisabled && item.handledisabled()) || item.disabled
          "
          @click="item.handle()"
        >{{ item.label }}</el-button>
      </span>
    </div>
  </div>
</template>
<script>
import UploadImages from "./components/UploadImages";
import SelectTree from "./components/SelectTree";
export default {
  name: "BluexiiCustomForm",
  directives: {
    "el-select-lazyloading": {
      bind(el, binding) {
        const SELECT_DOM = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        SELECT_DOM.addEventListener("scroll", function() {
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      },
    },
  },
  components: {
    UploadImages,
    SelectTree,
  },
  props: {
    formConfig: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: "small",
    },
    formData: {
      type: Object,
      default: () => {},
    },
    labelPosition: {
      type: String,
      default: "top",
    },
    isHandle: {
      type: Boolean,
      default: false,
    },
    handleConfig: {
      type: Array,
      default: () => [],
    },
    handleUpload: {
      type: Function,
    },
  },
  data() {
    return {
      formConfigSon: [],
      //   表单数据
      customForm: this.formData,
      customFormrules: [],
    };
  },
  watch: {
    formConfig: {
      handler(newVal) {
        this.formConfigSon = newVal;
        console.log("formData监听", newVal);
        // 添加customFormrules 表单验证
        const textMatch = {
          select: { text: "请选择", trigger: "change" },
          Select: { text: "请选择", trigger: "change" },
          datetimePicker: { text: "请选择", trigger: "change" },
          DatetimePicker: { text: "请选择", trigger: "change" },
          datePicker: { text: "请选择", trigger: "change" },
          DatePicker: { text: "请选择", trigger: "change" },
          image: { text: "请选择", trigger: "change" },
          Image: { text: "请选择", trigger: "change" },
        };
        newVal.forEach((item) => {
          // 如果item的rules存在，那么优先级最大
          if (item.regular) {
            this.customFormrules[item.prop] = [
              {
                required: item.required,
                message: item.message
                  ? item.message
                  : `${
                    textMatch[item.type]
                      ? textMatch[item.type]["text"]
                      : "请输入"
                  }${item.name}`,
                trigger: textMatch[item.type]
                  ? textMatch[item.type]["trigger"]
                  : "blur",
              },
              {
                pattern: new RegExp(item.regular),
                message: "不符合格式",
                trigger: textMatch[item.type]
                  ? textMatch[item.type]["trigger"]
                  : "blur",
              },
            ];
          } else {
            this.customFormrules[item.prop] = [
              {
                required: item.required === true,
                message: item.message
                  ? item.message
                  : `${
                    textMatch[item.type]
                      ? textMatch[item.type]["text"]
                      : "请输入"
                  }${item.name}`,
                trigger: textMatch[item.type]
                  ? textMatch[item.type]["trigger"]
                  : "blur",
              },
            ];
          }
        });
      },
      immediate: true,
    },
    customForm: {
      handler(newVal) {
        this.$emit("update:formData", newVal);
      },
      deep: true,
    },
  },
  mounted() {
    this.monitoring(); // 注册监听事件
  },
  methods: {
    monitoring() {
      // 监听事件
      this.$on("verify", (res) => {
        this.verifySon("ruleCustomForm", res);
      });
      this.$on("resetFields", (res) => {
        this.resetFieldsSon("ruleCustomForm", res);
      });
    },
    // 验证表单
    verifySon(formName, fn) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          fn();
        } else {
          this.$message.error("信息填写有误！");
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetFieldsSon(formName, initialForm) {
      this.$refs[formName].resetFields();
      this.customForm = Object.assign({}, initialForm);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-textarea__inner {
  // resize:none
}
.footer {
  margin-top: 10px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>
