<template>
	<view style="background: #DEDEDE;">
		<view class="nav">
			<view class="nav-top">
				<text style="font-size: 26rpx;color: #666666;margin-top: 39rpx;margin-left: 30rpx;">提现金额<text style="font-size: 26rpx;color: #4B80FB;">(总金额:￥{{sum}})</text></text>
			</view>
			<view class="nav-middle">
				<image src="../../static/master/money.png" style="width: 60rpx;height: 60rpx;"></image>
				<input type="text" />
			</view>
			<view class="nav-footer">
				<text style="font-size: 24rpx;color: #999999;margin-top: 39rpx;margin-left: 30rpx;">满100元提现，提现将扣除0.1%服务费</text>
			</view>
		</view>
		<view class="middle">
			<view style="height: 100rpx;border-bottom: 1rpx solid #DEDEDE;line-height: 100rpx; ">
				<text style="font-size: 28rpx;color: #333333;margin-left:31rpx">选择提现方式</text>
			</view>
			 <view class="middle-1">
				<view style="display: flex;align-items: center;margin-left: 32rpx;" >
				<image style="width: 48rpx;height: 48rpx;" src="../../static/master/支付宝.png"></image>
				<text style="font-size: 26rpx;color: #666666;">支付宝</text>
				</view>
				<radio name="1" ></radio>
			</view>
			<view class="middle-1">
				<view style="display: flex;align-items: center;margin-left: 32rpx;" >
				<image style="width: 52rpx;height: 48rpx;" src="../../static/master/微信方.png"></image>
				<text style="font-size: 26rpx;color: #666666;">微信</text>
				</view>
				<radio name="2" ></radio>
			</view>
			<view class="middle-1">
				<view style="display: flex;align-items: center;margin-left: 32rpx;" >
				<image style="width: 48rpx;height: 48rpx;" src="../../static/master/银行卡.png"></image>
				<text style="font-size: 26rpx;color: #666666;">支付宝</text>
				</view>
				<radio name="3"></radio>
			</view> 
			<!-- <van-radio-group value="{{ radio }}" v-on:change="onChange">
				<van-cell title="单选框 1" value-class="value-class" clickable data-name="1" bind:click="onClick">
					<van-radio name="1" />
				</van-cell>
				<van-cell title="单选框 2" value-class="value-class" clickable data-name="2" bind:click="onClick">
					<van-radio name="2" />
				</van-cell>
				<van-cell title="单选框 2" value-class="value-class" clickable data-name="2" bind:click="onClick">
					<van-radio name="2" />
				</van-cell>
			</van-radio-group> -->
		</view>
		<button type="primary" style="margin:159rpx 29rpx 0 29rpx;width:690rpx;height: 100rpx;margin-top: 159rpx;background: #1A78DF;color: #FFFFFF;text-align: center;line-height: 100rpx;">提现</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sum: 8000,
				radio:" 1"
			}
		},
		methods: {
			onChange(event) {
				this.setData({
					radio: event.detail
				});
			},
			onClick(event) {
				const {
					name
				} = event.currentTarget.dataset;
				this.setData({
					radio: name
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.value-class {
		// flex: none !important;
		width: 750rpx;
		height: 100rpx;
		justify-content: space-between;
		background: #000000;
	}

	.middle {
		width: 750rpx;
		height: 400rpx;
		background: #FFFFFF;
		margin-top: 20rpx;
	}

	.middle .middle-1 {
		width: 750rpx;
		height: 100rpx;
		border-bottom: 1rpx solid #DEDEDE;
		display: flex;
		justify-content: space-between;
		align-items: center;

	}

	.nav {
		width: 750rpx;
		height: 260rpx;
		background: #FFFFFF;

	}

	.nav-middle {
		width: 690rpx;
		height: 70rpx;
		margin-top: 36rpx;
		display: flex;
		// flex-direction: column;
		border-bottom: 1rpx solid #DEDEDE;
		align-items: center;
		margin-left: 30rpx;
	}

	.nav-middle input {
		width: 548rpx;
		height: 70rpx;

	}
</style>
