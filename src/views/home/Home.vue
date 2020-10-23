<template>
     <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <home-swiper :bannersArray="banners"></home-swiper>
        <recommend-View :recommendArray="recommends"></recommend-View>
    </div>
</template>
<script>
import NavBar from '@/components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
//import {Swiper,SwiperItem} from '@/components/common/swiper'
//因为home.js中的 getHomeMutidata 没用default 导出,所以{}引入
import {getHomeMutidata} from '@/network/home'
import RecommendView from './childComps/HomeRecommendView'
export default {
    name: 'Home',
    components: {
        NavBar,
        HomeSwiper,
        RecommendView
    },
    data() {
        return{
            //存储获取的数据 
            banners : [],
            recommends: [],
        }
    },
    created(){
        
        //1.请求多个数据
        getHomeMutidata().then(res => {
            //debugger
            console.log(res)
            //console.log(res.data.data.banner.list)
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
        })
    }
}
</script>
<style>
.home-nav{
    background-color: var(--color-tint);
    color: #fff;
}
</style>