<template>
	<view style="flex: 1;">
		<view class="all">
		<van-nav-bar
		  left-arrow
		  v-on:click-left="onClickLeft"
		/>
		<view class="nav">
			<view class="nav-text-1">快来提高自己排行吧</view>
			<view class="nav-text-2">成交排行榜</view>
			<view class="nav-text-3">每月1日更新，根据前一月销售金额从高到低排序</view>
		</view>
		<view class="middle">
			<view class="middle-top">
				<view style="font-size:30rpx ; color: #333333;font-family: PingFang-SC-Regular;">{{money}}元</view>
				<view><image src="../../static/master/未标题-2_03.png" style="width: 90rpx;height: 90rpx;"></image></view>
				<view style="font-size: 30rpx;color: #333333;"><text style="font-size: 38rpx;color: #333333;">{{ranking}}</text>名</view>
			</view>
			<view class="middle-middle">
				<view class="middle-middle-text-1">
					<view class="middle-middle-text-1-img">
						<image src="../../static/master/第一名-排行榜.png" style="width: 30rpx;height: 40rpx;"></image>
					</view>
					<view class="middle-middle-text-1-head" style="display: flex;">
						<image src="../../static/master/未标题-2_05.png" style="width: 80rpx;height: 80rpx;"></image>
					<view style="font-size:28rpx;">{{name}}</view>
					</view>
					<view class="middle-middle-text-1-money" style="font-size: 30rpx;color: #666666;">{{money}}元</view>
				</view>
				<view class="middle-middle-text-1">
					<view class="middle-middle-text-1-img">
						<image src="../../static/master/第二名-排行榜.png" style="width: 30rpx;height: 40rpx;"></image>
					</view>
					<view class="middle-middle-text-1-head" style="display: flex;">
						<image src="../../static/master/未标题-2_05.png" style="width: 80rpx;height: 80rpx;"></image>
					<view style="font-size:28rpx;">{{name}}</view>
					</view>
					<view class="middle-middle-text-1-money" style="font-size: 30rpx;color: #666666;">{{money}}元</view>
				</view>
				<view class="middle-middle-text-1">
					<view class="middle-middle-text-1-img">
						<image src="../../static/master/第三名-排行榜.png" style="width: 30rpx;height: 40rpx;"></image>
					</view>
					<view class="middle-middle-text-1-head" style="display: flex;">
						<image src="../../static/master/未标题-2_05.png" style="width: 80rpx;height: 80rpx;"></image>
					<view style="font-size:28rpx;">{{name}}</view>
					</view>
					<view class="middle-middle-text-1-money" style="font-size: 30rpx;color: #666666;">{{money}}元</view>
				</view>
				<view class="middle-middle-text-1">
					<view class="middle-middle-text-1-img">
						4
					</view>
					<view class="middle-middle-text-1-head" style="display: flex;">
						<image src="../../static/master/未标题-2_05.png" style="width: 80rpx;height: 80rpx;"></image>
					<view style="font-size:28rpx;">{{name}}</view>
					</view>
					<view class="middle-middle-text-1-money" style="font-size: 30rpx;color: #666666;">{{money}}元</view>
				</view>
				<view class="middle-middle-text-1">
					<view class="middle-middle-text-1-img">
						5
					</view>
					<view class="middle-middle-text-1-head" style="display: flex;">
						<image src="../../static/master/未标题-2_05.png" style="width: 80rpx;height: 80rpx;"></image>
					<view style="font-size:28rpx;">{{name}}</view>
					</view>
					<view class="middle-middle-text-1-money" style="font-size: 30rpx;color: #666666;">{{money}}元</view>
				</view>
				<view class="middle-middle-text-1">
					<view class="middle-middle-text-1-img">
						6
					</view>
					<view class="middle-middle-text-1-head" style="display: flex;">
						<image src="../../static/master/未标题-2_05.png" style="width: 80rpx;height: 80rpx;"></image>
					<view style="font-size:28rpx;">{{name}}</view>
					</view>
					<view class="middle-middle-text-1-money" style="font-size: 30rpx;color: #666666;">{{money}}元</view>
				</view>
				<!-- <view class="middle-middle-text-1">
					<view class="middle-middle-text-1-img">
						7
					</view>
					<view class="middle-middle-text-1-head" style="display: flex;">
						<image src="../../static/master/未标题-2_05.png" style="width: 80rpx;height: 80rpx;"></image>
					<view style="font-size:28rpx;">{{name}}</view>
					</view>
					<view class="middle-middle-text-1-money" style="font-size: 30rpx;color: #666666;">{{money}}元</view>
				</view> 
				 <view class="middle-middle-text-1">
					<view class="middle-middle-text-1-img">
						8
					</view>
					<view class="middle-middle-text-1-head" style="display: flex;">
						<image src="../../static/master/未标题-2_05.png" style="width: 80rpx;height: 80rpx;"></image>
					<view style="font-size:28rpx;">{{name}}</view>
					</view>
					<view class="middle-middle-text-1-money" style="font-size: 30rpx;color: #666666;">{{money}}元</view>
				</view>
				<view class="middle-middle-text-1">
					<view class="middle-middle-text-1-img">
						9
					</view>
					<view class="middle-middle-text-1-head" style="display: flex;">
						<image src="../../static/master/未标题-2_05.png" style="width: 80rpx;height: 80rpx;"></image>
					<view style="font-size:28rpx;">{{name}}</view>
					</view>
					<view class="middle-middle-text-1-money" style="font-size: 30rpx;color: #666666;">{{money}}元</view>
				</view> -->
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:"166660",
				ranking:"16",
				name:"张大炮"
			};
		},
		methods:{
			 onClickLeft() {
			 //   uni.navigateTo({
			 //   	// url:"../myselfs/myselfs"
				
			 //   })
			   uni.navigateBack({
			   	delta:1
			   })
			  }
		}
	}
