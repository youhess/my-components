##  bluexii-custom-form
### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| size | 全域大小 |String  | medium / small / mini | medium |
| label-position | 性可以改变表单域标签的位置，可选值为 top、left，当设为 top 时标签会置于表单域的顶部 |String  | top left right | top |
|form-config  | 表单配置数据 | Array | - | []|
|form-data  | 表单具体数据，已双向绑定，使用请 :form-data.sync | Object | - | {}|
|isHandle | 是否开启footer功能区,提供简单的按钮配置，也可不使用。在外自定义按钮寻求更多样式之类拓展 | Boolean | - | true|
|handleConfig | 功能区按钮的配置 | Array | - | []|
|uploadUrl | 给予图片访问的线上地址 | String | - | ""|

### method
| 方法 | 说明 |
| --- | --- | 
| this.$refs[formRefName].$emit("resetFields", {}); | 重置表单方法,在回调函数中放入表单数据可自定义恢复表单数据，例this.$options.data.call(this).formData 回到表单生成初始值。 |
|  this.$refs.customForm.$emit("verify", () => {return this.submit_request(this.formData);}); | 验证表单请求，携带请求函数， 验证通过使用，不通过进行拦截，需要在 ()=>{}中填写回调的函数方法 |


---
isHandle为true的情况下

handleConfig Potions
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| isShow | 按钮是否显示，细分权限的考虑 |String | |
| type | 按钮类型 |String |primary / success / warning / danger / info / text |-|
| size | 尺寸 |String |medium / small / mini |-|
| disabled | 是否禁用状态 |Boolean ||false|

---


### Items Options：
不填入值即为undefined

#### Input Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String | Input/input |  |
| *prop | 字段名称， |String | |
| *name | item名称，用于显示label以及部分placeholder |String  | |
| maxlength | 可输入最大长度 |number  | |
|showWordLimit  | 显示字符限制 | Boolean | - | false|
| disabled |是否禁用  | Boolean | - | |
| change | 触发change方法，向外携带当前修改参数的值 | Function | - | |
| input |input，向外携带当前修改参数的值  | Function | - | |
| width | item宽度 | String | - |'100%' |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |



#### Select Options

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
|remote-method  | 远程时激发的方法，值返回query为输入的字，(query)=>{}, | Function | - | |
| disabled |是否禁用  | Boolean | - | |
| change | 触发change方法，向外携带当前修改参数的值 | Function | - | |
| width | item宽度 | String | - |'100%' |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |
|  |  |  | - | |

#### Textarea Options

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
| change | 触发change方法，向外携带当前修改参数的值 |  | - | |
| input |input，向外携带当前修改参数的值  |Function  | - | |
| width | item宽度 | String | - |'100%' |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |

#### Image Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String |Image/image   |  |
| *prop | 字段名称， |String | |
| *name | item名称，用于显示label以及部分placeholder |String  | |
| limit | 图片个数限制 |Number  | - | 1|
| disabled |是否禁用  | Boolean | - | |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |

#### datetimePicker Options

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
| change | 触发change方法，向外携带当前修改参数的值 | Function | - | |
| width | item宽度 | String | - |'100%' |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |
|  |  |  | - | |

#### DatePicker Options

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
| change | 触发change方法，向外携带当前修改参数的值 | Function | - | |
| width | item宽度 | String | - |'100%' |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |
|  |  |  | - | |

#### RadioGroup Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String | RadioGroup/radioGroup |  |
| *prop | 字段名称， |String | |
| *name | item名称，用于显示label以及部分placeholder |String  | |
|  radios| radios选项 | Array | - | |
| disabled |是否禁用  | Boolean | - | |
| input | 触发input方法，向外携带当前修改参数的值 | Function | - | |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |
|  |  |  | - | |

#### Switch Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String |switch/Switch   |  |
| *prop | 字段名称， |String | |
| *name | item名称，用于显示label以及部分placeholder |String  | |
| disabled |是否禁用  | Boolean | - | |
| change | 触发change方法，向外携带当前修改参数的值 | Function | - | |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
| activeValue | 开启的value |  | - |  |
| inactiveValue | 关闭的value |  | - | |
| rules | item自定义校验 | Object/Array | - | |
|  tip | 提示语 |String ||""|
|  |  |  | - | |

#### Slot Options

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | String |slot/Slot  |  |
| *name | item名称，用以确定具名插槽名称 |String  | |
| required | 是否必填 | Boolean | - |false |
| message | 自定义message | String | - |  |
|  |  |  | - | |



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
##  bluexii-custom-table

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| size | 全域大小 |String  | medium / small / mini | medium |
|isBorder  | 开启表格框架 | Boolean | - | false |
| loading | 表格loading |Boolean  | -  |  false|
| rowKey | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。  | Function(row)/String | -| id |
| treeProps | 树形结构设置 | object | - | { children: "children", hasChildren: "hasChildren" } |
| tableKey | 强制表格渲染 值需要不断改变  | Number | - | 0  |
|isHandle  | 开启表格上层操作区域 | Boolean |  | false |
|tableHandles  | 表格上层操作区域按钮配置 | Array |  | []  |
| expandRowKeys | 可以通过该属性设置 Table 目前的展开行，需要设置 rowKey 属性才能使用，该属性为展开行的 keys 数组。  | Array |  |  |
| tableData |   表格数据 | Array |  | [] |
| tableCols | 表格列配置 | Array |  | [] |
|  headerCellStyle |  表格headercell样式修改 |Object  |  | {background:"#fafafa",color: "#606266",} |
| isSelection | 是否显示表格复选框 | Boolean |  | false|
| reserveSection |储备选择后复选框选项 | Boolean |  |  false|
| defaultSelections |初始选择 | Array, Object |  |  null|
|isFilterColumn | 开启动态表格 | Boolean | - | false |
|filterColumnItemArr  |  没有配置默认为全选| Array |  - | [] |
|filterColumnDisabledArr  | 不可被更改的动态表格选项 |Array  | - |[]  |
|isIndex  | 是否显示表格索引 |  | Boolean | false |
| indexLabel | index对应header自定义|String  |  | "序号" |
| isPagination | 是否显示分页 | Boolean |  | false |
| pagination | 分页数据 |Object  |  | { pageSize: 10, pageNum: 1, total: 0 } |
|  |  |  |
|  |  |  |

