import { ref, watch } from "vue";
import {
  Planet,
  Music,
  VideoOne,
  Fm,
  Like,
  Computer,
  DownloadThree,
  PlayTwo,
} from "@icon-park/vue-next";
import { useRoute, useRouter } from "vue-router";

interface IMenu {
  name: string;
  key: string;
  icon: any;
  // 联合类型
  theme: "outline" | "filled" | "two-tone" | "multi-color"; // icon主题
}

interface IMenus {
  name: string;
  menus: IMenu[];
}

export function useMenu() {
  // data
  const menus: IMenus[] = [
    {
      name: "在线音乐",
      menus: [
        {
          name: "推荐",
          key: "discover",
          icon: Planet,
          theme: "outline",
        },
        {
          name: "音乐馆",
          key: "music",
          icon: Music,
          theme: "outline",
        },
        {
          name: "视频",
          key: "video",
          icon: VideoOne,
          theme: "outline",
        },
        {
          name: "电台",
          key: "dj",
          icon: Fm,
          theme: "outline",
        },
      ],
    },
    {
      name: "我的音乐",
      menus: [
        {
          name: "我喜欢",
          key: "love",
          icon: Like,
          theme: "outline",
        },
        {
          name: "本地歌曲",
          key: "local",
          icon: Computer,
          theme: "outline",
        },
        {
          name: "下载歌曲",
          key: "download",
          icon: DownloadThree,
          theme: "outline",
        },
        {
          name: "最近播放",
          key: "recently",
          icon: PlayTwo,
          theme: "outline",
        },
      ],
    },
  ];

  // 当前的路由对象
  const route = useRoute();
  const currentKey = ref(route.meta.menu);

  // currentKey
  watch(
    () => route.meta.menu,
    (menu) => {
      currentKey.value = menu;
    }
  );

  // 全局路由对象
  const router = useRouter();

  // 点击的时候路由需要跳转
  // todo：为什么是async?
  const click = async (menu: IMenu) => {
    await router.push({ name: menu.key, replace: true });
  };

  return {
    menus,
    click,
    currentKey,
  };
}
