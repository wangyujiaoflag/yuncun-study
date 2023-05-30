import { Banner, Personalized } from "@/type/common";
import { PlayListDetail } from "@/type/playlist";
import { SearchHotDetail, SearchSuggest } from "@/type/search";
import { AllWordLrc, Song, SongUrl } from "@/type/song";
import { UserProfile } from "@/type/user";
import http from "./http";

// 登录-------------
// 手机登录
// export async function useLogin(phone: string, password: string) {
//   return await http.get<{
//     code: number;
//     cookie: string;
//     token: string;
//   }>("login/cellphone", { phone: phone, password: password });
// }

// 游客登录
export async function peopleLogin() {
  return await http.get<{}>("/register/anonimous");
}

// 二维码登录-获取key
export async function getCodeKey() {
  return await http.get("/login/qr/key");
}

// 二维码登录-获取二维码
export async function useLoginByCode(key: string) {
  return await http.get<{ key: string }>("/login/qr/create", {
    key: key,
    qrimg: true,
  });
}

// 二维码登录-扫码状态验证
export async function checkCodeToLogin(key: string) {
  return await http.get<{ key: string }>("/login/qr/check", { key: key });
}

// 获取登录状态
export async function getLoginStatus() {
  return await http.get<{}>("/login/status");
}

// 获取账户信息
export async function getAccoutInfo() {
  return await http.get<{}>("/user/account");
}

// 获取用户详情
export async function getUserInfo(uid: string) {
  return await http.get<{ uid: string }>("/user/detail", {
    uid: uid,
  });
}

// 退出登录
export async function logout() {
  return await http.get<{}>("/logout");
}

// 首页信息--------------
// 获取 banner( 轮播图 ) 数据
export async function useBanner() {
  const { banners } = await http.get<{ banners: Banner[] }>("/banner", {
    type: 0,
  });
  return banners;
}

// 推荐歌单 limit
export async function getPersonalized() {
  const { result } = await http.get<{ result: Personalized[] }>(
    "/personalized"
  );
  return result;
}

// 歌曲
export async function useSongUrl(id: number) {
  const { data = [] } = await http.get<{ data: SongUrl[] }>("/song/url", {
    id: id,
  });

  return data[0];
}

export async function useDetail(id: number) {
  const { songs } = await http.get<{ songs: Song[] }>("/song/detail", {
    ids: id,
  });
  return songs[0];
}

// playlist
export async function usePlayListDetail(id: number, s: number = 8) {
  const { playlist } = await http.get<{ playlist: PlayListDetail }>(
    "/playlist/detail",
    { id: id, s: s }
  );
  return playlist;
}

export async function usePlayListTrackAll(id: number) {
  const { songs } = await http.get<{ songs: Song[] }>("playlist/track/all", {
    id: id,
  });
  return songs;
}

// 搜索
export async function useSearchHotDetail() {
  const { data } = await http.get<{ data: SearchHotDetail[] }>(
    "search/hot/detail"
  );
  return data;
}

export async function useSearchSuggest(keywords: string) {
  const { result } = await http.get<{ result: SearchSuggest }>(
    "search/suggest",
    { keywords: keywords }
  );
  return result;
}

// 获取歌词
export async function getSongWords(id: number) {
  const { lrc } = await http.get<{ lrc: AllWordLrc }>("lyric", {
    id: id,
  });
  console.log(lrc, "all-song");

  return lrc;
}

// 获取逐字歌词
export async function getSongWord(id: number) {
  const result = await http.get<{ lrc: AllWordLrc; yrc: AllWordLrc }>(
    "lyric/new",
    {
      id: id,
    }
  );
  console.log(result.lrc, result.yrc, "all-song-single");
  return {
    lrc: result.lrc,
    yrc: result.yrc,
  };
}

// 音乐下载
export async function downMusic(id: number) {
  const result = await http.get("/song/download/url", { id: id });
  return result;
}
