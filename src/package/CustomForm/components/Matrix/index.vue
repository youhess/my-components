<template>
  <div
    class="matrix"
    :style="{width:width}"
  >
    <div
      v-for="(d_item,index) in dataChild"
      :key="index
      "
      class="matrix-item"
    >

      <div
        class="matix-label"
        :style="{width:labelWidth}"
      >{{ d_item.name || d_item.label }}</div>
      <el-input
        v-model="d_item.extraTxt"
        :disabled="disabled"
        class="matix-input"
      />

    </div>

  </div>
</template>
<script>
export default {
  name: "MatrixFilling",
  model: {
    // 定义model
    // 父组件v-model绑定的值传递给props中的value
    prop: "value",
    // 通过emit触发valueChange将内部值传递给父组件v-model绑定的值
    event: "valueChange",
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: "100%"
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: "70px"
    }
  },
  data() {
    return {
      valueChild: this.value,
      dataChild: this.data
    };
  },
  watch: {
  // 填空发生更新时 同步至双项绑定
    dataChild: {
      handler(newVal) {
        const transRes = []
        newVal.forEach(item => {
          if (item.extraTxt) {
            const { value, extraTxt } = item;
            transRes.push({ value, label: extraTxt })
          }
        })

        this.$emit("valueChange", transRes);
      },
      deep: true,
    //   immediate: true
    },
    value: {
      handler(newVal) {
        // newVal.forEach(item_1 => {
        //   const res = this.dataChild.findIndex(item_2 => item_2.value === item_1.value)
        //   this.$set(this.dataChild[res], "extraTxt", item_1.label)
        // })
        for (const key in newVal[0]) {
          const res = this.dataChild.findIndex(item_2 => item_2.value === Number(key))
          if (res >= 0) this.$set(this.dataChild[res], "extraTxt", newVal[0][key])
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {

  },
};
</script>
  <style lang="scss" scoped>
    .matrix-item{
        display: flex;
        margin-bottom: 6px;
        gap: 24px;
        justify-content: space-around;
    }
    .matix-input{
        flex:1;
    }
  </style>

