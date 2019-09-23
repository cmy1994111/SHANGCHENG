<template>
	<view>
		<view class="nav" @tap="ToMoneyDetail">账户明细</view>
		<view class="middle">
			<view class="middle-all">
				<image src="../../static/master/wan_money_fill.png" style="width: 100rpx;height: 100rpx;"></image>
				<view  style="font-size: 30rpx; color: #666666;">
					我的钱包(元)
				</view>
				<view style="font-size: 80rpx; color: #333333;font-family: PingFang-SC-Regular;">{{money}}<text style="font-size:28rpx;">提现</text></view>
			</view>
		</view>
		<button style="margin:226rpx 29rpx 0 29rpx;width:690rpx;height: 100rpx;margin-top: 159rpx;background: #1A78DF;color: #FFFFFF;text-align: center;line-height: 100rpx;">提现</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:3000.00
			}
		},
		methods: {
			ToMoneyDetail(){
				uni.navigateTo({
					url:"../account/account"
				})
			}
		}
	}
</script>

<style>
	.nav{
		width:720rpx ;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 28rpx;
		color: #333333;
		margin-top: 28rpx;
		font-family: PingFang-SC-Regular;
	}
	.middle-all{
		width: 341rpx;
		height: 300rpx;
		margin:150rpx 0  0 225rpx ;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
</style>
