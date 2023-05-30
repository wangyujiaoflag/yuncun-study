import { SearchSuggest } from "./search";
import { Song, SongUrl } from "./song";

// store module
export interface StoreOut {
  namespaced?: boolean;
  state: any;
  mutations?: {
    [funName: string]: (state: any, config: any) => void;
  };
  actions?: {
    [funName: string]: (...ctx: any) => any | void;
  };
  getters?: {
    [funName: string]: (...ctx: any) => any | void;
  };
}
// user
export interface UserState {
  token: string; // 接口中的cookie
  isLogin: boolean; // 是否是登录状态
  loginCode: string; // 二维码
  isNeedReLoad: boolean; // 是否需要重新获取二维码
  userId: string; // 用户id
  headerImg: string; // 用户头像
  userName: string; // 用户名
}

// player,
export interface PlayerState {
  audio: any;
  loopType: number; //循环模式 0 单曲循环 1 列表循环 2随机播放
  volume: number; //音量
  playList: Song[]; //播放列表,
  showPlayList: boolean;
  id: 0;
  url: string;
  songUrl: SongUrl;
  song: Song;
  isPlaying: boolean; //是否播放中
  isPause: boolean; //是否暂停
  sliderInput: boolean; //是否正在拖动进度条
  ended: boolean; //是否播放结束
  muted: boolean; //是否静音
  currentTime: number; //当前播放时间
  duration: number; //总播放时长
  t: any[]; // 歌词信息
}

// search
export interface SearchState {
  showSearchView: boolean;
  searchKeyword: string;
  suggestData: SearchSuggest;
  historyRecord: any[];
}
// history
export interface HistoryState {
  nextPath: string;
  prevPath: string;
  currentIndex: number;
  pathArr: string[];
}

// root
export interface RootState {}

export interface AllModelType {
  user: UserState;
  player: PlayerState;
  search: SearchState;
  history: HistoryState;
}

export type RootWithModel = RootState & AllModelType;
