<template>
  <div class="tab-control">
<!-- 传入的都是文字所以不用slot -->
    <div v-for="(item,index) in titles" :key="index" 
    class="tab-control-item" 
    :class="{active: index === currentIndex}" 
    @click="itemClick(index)">
        <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
 name:"TabControl",
 //父往子传 prop
 props: {
     titles: {
         type: Array,
         default(){
             return []
         }
     }
 },
 data() {
     return{
         //记录当前用户的变量
         currentIndex : 0 
     }
 },
 methods: {
     //需传入index
     itemClick(index){
         this.currentIndex = index
         //子组件发生点击，将值传到父组件，界面跳转用到 $.emit
         this.$emit('tabClick',index)
     }
 }

}
</script>

<style>
    .tab-control{
        display: flex;
        text-align: center;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
    }
    .tab-control-item{
        flex: 1;
    }
    .tab-control-item span{
        padding: 3px;
    }
    .active{
        color: var(--color-high-text);
       
    }
    .active span{
         border-bottom: 3px solid var(--color-high-text);
    }
</style>