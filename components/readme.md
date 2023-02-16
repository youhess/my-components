## 目录

[TOC]

***

## bluexii-custom-form 表单组件

### Attributes 参数

| 参数             | 说明                                               | 类型       | 可选值                   | 默认值                                                                                               |
| -------------- | ------------------------------------------------ | -------- | --------------------- | ------------------------------------------------------------------------------------------------- |
| size           | 全域大小                                             | String   | medium / small / mini | medium                                                                                            |
| label-position | 性可以改变表单域标签的位置，可选值为 top、left，当设为 top 时标签会置于表单域的顶部 | String   | top left right        | top                                                                                               |
| form-config    | 表单配置数据 [点击查看配置项](#Items)                         | Array    | -                     | \[]                                                                                               |
| form-data      | 表单具体数据，已双向绑定，使用请 \:form-data.sync                | Object   | -                     | {}                                                                                                |
| is-handle      | 是否开启footer功能区,提供简单的按钮配置，也可不使用。在外自定义按钮寻求更多样式之类拓展  | Boolean  | -                     | true                                                                                              |
| handle-config  | 功能区按钮的配置项 [点击查看配置项](#handleConfig)               | Array    | -                     | \[]                                                                                               |
| handle-upload  | 图片上传方式，上传axios请求异步函数                             | Function | -                     | function (data) {return axios({method: "post",url: "./api/v1/file/upload/generate",data: data,})} |
|                |                                                  |          |                       |                                                                                                   |

<a id="handleConfig"></a>

#### handle-config 配置项

isHandle为true的情况下

| 参数             | 说明                    | 类型       | 可选值                                                | 默认值   |
| -------------- | --------------------- | -------- | -------------------------------------------------- | ----- |
| isShow         | 按钮是否显示，细分权限的考虑        | String   |                                                    |       |
| type           | 按钮类型                  | String   | primary / success / warning / danger / info / text | -     |
| size           | 尺寸                    | String   | medium / small / mini                              | -     |
| disabled       | 是否禁用状态                | Boolean  |                                                    | false |
| handledisabled | 方法调用 return必须为boolean | Function |                                                    |       |

<a id="Items"></a>

#### 配置项

    example：
    data() {
        return{
              formConfig: [
            {
              type: "Select",
              prop: "parentUniqueId",
              name: "上级资源",
            }
          ],
        }
    }

#### form-config 通用配置项：

| 参数     | 说明                              | 类型     | 可选值                                                                                                 | 默认值 |
| ------ | ------------------------------- | ------ | --------------------------------------------------------------------------------------------------- | --- |
| \*name | item名称，用于显示label以及部分placeholder | String |                                                                                                     |     |
| span   | 布局占比                            | Number |                                                                                                     | 24  |
| type   | 类型                              | String | Input/InputNumber/Select/Textarea/Image/DatetimePicker/DatePicker/RadioGroup/Switch/SelectTree/CheckBox/Slot |     |

#### 基于通用配置项-> ==type== ，进而使用的配置项:

##### type\:Input

| 参数             | 说明                                                        | 类型           | 可选值                      | 默认值    |
| -------------- | --------------------------------------------------------- | ------------ | ------------------------ | ------ |
| maxlength      | 可输入最大长度                                                   | number       |                          |        |
| showWordLimit  | 显示字符限制                                                    | Boolean      | -                        | false  |
| showPassword   | 是否显示密码                                                    | Boolean      | -                        | false  |
| appendConfig   | 　后置元素适配                                                   | Object       | {label:"xxx",icon:"XXX"} | -      |
| prependConfig  | 　前置元素适配                                                   | Object       | {label:"xxx",icon:"XXX"} | -      |
| disabled       | 是否禁用                                                      | Boolean      | -                        |        |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 | Function     |                          |        |
| change         | 触发change方法，向外携带当前修改参数的值                                   | Function     | -                        |        |
| input          | input，向外携带当前修改参数的值                                        | Function     | -                        |        |
| width          | item宽度                                                    | String       | -                        | '100%' |
| message        | 自定义message                                                | String       | -                        |        |
| rules          | item自定义校验                                                 | Object/Array | -                        |        |
| tip            | 提示语                                                       | String       |                          | ""     |
|                |                                                           |              | -                        |        |

##### type\:InputNumber

| 参数               | 说明                                                        | 类型           | 可选值    | 默认值      |
| ---------------- | --------------------------------------------------------- | ------------ | ------ | -------- |
| \*prop           | 字段名称，                                                     | String       |        |          |
|                  | step                                                      | 计数器步长        | number | 1        |
| stepStrictly     | 是否只能输入 step 的倍数                                           | Boolean      | -      | false    |
| controls         | 是否使用控制按钮                                                  | boolean      | -      | true     |
| controlsPosition | 控制按钮位置                                                    | string       | right  |          |
| disabled         | 是否禁用                                                      | Boolean      | -      |          |
| handledisabled   | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 | Function     |        |          |
| change           | 触发change方法，向外携带当前修改参数的值                                   | Function     | -      |          |
| max              | 最大值                                                       | number       | -      | Infinity |
| width            | item宽度                                                    | String       | -      | '100%'   |
| required         | 是否必填                                                      | Boolean      | -      | false    |
| message          | 自定义message                                                | String       | -      |          |
| rules            | item自定义校验                                                 | Object/Array | -      |          |
| tip              | 提示语                                                       | String       |        | ""       |
|                  |                                                           |              | -      |          |

##### type\:Select

| 参数             | 说明                                                        | 类型           | 可选值 | 默认值    |
| -------------- | --------------------------------------------------------- | ------------ | --- | ------ |
| \*prop         | 字段名称，                                                     | String       |     |        |
| lazyloading    | 数据懒加载，触及时触发                                               | Function     |     |        |
| \*options      | 下拉框选择项                                                    | Array        |     |        |
| multiple       | 是否多选                                                      | Boolean      | -   | false  |
| filterable     | 是否可过滤                                                     | Boolean      | -   | false  |
| reserveKeyword | 是否可保存关键字                                                  | Boolean      | -   | false  |
| loading        | 下拉框的数据加载                                                  | Boolean      | -   | false  |
| remote         | 是否开启远程                                                    | Boolean      | -   | false  |
| remoteMethod   | 远程时激发的方法，值返回query为输入的字，(query)=>{},                       | Function     | -   |        |
| disabled       | 是否禁用                                                      | Boolean      | -   |        |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 | Function     |     |        |
| change         | 触发change方法，向外携带当前修改参数的值                                   | Function     | -   |        |
| width          | item宽度                                                    | String       | -   | '100%' |
| required       | 是否必填                                                      | Boolean      | -   | false  |
| message        | 自定义message                                                | String       | -   |        |
| rules          | item自定义校验                                                 | Object/Array | -   |        |
| tip            | 提示语                                                       | String       |     | ""     |
|                |                                                           |              | -   |        |
|                |                                                           |              | -   |        |

##### type\:Textarea

| 参数             | 说明                                                               | 类型               | 可选值              | 默认值    |
| -------------- | ---------------------------------------------------------------- | ---------------- | ---------------- | ------ |
| \*prop         | 字段名称，                                                            | String           |                  |        |
| autosize       | 自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | boolean / object | boolean / object | false  |
| rows           | 输入框行数，只对 type="textarea" 有效                                      | Number           | -                | 2      |
| maxlength      | 可输入最大长度                                                          | number           |                  |        |
| showWordLimit  | 显示字符限制                                                           | Boolean          | -                | false  |
| disabled       | 是否禁用                                                             | Boolean          | -                |        |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值        | Function         |                  |        |
| change         | 触发change方法，向外携带当前修改参数的值                                          |                  | -                |        |
| input          | input，向外携带当前修改参数的值                                               | Function         | -                |        |
| width          | item宽度                                                           | String           | -                | '100%' |
| required       | 是否必填                                                             | Boolean          | -                | false  |
| message        | 自定义message                                                       | String           | -                |        |
| rules          | item自定义校验                                                        | Object/Array     | -                |        |
| tip            | 提示语                                                              | String           |                  | ""     |
|                |                                                                  |                  | -                |        |

##### type\:Image

| 参数             | 说明                                                        | 类型           | 可选值 | 默认值   |
| -------------- | --------------------------------------------------------- | ------------ | --- | ----- |
| \*prop         | 字段名称，                                                     | String       |     |       |
| limit          | 图片个数限制                                                    | Number       | -   | 1     |
| disabled       | 是否禁用                                                      | Boolean      | -   |       |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 | Function     |     |       |
| required       | 是否必填                                                      | Boolean      | -   | false |
| message        | 自定义message                                                | String       | -   |       |
| rules          | item自定义校验                                                 | Object/Array | -   |       |
| tip            | 提示语                                                       | String       |     | ""    |
|                |                                                           |              | -   |       |

##### type\:DatetimePicker

| 参数             | 说明                                                        | 类型           | 可选值 | 默认值                     |
| -------------- | --------------------------------------------------------- | ------------ | --- | ----------------------- |
| \*prop         | 字段名称，                                                     | String       |     |                         |
| isRange        | 是否范围的时间 是采用datetimerange，否采用datetime                      | Boolean      | -   | false                   |
| prefixIcon     | 前缀icon                                                    | String       | -   | el-icon-date            |
| rangeSeparator | isRange的分隔符标志                                             | String       | -   | "\~"                    |
| valueFormat    | 格式化                                                       | String       | -   | 'yyyy-MM-dd HH\:mm\:ss' |
| pickerOptions  | 当前时间日期选择器，具体参考element                                     | Object       | -   | {}                      |
| disabled       | 是否禁用                                                      | Boolean      | -   |                         |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 | Function     |     |                         |
| change         | 触发change方法，向外携带当前修改参数的值                                   | Function     | -   |                         |
| width          | item宽度                                                    | String       | -   | '100%'                  |
| required       | 是否必填                                                      | Boolean      | -   | false                   |
| message        | 自定义message                                                | String       | -   |                         |
| rules          | item自定义校验                                                 | Object/Array | -   |                         |
| tip            | 提示语                                                       | String       |     | ""                      |
|                |                                                           |              | -   |                         |
|                |                                                           |              | -   |                         |

##### type\:DatePicker

| 参数             | 说明                                                        | 类型           | 可选值 | 默认值          |
| -------------- | --------------------------------------------------------- | ------------ | --- | ------------ |
| \*prop         | 字段名称，                                                     | String       |     |              |
| isRange        | 是否范围的时间 是采用datetimerange，否采用datetime                      | Boolean      | -   | false        |
| prefixIcon     | 前缀icon                                                    | String       | -   | el-icon-date |
| rangeSeparator | isRange的分隔符标志                                             | String       | -   | "\~"         |
| valueFormat    | 格式化                                                       | String       | -   | 'yyy-MM-dd'  |
| pickerOptions  | 当前时间日期选择器，具体参考element                                     | Object       | -   | {}           |
| disabled       | 是否禁用                                                      | Boolean      | -   |              |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 | Function     |     |              |
| change         | 触发change方法，向外携带当前修改参数的值                                   | Function     | -   |              |
| width          | item宽度                                                    | String       | -   | '100%'       |
| required       | 是否必填                                                      | Boolean      | -   | false        |
| message        | 自定义message                                                | String       | -   |              |
| rules          | item自定义校验                                                 | Object/Array | -   |              |
| tip            | 提示语                                                       | String       |     | ""           |
|                |                                                           |              | -   |              |
|                |                                                           |              | -   |              |

##### type\:RadioGroup

| 参数             | 说明                                                        | 类型                                                  | 可选值 | 默认值   |
| -------------- | --------------------------------------------------------- | --------------------------------------------------- | --- | ----- |
| \*prop         | 字段名称，                                                     | String                                              |     |       |
| radios         | radios选项                                                  | Array , 可使用参数\[{value:1,label:"yes",disable\:true}] | -   |       |
| disabled       | 是否禁用                                                      | Boolean                                             | -   |       |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 | Function                                            |     |       |
| input          | 触发input方法，向外携带当前修改参数的值                                    | Function                                            | -   |       |
| required       | 是否必填                                                      | Boolean                                             | -   | false |
| message        | 自定义message                                                | String                                              | -   |       |
| rules          | item自定义校验                                                 | Object/Array                                        | -   |       |
| tip            | 提示语                                                       | String                                              |     | ""    |
|                |                                                           |                                                     | -   |       |
|                |                                                           |                                                     | -   |       |

##### type\:RadioGroupButton

| 参数             | 说明                                                        | 类型                                                  | 可选值 | 默认值   |
| -------------- | --------------------------------------------------------- | --------------------------------------------------- | --- | ----- |
| \*prop         | 字段名称，                                                     | String                                              |     |       |
| radios         | radios选项                                                  | Array , 可使用参数\[{value:1,label:"yes",disable\:true}] | -   |       |
| disabled       | 是否禁用                                                      | Boolean                                             | -   |       |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 | Function                                            |     |       |
| input          | 触发input方法，向外携带当前修改参数的值                                    | Function                                            | -   |       |
| required       | 是否必填                                                      | Boolean                                             | -   | false |
| message        | 自定义message                                                | String                                              | -   |       |
| rules          | item自定义校验                                                 | Object/Array                                        | -   |       |
| tip            | 提示语                                                       | String                                              |     | ""    |
|                |                                                           |                                                     | -   |       |
|                |                                                           |                                                     | -   |       |

##### type\:Switch

| 参数             | 说明                                                        | 类型           | 可选值 | 默认值   |
| -------------- | --------------------------------------------------------- | ------------ | --- | ----- |
| \*prop         | 字段名称，                                                     | String       |     |       |
| disabled       | 是否禁用                                                      | Boolean      | -   |       |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 | Function     |     |       |
| change         | 触发change方法，向外携带当前修改参数的值                                   | Function     | -   |       |
| required       | 是否必填                                                      | Boolean      | -   | false |
| message        | 自定义message                                                | String       | -   |       |
| activeValue    | 开启的value                                                  |              | -   |       |
| inactiveValue  | 关闭的value                                                  |              | -   |       |
| rules          | item自定义校验                                                 | Object/Array | -   |       |
| tip            | 提示语                                                       | String       |     | ""    |
|                |                                                           |              | -   |       |

##### type\:SelectTree

| 参数             | 说明                                                                       | 类型           | 可选值 | 默认值                                 |
| -------------- | ------------------------------------------------------------------------ | ------------ | --- | ----------------------------------- |
| \*prop         | 字段名称，                                                                    | String       |     |                                     |
| data           | 树形结构数据                                                                   |              | -   |                                     |
| treeProps      | 树形props配置详细见 [连接](https://element.eleme.cn/#/zh-CN/component/tree#props) | object       | -   | {children:"childs",label: "name",}; |
| nodeKey        | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的                                               | string       | -   | "id"                                |
| customId       | 参与双向绑定的树节点字段                                                             | string       | -   | "id"                                |
| disabled       | 是否禁用                                                                     | Boolean      | -   |                                     |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值                | Function     |     |                                     |
| change         | 触发change方法，向外携带当前修改参数的值                                                  | Function     | -   |                                     |
| required       | 是否必填                                                                     | Boolean      | -   | false                               |
| message        | 自定义message                                                               | String       | -   |                                     |
| rules          | item自定义校验                                                                | Object/Array | -   |                                     |
| tip            | 提示语                                                                      | String       |     | ""                                  |
|                |                                                                          |              | -   |                                     |

##### type:CheckBox 单选checkBox

| 参数             | 说明                                                                  | 类型           | 可选值 | 默认值      |
| ------- | --------- | ------------ | --- | ----- |
| \*prop         | 字段名称 | String       |     |        |
| disabled       | 是否禁用  | Boolean      | -   |           |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值   | Function     |     |       |
| change  | 触发change方法，向外携带当前修改参数的值     | Function |-|        |
| required       | 是否必填  | Boolean      | -   | false       |
| message        | 自定义message   | String       | -   |        |
| rules          | item自定义校验  | Object/Array | -   |       |
| tip            | 提示语   | String       |     | ""   |
|                |             |        | -   |    |



##### type\:Slot

| 参数     | 说明      | 类型     | 可选值 | 默认值 |
| ------ | ------- | ------ | --- | --- |
| \*name | 用于具名插槽！ | String |     |     |
|        |         |        | -   |     |

==Slot如果想要为el-form-item 需如下==

        #slotTest
        <template #slot>
            <el-form-item
                prop="email"
                label="邮箱"
                :rules="{
                        required: true,
                        message: '请输入邮箱地址',
                        trigger: 'blur',
                      }">
                      <el-input v-model="formData.email" />
            </el-form-item>
        </template>

### method 方法

| 方法                                                                                            | 说明                                                                                |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| this.`$refs[formRefName].$`emit("resetFields", {});                                           | 重置表单方法,在回调函数中放入表单数据可自定义恢复表单数据，例this.\$options.data.call(this).formData 回到表单生成初始值。 |
| this.`$refs.customForm.$`emit("verify", () => {return this.submit\_request(this.formData);}); | 验证表单请求，携带请求函数， 验证通过使用，不通过进行拦截，需要在 ()=>{}中填写回调的函数方法                                |

***

## bluexii-custom-table 表格组件

### Attributes 参数

| 参数                         | 说明                                                                                                                                        | 类型                   | 可选值                   | 默认值                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------- | ---------------------------------------------------- |
| size                       | 全域大小                                                                                                                                      | String               | medium / small / mini | medium                                               |
| is-border                  | 开启表格框架                                                                                                                                    | Boolean              | -                     | false                                                |
| loading                    | 表格loading                                                                                                                                 | Boolean              | -                     | false                                                |
| row-key                    | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info\[0].id，此种情况请使用 Function。 | Function(row)/String | -                     | id                                                   |
| tree-props                 | 树形结构设置                                                                                                                                    | object               | -                     | { children: "children", hasChildren: "hasChildren" } |
| table-key                  | 强制表格渲染 值需要不断改变                                                                                                                            | Number               | -                     | 0                                                    |
| is-handle                  | 开启表格上层操作区域                                                                                                                                | Boolean              |                       | false                                                |
| table-handles              | isHandle 为true时， 表格上层操作区域按钮配置 [点击查看配置项](#tableHandles)                                                                                    | Array                |                       | \[]                                                  |
| expand-row-keys            | 可以通过该属性设置 Table 目前的展开行，需要设置 rowKey 属性才能使用，该属性为展开行的 keys 数组。                                                                               | Array                |                       |                                                      |
| table-data                 | 表格数据                                                                                                                                      | Array                |                       | \[]                                                  |
| table-cols                 | 表格列配置 [点击查看配置项](#tableCols)                                                                                                               | Array                |                       | \[]                                                  |
| header-cell-style          | 表格headercell样式修改                                                                                                                          | Object               |                       | {background:"#fafafa",color: "#606266",}             |
| is-selection               | 是否显示表格复选框                                                                                                                                 | Boolean              |                       | false                                                |
| reserve-section            | 储备选择后复选框选项                                                                                                                                | Boolean              |                       | false                                                |
| default-selections         | 初始选择                                                                                                                                      | Array, Object        |                       | null                                                 |
| is-filter-column           | 开启动态表格                                                                                                                                    | Boolean              | -                     | false                                                |
| filter-Column-item-arr     | 没有配置默认为全选                                                                                                                                 | Array                | -                     | \[]                                                  |
| filter-column-disabled-arr | 不可被更改的动态表格选项                                                                                                                              | Array                | -                     | \[]                                                  |
| is-index                   | 是否显示表格索引                                                                                                                                  |                      | Boolean               | false                                                |
| index-label                | index对应header自定义                                                                                                                          | String               |                       | "序号"                                                 |
| is-pagination              | 是否显示分页                                                                                                                                    | Boolean              |                       | false                                                |
| pagination                 | 分页数据                                                                                                                                      | Object               |                       | { pageSize: 10, pageNum: 1, total: 0 }               |

<a id="tableHandles"></a>

#### table-handles 配置项（表格操作按钮）：

==当isHandle为true时使用==

| 参数          | 说明        | 类型            | 可选值                                              | 默认值    |
| ----------- | --------- | ------------- | ------------------------------------------------ | ------ |
| size        | 全域大小      | String        | medium / small / mini                            | medium |
| type        | 类型        | string        | rimary / success / warning / danger / info /text | —      |
| plain       | 是否朴素按钮    | boolean       | —                                                | false  |
| round       | 是否圆角按钮    | boolean       | —                                                | false  |
| circle      | 是否圆形按钮    | boolean       | —                                                | false  |
| loading     | 是否加载中状态   | boolean       | —                                                | false  |
| isDisabled  | 是否禁用状态    | function      | -                                                | {}     |
| icon        | 图标类名      | string        | -                                                | -      |
| handle      | 触发点击时间    | Function      | -                                                |        |
| isShown     | 是否显示按钮    | boolean       |                                                  | true   |
| style       | 按钮style样式 | string/object |                                                  |        |
| class       | 按钮class样式 | string        |                                                  |        |
| handlestyle | style方法   | Function      |                                                  |        |
| handleclass | class方法   | Function      |                                                  |        |
|             |           |               |                                                  |        |

<a id="tableCols"></a>

#### table-cols 通用配置项：

| 参数                     | 说明                                  | 类型              | 可选值                                                                                         | 默认值  |
| ---------------------- | ----------------------------------- | --------------- | ------------------------------------------------------------------------------------------- | ---- |
| id                     | 绑定值                                 | -               | -                                                                                           | -    |
| prop                   | 字段名称                                | string          |                                                                                             | —    |
| label                  | 表头名称                                | string          | —                                                                                           | —    |
| width                  | 单元格宽度                               | String          | —                                                                                           |      |
| align                  | 对齐方式                                | String          | left/center/right                                                                           | left |
| fixed                  | 列是否固定在左侧或者右侧，true 表示固定在左侧           | string, boolean | true, left, right                                                                           | -    |
| notShowOverflowTooltip | 不显示ShowOverflowTooltip              | boolean         | -                                                                                           | true |
| require                | 开启 render-header                    | Boolean         | -                                                                                           | -    |
| isHeaderOptions        | 自定义表头配置项[点击查看配置项](#isHeaderOptions) | Object          |                                                                                             |      |
| isDisabled             | 是否禁用状态 (row)=>{} 携带当前行的信息           | function        | -                                                                                           |      |
| type                   | 单元格中组件                              | String          | Html/Button/Input/Select/Radio/Checkbox/Rate/Switch/Image/Slider/BxTag/Array/dbClickInput/- |      |

#### 基于通用配置项-> ==type== ，进而使用的配置项:

##### !type  不存在时

| 参数               | 说明                                         | 类型       | 可选值 | 默认值 |
| ---------------- | ------------------------------------------ | -------- | --- | --- |
| handlestyle      | (row)=>{} 携带当前行的信息                         | Function |     |     |
| handleclass      | (row)=>{} 携带当前行的信息                         | Function |     |     |
| isTooltip        | 是否显示tooltip                                | Boolean  |     |     |
| formatterTooltip | (row)=>{} 携带当前行的信息， 适用于v-html  显示tooltip内容 | Function |     |     |
| formatter        | (row)=>{} 携带当前行的信息，自定义格式化内容 优先级大于prop      | Function |     |     |
|                  |                                            |          |     |     |
|                  |                                            |          |     |     |

##### type:'Button'

| 参数             | 说明                                                  | 类型       | 可选值 | 默认值 |
| -------------- | --------------------------------------------------- | -------- | --- | --- |
| btnList        | type\:Button,时的配置项[点击查看配置项](#btnList)               | Array    |     |     |
| isCollapse     | type:'Button', 是否开启按钮的折叠                            | Boolean  |     |     |
| maxShowNum     | type:'Button',最大按钮显示个数，超出即发生折叠                      | Number   |     |     |
| click          | type:'Button',触发 (row)=>{} 携带当前行的信息                 | function |     |     |
| collapseButton | type\:Button,对于折叠按钮的配置项  [点击查看配置项](#collapseButton) | object   |     |     |
|                |                                                     |          |     |     |

###### collapseButton 配置项

当 type\:button时 且collapseButton <a id="collapseButton"></a>

| 参数          | 说明                         | 类型            | 可选值                                              | 默认值    |
| ----------- | -------------------------- | ------------- | ------------------------------------------------ | ------ |
| size        | 全域大小                       | String        | medium / small / mini                            | medium |
| type        | 类型                         | string        | rimary / success / warning / danger / info /text | —      |
| plain       | 是否朴素按钮                     | boolean       | —                                                | false  |
| round       | 是否圆角按钮                     | boolean       | —                                                | false  |
| circle      | 是否圆形按钮                     | boolean       | —                                                | false  |
| loading     | 是否加载中状态                    | boolean       | —                                                | false  |
| isDisabled  | 是否禁用状态 (row)=>{} 携带当前行的信息  | function      | -                                                | {}     |
| prefixIcon  | 前缀图标类名                     | string        | -                                                | -      |
| suffix      | 后缀图标类名                     | string        | -                                                | -      |
| style       | 按钮style样式                  | string/object |                                                  |        |
| class       | 按钮class样式                  | string        |                                                  |        |
| handlestyle | style方法 (row)=>{} 携带当前行的信息 | Function      |                                                  |        |
| handleclass | class方法 (row)=>{} 携带当前行的信息 | Function      |                                                  |        |
|             |                            |               |                                                  |        |
|             |                            |               |                                                  |        |
|             |                            |               |                                                  |        |

###### btnList的配置

<a id="btnList的配置"></a>
当 type\:button时

| 参数          | 说明                         | 类型            | 可选值                                              | 默认值    |
| ----------- | -------------------------- | ------------- | ------------------------------------------------ | ------ |
| size        | 全域大小                       | String        | medium / small / mini                            | medium |
| type        | 类型                         | string        | rimary / success / warning / danger / info /text | —      |
| plain       | 是否朴素按钮                     | boolean       | —                                                | false  |
| round       | 是否圆角按钮                     | boolean       | —                                                | false  |
| circle      | 是否圆形按钮                     | boolean       | —                                                | false  |
| loading     | 是否加载中状态                    | boolean       | —                                                | false  |
| isDisabled  | 是否禁用状态 (row)=>{} 携带当前行的信息  | function      | -                                                | {}     |
| icon        | 图标类名                       | string        | -                                                | -      |
| handle      | 触发点击时间                     | Function      | -                                                |        |
| isShown     | 是否显示按钮 (row)=>{} 携带当前行的信息  | boolean       |                                                  | true   |
| style       | 按钮style样式                  | string/object |                                                  |        |
| class       | 按钮class样式                  | string        |                                                  |        |
| handlestyle | style方法 (row)=>{} 携带当前行的信息 | Function      |                                                  |        |
| handleclass | class方法 (row)=>{} 携带当前行的信息 | Function      |                                                  |        |
|             |                            |               |                                                  |        |
|             |                            |               |                                                  |        |

##### type:'Input'

| 参数    | 说明                                 | 类型       | 可选值 | 默认值 |
| ----- | ---------------------------------- | -------- | --- | --- |
| focus | type:'Input',触发 (row)=>{} 携带当前行的信息 | function |     |     |

##### type:'Radio'

| 参数     | 说明                                   | 类型       | 可选值 | 默认值 |
| ------ | ------------------------------------ | -------- | --- | --- |
| change | type:'Radio',触发 (row)=>{} 携带当前行的信息   | function |     |     |
| radios | type:'Radio' ,格式 {label:"",value:""} |          |     |     |

##### type:'Select'

| 参数      | 说明                                    | 类型       | 可选值 | 默认值 |
| ------- | ------------------------------------- | -------- | --- | --- |
| change  | type:'Select',触发 (row)=>{} 携带当前行的信息   | function |     |     |
| options | type:'Select' ,格式 {label:"",value:""} |          |     |     |

##### type:'Checkbox'

| 参数        | 说明                                      | 类型       | 可选值 | 默认值 |
| --------- | --------------------------------------- | -------- | --- | --- |
| change    | type:'Checkbox',触发 (row)=>{} 携带当前行的信息   | function |     |     |
| checkboxs | type:'Checkbox' ,格式 {label:"",value:""} |          |     |     |

##### type:'BxTag'

| 参数     | 说明                                 | 类型                    | 可选值                                                           | 默认值 |
| ------ | ---------------------------------- | --------------------- | ------------------------------------------------------------- | --- |
| status | type:'BxTag',触发 (row)=>{} 携带当前行的信息 | function              | 'successTag'/'peddingTag'/ 'dangerTag'/'infoTag'/'warningTag' |     |
| txt    | type:'BxTag,' bxtag名称              | 触发 (row)=>{} 携带当前行的信息 | function                                                      |     |

##### type:'Array'

| 参数               | 说明                                     | 类型 | 可选值 | 默认值 |
| ---------------- | -------------------------------------- | -- | --- | --- |
| formatter        | type:'Array', (row)=>{} 携带当前行的信息，格式化内容 |    |     |     |
| itemStyle        | type:'Array' ,(row)=>{} 携带当前行的信息，格式化内容 |    |     |     |
| itemClass        | type:'Array' ,(row)=>{} 携带当前行的信息，格式化内容 |    |     |     |
| formatterTooltip | type:'Array', (row)=>{} 携带当前行的信息，格式化内容 |    |     |     |

##### type:'Switch'

| 参数            | 说明                                  | 类型       | 可选值 | 默认值 |
| ------------- | ----------------------------------- | -------- | --- | --- |
| change        | type:'Switch',触发 (row)=>{} 携带当前行的信息 | function |     |     |
| activeValue   | type:'Switch', 开启                   |          |     |     |
| inactiveValue | type:'Switch' ,关闭                   |          |     |     |
| isTooltip     | 是否开启tooltip                         |          |     |     |
|               |                                     |          |     |     |

##### type:'Rate'

| 参数     | 说明                                | 类型       | 可选值 | 默认值 |
| ------ | --------------------------------- | -------- | --- | --- |
| change | type:'Rate',触发 (row)=>{} 携带当前行的信息 | function |     |     |
|        |                                   |          |     |     |

##### type:'Slider'

| 参数     | 说明                                  | 类型       | 可选值 | 默认值 |
| ------ | ----------------------------------- | -------- | --- | --- |
| change | type:'Slider',触发 (row)=>{} 携带当前行的信息 | function |     |     |
|        |                                     |          |     |     |

    example：
            {
              type: "Select",
              prop: "search",
              name: "远程搜索",
              options: [
                { label: "label", value: 1 },
                { label: "12", value: 2 },
                { label: "4", value: 3 },
              ],
              multiple: true,
              filterable: true,
              reserveKeyword: true,
              lazyloading: () => {
                console.log("here goes to lazyloading?");
              },
              remote: true,
              remoteMethod: (query) => {
                console.log("query", query);
                console.log("here goes to remoteMethod!");
              },
              loading: false,
            },

##### isHeaderOptions  自定义表头选项配置项

<a id="isHeaderOptions"></a>

| 参数                   | 说明                                | 类型      | 可选值 | 默认值 |
| -------------------- | --------------------------------- | ------- | --- | --- |
| isCustomHeader       | ---                               | ---     | --- | --- |
| isTooltip            | 是否show Tooltip                    | Boolean | -   | -   |
| headerTooltipContent | isTooltip为true的情况下toolTip的content | string  |     | —   |
| icon                 | icon                              | string  | —   | —   |
| width                | 单元格宽度                             | String  | —   |     |
|                      |                                   |         |     |     |
|                      |                                   |         |     |     |

### method 方法

| 事件名                                                                                                                                                    | 说明                                                           | 参数               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ---------------- |
| refresh                                                                                                                                                | 分页触发  pagination：{ pageSize: 10, pageNum: 1, total: 0 } 双向绑定 |                  |
| select                                                                                                                                                 | 返回被选择的row信息,单选选中后返回(rows，row)，全选checkbox选中后(rows)            | rows, row（单选时传递） |
| selectionChange                                                                                                                                        | 复选框change事件                                                  | rows             |
| rowClick                                                                                                                                               | 点击表格row触发的事件                                                 | row              |
| this.`$refs.refName.$`emit("clearSelection"); /  this.\$refs.refName.clearSelection();                                                                 | 清除表格内所有选择                                                    |                  |
| this.`$refs.refName.$`emit("toggleRowSelection", {row: row,isSelected: false}); /this.\$refs.refName.toggleRowSelection({row: row,isSelected: false}); | 控制复选框是否选择                                                    |                  |
| inputBlur                                                                                                                                              | 开启dbClickInput选项后,向外抛出当前的方法                                  | row              |

***

## bluexii-search-form

### Attributes 参数

| 参数           | 说明                             | 类型      | 可选值                   | 默认值  |
| ------------ | ------------------------------ | ------- | --------------------- | ---- |
| isHandle     | 是否启用右侧功能区域                     | Boolean |                       | true |
| labelWidth   | 搜索表单label宽度值                   | String  | -                     | 50px |
| formSize     | 表单form大小                       | String  | medium / small / mini | mini |
| itemSize     | 项目item大小                       | String  | medium / small / mini | mini |
| searchForm   | 搜索表单配置项 [点击查看配置项](#SearchForm) | Array   |                       | \[]  |
| searchHandle | 右侧功能区域配置项                      | Array   |                       | \[]  |
| v-model      | 查询表单对应字段                       | Object  |                       | {}   |
| clearable    | item是否可清除                      | Boolean |                       | true |
|              |                                |         |                       |      |

    v-model : this.searchData
    ex：
    searchData: {
            text: "",
            kindId: "",
            radio: 0,
            radiobutton: 0,
            slider: 0,
            radiobutton: 0,
            checkbox: [],
            switch: true,
            date: "",
            time: "",
            dateTime: "",
            datetimerange: [],
          },

### SearchForm 配置项

<a id="SearchForm"></a>

#### 通用配置项：

| 参数          | 说明                   | 类型       | 可选值                                                                                    |    |
| ----------- | -------------------- | -------- | -------------------------------------------------------------------------------------- | :- |
| label       | 名称                   | string   |                                                                                        |    |
| type        | 类型                   | string   | Input/Select/Radio/RadioButton/Checkbox/Date/Time/DateTime/Datetimerange/Slider/Switch |    |
| prop        | 字段名称                 | string   |                                                                                        |    |
| width       | 宽度                   | string   |                                                                                        |    |
| size        | item大小               | string   |                                                                                        |    |
| placeholder |                      | string   |                                                                                        |    |
| change      | (item)=>{} 携带当前item值 | Function |                                                                                        |    |
|             |                      |          |                                                                                        |    |

#### 基于通用配置项-> ==type== ，进而使用的配置项:

##### type:"Input"

| 参数 | 说明 | 类型 | 可选值 |
| -- | -- | -- | --- |
|    |    |    |     |

##### type:"Select"

| 参数             | 说明                                      | 类型      | 可选值 |
| -------------- | --------------------------------------- | ------- | --- |
| options        | type:"Select"时生效,\[{label:"",value:""}] | array   |     |
| multiple       | type:"Select"时生效,是否多选                   | boolean |     |
| reserveKeyword | type:"Select"时生效,搜索保存关键词                | boolean |     |
| filterable     | type:"Select"时生效 ,是否开启搜索                | boolean |     |
|                |                                         |         |     |

##### type:"Radios"

| 参数     | 说明                                                     | 类型    | 可选值 |
| ------ | ------------------------------------------------------ | ----- | --- |
| radios | type:"Radios"/"RadioButton",时生效 \[{label:"",value:""}] | array |     |
|        |                                                        |       |     |

##### type:"RadioButton"

| 参数     | 说明                                                     | 类型    | 可选值 |
| ------ | ------------------------------------------------------ | ----- | --- |
| radios | type:"Radios"/"RadioButton",时生效 \[{label:"",value:""}] | array |     |
|        |                                                        |       |     |

##### type:"Checkbox"

| 参数        | 说明                                          | 类型    | 可选值 |
| --------- | ------------------------------------------- | ----- | --- |
| checkboxs | type:"Checkbox"时生效  ,\[{label:"",value:""}] | array |     |
|           |                                             |       |     |

##### type:"Date"

| 参数            | 说明                    | 类型 | 可选值 |
| ------------- | --------------------- | -- | --- |
| pickerOptions | type:"Date"时生效 ,时间配置项 |    |     |
|               |                       |    |     |

##### type:"Time"

| 参数            | 说明                    | 类型 | 可选值 |
| ------------- | --------------------- | -- | --- |
| pickerOptions | type:"Time"时生效 ,时间配置项 |    |     |
|               |                       |    |     |

##### type:"DateTime"

| 参数            | 说明                               | 类型 | 可选值 |
| ------------- | -------------------------------- | -- | --- |
| pickerOptions | type:"DateTime"时生效 ,时间配置项        |    |     |
| valueFormat   | type:"Datetimerange"时生效  , 时间格式化 |    |     |
|               |                                  |    |     |

##### type:"Month"

| 参数            | 说明                               | 类型 | 可选值 |
| ------------- | -------------------------------- | -- | --- |
| pickerOptions | type:"DateTime"时生效 ,时间配置项        |    |     |
| valueFormat   | type:"Datetimerange"时生效  , 时间格式化 |    |     |
|               |                                  |    |     |

##### type:"Datetimerange"

| 参数               | 说明                                     | 类型 | 可选值 |
| ---------------- | -------------------------------------- | -- | --- |
| pickerOptions    | type:"Datetimerange"时生效 ,时间配置项         |    |     |
| startPlaceholder | type:"Datetimerange"时生效  , 起始placehold |    |     |
| endPlaceholder   | type:"Datetimerange"时生效  , 结束placehold |    |     |
| valueFormat      | type:"Datetimerange"时生效  , 时间格式化       |    |     |
|                  |                                        |    |     |

##### type:"Switch"

| 参数            | 说明                       | 类型 | 可选值 |
| ------------- | ------------------------ | -- | --- |
| activeValue   | type:"Switch"时生效  , 开启   |    |     |
| inactiveValue | type:"Switch"时生效  , 显示关闭 |    |     |
|               |                          |    |     |

##### type:"Slot"  插槽type特殊！就只有一个属性

| 参数   | 说明                         | 类型     | 可选值 |
| ---- | -------------------------- | ------ | --- |
| prop | 用于调用具名插槽 #prop slot="prop" | string |     |
|      |                            |        |     |

example:

     <template slot="test">
              <el-col :span="11">
                <el-date-picker
                  v-model="searchData.date1"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%;"
                />
              </el-col>
              <el-col
                class="line"
                :span="2"
              >-</el-col>
              <el-col :span="11">
                <el-time-picker
                  v-model="searchData.date2"
                  placeholder="选择时间"
                  style="width: 100%;"
                />
              </el-col>
            </template>

***

## bluexii-custom-tree 表格组件

### Attributes 参数

| 参数                    | 说明               | 类型      | 可选值   | 默认值                                 |
| --------------------- | ---------------- | ------- | ----- | ----------------------------------- |
| v-model               | 双向数据绑定           | Array   | -     | \[]                                 |
| node-key              | 基于的节点key         | String  | -     | ""                                  |
| data                  | 树形数据             | Array   | -     | \[]                                 |
| default-props         | 初始props数据        | Object  | -     | {children: "childs",label: "name",} |
| data                  | 树形数据             | Array   | -     | \[]                                 |
| default-checked-keys  | 默认勾选的节点的 key 的数组 | Array   | -     | -                                   |
| default-expanded-keys | 默认展开的节点的 key 的数组 | Array   | -     | -                                   |
| show-checkbox         | 节点是否可被选择         | boolean | false | -                                   |

***

## bluexii-custom-description 详情组件

### Attributes 参数

| 参数                                   | 说明                       | 类型      | 可选值                   | 默认值    |
| ------------------------------------ | ------------------------ | ------- | --------------------- | ------ |
| size                                 | 全域大小                     | String  | medium / small / mini | medium |
| isExtra                              | 是否增设右上区域  ，此插槽返回scope:{desDetail:[]}[点击查看配置项](#isExtra)               | Boolean |                       | false  |
| border                               | 是否使用border               | Boolean |                       | true   |
| title                                | 标题                       | String  |                       | ""     |
| column                               | 一行 Descriptions Item 的数量 | Number  | -                     | 3      |
| \*data   [点击查看配置项](#data) | 详情组件配置                   | Array   | -                     |        |
| contentStyle                         | 内容样式                     | Object  | -                     |        |
| labelStyle                           | 文本样式                     | Object  | -                     |        |


<a id="isExtra"></a>
当isExtra：true
scope：
| 参数   | 说明 | 类型 | 可选值  | 默认值    |
| ------------- | -------- | ------- | ----- | ------ |
|desDetail | data配置项信息 | Object |  |  |

<a id="data"></a>

#### data 通用配置项：

| 参数    | 说明  | 类型     | 可选值   | 默认值 |
| ----- | -------- | ------ | ----- | --- |
| icon  | label的icon 对应element class | -      | -   | -   |
| title | 标题                         | string |   | —   |
| name  | 单元格对应名称，用以区分，唯一值  | String  | —  | —   |
| value  | 很多时候作为单元格的内容呈现   | String  | —  | —   |
| type  | 单元格中组件 |String|Html/Button/Input/Select/Radio/Checkbox/Rate/Switch/Image/Slider/BxTag/Array/dbClickInput|

#### 基于通用配置项-> ==type== ，进而使用的配置项:

##### !type  不存在时

| 参数          | 说明                 | 类型       | 可选值 | 默认值 |
| ----------- | ------------------ | -------- | --- | --- |
| formatter | (row)=>{} 携带当前行的信息,优先级大于value 用于单元格内容呈现 | Function |     |     |
| isCopy | 开启单元格赋值功能 | Boolean |     |  false   |

##### type:Image

#####  type:DbClickInput

| 参数          | 说明                 | 类型       | 可选值 | 默认值 |
| ----------- | ------------------ | -------- | --- | --- |
| inputBlur | (item)=>{} 携带当前item行的信息,失焦点后的操作 | Function |     |     |
| size   | 表单item大小 | String   | medium / small / mini |  |
| width   | 表单item 宽度 | String   |  | '100%' |

#####  type:Input

| 参数          | 说明                 | 类型       | 可选值 | 默认值 |
| ----------- | ------------------ | -------- | --- | --- |
| inputBlur | (item)=>{} 携带当前item行的信息,失焦点后的操作 | Function |     |     |
| change | (value)=>{} 返回当下单元格value值 | Function |     |     |
| input | (value)=>{} 返回当下单元格value值 | Function |     |     |
| size   | 表单item大小 | String   | medium / small / mini |  |
| width   | 表单item 宽度 | String   |  | '100%' |
| maxlength   | 最大长度限制 | Number   |  |  |
| showWordLimit   | 是否显示数字限制 | Boolean   |  |  |
| handledisabled   |(value)=>{}，返回当下单元格value值,优先级大于disabled| Function   |  ||
| disabled   |是否禁用| Boolean   |  | false|
| size   | 表单item大小 | String   | medium / small / mini |  |
| showPassword   | 是否显示密码 | Boolean   |  | false |
| appendConfig   | 　后置元素适配   | Object       | {label:"xxx",icon:"XXX"} | -    |
| prependConfig  | 　前置元素适配     | Object       | {label:"xxx",icon:"XXX"} | -     |
| disabled       | 是否禁用  | Boolean      | -     |        |


#####  type:Select
| 参数             | 说明   | 类型           | 可选值 | 默认值    |
| -------------- | --------- | ------------ | --- | ------ |
| change | (value)=>{} 返回当下单元格value值 | Function |     |     |
| lazyloading | 触发懒加载方法 | Function |     |     |
| size   | 表单item大小 | String   | medium / small / mini |  |
| width   | 表单item 宽度 | String   |  | '100%' |
| multiple   | 是否多选 | Boolean   |  |  |
| filterable   | 是否开启搜索    | Boolean   |  |  |
| reserveKeyword   | 是否保存关键字    | Boolean   |  |  |
| handledisabled   |(value)=>{}，返回当下单元格value值,优先级大于disabled| Function   |  ||
| disabled   |是否禁用| Boolean   |  | false|
| remote   |是否开启远程| Boolean   |  | false|
| remoteMethod   |调用远程方式| Function   |  | |
| options   |下拉框内容[{value:1,label:"123"}]| Array   |  | |

#####  type:Slot
| 参数             | 说明   | 类型           | 可选值 | 默认值    |
| -------------- | --------- | ------------ | --- | ------ |
|name | 根据此配置具名插槽 | String |  |  |

当type:Slot时 -> scope：

| 参数   | 说明 | 类型 | 可选值  | 默认值    |
| ------------- | -------- | ------- | ----- | ------ |
|desDetail | data配置项信息 | Object |  |  |
|item | 此单元格信息 | Object |  |  |


### method 方法

| 方法        | 说明                            |
| --------- | ----------------------------- |
| inputBlur | type\:DbClickInput时候离开焦点触发的时间 |

