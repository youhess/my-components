<template>
  <div>
    <div class="timeStatusCs">
      <div :class="status"></div>
      <div>{{ txt }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BxTag",

  components: {},

  props: {
    status: {
      default: "peddingTag",
      type: String
    },
    txt: {
      default: "",
      type: String
    }
  },

  data() {
    return {};
  },

  computed: {},
  watch: {},

  activated() {},
  created() {},
  mounted() {},
  destroyed() {},

  methods: {}
};
</script>

<style lang="scss" scoped>
.timeStatusCs {
  display: flex;
  align-items: center;
}

.successTag {
  width: 9px;
  height: 9px;
  background: #67c23a;
  margin-right: 5px;
}

.peddingTag {
  width: 9px;
  height: 9px;
  background: #1678ff;
  margin-right: 5px;
}

.dangerTag {
  width: 9px;
  height: 9px;
  background: #f56c6c;
  margin-right: 5px;
}

.infoTag {
  width: 9px;
  height: 9px;
  background: #909399;
  margin-right: 5px;
}

.warningTag {
  width: 9px;
  height: 9px;
  background: #e6a23c;
  margin-right: 5px;
}
</style>
