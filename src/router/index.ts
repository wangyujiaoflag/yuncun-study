import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { Pages } from "./pages";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: Pages.home,
    component: () => import("../views/HomeView.vue"),
    redirect: { name: Pages.Login },
    children: [
      {
        path: Pages.Login,
        name: Pages.Login,
        component: () => import("@/views/login/Login.vue"),
        meta: {
          menu: "login",
          keepAlive: true,
        },
      },
      {
        path: "discover",
        name: "discover",
        component: () => import("../views/discover/Discover.vue"),
        meta: {
          menu: "discover",
          keepAlive: true,
        },
      },
      {
        path: "music",
        name: "music",
        component: () => import("../views/music/Music.vue"),
        redirect: { name: "picked" },
        meta: {
          menu: "music",
        },
        children: [
          {
            path: "picked",
            name: "picked",
            component: () => import("../views/music/picked/Picked.vue"),
            meta: {
              menu: "music",
              keepAlive: true,
            },
          },
          {
            path: "toplist",
            name: "toplist",
            component: () => import("../views/music/toplist/TopList.vue"),
            meta: {
              menu: "music",
              keepAlive: true,
            },
          },
          {
            path: "artist",
            name: "artist",
            component: () => import("../views/music/artist/Artist.vue"),
            meta: {
              menu: "music",
              title: "歌手",
              keepAlive: true,
            },
          },
          {
            path: Pages.category,
            name: Pages.category,
            component: () => import("../views/music/category/Category.vue"),
            meta: {
              menu: "music",
              title: "分类歌单",
              keepAlive: true,
            },
          },
        ],
      },
      {
        path: "playlist",
        name: "playlist",
        component: () => import("../views/playlist/PlayList.vue"),
      },
      {
        path: "artistDetail",
        name: "artistDetail",
        component: () => import("../views/artist/ArtistDetail.vue"),
      },
      {
        path: "album",
        name: "album",
        component: () => import("../views/album/Album.vue"),
      },
      {
        path: "video",
        name: "video",
        component: () => import("../views/video/Video.vue"),
        meta: {
          menu: "video",
          title: "视频",
          keepAlive: true,
        },
      },
      {
        path: "dj",
        name: "dj",
        component: () => import("../views/dj/DJ.vue"),
        meta: {
          menu: "dj",
          title: "电台",
          keepAlive: true,
        },
      },
      {
        path: Pages.mvDetail,
        name: Pages.mvDetail,
        component: () => import("../views/mv/mvDetail.vue"),
      },

      {
        path: Pages.love,
        name: Pages.love,
        component: () => import("../views/love/Love.vue"),
        meta: {
          menu: "love",
          title: "我喜欢",
          keepAlive: true,
        },
      },
      {
        path: Pages.local,
        name: Pages.local,
        component: () => import("../views/local/Local.vue"),
        meta: {
          menu: "local",
          title: "本地歌曲",
          keepAlive: true,
        },
      },
      {
        path: Pages.download,
        name: Pages.download,
        component: () => import("../views/download/DownLoad.vue"),
        meta: {
          menu: "download",
          title: "下载歌曲",
          keepAlive: true,
        },
      },
      {
        path: Pages.recently,
        name: Pages.recently,
        component: () => import("../views/recently/Recently.vue"),
        meta: {
          menu: "recently",
          title: "最近播放",
          keepAlive: true,
        },
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