### options 

#### tableHandles options

当isHandle为true时使用 

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


#### tableCols options
表头header配置 options

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
| isHeaderOptions | 开启自定义表头 | Object | |  |
| type | 单元格中组件 | String | Html/Button/Input/Select/Radio/Checkbox/Rate/Switch/Image/Slider/BxTag/Array/dbClickInput/-|  |
| btnList | type为Button时的配置| Array | |  |
| isDisabled |是否禁用状态 (row)=>{} 携带当前行的信息 | function | -|  |
|focus  |type:'Input'触发 (row)=>{} 携带当前行的信息| function | |  |
|change  |type:'Radio'/'Select'/'Checkbox'/'Rate'/'Switch'/'Slider'触发 (row)=>{} 携带当前行的信息| function | |  |
| radios |type:'Radio' 格式 {label:"",value:""} |  | |  |
| options |type:'Select' 格式 {label:"",value:""} |  | |  |
| checkboxs |type:'Checkbox' 格式 {label:"",value:""} |  | |  |
| status |type:'BxTag'  | String |'successTag'/'peddingTag'/ 'dangerTag'/'infoTag'/'warningTag'|  |
| txt |type:'BxTag' bxtag名称 |  | |  |
| formatter |type:'Array' (row)=>{} 携带当前行的信，格式化内容 |  | |  |
| itemStyle |type:'Array' (row)=>{} 携带当前行的信，格式化内容 |  | |  |
|itemClass  |type:'Array' (row)=>{} 携带当前行的信，格式化内容 |  | |  |
|isTooltip  |是否开启tooltip |  | |  |
|formatterTooltip  |type:'Array' (row)=>{} 携带当前行的信，格式化内容 |  | |  |
|activeValue  |type:'Switch' 开启 |  | |  |
| inactiveValue |type:'Switch' 关闭  |  | |  |
|  | |  | |  |


##### isHeaderOptions

自定义表头选项isHeaderOptions

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| isTooltip | 是否show Tooltip |Boolean  | - | - |
| headerTooltipContent | isTooltip为true的情况下toolTip的content | string | |	—|
| icon |icon | string | 	—	 | — |
| width |单元格宽度 | String | 	—	 |  |
|  | |  | |  |

##### type options

选中type：XXX 后的配置

###### type：Button 

btnList options btnList的配置

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







### Events



| 事件名 | 说明 | 参数 |
| --- | --- | --- |
|refresh  | pagination 数据变化激发事件 |  |
| select | 选择复选框触发的事件 | rows, row（单选时传递） |
| selectionChange | 复选框change事件 | rows  |
|rowClick  | 点击表格row触发的事件 | row |
|this.$refs.cesTable.$emit("clearSelection");  | 清除表格内所有选择 |  |
|    this.$refs.cesTable.$emit("toggleRowSelection", {row: row,isSelected: false});  | 控制复选框是否选择 |  |
| inputBlur | 开启dbClickInput选项后,向外抛出当前的方法 | row |






## bluexii-search-form

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| isHandle | 是否启用右侧功能区域 |Boolean  |  | true |
|labelWidth  | 搜索表单label宽度值 | String | - | 50px |
| formSize | 表单form大小 |String  | medium / small / mini  |  mini|
|itemSize | 项目item大小  |String  | medium / small / mini| mini  |
| searchForm | 搜索表单配置项 |Array  | | [] |
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

### SearchForm Attributes

| 参数 | 说明 | 类型 |  可选值 |
| --- | --- | --- | --- |
| label | 名称 | string |  | 
| type | 类型 | string |  Input/Select/Radio/RadioButton/Checkbox/Date/Time/DateTime/Datetimerange/Slider/Switch | 
| prop | 字段名称  | string |  |
| width | 宽度 | string  |  | 
| size | item大小| string |  | 
| placeholder |  | string |  |  
| options | select下选项  | array |  |  
|multiple  | 是否多选 | boolean |  |  
| reserveKeyword | 搜索保存关键词 | boolean |  |  
| filterable  | 是否开启搜索 | boolean |  |  
| radios | Radios下选项 |array  |  |  
| radioButtonItems | RadioButton下选项 | array |  |  
| checkboxItems | checkbox下选项 | array |  |  
| pickerOptions | 时间配置项 |  |  |  
| startPlaceholder |  |  |  |  
| endPlaceholder |  |  |  |  
| valueFormat |  时间格式化 |  |  |  
|  |  |  |  |  
|  |  |  |  |  


