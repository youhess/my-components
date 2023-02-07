<template>
  <div>
    <el-descriptions
      class="margin-top"
      :title="title"
      :column="column"
      :size="size"
      :border="border"
    >
      <template
        v-if="isExtra"
        slot="extra"
      >
        <slot
          name="extra"
          :desDetail="descriptionData"
        >我是extra内容区域</slot>
      </template>
      <el-descriptions-item
        v-for="(item, index) in descriptionData"
        :key="index"
        :span="item.span"
        :label-class-name="item.labelClassName"
        :content-class-name="item.contentClassName"
        :label-style="item.labelStyle || labelStyle"
        :content-style="item.contentStyle || contentStyle"
      >
        <template slot="label">
          <i
            v-if="item.icon"
            :class="item.icon"
          />
          <!-- 标题 -->
          <span v-if="item.title">
            {{ item.title }}
          </span>
        </template>
        <!-- 默认情况下 -->
        <span
          v-if="!item.type"
          class="default-type"
        >
          <span>
            {{ (item.formatter && item.formatter(item)) || item.value }}
          </span>
          <i
            v-if="item.isCopy"
            class="el-icon-document-copy copy-icon"
            @click="
              copy((item.formatter && item.formatter(item)) || item.value)
            "
          />
        </span>
        <!-- 图像 -->
        <div v-if="item.type === 'image' || item.type === 'Image'">
          <span v-if="item.value">
            <!-- 为一张的时候 -->
            <el-image
              v-if="typeof item.value === 'string'"
              style="width: 35px; margin-right: 6px"
              :src="item.value"
              :preview-src-list="[item.value]"
            >
              <div
                slot="error"
                class="image-slot"
              >
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
            <!-- 为多张的时候 -->
            <template v-else>
              <span
                v-for="(i, img_index) in item.value"
                :key="img_index"
              >
                <el-image
                  style="width: 35px; margin-right: 6px"
                  :src="i"
                  :preview-src-list="item.value"
                >
                  <div
                    slot="error"
                    class="image-slot"
                  >
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
              </span>
            </template>
          </span>
          <span
            v-else
            class="empty-txt"
          >无</span>
        </div>
        <!-- 双击label input切换 -->
        <div
          v-if="item.type === 'dbClickInput' || item.type === 'DbClickInput'"
        >
          <div v-if="dbClickInputFlag && dbClickInputName === item.name">
            <el-input
              v-model="item.value"
              v-focus
              :style="{ width: item.width ? item.width : '100%' }"
              :size="item.size ? item.size : size"
              @blur="inputBlur(item, () => item.blur && item.blur(item))"
            />
          </div>
          <span
            v-else
            style="cursor: pointer"
            @dblclick="handleDbClickInput(item)"
          >
            {{ (item.formatter && item.formatter(item)) || item.value }}
          </span>
        </div>
        <!-- 输入框 -->
        <el-input
          v-if="item.type == 'input' || item.type == 'Input'"
          v-model="item.value"
          :style="{ width: item.width ? item.width : '100%' }"
          clearable
          :maxlength="item.maxlength"
          :show-word-limit="item.showWordLimit"
          :disabled="
            (item.handledisabled &&
              item.handledisabled(customForm[item.prop])) ||
              item.disabled
          "
          :size="item.size ? item.size : size"
          :placeholder="`请输入${item.name}`"
          :show-password="item.showPassword"
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
        <!-- 下拉 -->
        <el-select
          v-if="item.type === 'select' || item.type == 'Select'"
          v-model="item.value"
          v-el-select-lazyloading="item.lazyloading"
          clearable
          :style="{ width: item.width ? item.width : '100%' }"
          :size="item.size ? item.size : size"
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
        <!-- 需要自定义情况下添加Slot -->
        <div v-if="item.type === 'slot' || item.type === 'Slot'">
          <slot
            :name="item.name"
            :item="item"
          >我是{{ item.name }}内容区域,scope返回值为item</slot>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "BluexiiCustomDescription",
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.getElementsByTagName("input")[0].focus();
        // el.querySelector("input").focus();
      },
    },
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
  props: {
    border: {
      default: true,
      type: Boolean,
    },
    isExtra: {
      default: false,
      type: Boolean,
    },
    // medium / small / mini
    size: {
      default: "medium",
      type: String,
    },
    title: {
      default: "",
      type: String,
    },
    column: {
      default: 3,
      type: Number,
    },
    data: {
      type: Array,
      default: () => [],
    },
    contentStyle: {
      type: Object,
      default: () => {},
    },
    labelStyle: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dbClickInputFlag: false,
      dbClickInputName: "",
      descriptionData: this.data,
    };
  },
  methods: {
    handleDbClickInput(item) {
      console.log("hello", item);
      this.dbClickInputName = item.name;
      this.dbClickInputFlag = true;
    },
    inputBlur(item, blurFn) {
      if (blurFn) {
        // 此函数是针对需要单一接口 单独处理的情况
        blurFn();
        // 此函数针对全局 对所有的进行处理  看具体需求吧
        this.$emit("inputBlur", item);
      }
      // this.$emit("inputBlur", this.descriptionData);
      this.dbClickInputName = "";
      this.dbClickInputFlag = false;
    },
    // 复制剪切板
    handleCopyValue(text) {
      // 浏览器禁用了非安全域的 navigator.clipboard 对象
      // 在线上环境会报错 TypeError: Cannot read properties of undefined (reading 'writeText')
      if (!navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
      } else {
        // 判断是否支持拷贝
        if (!document.execCommand("copy")) return Promise.reject();
        // 创建标签，并隐藏
        const textArea = document.createElement("textarea");
        textArea.style.position = "fixed";
        textArea.style.top = textArea.style.left = "-100vh";
        textArea.style.opacity = "0";
        textArea.value = text;
        document.body.appendChild(textArea);
        // 聚焦、复制
        textArea.focus();
        textArea.select();
        return new Promise((resolve, reject) => {
          // 不知为何，必须写这个三目，不然copy不上
          document.execCommand("copy") ? resolve() : reject();
          textArea.remove();
        });
      }
    },
    copy(content) {
      this.handleCopyValue(content)
        .then(() => {
          this.$message({
            message: "复制成功",
            type: "success",
          });
        })
        .catch(() => {
          this.$message.error("自动复制失败，请手动复制");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.copy-icon {
  color: #1890ff;
  cursor: pointer;
}
.default-type {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
}
</style>
