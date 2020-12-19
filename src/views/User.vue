<template>
  <div>
    <InfoBar></InfoBar>
    <UserContent></UserContent>
  </div>
</template>

<script>
import InfoBar from "@/views/user/InfoBar";
import UserContent from "@/views/user/UserContent";

export default {
name: "User",
  components: {UserContent, InfoBar}
}
</script>

<style scoped>

</style>
