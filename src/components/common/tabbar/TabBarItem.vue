<template>
<div class="tab-bar-item" @click="itemClick">
  <!-- div包裹插槽 -->
  <div v-if="!isActive"><slot name="item-icon"></slot></div>
  <div v-else><slot name="item-icon-active"></slot></div>
  <!-- 模块的样式很多，可以放到计算属性中去 -->
  <div :style="activeStyle"><slot name="item-text"></slot></div>
   
   
</div>
   
</template>

<script>
export default {
    name: 'TabBarItem',
    // 定义传递的参数
    props: {
      path: String,
      activeColorNew : {
        type: String,
        default: 'deepPink'
      }
    },
    data() {
      return {
        //isActive: true
      }
    },
    computed: {
      isActive() {
        //获取当前活跃的路由的状态
        return this.$route.path.indexOf(this.path)!==-1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColorNew} : {}
      }
    },
    methods: {
      itemClick() {
        // 路由跳转
        this.$router.push(this.path)
      }
    }
}
</script>

<style>
  /* .active{
    color: red;
  } */
</style>