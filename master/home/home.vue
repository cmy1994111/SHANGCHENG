<template>
	<view style="background:#F5F5F5;">
		<!-- <van-tabbar v-on:change="onTabChange" :active="active" active-color="#477DFC" inactive-color="#000">
			<van-tabbar-item v-for="(item,index) in tabbars" :key="index">
				{{item.title}}
				<image slot="icon" src="../../static/tab-首页-nor.png"></image>
				<image slot="icon-active" src="../../static/tab-首页-sel.png"></image>
			</van-tabbar-item>
		</van-tabbar> -->
		<van-tabbar :active="active" active-color="#477DFC" inactive-color="#000" v-on:change="onTabChange">
			<van-tabbar-item icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item icon="orders-o" @tap="ToChange">订单</van-tabbar-item>
			<van-tabbar-item icon="manager-o" @tap="ToMyself">我的</van-tabbar-item>
		</van-tabbar>
		<view>
			<view class="nav">
				<view class="nav-top">
					<view class="nav-top-left">
						<view style="width: 129rpx;height: 46rpx;display: flex;justify-content: space-around;background: #0FAEFF;align-items: center;">
							<image src="../../static/位置-商城.png" style="width: 26rpx;height: 32rpx;"></image>
							<text style="font-size: 28rpx;color: #FFFFFF;">{{adress}}</text>
						</view>
						<view>
							<image src="../../static/关于我们.png" style="width:42rpx;height:47rpx"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="middle">
			<view class="middle-top">
				<view class="middle-left" style="width: 10rpx; height: 30rpx;background: #007AFF;"></view>
				<view class="middle-right" style="font-size: 30rpx;margin-left: 27rpx;">服务数据</view>
			</view>
			<view class="middle-middle" style="border-bottom: 1rpx solid #E5E5E5;">
				<view class="middle-middle-top">
					<view class="middle-middle-top-text" style="font-size:26rpx;margin: 11rpx 0 0 26rpx;width: 641rpx;">今日服务数据</view>
				</view>
				<view class="middle-middle-middle">
					<view>
						<view>{{sum}}</view>
						<view style="font-size: 24rpx;color: #666666;">今日服务量</view>
					</view>
					<text></text>
					<view>
						<view>{{sum}}</view>
						<view style="font-size: 24rpx;color: #666666;">今日服务金额(元)</view>
					</view>
				</view>
			</view>
			<view class="middle-footer">
				<view class="middle-footer-top">
					<view class="middle-footer-top-text" style="font-size:26rpx;margin: 11rpx 0 0 26rpx;width: 641rpx;">历史服务数据</view>
				</view>
				<view style="display:flex">
					<view style="width:50%;text-align: center;">
						<view>{{sum}}</view>
						<view style="font-size: 24rpx;color: #666666;text-align: center;">历史服务量</view>
					</view>
					<text style="width: 1rpx dashed #dedede;"></text>
					<view style=" width:50%;text-align: center;">
						<view>{{sum}}</view>
						<view style="font-size: 24rpx;color: #666666;">历史服务额&nbsp;(元)</view>
					</view>
				</view>
			</view>
		</view>
		<view class="orders">
			<view class="orders-top">我的接单</view>
			<view class="order-middle">
				<view class="order-middle-1">
					<text style="font-size:24rpx;color: #666666;">订单编号:&nbsp;{{reference}}</text>
					<text style="font-size:24rpx;color: #666666;">{{year}}&nbsp;&nbsp;{{time}}</text>
				</view>
				<view class="order-middle-2">
					<view class="order-middle-2-left-img" style="margin: 0 24rpx ;">
						<image src="../../static/youyanji.png" style="width: 100rpx;height: 97rpx;"></image>
					</view>
					<view class="order-middle-2-right-detail" style="display: flex;flex-direction: column;justify-content: space-between;">
						<view style="font-size:28rpx;color: #333333;">{{product}}</view>
						<view style="font-size:24rpx;color: #999;">产品规格:{{producttype}}</view>
						<view style="font-size:30rpx;color: #FB2846;">￥{{price}}</view>
					</view>
				</view>
				<view class="order-middle-3">
					<view>
						<text style="font-size: 26rpx;color: #999999;">卖家需求:</text>
						<text style="font-size: 26rpx;color: #666666;">{{demand}}</text>
					</view>
				</view>
				<view class="order-middle-4">
					<view style="display: flex;align-items: center;justify-content: space-around;">
						<image src="../../static/ic-系统消息.png" style="width: 60rpx;height: 60rpx;border-radius: 50%;"></image>
						<view style="font-size: 26rpx;color: #333333;margin: 0 25rpx;">{{username}}</view>
						<view style="font-size: 26rpx;color: #333333;">{{number}}</view>
					</view>
				</view>
				<view class="order-middle-5">
					<view style="font-size: 26rpx; color: #999999;">地址:</view>
					<view class="order-middle-6" style="margin-left:17rpx;color:#666666 ;font-size: 26rpx;width:498rpx;">{{Adress}}</view>
				</view>
					<view class="order-middle-7">
						<button style="width:160rpx;height:60rpx;font-size:26rpx;color: #999999;border-radius: 30rpx;text-align: center;line-height: 60rpx;margin-left: 350rpx;">拒接</button>
						<button style="width: 160rpx;height:60rpx;font-size:26rpx;color: #999999;border-radius: 30rpx;text-align: center;line-height: 60rpx;" @tap="ToDetail">查看详情</button>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tabbar",
		data() {
			return {

				sum: 12,
				reference: 6666666666,
				adress: "郑州",
				currIndex: 0,
				active: 0,
				year: '2019.09.20',
				time: '16:45',
				product: "油烟机(清洁油污)",
				producttype: "顶吸",
				price: "66",
				demand: "快点！！！",
				username: "陈小凡",
				number: "13159486531",
				Adress: "河南省郑州市郑东新区CBD商务外环路5号国际商会"
			};
		},
		methods: {
			ToDetail(){
				uni.navigateTo({
					url:"../ordersDetail/ordersDetail"
				})
			},
			onTabChange(e) {
				console.log(e.detail)
				console.log(111)
				this.active = e.detail
			},
			ToChange(){
				uni.navigateTo({
					url:"../orders/orders"
				})
			},
			ToMyself(){
				uni.navigateTo({
					url:"../myselfs/myselfs"
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.orders{
		height: 800rpx;
	}
	.order-middle-7 {
		display: flex;
		width: 690rpx;
		height: 60rpx;
		margin-top: 17rpx;
	}

	.order-middle-5 {
		width: 637rpx;
		height: 55rpx;
		margin: 21rpx 0 0 24rpx;
		display: flex;
		padding-bottom: 20rpx;
		border-bottom: 1upx solid #dedede;
	}

	.order-middle-4 {
		height: 61rpx;
		width: 436rpx;
		display: flex;
		margin: 31rpx 0 0 21rpx;
		display: flex;
		justify-content: space-between;
	}

	.order-middle-3 {
		margin: 21rpx 0 0 25rpx;
	}

	.order-middle-2 {
		width: 650rpx;
		height: 134rpx;
		margin-left: 24rpx;
		display: flex;
		align-items: center;
	}

	.order-middle .order-middle-1 {
		width: 650rpx;
		height: 64rpx;
		border-bottom: 1rpx solid #dedede;
		display: flex;

		justify-content: space-between;
		align-items: center;
		margin-left: 24rpx;
	}

	.order-middle {
		width: 690rpx;
		height: 530rpx;
		border-radius: 25rpx;
		margin-top: 23rpx;
		margin-left: 30rpx;
		background: #FFFFFF;

	}

	.orders .orders-top {
		margin-top: 260rpx;
		margin-left: 30rpx;
	}

	.middle-footer-top {
		display: flex;
		flex-direction: column;
		height: 88rpx;
	}

	.middle-footer {
		display: flex;
		flex-direction: column;

		justify-content: space-between;
	}

	.middle-top {
		width: 641rpx;
		height: 80rpx;
		margin-left: 27rpx;
		border-bottom: 1rpx solid #E5E5E5;
		display: flex;
		align-items: center;
	}

	.middle-top .middle-top-left {
		width: 10rpx;
		height: 30rpx;

	}

	.middle-top .middle-top-right {
		font-size: 30rpx;
		color: #333333;
		margin-left: 21rpx;
	}

	.middle {
		width: 690rpx;
		height: 400rpx;
		position: absolute;
		background: #FFFFFF;
		border-radius: 25rpx;
		left: 28rpx;
		top: 228rpx;

	}

	.middle-middle-middle {
		display: flex;
		align-items: center;
	}

	.middle-middle-middle>view {
		width: calc(50% - 1px);
		text-align: center;
	}

	.middle-middle-middle>text {
		height: 60rpx;
		width: 1px;
		border-left: 1px dashed #dedede;
	}

	.nav {
		width: 750rpx;
		height: 400rpx;
		background: url(https://t1.picb.cc/uploads/2019/09/17/gFhVns.png);
		overflow: hidden;
		position: relative;
	}

	.nav-top-left {
		display: flex;
		width: 690rpx;
		height: 46rpx;
		justify-content: space-between;
		margin: 105rpx 0 0 31rpx;
		overflow: hidden;

	}

	.van-tabbar-item--active {
		color: #e10f02;
	}
</style>
