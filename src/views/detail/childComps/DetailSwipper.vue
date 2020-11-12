<template>
    <!-- 因为swiper组件内已经有div包裹，所以不需要div -->
    <swiper class="detail-swiper">
        <swiper-item v-for="(item,index) in detailArray" 
        :key="index"
        > 
            <img :src="item" alt="">
        </swiper-item>
    </swiper>

 
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'
export default {
    name: 'DetailSwipper',
    props:{
        //获取数据
        detailArray : {
            type: Array,
            default() {
                return []
            }
        }
    },
    components : {
        Swiper,
        SwiperItem
    }
}
</script>

<style scoped>
    .detail-swiper{
        height: 300px;
        overflow: hidden;
    }
</style>