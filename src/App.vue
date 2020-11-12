<template>
  <div id="app">
    <!-- exclude 排除，保证每次请求可以进行而不是只进行一次 -->
    <keep-alive exclude="Detail">
      <!-- 保持home不被销毁 -->
       <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from '@/components/content/mainTabbar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
   .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
  }
</style>
