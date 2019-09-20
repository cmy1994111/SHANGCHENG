<template>
	<view>
		<van-tabs active="{{ active }}" bind:change="onChange" active-color="#333" color="#4B80FB">
		  <van-tab title="全部">全部</van-tab>
		  <van-tab title="待付款">待付款</van-tab>
		  <van-tab title="待服务">待服务</van-tab>
		  <van-tab title="已完成">已完成</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active:0,
				
			}
		},
		methods: {
			 onChange(event) {
				  console.log(event.detail)
			    wx.showToast({
					
			      title: `${event.detail.index + 1}`,
			      icon: 'none',
				 
			    });
			  }
		}
	}
</script>

<style lang="scss" scoped>

</style>
