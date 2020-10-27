<template>
     <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <home-swiper :bannersArray="banners"></home-swiper>
        <recommend-View :recommendArray="recommends"></recommend-View>
        <feature-view/>
        <!-- @tabClick 和 TabControl中的$emit的第一个逗号的值相同 -->
        <tab-control :titles="titles"
         @tabClick="tabControlClick"/>
        <goods-list :goods ="showGoods"/>
        <ul>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
        </ul>
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


export default {
    name: 'Home',
    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList
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
            currentType: 'pop'
        }
    },
    computed:{
        showGoods(){
            //计算属性返回内容，避免内容过长
            return this.goods[this.currentType].list
        }
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
    methods: {
        /**
         * 事件监听相关方法
         */
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
                
            })
        }
        
    }
}
</script>
<style>
#home{
     padding-top: 44px;
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
    position: sticky;
    top: 44px;
    z-index: 9;
}
</style>