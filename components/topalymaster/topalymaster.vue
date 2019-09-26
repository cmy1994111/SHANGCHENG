<template>
	<view>
		<view class="nav">
			<image src="../../static/支付成功.png" style="width: 352rpx;height: 424rpx;"></image>
		</view>
		<view style="font-size: 48rpx;color:#F5A623 ;font-family:PingFangSC-Regular,PingFangSC;font-weight: 400;width: 654rpx;text-align: center;margin-left: 55rpx;">您的申请已提交
工作人员将在24小时内与您电话联系！</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			ItemButtonChange(index) {
				this.list = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav {
		width: 352rpx;
		height: 424rpx;
		margin: 87rpx 0 0 200rpx
	}

	.middle {
		width: 564rpx;
		height: 240rpx;
		margin-top: 179rpx;
		margin-left: 96rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	// .but1 {
	// 	width: 560rpx;
	// 	height: 88rpx;
	// 	border-radius: 44rpx;
	// 	border: 2rpx solid rgba(245, 166, 35, 1);
	// 	font-size: 28rpx;
	// 	color: #F5A623;
	// 	text-align: center;
	// 	line-height: 88rpx;
	// }

	.middel view:hover {
		background: #F5A623;
	}

	.but2 {
		width: 560rpx;
		height: 88rpx;
		border-radius: 44rpx;
		border: 2rpx solid rgba(245, 166, 35, 1);
		font-size: 28rpx;
		color: #F5A623;
		text-align: center;
		line-height: 88rpx;
	}
</style>
