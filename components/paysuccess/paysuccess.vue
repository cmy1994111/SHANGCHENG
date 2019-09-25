<template>
	<view>
		<view class="nav">
			<image src="../../static/支付成功.png" style="width: 352rpx;height: 424rpx;"></image>
		</view>
		<view style="font-size: 48rpx;color:#F5A623 ;font-family:PingFangSC-Regular,PingFangSC;font-weight: 400;margin-left:280rpx ;">支付成功</view>
		<view class="middle">
			<view class="but1" @tap="ToOrder">查看订单</view>
			<view class="but2" @tap="ToOrder">返回首页</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				buts:[
					{name:"查看订单",check:true},
					{name:"返回首页",check:true}
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		width: 352rpx;
		height: 424rpx;
		margin: 87rpx 0 0 200rpx
	}
	.middle{
		width:564rpx ;
		height: 240rpx;
		margin-top: 179rpx;
		margin-left: 96rpx;
		display: flex;
		justify-content: space-between;
	}
	.but1 {
		width:560rpx;
		height:88rpx;
		border-radius:44rpx;
		border:2rpx solid rgba(245,166,35,1);
		font-size: 28rpx;
		color: #F5A623;
		text-align: center;
		line-height: 88rpx;
	}
	.but2{
		width:560rpx;
		height:88rpx;
		border-radius:44rpx;
		border:2rpx solid rgba(245,166,35,1);
		font-size: 28rpx;
		color: #F5A623;
		text-align: center;
		line-height: 88rpx;
	}
</style>
