<template>
	<view style="background:rgba(255,255,255,1);" >
		<view class="nav-top" >
			<text style="font-size:30rpx;color:#4B80FB;margin-left: 28rpx;">订单已完成</text>
			<view class="adress">
				<text style="font-size: 28rpx;color: #333333;margin-left: 28rpx;">收货地址</text>
				<view style="font-size: 28rpx;margin-left:28rpx;margin-top: 21rpx;">
					<text>{{name}}</text>
					<text style="font-size: 26rpx;color: #666666;margin-left:20rpx">{{phone}}</text>
				</view>
				<view style="margin-left: 21rpx;font-size:26rpx ;color: #666666;">
					<image src="../../static/位置-商城.png" style="width: 48rpx;height: 48rpx;"></image>
					<text style="margin-left:14rpx;">{{adress}}</text>
				</view>
			</view>
		</view>
		<view class="middle">
			<view class="middle-middle-1">
				<view class="middle-middle-1-1">
					<view style="display:flex;align-items:center">
						<image src="../../static/ic-系统消息.png" style="width: 60rpx;height: 60rpx;"></image>
						<text style="font-size:26rpx;color: #666666;">{{dian}}</text>
					</view>
					<view style="display: flex;">
						<view style="font-size:24rpx;color: #999999;margin-right: 15rpx;">{{year}}</view>
						<view style="font-size:24rpx;color: #999999;">{{time}}</view>
					</view>
				</view>
			</view>
			<view class="middle-middle-2">
				<image src="../../static/logo.png" style="width: 121rpx;height: 117rpx;"></image>
				<view class="middle-middle-2-right">
					<view style="font-size:28rpx ;">{{product}}</view>
					<view style="font-size:24rpx ;"> 产品规格：{{productType}}</view>
					<view style="display: flex;justify-content: space-between;">
						<text style="font-size:30rpx;color:#FB2846;">￥{{price}}</text>
						<text style="font-size:24rpx;color: #333333;">×{{num}}</text>
					</view>
				</view>
			</view>
			
				<view class="middle-middle-3">
					<text>商品总价</text>
					<text>￥{{price}}</text>
				</view>
			
			<view class="middle-middle-4">
				<text>服务费</text>
				<text>- ￥{{servie}}</text>
			</view>
			<view class="middle-middle-5">
				<text>备注：</text>
				<text>{{remarks}}</text>
			</view>
			<view class="middle-middle-6">
				<text>实付款</text>
				<text style="color: #FB2846;">￥{{sum}}</text>
			</view>
			<view class="footer">
				<button type="primary" style="width: 160rpx;height: 50rpx;background: #999999;line-height: 50rpx;border-radius: 25rpx;font-size:26rpx;margin-left: 350rpx;">查看评价</button>
			</view>
		</view>
		<view class="footer">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:"王二小",
				phone:16577832207,
				adress:"黄河路与河北路交叉口路东100米",
				dian:"阿飘的店",
				year:"2019.09.20",
				time:"19:26",
				product:"油烟机(清洁油污)",
				productType:"侧吸",
				price:500,
				num:2323,
				servie:10,
				remarks:"师傅早点到！！！",
				sum:"170"
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.footer{
		display: flex;
		justify-content: flex-start;
	}
	.middle-middle-6{
		width: 690rpx;
		height: 50rpx;
		margin: 35rpx 0 0 28rpx;
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		align-content: center;
		
	}
	.middle-middle-5{
		width: 690rpx;
		height: 50rpx;
		display: flex;
		font-size: 28rpx;
		align-content: center;
		margin-left: 28rpx;
		margin-top: 35rpx;
	}
	.middle-middle-4{
		width: 690rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size:26rpx ;
		color: #666666;
		
		margin-left: 28rpx;
		margin-top: 35rpx;
	}
	.middle-middle-3{
		width: 690rpx;
		font-size: 26rpx;
		height: 50rpx;
		display: flex;
		justify-content: space-between;
		margin-left: 28rpx;
		margin-top:27rpx;
		align-content: center;
	}
	.middle-middle-2{
		display: flex;
		margin:19rpx 0 0 29rpx;
	}
	.middle-middle-2-right{
		height: 117rpx;
		width:550rpx;
		
		margin-left:20rpx;
	}
	.middle-middle-1-1{
		width:690rpx;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		margin-left: 39rpx;
	}
		.nav-top{
			width:750rpx;
			height: 288rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			background: #FFFFFF;
			border-bottom: 1rpx solid #dedede;
		}
		.middle{
			width: 750rpx;
			height:550rpx;
		
			margin-top: 19rpx;
		}
</style>
