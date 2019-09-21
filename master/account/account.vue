<template>
	<view style="background: #F5F5F5;">
		<view class="nav">
			<view >本月<image src="../../static/master/1569060684(1).png" style="width: 30rpx;height: 18rpx;"></image></view>
		</view>
		<view class="middle">
			<view style="width: 687rpx;">
				<text style="font-size:26rpx;color: #666666;">订单编号:{{ordersnumber}}</text>
				<text style="font-size:26rpx;color: #999;">{{paystyle}}</text>
			</view>
			<view>
				<text style="font-size: 26rpx;color: #999999;">订单时间:{{ordertimeyear}}&nbsp;{{ordertime}}</text>
				<text style="font-size: ;">￥{{money}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ordersnumber:123456789,
				paystyle:"微信支付",
				ordertimeyear:"2019.09.21",
				ordertime:"10:25:30",
				money:"20000"
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.nav{
		width:690rpx;
		height: 72rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size:28rpx ;
		color:#333333 ;
	}
	.middle{
		width: 750rpx;
		height: 140rpx;
		border-bottom: 1rpx solid #DEDEDE;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
	}
</style>
