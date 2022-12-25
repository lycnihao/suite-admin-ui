<template>
    <div class="view-account">
      <div class="view-account-header"></div>
      <div class="view-account-container">
        <div class="view-account-top">
          <div class="view-account-top-logo">
            <img src="../../../assets/vue.svg" alt="" />
          </div>
          <div class="view-account-top-desc">Welcome to load in suite admin</div>
        </div>
        <div class="view-account-form">
          <a-form
            ref="formRef"
            label-placement="left"
            size="large"
            :model="formInline"
            :rules="rules"
          >
            <a-form-item path="username">
              <a-input v-model:value="formInline.username" placeholder="请输入用户名">
                <template #prefix>
                    <user-outlined />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item path="password">
              <a-input
                v-model:value="formInline.password"
                type="password"
                showPasswordOn="click"
                placeholder="请输入密码"
              >
                <template #prefix>
                    <lock-outlined />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item class="default-color">
              <div class="space-between">
                <div>
                  <a-checkbox v-model:checked="autoLogin">自动登录</a-checkbox>
                </div>
                <div class="order-last">
                  <a href="javascript:">忘记密码</a>
                </div>
              </div>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>
                登录
              </a-button>
            </a-form-item>
            <a-form-item class="default-color">
              <div class="view-account-other">
                <div>
                  <span>其它登录方式</span>
                </div>
                <div class="view-account-other-item">
                  <a href="javascript:">
                    <github-outlined class="icon" />
                  </a>
                </div>
                <div class="view-account-other-item">
                  <a href="javascript:">
                    <wechat-outlined class="icon"/>
                  </a>
                </div>
                <div style="margin-left: auto">
                  <a href="javascript:">注册账号</a>
                </div>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
    import { reactive, ref } from 'vue';
  
    const formRef = ref();
    const loading = ref(false);
    const autoLogin = ref(true);
  
    const formInline = reactive({
      username: 'admin',
      password: '123456',
      isCaptcha: true,
    });
  
    const rules = {
      username: { required: true, message: '请输入用户名', trigger: 'blur' },
      password: { required: true, message: '请输入密码', trigger: 'blur' },
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
    }
  </script>
  
  <style lang="less" scoped>
    .view-account {
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: auto;
  
      &-container {
        flex: 1;
        padding: 32px 12px;
        max-width: 384px;
        min-width: 320px;
        margin: 0 auto;
      }
  
      &-top {
        padding: 32px 0;
        text-align: center;
  
        &-desc {
          font-size: 14px;
          color: #808695;
        }
      }
  
      &-other {
        width: 100%;
        display: flex;
        align-items: center;

        &-item {
            width: 25px;
            font-size: larger;
            padding-left: 6px;
        }
      }
  
      .default-color {
        color: #515a6e;
      }
    }

    .space-between {
        display: flex;
        justify-content: space-between;
    }
    .icon {
        color: #515a6e;
    }
  
    @media (min-width: 768px) {
      .view-account {
        background-image: url('/@/assets/login.svg');
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 100%;
      }
    }
  </style>
  