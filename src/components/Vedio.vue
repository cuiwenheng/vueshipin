<template>
  <div>
    <div class="header">
      <div class="header-left" @click="goback">
        <div class="left-arrow"></div>
      </div>
      <div class="header-title">
        <span class="wordloop">{{title}}</span>
      </div>
    </div>
    <div class="thevedio">
      <d-player ref="player" @play="play" :video="video" :contextmenu="contextmenu"></d-player>
    </div>
  </div>
</template>

<script>
import VueDPlayer from './VueDPlayerHls';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title:this.$route.query.title,
      video: {
          // url: 'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/chunklist_w630020335.m3u8',
          // pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg',
          url:this.$route.query.from!='web'?('/resources/wechat_video/'+this.$route.query.name):('/resources/video/'+this.$route.query.name),
          // url:'assets/'+this.$route.query.name,
          pic:this.$route.query.from!='web'?('/resources/images/wechat/yxkp/'+this.$route.query.image):'',
          // type: 'hls'
          type: 'auto'
        },
        autoplay: false,
        player: null,
        contextmenu: [
            {
                text: 'GitHub',
                link: 'https://github.com/MoePlayer/vue-dplayer'
            }
        ]
    }
  },
  components: {
    'd-player': VueDPlayer
  },
  methods: {
    play() {
        console.log('play callback')
      },
    goback(){
      history.go(-1);
    }
  },
  mounted() {
    this.player = this.$refs.player.dp;
   
    // console.log(this.player);
    // var hls = new Hls();
    // hls.loadSource('https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/chunklist_w630020335.m3u8');
    // hls.attachMedia(this.player);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
  width: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 100;
  background-color: #7dab8d;
}
.header-left{
  position: absolute;
  left: 1rem;
  top: 1rem;
  display: block;
  font-size: 1rem;
  line-height: 2rem;
  color: #ccc;
}
.left-arrow{
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: -0.6rem;
  left: -0.2rem;
}
.left-arrow:before{
  content: "";
  position: absolute;
  width: 0.75rem;
  height: 0.75rem;
  border: 3px solid #ccc;
  border-width: 3px 0 0 3px;
  -webkit-transform: rotate(315deg);
  transform: rotate(315deg);
  top: 0.2rem;
  left: 0.2rem;
}
.header-title{
  margin: 0 3rem;
  height: 2rem;
  width: auto;
  overflow: hidden;
  /*text-overflow: ellipsis;*/
  white-space: nowrap;
  line-height: 2rem;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
}
.wordloop{
  display: inline-block;
  white-space: nowrap;
  animation: 10s wordsLoop linear infinite normal;
}
@keyframes wordsLoop {
  0% {
      transform: translateX(10rem);
  }
  100% {
      transform: translateX(-100%);
  }
}
.thevedio{
  width: 100%;
  margin-top: 2.5rem;
}
</style>