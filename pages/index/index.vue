<template>
	<view>
		<view class="nav">
			<view class="nav-left">
				<text class="uni-flex">清洁服务</text>
			</view>
			<view class="shu"></view>
			<view class="nav-right">
				<text>Cleaning Services</text>
			</view>
		</view>
		<!-- <navigator url="../../components/detail/detail"> -->
		<view class="middle-flex" @tap="toUser" >
			<view class="middle-left">
				<view class="middle-left-text-top">油烟机</view>
				<view class="middle-left-text-middle">专业去油污</view>
				<view class="middle-left-img">
					<image src="../../static/youyanji.png"></image>
				</view>
			<!-- </navigator>	 -->
			<!-- <navigator url="../../components/detail/detail"> -->
			</view>
			<view class="middle-right" @tap="toUser">
				<view class="middle-right-text-top">热水器</view>
				<view class="middle-right-text-middle">深度清洁水垢</view>
				<view class="middle-right-img">
					<image src="../../static/热水器.png"></image>
				</view>
			</view>
		</view>
		<!-- </navigator> -->
		<!-- <navigator url="../../components/detail/detail"> -->
		<view class="middle-flex-1" >
			<view class="middle-left-1" @tap="toUser">
				<view class="middle-left-text-top-1">空调</view>
				<view class="middle-left-text-middle-1">深度清洁优化</view>
				<view class="middle-left-img-1">
					<image src="../../static/空调.png"></image>
				</view>
			<!-- </navigator> -->
			</view>
			<view class="middle-right-1">
				<view class="middle-right-text-top-2">酒店政府企事业单位</view>
				<view class="middle-right-text-top-3">请拨打热线电话</view>
				<view class="middle-number"> 400 888 8888</view>
				<view class="middle-right-img-2">
				</view>
			</view>
		</view>
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item>
				<view class="swiper-item uni-bg-red">
					<image src="../../static/banner-首页.png" @tap="ToChange"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-green">
					<image src="../../static/banner-商城.png"></image>
				</view>
			</swiper-item>

		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			toUser() {
				uni.navigateTo({
					url: '../../components/detail/detail'
				});
			},
			ToChange(){
				uni.navigateTo({
					url:'../../components/change/change'
				})
			}
		}
	}
</script>

<style scoped>
	.nav-left {
		width: 176rpx;
		height: 62rpx;
		font-size: 44rpx;
		font-family: PingFangSC;
		font-weight: 500;
		color: rgba(36, 46, 66, 1);
		line-height: 62rpx;
	}

	.shu {
		width: 2rpx;
		height: 38rpx;
		background: rgba(238, 238, 238, 1);
		margin-top: 17rpx;
	}

	.nav-right {
		font-size: 24rpx;
		color: #999999;
	}

	.nav {
		display: flex;
		width: 396rpx;
		height: 62rpx;
		justify-content: space-between;
		align-items: flex-end;
		margin: 24rpx 0 0 36rpx;
	}

	.middle-flex {
		width: 690rpx;
		display: flex;
		justify-content: space-between;
		margin-left: 30rpx;
		margin-top: 27rpx;
		
	}

	.middle-flex .middle-left {
		width: 330rpx;
		height: 336rpx;
		background:rgba(190,194,206,1);
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		align-items: center;
	}

	.middle-flex .middle-right {
		width: 330rpx;
		height: 336rpx;
		background:rgba(190,194,206,1);
	}

	.middle-flex .middle-left .middle-left-img image {
		width: 278rpx;
		height: 152rpx;
	}

	.middle-flex .middle-left .middle-left-text-top {
		width: 96rpx;
		height: 45rpx;
		font-size: 32rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 45rpx;
	}

	.middle-flex .middle-left .middle-left-text-middle {
		width: 156rpx;
		height: 37rpx;
		font-size: 26rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		line-height: 37rpx;
	}

	.middle-flex .middle-right {
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		align-items: center;
	}

	.middle-flex .middle-right-img image {
		width: 278rpx;
		height: 152rpx;
	}

	.middle-flex .middle-right .middle-right-text-top {
		width: 96rpx;
		height: 45rpx;
		font-size: 32rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 45rpx;
	}

	.middle-flex .middle-right .middle-right-text-middle {
		width: 130rpx;
		height: 37rpx;
		font-size: 26rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		line-height: 37rpx;
	}


	.middle-flex-1 {
		width: 690rpx;
		display: flex;
		justify-content: space-between;
		margin-left: 30rpx;
		margin-top: 27rpx;
		
	}

	.middle-flex-1 .middle-left-1 {
		width: 330rpx;
		height: 336rpx;
		background:rgba(190,194,206,1);
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		align-items: center;
	}

	.middle-flex-1 .middle-right-1 {
		width: 330rpx;
		height: 336rpx;
		background:rgba(190,194,206,1);
	}

	.middle-flex-1 .middle-left-1 .middle-left-img-1 image {
		width: 278rpx;
		height: 152rpx;
	}

	.middle-flex-1 .middle-left-1 .middle-left-text-top-1 {
		width: 96rpx;
		height: 45rpx;
		font-size: 32rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 45rpx;
	}

	.middle-flex-1 .middle-left-1 .middle-left-text-middle-1 {
		width: 156rpx;
		height: 37rpx;
		font-size: 26rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		line-height: 37rpx;
	}

	.middle-flex-1 .middle-right-1 {
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		align-items: center;
	}

	.middle-flex-1 .middle-right-img-1 image {
		width: 278rpx;
		height: 152rpx;
	}

	.middle-flex-1 .middle-right-1 .middle-right-text-top-1 {}

	.middle-flex-1 .middle-right-1 .middle-right-text-top-2 {
		width: 158rpx;
		height: 90rpx;
		font-size: 32rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 45rpx;
	}

	.middle-flex-1 .middle-right-1 .middle-right-text-top-3 {
		font-size: 26rpx;
	}

	.middle-flex-1 .middle-number {
		font-size: 26px;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 37px;
	}
	.swiper{
		width: 692rpx;
		height: 195rpx;
		margin:42rpx 0 0 28rpx;
	}
	.swiper .swiper-item image{
		width: 692rpx;
		height: 195rpx;
		border-radius: 5rpx;
	}
</style>