</script>

<style lang="scss" scoped>
	.middle-middle-text-1-head{
		width: 200rpx;
		justify-content:space-between ;
		align-items: center;
	}
	.middle-middle-text-1{
		width: 580rpx;
		height: 140rpx;
		display: flex;
		
		margin-left:41rpx;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #dedede;
	}
	.middle-middle{
		width:650rpx;
		background: #FFFFFF;
		margin-left:50rpx;
		
	}
	.nav-text-3{
		width:373rpx;
		height:66rpx;
		font-size:24rpx;
		font-family:Adobe Heiti Std;
		font-weight:normal;
		color:rgba(255,255,255,1);
	}
	.nav-text-1{
		width:270rpx;
		height:50rpx;
		background:rgba(255,255,255,1);
		opacity:0.88;
		border-radius:50rpx 25rpx 25rpx 0px;
		font-size:24rpx;
		color:#294190;
		text-align: center;
		line-height: 50rpx;
	}
	.nav-text-2{
		width:386rpx;
		height:71rpx;
		font-size:76rpx;
		font-family:FZZongYi-M05S;
		font-weight:bold;
		color:rgba(255,255,255,1);
		line-height:29rpx;
		color: #FFFFFF;
		margin-top:25rpx ;
	}
	.nav{
		width: 386rpx;
		height: 237rpx;
		margin: 55rpx 0 0 55rpx;
		
	}
	.all{
		width: 750rpx;
		background: url(https://ftp.bmp.ovh/imgs/2019/09/5e7c59a08b0c8faa.png) no-repeat;
		background-size:750rpx;
	}
	.middle .middle-top{
		width:690rpx;
		height:174rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 0rpx 25rpx 0px rgba(10,20,164,0.89);
		border-radius:20rpx 20rpx 0rpx 0rpx;
		margin-top:20rpx ;
		margin-left:30rpx ;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.middle-middle{
		width: 650rpx;
	}
		.middle{
			height: 1010rpx;
			
		}
</style>
