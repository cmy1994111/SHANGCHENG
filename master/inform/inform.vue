<template>
	<view>
		<view class="nav">
			<view class="nav-middle-233">
			<view class="nav-middle">
				<view class="nav-left-img">
					<image src="../../static/master/图层3.png" style="width: 90rpx;height: 90rpx;margin-left: 32rpx;"></image>
				</view>
				<view class="nav-right">
					<view class="nav-right-top">
						<text style="font-size: 28rpx;color: #333333;" @tap="ToSystemForm">系统消息</text>
						<text style="font-size: 24rpx;color: #999;">{{time}}</text>
					</view>
					<view class="nav-right-bottom" style="font-size: 24rpx;color: #999;" >
						好消息，好消息！！！！！！
					</view>
				</view>
			</view>
			</view>
			
			<view class="nav-middle-1">
				<view class="nav-left-img-1">
					<image src="../../static/master/图层4.png" style="width: 90rpx;height: 90rpx;margin-left: 32rpx;"></image>
				</view>
				<view class="nav-right-1">
					<view class="nav-right-top-1">
						<text style="font-size: 28rpx;color: #333333;">我的消息</text>
						<text style="font-size: 24rpx;color: #999;">{{time1}}</text>
					</view>
					<view class="nav-right-bottom-1" style="font-size: 24rpx;color: #999;" >
						你的订单有新的消息
					</view>
				</view>
			</view>
			
			<view class="nav-middle-1">
				<view class="nav-left-img-1">
					<image src="../../static/master/未标题-2_03.png" style="width: 90rpx;height: 90rpx;margin-left: 32rpx;"></image>
				</view>
				<view class="nav-right-1">
					<view class="nav-right-top-1">
						<text style="font-size: 28rpx;color: #333333;">{{name}}</text>
						<text style="font-size: 24rpx;color: #999;">{{time3}}</text>
					</view>
					<view class="nav-right-bottom-1" style="font-size: 24rpx;color: #999;" >
						{{chat}}
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time:"10:23",
				time1:"20:34",
				name:"沈剑心",
				chat:"你好方便加下微信吗",
				time3:"19:56"
			}
		},
		methods: {
			ToSystemForm(){
				uni.navigateTo({
					url:"../SystemInform/SystemInform"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-right-top{
		display: flex;
		justify-content: space-between;
	}
	.nav-middle-233{
		width: 750rpx;
		height: 130rpx;
		border-bottom: 1rpx solid #DEDEDE;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.nav-left-img{
		width: 90rpx;
		height: 90rpx;
	}
	.nav-right{
		width: 575rpx;
		height: 90rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 52rpx;
	}
	.nav-middle{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.nav-right-top-1{
		display: flex;
		justify-content: space-between;
	}
	.nav-left-img-1{
		width: 90rpx;
		height: 90rpx;
	}
	.nav-right-1{
		width: 575rpx;
		height: 90rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 52rpx;
	}
	.nav-middle-1{
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom: 1rpx solid #DEDEDE;
		width: 750rpx;
		height: 130rpx;
	}
</style>
