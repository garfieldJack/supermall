<template>
    
    <div class="wrapper"> 
        <button @click="btnClick">按钮</button>
        <ul>
        <li>test001</li>
        <li>test002</li>
        <li>test003</li>
        <li>test004</li>
        <li>test005</li>
        <li>test006</li>
        <li>test007</li>
        <li>test008</li>
        <li>test009</li>
        <li>test0010</li>
        <li>test0011</li>
        <li>test0012</li>
        <li>test0013</li>
        <li>test0014</li>
        <li>test0015</li>
        <li>test0016</li>
        <li>test0017</li>
        <li>test0018</li>
        <li>test0019</li>
        <li>test0020</li>
        <li>test0021</li>
        <li>test0022</li>
        <li>test0023</li>
        <li>test0024</li>
        <li>test0025</li>
        <li>test0026</li>
        <li>test0027</li>
        <li>test0028</li>
        <li>test0029</li>
        <li>test0030</li>
        <li>test0031</li>
        <li>test0032</li>
        <li>test0033</li>
        <li>test0034</li>
        <li>test0035</li>
        <li>test0036</li>
        <li>test0037</li>
        <li>test0038</li>
        <li>test0039</li>
        <li>test0040</li>
        <li>test0041</li>
        <li>test0042</li>
        <li>test0043</li>
        <li>test0044</li>
        <li>test0045</li>
        <li>test0046</li>
        <li>test0047</li>
        <li>test0048</li>
        <li>test0049</li>
        <li>test0050</li>
        <li>test0051</li>
        <li>test0052</li>
        <li>test0053</li>
        <li>test0054</li>
        <li>test0055</li>
        <li>test0056</li>
        <li>test0057</li>
        <li>test0058</li>
        <li>test0059</li>
        <li>test0060</li>
        <li>test0061</li>
        <li>test0062</li>
        <li>test0063</li>
        <li>test0064</li>
        <li>test0065</li>
        <li>test0066</li>
        <li>test0067</li>
        <li>test0068</li>
        <li>test0069</li>
        <li>test0070</li>
        <li>test0071</li>
        <li>test0072</li>
        <li>test0073</li>
        <li>test0074</li>
        <li>test0075</li>
        <li>test0076</li>
        <li>test0077</li>
        <li>test0078</li>
        <li>test0079</li>
        <li>test0080</li>
        <li>test0081</li>
        <li>test0082</li>
        <li>test0083</li>
        <li>test0084</li>
        <li>test0085</li>
        <li>test0086</li>
        <li>test0087</li>
        <li>test0088</li>
        <li>test0089</li>
        <li>test0090</li>
        <li>test0091</li>
        <li>test0092</li>
        <li>test0093</li>
        <li>test0094</li>
        <li>test0095</li>
        <li>test0096</li>
        <li>test0097</li>
        <li>test0098</li>
        <li>test0099</li>
        <li>test00100</li>
    </ul>
    </div>
   
</template>
<script>
import BScroll, { PullUpLoad } from 'better-scroll'
export default {
    name: 'Category',
   
    mounted() {
        this.scroll = new BScroll(document.querySelector('.wrapper'),{
            //probeType 设置为2或3时 可以查看到具体滚动到那里。 2鼠标移开屏幕，则不显示 3.页面滚动就继续显示(惯性滚动)
            probeType:3,
            //上拉加载更多
            pullUpLoad: true
        })
        //监听scroll事件
        this.scroll.on('scroll',(position)=> {
            console.log(position)
        })
        //监听上拉事件
        this.scroll.on('pullingUp',() => {
            console.log('上拉加载更多')
        })
    },
    data() {
        return {
            scroll :null
        }
    },
    methods:{
        btnClick(){
            console.log('btnClick')
        }
    }
}
</script>
<style>
.wrapper{
    height: 150px;
    background-color: red;
    overflow: hidden;
}
</style>