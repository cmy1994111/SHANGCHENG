<template>
	<view style="background:#DEDEDE" >
		<view class="nav-top" >
			<text style="font-size:30rpx;color:#4B80FB;margin-left: 28rpx;">订单已完成</text>
			<view class="adress">
				<text style="font-size: 28rpx;color: #333333;margin-left: 28rpx;">收货地址</text>
				<view style="font-size: 28rpx;margin-left:28rpx;margin-top: 21rpx;">
					<text>{{name}}</text>
					<text style="font-size: 26rpx;color: #666666;margin-left:20rpx">{{phone}}</text>
				</view>
				<view style="margin-left: 21rpx;font-size:26rpx ;color: #666666;">
					<image src="../../static/位置-商城.png" style="width: 32rpx;height: 32rpx;margin-top: 20rpx;"></image>
					<text style="margin-left:14rpx;">{{adress}}</text>
				</view>
			</view>
		</view>
		<view class="middle">
			<view class="middle-middle-1">
				<view class="middle-middle-1-1">
					<view style="display:flex;align-items:center">
						<image src="../../static/ic-系统消息.png" style="width: 60rpx;height: 60rpx;"></image>
						<text style="font-size:26rpx;color: #666666;margin-left: 20rpx;">{{dian}}</text>
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
			<view class="middle-middle-7-footer">
				<button style="width: 170rpx;height: 50rpx;background: #FFFFFF;line-height: 50rpx;border-radius: 25rpx;font-size:26rpx;color: #999999;margin-left: 510rpx;border: 1rpx solid #DEDEDE;margin-top: 41rpx;"  @tap="ToDetail">查看评价</button>
			</view>
		</view>
		<view class="footer">
			<view class="footer-top">
				<view class="footer-top-1"></view>
				<view style="font-size:28rpx; margin-left:11rpx ;color:#333333 ;">订单信息</view>
			</view>
			<view class="footer-middle">
				<view>
					<text>订单编号:&nbsp;&nbsp;{{serial}}</text>
				</view>
				<view>
					<text>下单时间:&nbsp;&nbsp;{{OrderTimeYear}}&nbsp;&nbsp;{{OrderTimeTime}}</text>
				</view>
				<view>
					<text>支付金额:&nbsp;&nbsp;￥{{PayMoney}}</text>
				</view>
				<view>
					<text>支付方式:&nbsp;&nbsp;{{PayStyle}}</text>
				</view>
				<view>
					<text>支付时间:&nbsp;&nbsp;{{PayYears}}&nbsp;&nbsp;{{PayTime}}</text>
				</view>
			</view>
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
				sum:"170",
				serial:"123455678",
				OrderTimeYear:"2019-09-10",
				OrderTimeTime:"10:21:10",
				PayMoney:"180",
				PayStyle:"微信支付",
				PayYears:"2019-08-10",
				PayTime:"10:21:14"
			}
		},
		methods: {
			ToDetail(){
				uni.navigateTo({
					url:"../evaluates/evaluates"
				})
			}
		}
	}
</script>

<style>
	.footer .footer-top{
		display: flex;
		width:690rpx;
		height: 40rpx;
		
		margin: 35rpx 0 0 30rpx;
		align-items: center;
	}
	.footer-middle{
		font-size: 26rpx;
		color: #666666;
		margin: 33rpx 0 0 53rpx;
		height: 258rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.footer .footer-top-1{
		width: 10rpx;
		height: 30rpx;
		background: #007AFF;
	} 
	.middle-middle-7-footer{
		display:flex;
		width: 690rpx;
		margin-left: 28rpx;
		justify-content: space-between;
	}
	.footer{
		display: flex;
		flex-direction: column;
		width: 750rpx;
		height: 402rpx;
		background: #FFFFFF;
		margin-top:19rpx;
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
			height:600rpx;
			background: #fff;
			margin-top: 19rpx;
		}
</style>
