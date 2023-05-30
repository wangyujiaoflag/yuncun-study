<template>
  <div class="wh-screen">
    <div class="common-layout">
      <el-container>
        <el-aside width="200px" class="h-screen flex-shrink-0">
          <Menu />
        </el-aside>
        <el-container>
          <el-header><Header /></el-header>
          <el-main
            ><ElScrollbar>
              <div class="container mx-auto">
                <RouterView />
              </div> </ElScrollbar
          ></el-main>
          <el-footer class="h-20"><Footer /></el-footer>
        </el-container>
      </el-container>
    </div>
    <PlayList />
  </div>
</template>

<script setup lang="ts">
import Menu from "../../src/components/layout/menu/Menu.vue";
import Header from "../../src/components/layout/header/Header.vue";
import Footer from "../../src/components/layout/footer/Footer.vue";
import PlayList from "../../src/components/layout/playList/PlayList.vue";
</script>
<style lang="scss">
.el-header {
  padding: 0;
}
</style>
