<template>
    <div id="detail">
         <detail-nav-bar class="detail-nav"/>
             <scroll class="content" ref="scroll" :pull-up-load="true">
              <detail-swipper :detail-array = "topImages"></detail-swipper>
              <detail-base-info :goods="goods"/>
              <detail-shop-info :shop="shop"/>
              <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
              <detail-param-info :param-info="paramInfo"/>
              <detail-comment-info :commentInfo="commentInfo"/>
              <goods-list :goods="recommends"></goods-list>
            </scroll>
        
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwipper from './childComps/DetailSwipper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from '@/components/content/goods/GoodsList'
//import {getHomeMutidata,getHomeGoods} from '@/network/home'
import {getDetailById,getRecommend,Goods,Shop,GoodsParam} from '@/network/detail'
//导入betterScroll
import Scroll from '@/components/common/scroll/Scroll'
export default {
    name: "Detail",
    data() {
        return{
            iid: null,
            topImages: [],
            //存放商品
            goods:{},
            //店铺信息
            shop:{
                type: Object,
                default() {
                    return {}
                }
            },
            //商品详情
            detailInfo: {

            },
            //参数信息
            paramInfo: {

            },
            //评论信息
            commentInfo: {

            },
            //推荐
            recommends: []

        }
    },
    components: {
        DetailNavBar,
        DetailSwipper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        Scroll,
        DetailCommentInfo,
        GoodsList
    },
    created() {
        //通过$route获取iid
        this.iid = this.$route.params.iid
        //通过iid请求数据
        getDetailById(this.iid).then(res => {
            //获取轮播图数据
            const data = res.result;
                this.topImages = data.itemInfo.topImages

                //获取商品信息
                this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

                //店铺信息
                this.shop = new Shop(data.shopInfo)

                //保存商品的详情数据
                this.detailInfo  = data.detailInfo;

                //参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

                //评论信息
                if(data.rate.cRate !==0 ){
                  this.commentInfo = data.rate.list[0]
                }
            })
          //请求推荐数据
          getRecommend().then(res => {
           this.recommends = res.data.list
          })
    },
     methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    }

}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  /* .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  } */

  /* .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  } */

  .content {
    height: calc(100% - 44px);
  }
</style>