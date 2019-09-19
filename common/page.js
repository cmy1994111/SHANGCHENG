export default function(options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: 'Vant'
      };
    },
    ...options
  });
}
