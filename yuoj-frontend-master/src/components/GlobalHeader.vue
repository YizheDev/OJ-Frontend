<template>
  <a-layout id="globalHeaderLayout">
    <a-layout-header class="header">
      <a-row align="middle" :wrap="false" class="header-content">
        <a-col flex="auto">
          <div class="title-bar">
            <img class="logo" src="@/assets/oj-logo.svg" />
            <div class="title">
              CodeVirtuosoX--基于SpringBoot的OJ在线判题平台
            </div>
          </div>
          <div class="menu-container">
            <a-menu
              mode="horizontal"
              :selected-keys="selectedKeys"
              @menu-item-click="doMenuClick"
            >
              <a-menu-item
                key="0"
                :style="{ padding: 0, marginRight: '48px' }"
                disabled
              >
                <!-- 菜单项部分保留 -->
              </a-menu-item>
              <a-menu-item v-for="item in visibleRoutes" :key="item.path">
                {{ item.name }}
              </a-menu-item>
            </a-menu>
          </div>
        </a-col>
        <a-col flex="100px">
          <div class="avatar-container">
            <a-avatar
              :style="{ backgroundColor: '#14a9f8' }"
              @click="userInfo"
              @mouseover="hover = true"
              @mouseleave="hover = false"
              :class="{ hoverEffect: hover }"
            >
              {{ userNameDisplay }}
            </a-avatar>
          </div>
        </a-col>
      </a-row>
    </a-layout-header>
  </a-layout>
</template>

<script setup lang="ts">
// 保持原有的脚本不变
import { useRouter } from "vue-router";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";

const hover = ref(false);
const router = useRouter();
const store = useStore();

// 用户名显示逻辑
const userNameDisplay = computed(() => {
  const userName = store.state.user?.loginUser?.userName;
  return userName ?? "未登录";
});

// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  const routes = router.getRoutes();
  const user = store.state.user?.loginUser;

  if (!user) {
    return [];
  }

  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    return checkAccess(user, item.meta?.access as string);
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

// 用户信息跳转方法
const userInfo = () => {
  const userName = store.state.user?.loginUser?.userName;
  if (userName === "未登录") {
    router.push("/user/login");
  } else {
    router.push("/user/info");
  }
};

// 菜单点击事件
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>
<style scoped>
#globalHeaderLayout {
  min-height: 64px; /* Adjust to fit the header height */
}

.header {
  background: #fff;
  padding: 0 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.title-bar {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px; /* Adjust as needed */
  height: auto;
  margin-right: 16px;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.menu-container {
  flex: 1;
  display: flex;
  justify-content: center; /* Center horizontally */
  padding: 0 16px; /* Adjust padding as needed */
}

a-menu {
  display: flex;
  align-items: center; /* Align items vertically */
  width: auto; /* Adjust width if needed */
}

a-menu-item {
  margin: 0 16px; /* Adjust spacing between menu items */
}

a-menu {
  display: flex;
  align-items: center; /* Align items vertically */
}

a-menu-item {
  margin: 0 16px; /* Adjust spacing between menu items */
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

a-avatar {
  transition: transform 0.3s ease;
}

.hoverEffect {
  transform: scale(1.1);
  cursor: pointer;
}

.title {
  font-family: "Roboto", sans-serif; /* 使用现代、干净的字体 */
  font-size: 2em; /* 增大字体尺寸 */
  font-weight: 700; /* 设置为粗体 */
  color: #333; /* 选择深色调，显得更专业 */
  text-align: center; /* 居中对齐 */
  margin-left: 10px; /* 缩小左侧间距 */
  letter-spacing: 0.5px; /* 减小字母间距 */
}

.logo {
  height: 48px; /* 调整 logo 高度 */
}
.title {
  font-family: "Roboto", sans-serif; /* 使用现代、干净的字体 */
  font-size: 2em; /* 增大字体尺寸 */
  font-weight: 700; /* 设置为粗体 */
  color: #333; /* 选择深色调，显得更专业 */
  text-align: center; /* 居中显示 */
  margin-top: 20px; /* 增加顶部空间 */
  margin-bottom: 20px; /* 增加底部空间 */
  letter-spacing: 1.5px; /* 增加字母间距，提升可读性 */
  //text-transform: uppercase; /* 将字母全部大写，提升视觉冲击力 */
  background: linear-gradient(
    90deg,
    #00c6ff 0%,
    #0072ff 100%
  ); /* 添加渐变背景 */
  -webkit-background-clip: text; /* 仅应用于文字 */
  -webkit-text-fill-color: transparent; /* 使渐变效果仅对文字填充 */
  padding: 10px 0; /* 增加上下填充，让标题更具存在感 */
  border-radius: 5px; /* 轻微圆角，增强现代感 */
}
</style>
