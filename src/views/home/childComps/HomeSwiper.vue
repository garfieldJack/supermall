<template>
     <swiper>
            <swiper-item v-for="(item,index) in bannersArray" :key="index">
                <a :href="item.link">
                    <!-- 监听轮播图是否加载完影响吸顶的效果 -->
                   <img :src="item.image" @load="imageLoad"/>
                </a>
            </swiper-item>
        </swiper>
</template>
<script>
import {Swiper,SwiperItem} from '@/components/common/swiper'
export default {
    name: "HomeSwiper",
    //返回数据
    props: {
        bannersArray: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        //定义isLoad对状态进行记录
        return {
            isLoad : false
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
        imageLoad() {
            //向父组件home传递事件 只需要调用一次
            if(!this.isLoad){
                this.$emit('swiperImgageLoad')
                this.isLoad = true
            }
        }
    }
   
}
</script>
<style scoped>

</style>