<template>
	<view>
		<view class="nav">
			<view class="nav-left">
				<image src="../../static/日用家居.png"></image>
			</view>
			<view class="nav-right">{{name}}</view>
		</view>
		<view class="middle">
			<van-cell coustm-class="danyuage1" icon="like-o" is-link title="我的收藏" link-type="navigateTo" url="/components/collection/collection" />
			<van-cell icon="coupon-o" color="" is-link title="我的优惠卷" link-type="navigateTo" url="/components/coupon/coupon" />
			<van-cell icon="location-o" is-link title="我的收货地址" link-type="navigateTo" url="/components/address/address" />
			<van-cell title-class icon="question-o" title="联系电话" value="13526443969" />
			<van-cell icon="info-o" is-link title="关于我们" link-type="navigateTo" url="/components/about/about" />
			<van-cell icon="exchange" is-link title="切换身份" link-type="navigateTo" url="/components/change/change" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: "白小飞"
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.middle {
		border-radius: 25rpx;
		overflow: hidden;
	}
	.danyuage1 icon{
		color: #007AFF;
	}
	.middle .danyuage1 {
		height: 110rpx;
		border-radius: 25rpx;
		overflow: hidden;
	}

	.nav {
		width: 750rpx;
		height: 500rpx;
		background: url(https://t1.picb.cc/uploads/2019/09/17/gFhVns.png);
		display: flex;
		position: relative;
	}

	.nav .nav-left {
		width: 160rpx;
		height: 160rpx;
		border-radius: 100%;
	}

	.nav .nav-left image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 100%;
		margin: 195rpx 40rpx 0 30rpx;
	}

	.nav .nav-right {
		margin: 239rpx 0 0 40rpx;
		width: 158rpx;
		height: 72rpx;
		font-size: 52rpx;
		font-family: PingFangSC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 72rpx;
	}

	.middle {
		width: 690rpx;
		height: 666rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 5rpx 15rpx 0rpx rgba(238, 238, 238, 1);
		border-radius: 25rpx;
		position: absolute;
		left: 30rpx;
		top: 418rpx;
	}
</style>
