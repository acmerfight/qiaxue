import { Message } from 'tdesign-miniprogram';

interface IPageData {
  inputValue: string;
  loading: boolean;
}

Page<IPageData>({
  data: {
    inputValue: '',
    loading: false
  },

  onLoad(): void {
    console.log('TDesign演示页面加载完成');
  },

  // 按钮点击事件
  onButtonTap(): void {
    Message.success({
      content: '按钮点击成功！',
      duration: 2000
    });
  },

  // 主要按钮点击
  onPrimaryButtonTap(): void {
    this.setData({ loading: true });
    
    setTimeout(() => {
      this.setData({ loading: false });
      Message.info({
        content: '操作完成',
        duration: 1500
      });
    }, 2000);
  },

  // 输入框输入事件
  onInputChange(event: WechatMiniprogram.CustomEvent): void {
    this.setData({
      inputValue: event.detail.value
    });
  },

  // 显示对话框
  onShowDialog(): void {
    wx.showModal({
      title: '提示',
      content: `当前输入: ${this.data.inputValue || '无内容'}`,
      showCancel: true,
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          Message.success('确认操作');
        } else {
          Message.warning('取消操作');
        }
      }
    });
  },

  // Cell点击事件
  onCellTap(event: WechatMiniprogram.CustomEvent): void {
    const { title } = event.currentTarget.dataset;
    Message.info(`点击了: ${title}`);
  }
});