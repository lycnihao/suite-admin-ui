<!-- eslint-disable no-unused-vars -->
<template>
  <div class="page-header">
    <a-form layout="inline" :label-col="{ span: 8 }">
      <a-form-item label="账号">
        <a-input
          placeholder="请输入账号"
          :style="{ width: '300px' }"
          v-model:value="params.username"
        />
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input
          placeholder="请输入邮箱"
          :style="{ width: '300px' }"
          v-model:value="params.email"
        />
      </a-form-item>
      <a-form-item label="手机号">
        <a-input placeholder="请输入手机号" :style="{ width: '300px' }" />
      </a-form-item>
      <a-button type="primary" @click="queryData()" class="mr-2">
        查询
      </a-button>
      <a-button type="info"> 重置 </a-button>
    </a-form>
  </div>
  <div class="table-operations">
    <a-button type="primary" @click="handleAdd">
      <template #icon>
        <plus-outlined />
      </template>
      添加用户
    </a-button>
  </div>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :loading="loading"
    :pagination="false"
    bordered
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
          @click="handleEdit(record)"
        >
          编辑
        </a-button>
        <a-popconfirm
          title="确认删除吗?"
          ok-text="确认"
          cancel-text="取消"
          @confirm="handleDelete(record)"
        >
          <a-button
            type="link"
            size="small"
            v-permission:disabled="'system_user_del'"
          >
            删除
          </a-button>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
  <div class="page-wrapper">
    <a-pagination
      class="pagination"
      v-model:current="params.current"
      v-model:page-size="params.pageSize"
      :defaultPageSize="params.pageSize"
      :page-size-options="['10', '20', '50', '100']"
      :total="total"
      showLessItems
      showSizeChanger
      @change="queryData"
      @showSizeChange="queryData"
    />
  </div>
  <a-drawer
    placement="right"
    v-model:visible="showModal"
    :title="addUserFlag ? '新增用户' : '编辑用户'"
    :width="502"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="closeModal"
  >
    <template #header> {{ addUserFlag ? "新增用户" : "编辑用户" }} </template>
    <template #footer>
      <a-button type="primary" :loading="formBtnLoading" @click="confirmForm"
        >提交</a-button
      >&nbsp;
      <a-button>重置</a-button>
    </template>
    <a-spin :spinning="loadModal">
      <a-form
        ref="formRef"
        label-placement="left"
        :label-col="{ span: 4 }"
        :model="form"
        :rules="rules"
      >
        <a-form-item label="账号" name="username">
          <a-input
            v-model:value="form.username"
            placeholder="输入账号"
            :disabled="!addUserFlag"
          />
        </a-form-item>
        <a-form-item label="用户名" name="nickname">
          <a-input v-model:value="form.nickname" placeholder="输入用户名" />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input
            type="password"
            show-password-on="mousedown"
            placeholder="密码"
            v-model:value="form.password"
            :maxlength="125"
          />
        </a-form-item>
        <a-form-item label="确认密码" name="confirmPwd">
          <a-input
            type="password"
            show-password-on="mousedown"
            placeholder="确认密码"
            v-model:value="form.confirmPwd"
            :maxlength="125"
          />
        </a-form-item>
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="form.email" placeholder="输入邮箱" />
        </a-form-item>
        <a-form-item label="角色" name="roleIds">
          <a-select
            v-model:value="form.roleIds"
            :options="roleOptions"
            mode="multiple"
            clearable
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-drawer>
</template>
<script lang="ts" setup>
import { unref, reactive, ref, onMounted } from "vue";
import { message } from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import cloneDeep from "lodash.clonedeep";
import userApi from "/@/api/system/user";
import roleApi from "/@/api/system/role";

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
const total = ref(0);

const params = reactive({
  current: 1,
  pageSize: 10,
  username: "",
  email: "",
});
let tableData = ref([]);
const loading = ref(false);
const queryData = async () => {
  try {
    loading.value = true;
    let _params = {
      ...unref(params),
    };
    const { data } = await userApi.getUserList(_params);
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

const showModal = ref(false);
const loadModal = ref(false);
const addUserFlag = ref(false);
const formBtnLoading = ref(false);
const formRef: any = ref(null);

const defaultForm = {
  userId: undefined,
  username: "",
  nickname: "",
  password: "",
  confirmPwd: "",
  email: "",
  description: "",
  status: "",
  roleIds: [],
};

const roleOptions = ref([]);
let form = reactive(defaultForm);

let confirmPwdValidate = async (_rule: Rule, value: string) => {
  if (!_rule.required) {
    return Promise.resolve();
  } else if (!value) {
    return Promise.reject("请输入确认密码");
  } else if (value !== form.password) {
    return Promise.reject("两次输入不匹配");
  } else {
    return Promise.resolve();
  }
};
const rules = reactive({
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  nickname: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
  email: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPwd: [{ required: true, validator: confirmPwdValidate }],
  roleIds: [
    {
      type: "array",
      required: true,
      message: "请选择角色",
      trigger: ["blur", "change"],
    },
  ],
});

const closeModal = () => {
  // 重置表单
  resetForm();
  loadModal.value = false;
};

const resetForm = () => {
  form = reactive(cloneDeep(defaultForm));
};

async function handleAdd() {
  console.log("点击了新增");
  showModal.value = true;
  addUserFlag.value = true;
  rules.password[0].required = true;
  rules.confirmPwd[0].required = true;
  const roles = await roleApi.getAllRoles();
  roleOptions.value = roles.data.map(
    (r) => new Object({ label: r.name, value: r.id })
  );
}

async function handleEdit(record: any) {
  console.log("点击了编辑", record);
  showModal.value = true;
  loadModal.value = true;
  addUserFlag.value = false;
  rules.password[0].required = false;
  rules.confirmPwd[0].required = false;
  const roles = await roleApi.getAllRoles();
  roleOptions.value = roles.data.map(
    (r) => new Object({ label: r.name, value: r.id })
  );
  const { data } = await userApi.getUserInfoById(record.userId);
  form = reactive(cloneDeep(data));
  loadModal.value = false;
}

function confirmForm(e: any) {
  e.preventDefault();
  formBtnLoading.value = true;
  try {
    formRef.value.validateFields().then(async () => {
      if (addUserFlag.value) {
        await userApi.addUserInfo(form);
      } else {
        await userApi.updateUserInfo(form);
      }
      message.success("保存成功");
      showModal.value = false;
      queryData();
    });
  } finally {
    formBtnLoading.value = false;
  }
}

async function handleDelete(record: any) {
  console.log("点击了删除", record);
  await userApi.deleteUserInfo(record.userId);
  message.success("删除成功");
  queryData();
}
</script>
