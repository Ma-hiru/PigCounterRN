import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "@/stores";
import { News, NewsList } from "@/types/news";


type initialType = {
  NewsList: NewsList
}
const newsSlice = createSlice({
  name: "newsStore",
  initialState: {
    NewsList: [{
      id: 1,
      cover: "https://jg-app.obs.cn-north-4.myhuaweicloud.com/prod/upload/2/jpg/674516AC2AC38177249E69B7A19064CE.jpg",
      title: "这家养殖巨头扭亏为盈，“猪周期”黄金时间来了？",
      content: `在过去的一年多里，各大养猪企业多数经历了一个难熬的“猪周期”。伴随着生猪价格不断下探，企业的财报也是亏损不断。

“风雨送春归，飞雪迎春到”。在龙年的这半年里，随着猪价的回暖，各大猪企业绩也开始回升。就在上周，养猪业千亿巨头牧原股份公布了半年度业绩预告，预告中，公司预计实现归属净利润约7亿—9亿元，比上年同期增长125.19%—132.38%。实现扭亏为盈！

扭亏为盈的，显然不止牧原股份：7月14日下午，继上周牧原股份之后，A股另一家千亿市值养猪巨头温氏股份发布了2024上半年业绩预告。预告显示，上半年温氏股份预计实现归母净利润12.5亿至15亿元，上年同期为亏损46.89亿元，预计实现扣非净利润13亿至15.5亿元，上年同期为亏损51.28亿元。

这个数字有多可怕？今年一季报，温氏股份净利润还亏损12.36亿元，这意味着二季度公司大幅盈利近25至27亿元。而这也意味着，公司摆脱了2021至2023年连续三年中报大额亏损的局面。相当于刚出了加护病房ICU，立马就进了KTV唱歌！

那么二季度到底发生了怎样的“风云突变”，使得养殖业一路凯歌高奏呢？还是与大环境脱不了干系。正所谓“风口到了，猪都能飞起来”！

二季度的温氏，何以“逆天改命”？

根据公告，温氏股份2024上半年业绩预增原因主要系报告期内，销售肉猪（含毛猪和鲜品）1437.42万头，同比增长21.96%，毛猪销售均价15.32元/公斤，同比上升5.09%。同时，叠加饲料原料价格下降的影响，养殖成本同比下降。此外，温氏股份肉猪销量同比增长，销售价格同比上升，公司生猪养殖业务利润同比大幅上升，实现扭亏为盈。`,
      time: String(Date.now())
    }]
  } as initialType,
  reducers: {
    setNewsList: (state, action: PayloadAction<NewsList>) => {
      state.NewsList = action.payload;
    },
    addNews: (state, action: PayloadAction<News>) => {
      state.NewsList.push(action.payload);
    },
    deleteNews: (state, action: PayloadAction<News>) => {
      for (const [index, value] of state.NewsList.entries()) {
        if (value.id === action.payload.id) {
          state.NewsList.splice(index, 1);
          return;
        }
      }
    }
  }
});
export const newsActions = newsSlice.actions;
export const newsReducer = newsSlice.reducer;
export const newsSelector = (root: RootStateType) => root.newsStore;
