<template>
  <div class="container">
    <div class="profile-card">
      <!-- 显示用户头像 -->
      <img
        :src="data[4].value"
        alt="用户头像"
        class="avatar"
        v-if="data[4].value"
      />
      <a-descriptions
        class="descriptions"
        :data="data"
        :size="'middle'"
        :column="1"
        title="用户个人主页"
      >
        <a-descriptions-item
          v-for="item in data"
          :key="item.label"
          :label="item.label"
        >
          {{ item.value }}
        </a-descriptions-item>
      </a-descriptions>
      <div class="button-group">
        <a-button type="primary" @click="showEditModal" icon="icon-edit">
          编辑个人资料
        </a-button>
        <a-button type="danger" @click="logout" icon="icon-logout">
          退出登录
        </a-button>
      </div>
    </div>

    <!-- 编辑个人信息的弹窗 -->
    <a-modal
      v-model:visible="editModalVisible"
      title="编辑个人信息"
      @ok="handleEditSubmit"
      @cancel="handleEditCancel"
    >
      <a-form :model="editForm">
        <a-form-item label="姓名">
          <a-input v-model="editForm.userName" placeholder="请输入姓名" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus"; // 导入 ElMessage
import store from "@/store";
import router from "@/router";
import { UserControllerService } from "../../../generated";

// 用户信息
const data = [
  { label: "id", value: store.state.user.loginUser?.id || "" },
  { label: "姓名", value: store.state.user.loginUser?.userName || "" },
  { label: "更新时间", value: store.state.user.loginUser?.updateTime || "" },
  { label: "用户权限", value: store.state.user.loginUser?.userRole || "" },
  { label: "头像链接", value: store.state.user.loginUser?.userAvatar || "" },
];

const editModalVisible = ref(false);
const editForm = reactive({
  userId: store.state.user.loginUser?.id || "",
  userName: store.state.user.loginUser?.userName || "",
  userAvatar: store.state.user.loginUser?.userAvatar || "", // 使用从后端获取的头像 URL
});

// 打开编辑弹窗
const showEditModal = () => {
  editModalVisible.value = true;
};

// 提交编辑信息
const handleEditSubmit = async () => {
  try {
    const response = await UserControllerService.updateUserUsingPost({
      id: editForm.userId || "",
      userName: editForm.userName || "",
      userAvatar: editForm.userAvatar || "", // 使用后端获取的URL更新
    });

    if (response && response.code === 0) {
      ElMessage.success("用户信息更新成功！");
      store.dispatch("user/getLoginUser");
      editModalVisible.value = false;
    } else {
      ElMessage.error(response?.message || "更新用户信息失败！");
    }
  } catch (error) {
    const errorMsg = error?.response?.data?.message || "请求失败：未知错误";
    ElMessage.error(errorMsg);
  }
};

// 取消编辑
const handleEditCancel = () => {
  editModalVisible.value = false;
};

// 退出登录
const logout = () => {
  store.dispatch("user/logout");
  router.push("/user/login");
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.profile-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
  border: 2px solid #1890ff;
}

.descriptions {
  width: 100%;
  text-align: left;
}

.button-group {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
