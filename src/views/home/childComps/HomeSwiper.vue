<template>
     <swiper>
            <swiper-item v-for="(item,index) in bannersArray" :key="index">
                <a :href="item.link">
                   <img :src="item.image" />
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
    components: {
        Swiper,
        SwiperItem
    }
}
</script>
<style scoped>

</style>