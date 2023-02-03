## 目录
[toc]

---

##  bluexii-custom-form 表单组件
### Attributes 参数
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| size | 全域大小 |String  | medium / small / mini | medium |
| label-position | 性可以改变表单域标签的位置，可选值为 top、left，当设为 top 时标签会置于表单域的顶部 |String  | top left right | top |
|form-config  | 表单配置数据 [点击查看配置项](#Items) | Array | - | []|
|form-data  | 表单具体数据，已双向绑定，使用请 :form-data.sync | Object | - | {}|
|is-handle | 是否开启footer功能区,提供简单的按钮配置，也可不使用。在外自定义按钮寻求更多样式之类拓展 | Boolean | - | true|
|handle-config | 功能区按钮的配置项 [点击查看配置项](#handleConfig) | Array | - | []|
|handle-upload | 图片上传方式，上传axios请求异步函数 | Function | - | function (data) {return axios({method: "post",url: "./api/v1/file/upload/generate",data: data,})}|
| | | | 

<a id="handleConfig"></a> 
#### handle-config 配置项
isHandle为true的情况下

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| isShow | 按钮是否显示，细分权限的考虑 |String | |
| type | 按钮类型 |String |primary / success / warning / danger / info / text |-|
| size | 尺寸 |String |medium / small / mini |-|
| disabled | 是否禁用状态 |Boolean ||false|
| handledisabled | 方法调用 return必须为boolean |Function |||

<a id="Items"></a> 
####  form-config  配置项：
```
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
```

##### type:Input

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String | Input/input |  |
| *prop | 字段名称， |String | |
| *name | item名称，用于显示label以及部分placeholder |String  | |
| maxlength | 可输入最大长度 |number  | |
|showWordLimit  | 显示字符限制 | Boolean | - | false|
| disabled |是否禁用  | Boolean | - | |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 |Function |||
| change | 触发change方法，向外携带当前修改参数的值 | Function | - | |
| input |input，向外携带当前修改参数的值  | Function | - | |
| width | item宽度 | String | - |'100%' |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |

##### type:InputNumber

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String | Input/input |  |
| *prop | 字段名称， |String | |
| *name | item名称，用于显示label以及部分placeholder |String  | |
| step | 	计数器步长 |number  | 1|
|stepStrictly  | 是否只能输入 step 的倍数 | Boolean | - | false|
|controls  | 是否使用控制按钮 | boolean | - | true|
|controlsPosition  | 控制按钮位置 | string | right | |
| disabled |是否禁用  | Boolean | - | |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 |Function |||
| change | 触发change方法，向外携带当前修改参数的值 | Function | - | |
| max |最大值  | number | - |Infinity |
| width | item宽度 | String | - |'100%' |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |



##### type:Select

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String | Select/select |  |
| *prop | 字段名称， |String | |
| *name | item名称，用于显示label以及部分placeholder |String  | |
| lazyloading | 数据懒加载，触及时触发 |Function  | |
| *options | 下拉框选择项 |Array  | |
|multiple  | 是否多选 | Boolean | - | false|
|filterable  | 是否可过滤 | Boolean | - | false|
|reserveKeyword  | 是否可保存关键字 | Boolean | - | false|
|loading  | 下拉框的数据加载 | Boolean | - | false|
|remote  | 是否开启远程 | Boolean | - | false|
|remoteMethod  | 远程时激发的方法，值返回query为输入的字，(query)=>{}, | Function | - | |
| disabled |是否禁用  | Boolean | - | |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 |Function |||
| change | 触发change方法，向外携带当前修改参数的值 | Function | - | |
| width | item宽度 | String | - |'100%' |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |
|  |  |  | - | |

##### type:Textarea

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String |Textarea/textarea   |  |
| *prop | 字段名称， |String | |
| *name | item名称，用于显示label以及部分placeholder |String  | |
| autosize | 自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } |boolean / object  | boolean / object | 	false
| rows | 输入框行数，只对 type="textarea" 有效 | Number | - | 2|
| maxlength | 可输入最大长度 |number  | |
|showWordLimit  | 显示字符限制 | Boolean | - | false|
| disabled |是否禁用  | Boolean | - | |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 |Function |||
| change | 触发change方法，向外携带当前修改参数的值 |  | - | |
| input |input，向外携带当前修改参数的值  |Function  | - | |
| width | item宽度 | String | - |'100%' |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |

##### type:Image

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String |Image/image   |  |
| *prop | 字段名称， |String | |
| *name | item名称，用于显示label以及部分placeholder |String  | |
| limit | 图片个数限制 |Number  | - | 1|
| disabled |是否禁用  | Boolean | - | |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 |Function |||
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |

##### type:datetimePicker

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String | DatetimePicker/datetimePicker  |  |
| *prop | 字段名称， |String | |
| *name | item名称，用于显示label以及部分placeholder |String  | |
| isRange | 是否范围的时间 是采用datetimerange，否采用datetime |Boolean  | - | false|
| prefixIcon |前缀icon  | String | - | el-icon-date|
|rangeSeparator | isRange的分隔符标志| String | - |"~" |
| valueFormat | 格式化 | String | - | 'yyyy-MM-dd HH:mm:ss'|
| pickerOptions | 当前时间日期选择器，具体参考element | Object | - |{} |
| disabled |是否禁用  | Boolean | - | |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 |Function |||
| change | 触发change方法，向外携带当前修改参数的值 | Function | - | |
| width | item宽度 | String | - |'100%' |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |
|  |  |  | - | |

##### type:DatePicker

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String |DatePicker/datePicker  |  |
| *prop | 字段名称， |String | |
| *name | item名称，用于显示label以及部分placeholder |String  | |
| isRange | 是否范围的时间 是采用datetimerange，否采用datetime |Boolean  | - | false|
| prefixIcon |前缀icon  | String | - | el-icon-date|
|rangeSeparator | isRange的分隔符标志| String | - |"~" |
| valueFormat | 格式化 | String | - | 'yyy-MM-dd'|
| pickerOptions | 当前时间日期选择器，具体参考element | Object | - |{} |
| disabled |是否禁用  | Boolean | - | |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 |Function |||
| change | 触发change方法，向外携带当前修改参数的值 | Function | - | |
| width | item宽度 | String | - |'100%' |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |
|  |  |  | - | |

##### type:RadioGroup

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String | RadioGroup/radioGroup |  |
| *prop | 字段名称， |String | |
| *name | item名称，用于显示label以及部分placeholder |String  | |
|  radios| radios选项 | Array | - | |
| disabled |是否禁用  | Boolean | - | |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 |Function |||
| input | 触发input方法，向外携带当前修改参数的值 | Function | - | |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |
|  |  |  | - | |

##### type:Switch

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String |switch/Switch   |  |
| *prop | 字段名称， |String | |
| *name | item名称，用于显示label以及部分placeholder |String  | |
| disabled |是否禁用  | Boolean | - | |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 |Function |||
| change | 触发change方法，向外携带当前修改参数的值 | Function | - | |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| activeValue | 开启的value |  | - |  |
| inactiveValue | 关闭的value |  | - | |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |

##### type:SelectTree

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String |selectTree/SelectTree   |  |
| *prop | 字段名称， |String | |
| *name | item名称，用于显示label以及部分placeholder |String  | |
| data  | 树形结构数据 |  | - | |
| treeProps |树形props配置详细见 [连接](https://element.eleme.cn/#/zh-CN/component/tree#props)  | object | - |{children:"childs",label: "name",};|
| nodeKey | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 | string | - |"id"|
| customId | 参与双向绑定的树节点字段 | string | - | "id" |
| disabled |是否禁用  | Boolean | - | |
| handledisabled | 方法调用控制是否禁用， return必须为boolean，(itemInfo)=>{} 返回参数当前表单item值 |Function |||
| change | 触发change方法，向外携带当前修改参数的值 | Function | - | |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |


##### type:Slot

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String |slot/Slot  |  |
| *name | item名称，用以确定具名插槽名称 |String  | |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
|  |  |  | - | |

==Slot如果想要为el-form-item 需如下==
```
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
```

### method 方法
| 方法 | 说明 |
| --- | --- | 
| this.$refs[formRefName].$emit("resetFields", {}); | 重置表单方法,在回调函数中放入表单数据可自定义恢复表单数据，例this.$options.data.call(this).formData 回到表单生成初始值。 |
|  this.$refs.customForm.$emit("verify", () => {return this.submit_request(this.formData);}); | 验证表单请求，携带请求函数， 验证通过使用，不通过进行拦截，需要在 ()=>{}中填写回调的函数方法 |



---


##  bluexii-custom-table 表格组件

### Attributes 参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
|size | 全域大小 |String  | medium / small / mini | medium |
|is-border  | 开启表格框架 | Boolean | - | false |
|loading | 表格loading |Boolean  | -  |  false|
|row-key | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。  | Function(row)/String | -| id |
|tree-props | 树形结构设置 | object | - | { children: "children", hasChildren: "hasChildren" } |
|table-key | 强制表格渲染 值需要不断改变  | Number | - | 0  |
|is-handle  | 开启表格上层操作区域 | Boolean |  | false |
|table-handles  | isHandle 为true时， 表格上层操作区域按钮配置 [点击查看配置项](#tableHandles)   | Array |  | []  |
|expand-row-keys | 可以通过该属性设置 Table 目前的展开行，需要设置 rowKey 属性才能使用，该属性为展开行的 keys 数组。  | Array |  |  |
|table-data |   表格数据 | Array |  | [] |
|table-cols | 表格列配置 [点击查看配置项](#tableCols) | Array |  | [] |
|header-cell-style |  表格headercell样式修改 |Object  |  | {background:"#fafafa",color: "#606266",} |
|is-selection | 是否显示表格复选框 | Boolean |  | false|
|reserve-section |储备选择后复选框选项 | Boolean |  |  false|
|default-selections |初始选择 | Array, Object |  |  null|
|is-filter-column | 开启动态表格 | Boolean | - | false |
|filter-Column-item-arr  |  没有配置默认为全选| Array |  - | [] |
|filter-column-disabled-arr  | 不可被更改的动态表格选项 |Array  | - |[]  |
|is-index  | 是否显示表格索引 |  | Boolean | false |
|index-label | index对应header自定义|String  |  | "序号" |
|is-pagination | 是否显示分页 | Boolean |  | false |
|pagination | 分页数据 |Object  |  | { pageSize: 10, pageNum: 1, total: 0 } |


<a id="tableHandles"></a> 
#### table-handles 配置项

==当isHandle为true时使用== 

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| size | 全域大小 |String  | medium / small / mini | medium |
| type | 类型 | string | rimary / success / warning / danger / info /text|	—|
| plain |是否朴素按钮 | boolean | 	—	 | false |
| round |是否圆角按钮 | boolean | 	—	 | false |
| circle |是否圆形按钮 | boolean | 	—	 | false |
| loading | 是否加载中状态| boolean |— | false |
| isDisabled |是否禁用状态 | function | -| {} |
| icon | 图标类名|string  | -| - |
| handle | 触发点击时间 | Function  | - |  |
| isShown | 是否显示按钮 | boolean | | true |
| style | 按钮style样式 | string/object | | |
| class | 按钮class样式 | string | | |
| handlestyle |style方法  | Function | | |
| handleclass |class方法  | Function | | |
|  | |  | |  |


<a id="tableCols"></a> 
#### table-cols 配置项

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| id | 绑定值 |-  | - | - |
| prop | 字段名称 | string | |	—|
| label |表头名称 | string | 	—	 | — |
| width |单元格宽度 | String | 	—	 |  |
| align |对齐方式 | String | 	left/center/right	 | left |
| fixed | 	列是否固定在左侧或者右侧，true 表示固定在左侧| string, boolean |true, left, right | - |
| notShowOverflowTooltip |不显示ShowOverflowTooltip | boolean | -| true |
| require | 开启 render-header|Boolean  | -| - |
| isHeaderOptions | 自定义表头配置项[点击查看配置项](#isHeaderOptions)  | Object | |  |
| isDisabled |是否禁用状态 (row)=>{} 携带当前行的信息 | function | -|  |
| collapseButton | 对于折叠按钮的配置项  [点击查看配置项](#collapseButton)   | object  | |  |
| type | 单元格中组件 | String | Html/Button/Input/Select/Radio/Checkbox/Rate/Switch/Image/Slider/BxTag/Array/dbClickInput/-|  |
| btnList | type:Button,时的配置项[点击查看配置项](#btnList)| Array | |  |
|focus  |type:'Input',触发 (row)=>{} 携带当前行的信息| function | |  |
|change  |type:'Radio'/'Select'/'Checkbox'/'Rate'/'Switch'/'Slider',触发 (row)=>{} 携带当前行的信息| function | |  |
| radios |type:'Radio' ,格式 {label:"",value:""} |  | |  |
| options |type:'Select' ,格式 {label:"",value:""} |  | |  |
| checkboxs |type:'Checkbox' ,格式 {label:"",value:""} |  | |  |
| status |type:'BxTag'  | String |'successTag'/'peddingTag'/ 'dangerTag'/'infoTag'/'warningTag'|  |
| txt |type:'BxTag,' bxtag名称 |  | |  |
| formatter |type:'Array', (row)=>{} 携带当前行的信，格式化内容 |  | |  |
| itemStyle |type:'Array' ,(row)=>{} 携带当前行的信，格式化内容 |  | |  |
|itemClass  |type:'Array' ,(row)=>{} 携带当前行的信，格式化内容 |  | |  |
|isTooltip  |是否开启tooltip |  | |  |
|formatterTooltip  |type:'Array', (row)=>{} 携带当前行的信，格式化内容 |  | |  |
|activeValue  |type:'Switch', 开启 |  | |  |
| inactiveValue |type:'Switch' ,关闭  |  | |  |
| isCollapse |type:'Button', 是否开启按钮的折叠  | Boolean | |  |
| maxShowNum |type:'Button',最大按钮显示个数，超出即发生折叠 |Number  | |  |
|  | |  | |  |
|  | |  | |  |

```
,
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
```


##### collapseButton 配置项 
当 type:button时
<a id="collapseButton"></a>

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| size | 全域大小 |String  | medium / small / mini | medium |
| type | 类型 | string | rimary / success / warning / danger / info /text|	—|
| plain |是否朴素按钮 | boolean | 	—	 | false |
| round |是否圆角按钮 | boolean | 	—	 | false |
| circle |是否圆形按钮 | boolean | 	—	 | false |
| loading | 是否加载中状态| boolean |— | false |
| isDisabled |是否禁用状态 (row)=>{} 携带当前行的信息 | function | -| {} |
| prefixIcon | 前缀图标类名|string  | -| - |
| suffix | 后缀图标类名|string  | -| - |
| style | 按钮style样式 | string/object | | |
| class | 按钮class样式 | string | | |
| handlestyle |style方法 (row)=>{} 携带当前行的信息 | Function | | |
| handleclass |class方法 (row)=>{} 携带当前行的信息 | Function | | |
|  | |  | |  |
|  | |  | |  |
|  | |  | |  |

#####  btnList的配置
<a id="btnList的配置"></a>
当 type:button时
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| size | 全域大小 |String  | medium / small / mini | medium |
| type | 类型 | string | rimary / success / warning / danger / info /text|	—|
| plain |是否朴素按钮 | boolean | 	—	 | false |
| round |是否圆角按钮 | boolean | 	—	 | false |
| circle |是否圆形按钮 | boolean | 	—	 | false |
| loading | 是否加载中状态| boolean |— | false |
| isDisabled |是否禁用状态 (row)=>{} 携带当前行的信息 | function | -| {} |
| icon | 图标类名|string  | -| - |
| handle | 触发点击时间 | Function  | - |  |
| isShown | 是否显示按钮 (row)=>{} 携带当前行的信息 | boolean | | true |
| style | 按钮style样式 | string/object | | |
| class | 按钮class样式 | string | | |
| handlestyle |style方法 (row)=>{} 携带当前行的信息 | Function | | |
| handleclass |class方法 (row)=>{} 携带当前行的信息 | Function | | |
|  | |  | |  |
|  | |  | |  |


##### isHeaderOptions  自定义表头选项配置项
<a id="isHeaderOptions"></a>

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| isCustomHeader | --- | --- | --- | --- |
| isTooltip | 是否show Tooltip |Boolean  | - | - |
| headerTooltipContent | isTooltip为true的情况下toolTip的content | string | |	—|
| icon |icon | string | 	—	 | — |
| width |单元格宽度 | String | 	—	 |  |
|  | |  | |  |
|  | |  | |  |


### method 方法

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
|refresh  | 分页触发  pagination：{ pageSize: 10, pageNum: 1, total: 0 } 双向绑定 |  |
|select | 返回被选择的row信息,单选选中后返回(rows，row)，全选checkbox选中后(rows) | rows, row（单选时传递） |
|selectionChange | 复选框change事件 | rows  |
|rowClick  | 点击表格row触发的事件 | row |
|this.$refs.refName.$emit("clearSelection"); /  this.$refs.refName.clearSelection();  | 清除表格内所有选择 |  |
|this.$refs.refName.$emit("toggleRowSelection", {row: row,isSelected: false});  | 控制复选框是否选择 |  |
| inputBlur | 开启dbClickInput选项后,向外抛出当前的方法 | row |


---


## bluexii-search-form

### Attributes 参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| isHandle | 是否启用右侧功能区域 |Boolean  |  | true |
|labelWidth  | 搜索表单label宽度值 | String | - | 50px |
| formSize | 表单form大小 |String  | medium / small / mini  |  mini|
|itemSize | 项目item大小  |String  | medium / small / mini| mini  |
| searchForm | 搜索表单配置项 [点击查看配置项](#SearchForm) |Array  | | [] |
|searchHandle | 右侧功能区域配置项 |Array  | | []  |
|v-model  | 查询表单对应字段  | Object  | | {} |
| clearable | item是否可清除 | Boolean  | | true |
| |  |  | |  |




```
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
```

### SearchForm 配置项

<a id="SearchForm"></a>

| 参数 | 说明 | 类型 |  可选值 |
| --- | --- | --- | --- |
| label | 名称 | string |  | 
| type | 类型 | string |  Input/Select/Radio/RadioButton/Checkbox/Date/Time/DateTime/Datetimerange/Slider/Switch | 
| prop | 字段名称  | string |  |
| width | 宽度 | string  |  | 
| size | item大小| string |  | 
| placeholder |  | string |  |  
| options | type:"Select"时生效,[{label:"",value:""}]  | array |  |  
|multiple  | type:"Select"时生效,是否多选 | boolean |  |  
| reserveKeyword | type:"Select"时生效,搜索保存关键词 | boolean |  |  
| filterable  | type:"Select"时生效 ,是否开启搜索 | boolean |  |  
| radios | type:"Radios"/"RadioButton",时生效 [{label:"",value:""}] |array  |  |  
| checkboxs | type:"Checkbox"时生效  ,[{label:"",value:""}]| array |  |  
| pickerOptions | type:"Date"/"Time"/"DateTime"/"Datetimerange"时生效 ,时间配置项 |  |  |  
| startPlaceholder | type:"Datetimerange"时生效  , 起始placehold|  |  |  
| endPlaceholder | type:"Datetimerange"时生效  , 结束placehold|  |  |  
| valueFormat | type:"Datetimerange"时生效  , 时间格式化 |  |  |  
| activeValue | type:"Switch"时生效  , 开启 |  |  |  
| inactiveValue | type:"Switch"时生效  , 显示关闭 |  |  |  
|  |  |  |  |  
|  |  |  |  |  



---
##  bluexii-custom-tree 表格组件

### Attributes 参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| v-model | 双向数据绑定 |Array  | - | [] |
| node-key | 基于的节点key |String  | - | "" |
| data | 树形数据 |Array  | - | [] |
| default-props | 初始props数据 |Object  | - |{children: "childs",label: "name",} |
| data | 树形数据 |Array  | - | [] |
| default-checked-keys | 默认勾选的节点的 key 的数组 | Array  | - | - |
| default-expanded-keys | 默认展开的节点的 key 的数组 |Array  | - | - |
| show-checkbox | 节点是否可被选择 |boolean  | false | - |