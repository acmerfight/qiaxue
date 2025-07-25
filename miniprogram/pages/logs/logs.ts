// logs.ts
import { formatTime } from '../../utils/util'

Page({
  data: {
    logs: [],
  },
  
  onLoad(): void {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log: string) => {
        return {
          date: formatTime(new Date(log)),
          timeStamp: log
        }
      }),
    })
  },
  
  onGoBack(): void {
    wx.navigateBack()
  },
})
