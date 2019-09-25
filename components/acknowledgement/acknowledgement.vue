<template>
	<view>
		<view class="nav-adress">
			<view class="nav-daress-top">
				<text style="margin-left: 34rpx; font-family: PingFangSC-Regular,PingFangSC;font-weight: 400;">选择收货地址</text>
				<image src="../../static/master/1569405536(1).png" style="width: 17rpx;height: 31rpx;"></image>
			</view>
			<view class="nav-adress-middle">
				<view class="nav-middle-left">
					<image src="../../static/位置-商城.png" style="width:25rpx ;height: 32rpx;margin-left: 17rpx;"></image>
				</view>
				<view class="nav-middle-right">
					<view class="nav-middle-right-top">
						<text style="font-size:28rpx ;color: #333333;">姓名:&nbsp;&nbsp;&nbsp;{{name}}</text>
						<text style="font-size:28rpx ;color: #333333;">{{phonenumber}}</text>
					</view>
					<view class="nav-middle-right-bottom">
						<text style="font-size: 24rpx;color: #333333;margin-left: 17rpx;">地址:&nbsp;&nbsp;&nbsp;{{adress}}</text>
					</view>
				</view>
			</view>
			<image src="../../static/master/1569404996(1).png" style="width: 750rpx;height: 11rpx;"></image>
		</view>
		<view class="middle">
			<view class="middle-top">
				<text style="font-size: 28rpx;color: #333333;margin-left: 32rpx;">收货时间</text>
				<slot></slot>
			</view>
			<view class="middle-middle">
				<text style="font-size: 28rpx;color: #333333;margin-left: 32rpx;">支付方式</text>
				<text style="font-size: 28rpx;color: #FEC403;margin-right: 32rpx;" >{{type}}</text>
			</view>
		</view>
		<view class="product">
			<view class="product-left" style="display: flex;justify-content: center;align-items: center;">
				<image src="../../static/youyanji.png" style="width: 190rpx;height: 190rpx;margin-left: 29rpx;"></image>
			</view>
			<view class="product-right">
				<view class="product-right-top">
					<text style="font-size: 30rpx;color: #333333;">丰本青空调清洗剂家用挂机清洁洗 内机</text>
				</view>
				<view class="product-right-middle">
					<text style="font-size:26rpx;color: #999999;">规格:{{sum}}ml</text>
				</view>
				<view class="product-right-bottom">
					<view>
						<text style="font-size:26rpx;color:#FF0505;">￥</text>
						<text style="font-size:36rpx;color:#FF0505;">{{money}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="youhui">
			<text style="font-size:30rpx ;color: #333333;margin-left: 30rpx;">已选优惠卷</text>
			<slot></slot>
		</view>
		<view class="beizhu">
			<view style="width: 690rpx;height: 105rpx;margin-left: 30rpx;font-size: 30rpx;display: flex;align-items: center;">
				<text>备注</text></view>
			<editor style="width: 690rpx;height: 260rpx;border: 1rpx solid #EEEEEE;margin-left: 32rpx;"></editor>
		</view>
		<view class="jiesuan">
			<view style="margin-left: 30rpx;">
				<text style="font-size:24rpx ;color:#FF0A0A;font-family:PingFangSC-Medium,PingFangSC;font-weight: 500;">￥<text style="font-size:40rpx ;">{{money1}}</text></text>
			</view>
			<view style="width: 210rpx;height:68rpx;font-size:30rpx;color:#FFFFFF;border-radius: 6rpx;background: #1A78DF;margin-right:60rpx;text-align: center;line-height: 68rpx;">去结算</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money1:80,
				money:300,
				sum:60,
				type:"微信",
				name:"王二小",
				phonenumber:18859253031,
				adress:"河南省郑州市正东物流集团有限公司河南省郑州市正东物流集团有限公司河南省郑州市正东物流集团有限公司"
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.jiesuan{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 750rpx;
		height: 105rpx;
		border-top: 1rpx solid #EEEEEE;
		border-bottom: 1rpx solid #EEEEEE;
		margin-top: 97rpx;
	}
	.youhui{
		width: 750rpx;
		height: 105rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #EEEEEE;
	}
	.product-right{
		width: 500rpx;
		height: 248rpx;
		margin-left: 29rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		
	}
	.product{
		width: 750rpx;
		height: 254rpx;
		display: flex;
		border-bottom: 1rpx solid #EEEEEE;
	}
	.middle-middle{
		width: 750rpx;
		height:105rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;	
		border-bottom: 1rpx solid #EEEEEE;
	}
	.middle-top{
		width: 750rpx;
		height: 105rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #EEEEEE;
		margin-top: 40rpx;
	}
	.nav-middle-left{
		width:50rpx ;
		height: 136rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.nav-middle-right-top{
		width: 500rpx;
		height: 40rpx;
		display: flex;
		justify-content: space-between;
		margin-left: 17rpx;
	}
	.nav-adress-middle{
		width:690rpx;
		height:136rpx;
		display: flex;
	}
	.nav-adress{
		width: 750rpx;
		height: 244rpx;
		}
	.nav-daress-top{
		width: 690rpx;
		height: 108rpx;
		display: flex;
		font-size: 44rpx;
		justify-content: space-between;
		align-items: center;
	}
</style>
