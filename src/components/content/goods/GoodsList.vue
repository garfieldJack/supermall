<template>
  <div class="goods">
     <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item = "item" ></goods-list-item>
  </div>
</template>

<script>
//需要获取GoodsListItem
import GoodsListItem from './GoodsListItem'
export default {
    name: "GoodsList",
    components:{
      GoodsListItem
    },
    props: {
      goods : {
        //存放数组
        type : Array,
        default(){
          return []
        }
      }
    }
}
</script>

<style>
  .goods{
    display: flex;
    /* 包裹，根据宽度，一行显示多少个 */
    flex-wrap: wrap;
    /* 图片间的间隙均等分，2边的各占1/2 */
    justify-content: space-around;
    padding: 2px;
  }
</style>