<template>
    <tab-bar>
        <tab-bar-item path='/home' activeColorNew='blue'>
          
          <img slot="item-icon" src="@/assets/img/tabbar/add.svg"/>
          <img slot="item-icon-active" src="@/assets/img/tabbar/browse.svg"/>
          <div slot="item-text">首页</div>
          
        </tab-bar-item>
        <tab-bar-item path='/category'>
          
          <img slot="item-icon" src="@/assets/img/tabbar/add.svg"/>
          <img slot="item-icon-active" src="@/assets/img/tabbar/browse.svg"/>
          <div slot="item-text">分类</div>
          
        </tab-bar-item>
        <tab-bar-item path='/cart'>
         
          <img slot="item-icon" src="@/assets/img/tabbar/add.svg"/>
          <img slot="item-icon-active" src="@/assets/img/tabbar/browse.svg"/>
          <div slot="item-text">购物车</div>
        </tab-bar-item>
        <tab-bar-item path='/profile'>
          <img slot="item-icon" src="@/assets/img/tabbar/add.svg"/>
          <img slot="item-icon-active" src="@/assets/img/tabbar/browse.svg"/>
          <div slot="item-text">我的</div>
        </tab-bar-item>
       
    </tab-bar>
</template>
<script>
// 导入组件
import TabBar from '@/components/common/tabbar/TabBar'
import TabBarItem from '@/components/common/tabbar/TabBarItem'
export default {
    name: "MainTabBar",
    components: {
        TabBar,
        TabBarItem
    }
}
</script>
<style scoped>

</style>
