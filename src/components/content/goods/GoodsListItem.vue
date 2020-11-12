<template>
  <div class="goods-item" @click="goodsItemClick">
    <img :src="showImage" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
      
    </div>
   
  </div>
</template>

<script>
export default {
    name: "GoodsListItem",
    //小组件存放图片，价格和收藏
    props: {
      // 动态获取goodsList中的数据
      goodsItem:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    //计算属性 showImg
    computed: {
      showImage(){
        // 逻辑或 先取前面的，如果没有的话取后面的值
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      // 监听图片是否加载完成
      imgLoad(){
        //console.log('加载完成')
        //往事件总线内加载一个事件，然后在
        this.$bus.$emit('itemImageLoad')
      },
      //跳转到具体的详情页
      goodsItemClick() {
       this.$router.push('/detail/'+this.goodsItem.iid)
      }
    }
}
</script>

<style>
.goods-item {
  /* 子绝父相 */
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  /* 伪元素 */
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("/assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>