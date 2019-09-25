<!--
 * @Description:
 * @Author: hjh
 * @Date: 2019-08-16 11:17:37
 * @LastEditors: hjh
 * @LastEditTime: 2019-08-22 18:16:24
 * @Sign: 扬眉剑出鞘
 -->

### hTimePicker

预约时间的选择，支持营业时间的判断

**使用方式：**

在 `script` 中引用组件

```javascript
import hTimePicker from "@/components/h-timePicker/h-timePicker.vue";
export default {
  components: { hTimePicker }
};
```

在 `template` 中使用组件

```html
<hTimePicker sTime="15" cTime="15" interval="1" @changeTime="changeTime">
  <view slot="pCon" class="changeTime">
    点击选择时间
  </view>
</hTimePicker>
```

### 更新日志

**1.0.0**

- 初始项目

**1.0.1**

- 修复H5下不滚动，确定无效问题


**1.0.2**

- 修复选择时间后再次打开显示不正确的问题
