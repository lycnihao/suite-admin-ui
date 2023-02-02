<template>
  <a-dropdown class="header-trigger">
    <div class="wrapper">
      <a-avatar style="margin: 0 5px" :size="24" id="adminAvatar">
        Koodar
      </a-avatar>
      <span class="name">Koodar</span>
    </div>
    <template #overlay>
      <a-menu :class="['avatar-menu']">
        <a-menu-item>
          <span>刷新权限</span>
        </a-menu-item>
        <a-menu-item>
          <span>修改密码</span>
        </a-menu-item>
        <a-menu-item>
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<style lang="less" scoped>
@header-user-height: 40px;
.wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-right: 12px;
}
.header-trigger {
  height: @header-user-height;
  line-height: @header-user-height;

  .avatar {
    vertical-align: middle;
  }

  .name {
    margin-left: 5px;
    font-weight: 500;
  }
}
</style>
