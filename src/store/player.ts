import { useDetail, useSongUrl } from "@/api";
import { Song, SongUrl } from "@/type/song";
import { StoreOut } from "@/type/store";
import { setStorage } from "@/utils/local";
import { MyAudio } from "./audio";

const KEYS = {
  volume: "PLAYER-VOLUME",
};

export const player: StoreOut = {
  namespaced: true,
  state: {
    loopType: 0, //循环模式 0 单曲循环 1 列表循环 2随机播放
    volume: localStorage.getItem(KEYS.volume) || 60, //音量
    playList: [] as Song[], //播放列表,
    showPlayList: false,
    id: 0,
    url: "",
    songUrl: {} as SongUrl,
    song: {} as Song,
    isPlaying: false, //是否播放中
    isPause: false, //是否暂停
    sliderInput: false, //是否正在拖动进度条
    ended: false, //是否播放结束
    muted: false, //是否静音
    currentTime: 0, //当前播放时间
    duration: 0, //总播放时长
    t: [], // 当前歌词信息
  },
  getters: {
    // 歌单歌曲总数
    playListCount: (state) => {
      return state.playList.length;
    },
    // 当前歌曲索引
    thisIndex: (state) => {
      return state.playList.findIndex((song: Song) => song.id === state.id);
    },
    // 下一首
    nextSong(state, getters) {
      const { thisIndex, playListCount } = getters;
      if (thisIndex === playListCount - 1) {
        return state.playList[0];
      } else {
        const nextIndex: number = thisIndex + 1;
        return state.playList[nextIndex];
      }
    },
    // 上一首
    prevSong(state, getters): Song {
      const { thisIndex } = getters;
      if (thisIndex === 0) {
        return state.playList[state.playList.length - 1];
      } else {
        const prevIndex: number = thisIndex - 1;
        return state.playList[prevIndex];
      }
    },
  },
  mutations: {
    saveWord(state, wordList) {
      state.t = wordList;
    },
    init(state) {
      state.volume && (MyAudio.volume = state.volume / 100);
    },
    // 播放列表里面添加音乐
    pushPlayList(state, { replace = false, list = [] }) {
      console.log(list, "mutations-pushPlayList-list");

      if (replace) {
        state.playList = list;
        return;
      }
      list.forEach((song: Song) => {
        if (state.playList.filter((s: Song) => s.id == song.id).length <= 0) {
          state.playList.push(song);
        }
      });
    },
    // 清空列表
    clearPlayList(state) {
      state.songUrl = {} as SongUrl;
      state.url = "";
      state.id = 0;
      state.song = {} as Song;
      state.isPlaying = false;
      state.isPause = false;
      state.sliderInput = false;
      state.ended = false;
      state.muted = false;
      state.currentTime = 0;
      state.playList = [] as Song[];
      state.showPlayList = false;
      MyAudio.load();
      setTimeout(() => {
        state.duration = 0;
      }, 500);
    },
    // 播放/暂停
    controlPlay(state, status = false) {
      state.isPlaying = status;
      state.isPause = !status;
    },
    // 播放设置
    playSet(state, info) {
      const { audioSrc, songUrl, url, id, currentTime, song } = info;
      console.log(
        audioSrc,
        songUrl,
        url,
        id,
        currentTime,
        state,
        "playSet-info-播放设置"
      );

      if (audioSrc) {
        MyAudio.src = audioSrc;
      }
      songUrl && (state.songUrl = songUrl);
      url && (state.url = url);
      id && (state.id = id);
      currentTime && (state.currentTime = currentTime);
      song && (state.song = song);
    },
    //播放、暂停
    togglePlay(state) {
      console.log(
        state.isPause,
        state.isPlaying,
        state.song.id,
        state,
        "mutaitions-togglePlay"
      );
      if (!state.song.id) return;
      state.isPlaying = !state.isPlaying;
      if (!state.isPlaying) {
        MyAudio.pause();
        state.isPause = true;
      } else {
        MyAudio.play();
        state.isPause = false;
      }
    },
    setPlay(state) {
      if (!state.song.id) return;
      state.isPlaying = true;
      MyAudio.play();
      state.isPause = false;
    },
    setPause(state) {
      if (!state.song.id) return;
      state.isPlaying = false;
      MyAudio.pause();
      state.isPause = true;
    },
    //切换循环类型
    toggleLoop(state) {
      if (state.loopType == 2) {
        state.loopType = 0;
      } else {
        state.loopType++;
      }
    },
    //静音切换
    toggleMuted(state) {
      state.muted = !state.muted;
      MyAudio.muted = state.muted;
    },
    //音量设置
    setVolume(state, n: number) {
      n = n > 100 ? 100 : n;
      n = n < 0 ? 0 : n;
      state.volume = n;
      MyAudio.volume = n / 100;
      setStorage("PLAYER-VOLUME", n.toString());
    },
    //修改播放时间
    onSliderChange(state, val: number) {
      state.currentTime = val;
      state.sliderInput = false;
      MyAudio.currentTime = val;
    },
    //播放时间拖动中
    onSliderInput(state) {
      state.sliderInput = true;
    },
    //定时器
    interval(state) {
      if (state.isPlaying && !state.sliderInput) {
        state.currentTime = parseInt(MyAudio.currentTime.toString());
        state.duration = parseInt(MyAudio.duration.toString());
        state.ended = MyAudio.ended;
      }
    },
  },
  actions: {
    // 播放当前歌曲
    async play({ state, commit, dispatch }, id: number) {
      console.log(id, state.id, "actions-play-id");
      if (id == state.id) return;
      commit("controlPlay", false);
      // 获取资源
      const data = await useSongUrl(id);
      if (!data) return;
      // audio
      commit("playSet", { audioSrc: data.url });
      MyAudio.play()
        .then(() => {
          // 开始播放
          commit("controlPlay", true);
          // 歌曲url等
          commit("playSet", { songUrl: data, url: data.url, id });
          // 歌曲详情
          dispatch("songDetail");
        })
        .catch((error: any) => {
          console.log(error);
        });
    },
    async songDetail({ state, commit }) {
      const song = await useDetail(state.id);
      commit("playSet", { song });
      console.log("actions-songDetail", song);
      commit("pushPlayList", { replace: false, list: [song] });
    },
    //播放结束
    playEnd({ state, dispatch }) {
      switch (state.loopType) {
        case 0:
          dispatch("rePlay");
          break;
        case 1:
          dispatch("next");
          break;
        case 2:
          dispatch("randomPlay");
          break;
      }
    },
    //重新播放
    rePlay({ commit }) {
      setTimeout(() => {
        commit("playSet", { currentTime: 0 });
        MyAudio.play();
      }, 1500);
    },
    //下一曲
    next({ state, getters, dispatch }) {
      if (state.loopType === 2) {
        dispatch("randomPlay");
      } else {
        dispatch("play", getters.nextSong.id);
      }
    },
    //上一曲
    prev({ dispatch, getters }) {
      dispatch("play", getters.prevSong.id);
    },
    //随机播放
    randomPlay({ dispatch, state }) {
      dispatch(
        "play",
        state.playList[Math.floor(Math.random() * state.playList.length)].id
      );
    },
  },
};
