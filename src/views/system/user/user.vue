<!-- eslint-disable no-unused-vars -->
<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :loading="loading"
    :pagination="false"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'roles'">
        <span>
          <a-tag v-for="tagKey in record.roles" :key="tagKey">
            {{ tagKey }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <a-button
          type="link"
          size="small"
          v-permission:disabled="'system_user_upd'"
        >
          编辑
        </a-button>
        <a-button
          type="link"
          size="small"
          v-permission:disabled="'system_user_del'"
        >
          删除
        </a-button>
      </template>
    </template>
  </a-table>
  <div class="pt-2">
    <a-pagination
      class="flex justify-end"
      v-model:current="params.current"
      v-model:page-size="params.pageSize"
      :page-size-options="pageSizeOptions"
      :total="total"
      show-size-changer
      @change="queryData"
      @showSizeChange="queryData"
    >
      <template #buildOptionText="props">
        <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
        <span v-else>全部</span>
      </template>
    </a-pagination>
  </div>
</template>
<script lang="ts" setup>
import { unref, reactive, ref, onMounted } from "vue";
import { getUserList } from "/@/api/system/user";
const columns = [
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "昵称",
    dataIndex: "nickname",
    key: "nickname",
  },
  {
    title: "邮箱",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "邮箱",
    key: "email",
    dataIndex: "email",
  },
  {
    title: "角色",
    key: "roles",
    dataIndex: "roles",
  },
  {
    title: "创建时间",
    key: "createDate",
    dataIndex: "createDate",
  },
  {
    title: "操作",
    key: "action",
  },
];
// eslint-disable-next-line prettier/prettier
const pageSizeOptions = ['10', '15', '20', '30', '40', '50', '75', '100', '150', '200', '300', '500'];
const total = ref(0);

const params = reactive({
  current: 1,
  pageSize: 10,
  username: "",
});
let tableData = ref([]);
const loading = ref(false);
const queryData = async () => {
  try {
    loading.value = true;
    let _params = {
      ...unref(params),
    };
    const { data } = await getUserList(_params);
    tableData.value = data.content;
    params.pageSize = data.size;
    params.current = data.number + 1;
    total.value = data.totalElements;
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  queryData();
});
</script>
