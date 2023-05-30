import { StoreOut } from "@/type/store";

function handlePath({ currentIndex = 0, pathArr = [] }, index = 0) {
  return pathArr[currentIndex + index];
}
export const history: StoreOut = {
  namespaced: true,
  state: () => {
    return {
      nextPath: "",
      prevPath: "",
      currentIndex: 0,
      pathArr: [],
    };
  },
  mutations: {
    addHistory(state, path: string) {
      //  如果没有存放history则执行下面的
      if (!state.pathArr.length) {
        return state.pathArr.push(path);
      }
      // 有history执行这里
      // 当要跳转的path为当前历史pathArr中的下一个的path
      if (path === handlePath(state, 1)) {
        state.prevPath = handlePath(state);
        state.currentIndex++;
        if (state.pathArr.length > state.currentIndex) {
          state.nextPath = handlePath(state, 1);
        } else {
          state.nextPath = null;
        }
        // 当要跳转的path为当前历史pathArr中的上一个的path
      } else if (path === handlePath(state, -1)) {
        state.nextPath = handlePath(state);
        state.currentIndex--;
        if (state.currentIndex > 0) {
          state.prevPath = handlePath(state, -1);
        } else {
          state.prevPath = "";
        }
      } else {
        // 当要跳转的path为不同于任意currentIndex的path的时候
        state.prevPath = handlePath(state);
        state.nextPath = "";
        // example 没太懂
        // let arr = [0,1,2,3,4,5,6];
        // currentIndex = 2, pathlen = 7;

        // 删掉之前那些要被新path代替的旧path
        // state.pathArr.splice(currentIndex + 1, pathArr.length - currentIndex);
        state.pathArr.push(path);
        state.currentIndex = state.pathArr.length - 1;
        // console.log(state, state.pathArr, "333");
      }
      console.log(state.pathArr, "pathArr");
    },
  },
};
