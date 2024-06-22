<template>
  <div class="container">
    <div class="centered-content">
      <a-descriptions
        class="descriptions"
        style="margin-top: 20px"
        :data="data"
        :size="'large'"
        :column="1"
        title="用户个人主页"
      />
    </div>
  </div>
  <a-button type="primary" @click="logout">退出登录</a-button>
</template>

<script>
import store from "@/store";
import router from "@/router";

export default {
  setup() {
    const data = [
      {
        label: "id",
        value: store.state.user.loginUser?.id,
      },
      {
        label: "姓名",
        value: store.state.user.loginUser?.userName,
      },
      {
        label: "更新时间",
        value: store.state.user.loginUser?.updateTime,
      },
      {
        label: "用户权限",
        value: store.state.user.loginUser?.userRole,
      },
      {
        label: "头像链接",
        value: store.state.user.loginUser?.userAvatar,
      },
    ];
    const logout = () => {
      // 编写退出登录的逻辑
      // 清除用户登录状态等操作
      store.dispatch("user/logout");
      // 跳转到登录页面
      router.push("/user/login");
    };

    return {
      data,
      logout,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.centered-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: -200px;
}
</style>
