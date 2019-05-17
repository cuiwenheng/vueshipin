<template lang="html">
  <div>
    <div class="header">
      <div class="header-title">
        <span>学习列表</span>
      </div>
    </div>
    <div class="dudao">
      <div class="fontbt">督导</div>
    </div>
    <div class="loadMoudle" @touchstart="touchStart($event)" @touchmove="touchMove($event)" :style="{transform: 'translate3d(0,' + top + 'px, 0)'}">
      <!-- <slot></slot> -->
      <div class="load-list" v-for="(video, index) in $store.state.vedios.videoarr">
        <div style="margin-bottom: 0.1rem;"></div>
        <div class="load-list-cell" v-on:click="playVideo($event,video)">
          <div class="load-media-list">
            <div class="load-media-list-img">
              <div></div>
              <img v-if='!video.from' v-bind:src="'/resources/images/wechat/yxkp/'+video.image">
            </div>
            <div class="load-media-body">
              <div class="load-media-body-text-top">{{video.title}}</div>
              <div class="load-media-body-text-bottom">MTM平台</div>
            </div>
          </div>
        </div>
        <!-- <div class="load-list-cell">
          <div class="load-media-list">
            <div class="load-media-list-img">
              <div></div>
              <img src="https://pic.36krcnd.com/201905/14020542/ltio8xiil21otkd7!heading">
            </div>
            <div class="load-media-body">
              <div class="load-media-body-text-top">测试实地的积分ID就佛诞节佛哎都佛度法</div>
              <div class="load-media-body-text-bottom">MTM平台</div>
            </div>
          </div>
        </div> -->
      </div>
      <footer class="load-more">
        <slot name="load-more">
          <div class="moreData-tip" v-if="$store.state.vedios.pullUpState==1">
            <span class="moreData-tip-text">{{pullUpStateText.moreDataTxt}}</span>
          </div>
          <div class="loadingMoreData-tip" v-if="$store.state.vedios.pullUpState==2">
            <span class="icon-loading"></span>
            <span class="loadingMoreData-tip-text">{{pullUpStateText.loadingMoreDataTxt}}</span>
          </div>
          <div class="noMoreData-tip" v-if="$store.state.vedios.pullUpState==3">
            <span class="connectingLine"></span>
            <span class="noMoreData-tip-text">{{pullUpStateText.noMoreDataTxt}}</span>
            <span class="connectingLine"></span>
          </div>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    props: {
      parentPullUpState: {
        default: 0
      }
    },
    data () {
      return {
        top: 0,
        startY: 0,
        //pullUpState: 0, // 1:上拉加载更多, 2:加载中……, 3:我是有底线的
        isLoading: false, // 是否正在加载
        //g_video_grop:0,
        // videoarr:this.$store.state.vedios.videoarr,
        pullUpStateText: {
          moreDataTxt: '上拉加载更多',
          loadingMoreDataTxt: '加载中...',
          noMoreDataTxt: '我是有底线的'
        }
      }
    },
    mounted() {
      this.infiniteLoad()
    },
    methods: {
      touchStart (e) {
        this.startY = e.targetTouches[0].pageY
      },
      touchMove (e) {
        if (e.targetTouches[0].pageY < this.startY) { // 上拉
          this.judgeScrollBarToTheEnd()
        }
      },
      playVideo(e,vedio){
        // alert(vedio.id);
        this.$router.push({
          path: '/vedio',
          name:'Vedio',
          query:vedio
        })
      },
      // 判断滚动条是否到底
      judgeScrollBarToTheEnd () {
        let innerHeight = document.querySelector('.loadMoudle').clientHeight
        // 变量scrollTop是滚动条滚动时，距离顶部的距离
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        // 变量scrollHeight是滚动条的总高度
        let scrollHeight = document.documentElement.clientHeight || document.body.scrollHeight
        // 滚动条到底部的条件
        if (scrollTop + scrollHeight >= innerHeight) {
          if (this.$store.state.vedios.pullUpState !== 3 && !this.isLoading) {
            // this.pullUpState = 1
            this.$store.commit('SET_PULLUPSTATE',1)
            this.infiniteLoad()
            // setTimeout(() => {
            //   this.infiniteLoad()
            // }, 200)
          }
        }
      },

      // infiniteLoad () {
      //   this.pullUpState = 2
      //   this.isLoading = true
      //   setTimeout(() => {
      //     this.infiniteLoadDone()
      //   }, 8000)
      // },
      infiniteLoad () {
        // this.pullUpState = 2
        this.$store.commit('SET_PULLUPSTATE',2)
        this.isLoading = true
        const url = '/wechat/member/yxkpVideos'
        const data = {
          num:this.$store.state.vedios.g_video_grop
        }
        // // 设置axios请求的token
        // axios.defaults.headers.common['token'] = 'f4c902c9ae5a2a9d8f84868ad064e706'
        //设置请求头
        var that=this;
        axios.defaults.headers.get["Content-type"] = "application/json"
        axios.get(url, {
          params:data
        }).then((res) => {
          console.log(res);
          if(res.data.error.code==0){
            // that.g_video_grop++;
            var value=this.$store.state.vedios.g_video_grop+1;
            that.$store.dispatch('AxiosGVedioGrop',value)
            var data=res.data.data;
            if(data.length==0){
              // that.pullUpState = 3;
              this.$store.commit('SET_PULLUPSTATE',3)
              that.isLoading=false;
            }else{
              // that.videoarr=that.videoarr.concat(data);
              that.$store.dispatch('AxiosGetVedios',data)
              // that.videoarr=that.$store.state.videos.videoarr;
              that.infiniteLoadDone()
            }
          }
        }).catch(function(e){
          console.log(e);
          that.infiniteLoadDone()
        });
      },
      infiniteLoadDone () {
        // this.pullUpState = 0
        this.$store.commit('SET_PULLUPSTATE',0)
        this.isLoading = false
      }
    },
    watch: {
      parentPullUpState (curVal, oldVal) {
        // this.pullUpState = curVal
        this.$store.commit('SET_PULLUPSTATE',curVal)
      }
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
  .dudao{
    width: 100%;
    margin-top: 2.5rem;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 0.5rem;
  }
  .dudao .fontbt{
    background-color: #56ada1;
    border: 1 solid blue;
    border-radius: 0.5rem;
    color:#FFFFFF;
    box-shadow: 0.1rem 0.2rem 0.2rem 0.2rem;
    font-size: 1rem;
    width: 3rem;
    height: 2rem;
    line-height: 2rem;
    margin-right: 1.5rem;
  }
  .loadMoudle{
    display: block;
    font-size: 0.75rem;
    line-height: 1.8;
    background-color: #FFFFFF;
  }
  .load-list{
    background-color: #C0C0C0;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .load-list-cell{
    background-color: #FFFFFF;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.1rem;
  }
  .load-media-list{
    padding: 0.6rem 0.8rem;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    flex-direction: row;
  }
  .load-media-list-img{
      width: 5rem;
      height: 4rem;
      margin-right: 0.6rem;
      display: inline-block;
      overflow: hidden;
      position: relative;
  }
  .load-media-list-img div{
      width: 100%;
      height: 100%;
      background-position: 0% 0%;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      /*background-image: url("https://pic.36krcnd.com/201905/14020542/ltio8xiil21otkd7!heading");*/
      background-image: url(../assets/images/video/default.jpg);
  }
  .load-media-list-img img{
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      /*opacity: 0;*/
      width: 100%;
      height: 100%;
  }
  .load-media-body{
      height: auto;
      justify-content: space-around;
      height: 4rem;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      overflow: hidden;
  }
  .load-media-body-text-top{
      height: 2rem;
      font-size: 0.75rem;
      overflow: hidden;
      width: 100%;
      line-height: 1rem;
      text-align: left;
  }
  .load-media-body-text-bottom{
    margin-left: 1rem;
    width: 100%;
    line-height: 1rem;
    font-size: 0.75rem;
    color: #8f8f94;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .load-more {
    width: 100%;
    color: #c0c0c0;
    background: #f7f7f7;
  }   
  .moreData-tip,
  .loadingMoreData-tip,
  .noMoreData-tip {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
  }
  .loadMoudle .icon-loading {
    display: inline-flex;
    width: 2rem;
    height: 2rem;
    background: url(../assets/images/refreshAndReload/loading.gif) no-repeat;
    background-size: cover;
    margin-right: 5px;
    /*animation: rotating 2s linear infinite;*/
  }
  @keyframes rotating {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(1turn);
    }
  }
  .connectingLine {
    display: inline-flex;
    width: 5rem;
    height: 2px;
    background: #ddd;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .noMoreData-tip-text{
    font-size: 0.6rem;
    color:grey;
  }
</style>