import CustomTable from "./CustomTable/index.vue"; // 引入封装好的组件
import SearchForm from "../package/SearchForm/index.vue"; // 引入封装好的组件
import CustomForm from "../package/CustomForm/index.vue"; // 引入封装好的组件
import CustomTree from "../package/CustomTree/index.vue"; // 引入封装好的组件

const coms = [CustomTable, SearchForm, CustomForm, CustomTree]; // 将来如果有其它组件,都可以写到这个数组里

// 批量组件注册
const install = function (Vue) {
  // // 判断是否安装
  // if (install.installed) return;

  // 遍历注册全局组件
  coms.forEach((com) => {
    console.log("组件目录：", com);
    Vue.component(com.name, com);
  });

  // 判断是否是直接引入文件
  // if (typeof window != "undefined" && window.Vue) {
  //   install(window.Vue);
  // }
};

// export default {
//   // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
//   install,
//   // 具体的组件
//   CustomTable,
// };

// 导出的对象必须具有 install，才能被 Vue.use() 方法安装
export default install;
