const vedios = {
  state: {
    videoarr:[],
    g_video_grop:0,
    pullUpState:0
  },
  mutations: {
    ADD_VEDIOS: (state,data) => {
      state.videoarr=state.videoarr.concat(data);
    },
    SET_G_VIDEO_GROP: (state,value) => {
    	state.g_video_grop=value;
    },
    SET_PULLUPSTATE:(state,value) => {
    	state.pullUpState=value;
    }
  },
  actions: {
    AxiosGetVedios: ({ commit },data) => {
      commit('ADD_VEDIOS',data)
    },
    AxiosGVedioGrop:({commit},value) =>{
      commit('SET_G_VIDEO_GROP',value)
    }
  }
}

export default vedios