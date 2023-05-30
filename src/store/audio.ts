// audio标签播放器
export const MyAudio = (function () {
  let instance: any = null;
  return function () {
    if (!instance) {
      instance = new Audio();
    }
    return instance;
  };
})()();
