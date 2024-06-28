<script lang="ts" setup>
import TbForm from "./components/form.vue"
import { ref } from 'vue';
import type { Ref } from 'vue';
import { DataType } from "./model";

const edit_key = ref<number>(-1)
const columns = [
  {
    title: '规则名称',
    dataIndex: 'RN',
    width: '30%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
const dataSource: Ref<DataType[]> = ref(localStorage.getItem('value') ? JSON.parse(localStorage.getItem('value') as string) as DataType[] : []);
const open = ref(false)
const modal_open = ref(false)
const ms_data = ref()
const edit = (key: number) => {
  edit_key.value = key
  open.value = true
};
const submit = (e: DataType) => {
  if (edit_key.value > -1) {
    dataSource.value[edit_key.value] = JSON.parse(JSON.stringify(e))
  } else {
    dataSource.value.push(JSON.parse(JSON.stringify(e)))
  }
  onStoreSave()
}
const onDelete = (key: number) => {
  dataSource.value.splice(key, 1)
  onStoreSave()
};
const handleOk = () => {
  if (ms_data.value.trim()) {
    try {
      if (Array.isArray(JSON.parse(ms_data.value))) {
        dataSource.value = JSON.parse((ms_data.value.trim()))
        modal_open.value = false
        onStoreSave()
      } else {
        alert('请输入正确的JSON格式')
      }
    } catch (error) {
      alert('请输入正确的JSON格式')
    }
  }
}
const onStoreSave = () => {
  localStorage.setItem('value', JSON.stringify(dataSource.value))
}
// 可换行的注释
const placeholder = `
[
    {
        "RN": "规则2",
        "C": {
            "GR": "OR",
            "GC": [
                {
                    "R": "AND",
                    "C": [
                        {
                            "F": "FK001",
                            "O": "=",
                            "VT": "1",
                            "V": "正常"
                        },
                        {
                            "F": "FK002",
                            "O": "=",
                            "VT": "1",
                            "V": "张三"
                        }
                    ]
                },
                {
                    "R": "AND",
                    "C": [
                        {
                            "F": "FK002",
                            "O": "=",
                            "VT": "1",
                            "V": "李四"
                        }
                    ]
                }
            ]
        }
    }
]
`
</script>
<template>
  <div class="tb_body">
    <div class="tb_body_content">
      <a-space direction="vertical" style="width:100%">
        <a-space>
          <a-button type="primary" @click="open = true, edit_key = -1">添加</a-button>
          <a-button @click="modal_open = true, ms_data = undefined">模拟接口</a-button>
        </a-space>
        <a-table bordered :data-source="dataSource" :columns="columns">
          <template #bodyCell="{ column, index }">
            <template v-if="column.dataIndex === 'operation'">
              <a-button type="link" @click="edit(index)">编辑</a-button>
              <a-button type="link" @click="onDelete(index)">删除</a-button>
            </template>
          </template>
        </a-table>
      </a-space>
      <tb-form v-model:open="open" :data="dataSource[edit_key]" @close="open = false" @submit="submit"></tb-form>
      <a-modal v-model:open="modal_open" title="模拟接口" ok-text="确定" cancel-text="取消" @ok="handleOk">
        <a-textarea v-model:value="ms_data" style="height: 500px;" :placeholder="placeholder"></a-textarea>
      </a-modal>
    </div>
  </div>
</template>

<style>
.tb_body {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.tb_body_content {
  width: 50vw;
  height: 80vh;
}
</style>
