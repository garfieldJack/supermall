<template>
     <div id="home" class="wrapper">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control :titles="titles"
                @tabClick="tabControlClick"
                ref="tabControl1" 
                class="tab-control" 
                v-show="isTabFixed"
                />
        <!-- probe-type 对应Scroll驼峰 不带:的话传的都是String类型-->
        <scroll class="content" 
        ref="scroll" 
        :probe-type="3" 
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadMore"
       >
             <home-swiper :bannersArray="banners"
             @swiperImgageLoad = "swiperImageLoad"></home-swiper>
            <recommend-View :recommendArray="recommends"></recommend-View>
            <feature-view/>
            <!-- @tabClick 和 TabControl中的$emit的第一个逗号的值相同 -->
            <tab-control :titles="titles"
                @tabClick="tabControlClick"
                ref="tabControl2"/>
            <goods-list :goods ="showGoods"/>
            
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>
<script>
//将相同用途的组件放一块
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'
//import {Swiper,SwiperItem} from '@/components/common/swiper'
//因为home.js中的 getHomeMutidata 没用default 导出,所以{}引入

import {getHomeMutidata,getHomeGoods} from '@/network/home'


import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/TabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'


import BackTop from '@/components/content/backTop/BackTop'

import {debounce} from "@/common/utils"


export default {
    name: 'Home',
    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data() {
        return{
            //存储获取的数据 
            banners : [],
            recommends: [],
            titles:['流行','新款','精选'],
            goods: {
                'pop':{page: 0,list:[]},
                'new':{page: 0,list:[]},
                'sell':{page: 0,list:[]},
            },
            //默认pop
            currentType: 'pop',
            //定义position,top图标是否显示
            isShowBackTop: false,
            //吸顶效果用到的参数，监听滚动效果
            tabOffsetTop:0,
            //默认是否吸顶
            isTabFixed : false,
            //保存当前浏览到的位置
            saveY: 0
        }
    },
    computed:{
        showGoods(){
            //计算属性返回内容，避免内容过长
            return this.goods[this.currentType].list
        }
    },
    activated(){
        //活跃的
        this.$refs.scroll.refresh();
        this.$refs.scroll.scrollTo(0,this.saveY,0)
       
    },
    deactivated(){
        //离开的
        this.saveY =  this.$refs.scroll.getScrollY();
       
    },
    created(){
        //写具体方法逻辑
        //1.请求多个数据
        this.getHomeMutidata()
        //获取商品数据
        this.getHomeGoods('new')
        this.getHomeGoods('pop')
        this.getHomeGoods('sell')
        
        
    },
    mounted() {
        //对于refresh非常频繁的问题，进行防抖操作   防抖debounce/节流throttle
        //因为传入的是函数，所以this.$refs.scroll.refresh 不加括号
        //setTimeOut(() => {   会放到最后执行
        //    
        //})
        //图片加载的视图监听
        const refresh = debounce(this.$refs.scroll.refresh,500)
        //就监听bus里面的事件 
        this.$bus.$on('itemImageLoad',() => {
            refresh()
        })
        //获取tabControl的offsetTop
        //this.tabOffsetTop =  
        //所有的组件都有一个属性$el:用户获取组件中的元素,此时的offsetTop是不准确的，不包含图片，应该在图片加载完获取最终的offsetTop 
        this.swiperImageLoad()
    },
    methods: {
        /**
         * 事件监听相关方法
         */
        //防抖函数 函数和延迟事件
        // debounce(func,delay){
        //     let timer = null
        //     return function (...args){
        //         if(timer) clearTimeout(timer)
        //         timer = setTimeout(() => {
        //             func.apply(this,args)
        //         },delay)
        //     }
        // },
        tabControlClick (tabIndex) {
            // childValue就是子组件传过来的值
            //console.log(tabIndex)
            //this.tabIndex = tabIndex
            switch (tabIndex) {
                case 0:
                    this.currentType = 'pop'
                    break;
                case 1:
                    this.currentType = 'new'
                    break;
                case 2:
                    this.currentType = 'sell'
                    break;
                default:
                    break;
            }
            //使点击保持一致
            this.$refs.tabControl2.currentIndex = index;
            this.$refs.tabControl1.currentIndex = index;
        },

        backClick(){
            //console.log('事件点击')
            //通过ref.Scroll内的scroll (x,y,mills)
            //scrollTo封装在Scroll内。直接通过$refs调用scroll的scrollTo方法
            this.$refs.scroll.scrollTo()
        },
        //内容滚动时 点击跳转到顶部的图标显示
        contentScroll(position){
            //1.判断BackTop是否显示
            this.isShowBackTop = Math.abs(position.y) > 1000
            //2.决定tabControl是否吸顶(position: fixed)
            this.isTabFixed = Math.abs( position.y)>this.tabOffsetTop
        },
        //加载更多
        loadMore(){
            //console.log("上拉加载更多")
            this.getHomeGoods(this.currentType);
            //1.监听图片是否加载完成(写在getHomeGoods里面了)  2.重新计算可滚动高度
            //this.$refs.scroll.scroll.refesh();
        },
        //监听轮播图是否加载完获取offsetTop的值
        swiperImageLoad(){
            this.tabOffsetTop = (this.$refs.tabControl2.$el.offsetTop)
        },

        
        /**
         * 网络请求相关方法
         */
        //写具体方法实现
        //封装方法
        getHomeMutidata(){
                getHomeMutidata().then(res => {
                //debugger
                //console.log(res)
                //console.log(res.data.data.banner.list)
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            });
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1
                getHomeGoods(type,page).then(res => {
                    //是添加不是赋值所以 concat
                //this.goods[type].list.concat(res.data.list)  

                //...解析数组并放进去
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page+=1
                
                //调用方法加载完成
                this.$refs.scroll.finishPullUp();
            })
        }
        
    }
}
</script>
<style scoped>
/* scoped 只对当前作用域有影响 */
#home{
     padding-top: 44px;
     /* vh viewport height 视口高度 */
     height: 100vh;
     position: relative;
}
.home-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    
}
.tab-control {
    /* 在未达到top的像素时不固定 属性是sticky 当到达44px 属性是fixed */
    /* position: sticky;
    top: 44px;
    z-index: 9; */
}
.content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
/* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    /* margin-top: 44px; 
} */
.tab-control{
    /* 相对定位位置不变 */
    position: relative;
    z-index: 9;
}
</style>