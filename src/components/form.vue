<script lang="ts" setup>
import { ref, watch } from 'vue';
import { DataType, F, R, O } from '../model';
import { PlusOutlined, LineOutlined } from '@ant-design/icons-vue';
import { FormInstance } from 'ant-design-vue';
const prop = defineProps<{
  open: boolean,
  data?: DataType
}>()
const emits = defineEmits(["close", 'submit'])
const formRef = ref<FormInstance>();
const item_value = {
  "F": "FK001",
  "O": "=",
  "V": ""
}
const gc_value = {
  "R": "AND",
  "C": [{ ...item_value }]
}
const data_reset = {
  RN: "",
  C: {
    GR: "AND",
    GC: [{ ...gc_value }]
  },
}
const formState = ref<DataType>(JSON.parse(JSON.stringify({ ...data_reset })))
const addItem = (i: number) => {
  formState.value.C.GC[i].C.push({ ...item_value })
}
const delItem = (i: number, c: number) => {
  formState.value.C.GC[i].C.splice(c, 1)
}
const addItemGroup = () => {
  formState.value.C.GR = "AND"
  formState.value.C.GC.push(JSON.parse(JSON.stringify({ ...gc_value })))
}
const delItemGroup = (i: number) => {
  formState.value.C.GC.splice(i, 1)
}
const onSubmit = () => {
  emits('submit', formState.value)
  emits('close')
}
watch(() => prop.open, () => {
  if (prop.open) {
    formState.value = JSON.parse(JSON.stringify(prop?.data || { ...data_reset }))
  } else {
    formRef.value?.resetFields()
  }
})
</script>

<template>
  <a-drawer v-model:open="prop.open" placement="right" :title="data ? '编辑' : '添加'" :closable="false" :width="700"
    @close="emits('close')">
    <a-form ref="formRef" :model="formState" name="basic" autocomplete="off" @finish="onSubmit">
      <a-form-item label="规则名称" :labelCol="{ span: 6 }" labelAlign="left" name="RN"
        :rules="[{ required: true, message: '请输入规则名称!' }]">
        <a-input v-model:value="formState.RN" />
      </a-form-item>
      <h3>当满足以下条件时</h3>
      <template v-for="(item, index) in formState.C.GC">
        <!-- 条件组 -->
        <a-select v-model:value="formState.C.GR" v-if="index > 0" style="margin:30px 0px">
          <a-select-option v-for="i_r in R" :value="i_r.value">{{ i_r.key }}</a-select-option>
        </a-select>
        <a-card>
          <a-space direction="vertical">
            <!-- 单条 -->
            <a-space size="large" v-for="(item_c, index_c) in item.C">
              <a-select v-model:value="item.R" v-if="index_c > 0">
                <a-select-option v-for="i_r in R" :value="i_r.value">{{ i_r.key }}</a-select-option>
              </a-select>
              <div style="width:55px" v-else>当</div>
              <a-space size="small">
                <a-select v-model:value="item_c.F">
                  <a-select-option v-for="item in F" :key="item" :value="item">{{ item }}</a-select-option>
                </a-select>
                <a-select v-model:value="item_c.O" style="width:100px">
                  <a-select-option v-for="i_o in O" :key="i_o.key" :value="i_o.value">{{ i_o.key }}</a-select-option>
                </a-select>
                <a-input v-model:value="item_c.V" placeholder="比较的值" style="width:270px"></a-input>
                <a-button @click="delItem(index, index_c)" v-if="index_c > 0">
                  <LineOutlined />
                </a-button>
              </a-space>
            </a-space>
            <a-space>
              <div style="width:55px"></div>
              <a-button type="link" @click="addItem(index)">
                <PlusOutlined /> 添加条件
              </a-button>
              <a-button type="link" @click="addItemGroup">
                <PlusOutlined /> 添加条件组
              </a-button>
              <a-button type="link" @click="delItemGroup(index)" v-if="index > 0">
                <LineOutlined /> 删除条件组
              </a-button>
            </a-space>
          </a-space>
        </a-card>
      </template>
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-space style="margin-top:30px">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>
