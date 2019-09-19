<template>
	<view>
		<view class="nav-text">
			<text style="font-size: 60rpx;color:rgba(51,51,51,1);font-weight:500;font-family:PingFang SC;">选择自己的身份</text>
			<text style="font-size: 26rpx; color:rgba(102,102,102,1);font-family:PingFang SC;font-weight:500;">开启属于自己的生活之旅</text>
		</view>
		<view class="nav-img">
			<view class="nav-img-left">
				<view class="yonghu-img" style="width: 180rpx;height: 180rpx;border-radius: 50%;">
					<image src="../../static/yonghu.png" style="width: 180rpx;height: 180rpx;border-radius: 100%;margin-top:35rpx"></image>
				</view>
			</view>
			<view class="nav-img-right">
				<view class="shifu-img">
					<view class="yonghu-img" style="width: 180rpx;height: 180rpx;border-radius: 50%;">
						<image src="../../static/shifu.png" style="width: 180rpx;height: 180rpx;border-radius: 100%;margin:20rpx"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="middle">
			<view class="middle-text-left">我是用户</view>
			<view class="middle-text-right">我是师傅</view>
		</view>
		<view class="footer">
			<text>选择进入页面</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	
	.footer{
		margin: 302rpx 0 0 295rpx;
		font-size:26rpx;
		color: #666666;
	}
	.middle{
		display: flex;
		width: 428rpx;
		
		margin:61rpx 0 0 164rpx ;
		font-size: 26rpx;
		color: #333333;
		justify-content: space-between;
	}
	.nav-text {
		width: 430rpx;
		height: 109rpx;
		margin:283rpx 0 0 157rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		
	}	
	.nav-img{
		width: 540rpx;
		height: 220rpx;
		margin: 186rpx 0 0 111rpx;
		
		display: flex;
		justify-content: space-between;
		
	}
	.nav-img .nav-img-left .yonghu-img{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.nav-img .nav-img-left .shifu-img{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.nav-img .nav-img-left{
		width: 220rpx;
		height: 220rpx;
		border:6rpx solid rgba(245,245,245,1);
		border-radius:50%;
		
		display: flex;
		justify-content: center;
		align-content: center;
	}
	.nav-img-left:active{
		border:6rpx solid #1D82E8;
	}
	
	.nav-img .nav-img-right{
		width: 220rpx;
		height: 220rpx;
		border:6rpx solid rgba(245,245,245,1);
		border-radius:50%;
	}
	.nav-img-right:active{
		border:6rpx solid #1D82E8;
	}
</style>
