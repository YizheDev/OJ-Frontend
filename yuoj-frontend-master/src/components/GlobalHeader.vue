<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="@/assets/oj-logo.svg" />
            <div class="title">YZ OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
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
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";

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
  console.log("routes", routes);
  console.log("user", user);

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
// 模拟登录用户信息获取
// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "YZ管理员",
//     userRole: ACCESS_ENUM.ADMIN,
//   });
// }, 3000);
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}

.avatar-container {
  display: inline-block;
}

a-avatar {
  transition: transform 0.3s ease;
}

.hoverEffect {
  transform: scale(1.1);
  cursor: pointer;
}
</style>
