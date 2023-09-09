const store = {
  state: {
    // hotSearList组件，向下滑动的高度
    hotSearchOffsetY: 0,
    flapcardVisible: false,
    isEditMode: false, // 点击右上角编辑进入编辑模式(进行选择图书操作)
    shelfList: [], // 书架列表
    shelfSelected: [], // 书架中被选择图书列表
    shelfTitleVisible: true, // 书架标题显示状态
    shelfCategory: [], // category页面数组，书架的分组/分类数据
    currentType: 1 // shelf页面为1，categoty为2
  },
  mutations: {
    SET_HOT_SEARCH_OFFSETY (state, hotSearchOffsetY) {
      state.hotSearchOffsetY = hotSearchOffsetY
    },
    SET_FLAPCARD_VIVIBLE (state, flapcardVisible) {
      state.flapcardVisible = flapcardVisible
    },
    SET_IS_EDIT_MODE (state, isEditMode) {
      state.isEditMode = isEditMode
    },
    SET_SHELF_LIST (state, list) {
      state.shelfList = list
    },
    SET_SHELF_SELECTED (state, selected) {
      state.shelfSelected = selected
    },
    SET_SHELF_TITLE_VISIBLE (state, visible) {
      state.shelfTitleVisible = visible
    },
    SET_SHELF_CATEGORY (state, category) {
      state.shelfCategory = category
    },
    SET_CURRENT_TYPE (state, type) {
      state.currentType = type
    }
  }
}
export default store
