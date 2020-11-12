<template>
  <!-- 封装scroll ref子组件-->
  <!-- betterScroll wrapper->content-> 很多内容 -->
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
//引入
import BScroll from 'better-scroll'
export default {
    name:"Scroll",
    data() {
        return {
            scroll : null
        }
    },
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper,{
           click: true,
           //监听滚动 0/1/2(手指滚动)/3(只要是滚动就会有监听)
           probeType:this.probeType,
            //上拉加载更多
            pullUpLoad: this.pullUpLoad
        })
        //监听滚动区域
         //监听scroll事件
        this.scroll.on('scroll',(position)=> {
            //console.log(position)
            //自定义事件把position传递出去
            this.$emit('scroll',position)
        })
        //监听上拉事件
        this.scroll.on('pullingUp',() => {
            //箭头函数内的this向上找
            this.$emit('pullingUp')
        })
    },
    methods: {
        scrollTo(x,y,time=300){
            this.scroll && this.scroll.scrollTo(0,0,time)
        },
        //完成加载
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp()
        },
        refresh() {
           this.scroll && this.scroll.refresh()
        },
        getScrollY(){
            //获取踢开时滚动到的位置
            return this.scroll ? this.scroll.y : 0
        }
    }
    

}
</script>

<style>

</style>