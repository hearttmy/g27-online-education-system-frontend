<template>
  <MainLayout :lg="18">
    <el-row type="flex">
      <UserCard></UserCard>
      <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-row>
  </MainLayout>
</template>

<script>
import MainLayout from "@/components/common/MainLayout";
import UserCard from "@/components/user/UserCard";

export default {
  name: "User",
  components: {UserCard, MainLayout},
}
</script>

<style scoped>

</style>
