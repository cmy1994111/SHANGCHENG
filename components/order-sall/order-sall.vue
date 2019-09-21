<template>
	<view style="background:#F5F5F5;">
		<view class="orders">
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
						<view class="userServie" style="display: flex;">
							<view style="display: flex;flex-direction: column;justify-content: center;">
								<text style="font-size: 26rpx;color: #999999;">客户已确认服务</text>
								<text  style="font-size: 22rpx;color:#DEDEDE ;">{{years}}&nbsp;{{time}}</text>
							</view>
							<image slot="icon" src="../../static/master/userservice.png" style="width: 36rpx;height: 36rpx; margin:28rpx;" ></image>
						</view>
						<button style="width:160rpx;height:60rpx;font-size:26rpx;color: #999999;border-radius: 30rpx;text-align: center;line-height: 60rpx;margin-left: 60rpx;">上门服务</button>
						<button style="width: 160rpx;height:60rpx;font-size:26rpx;color: #999999;border-radius: 30rpx;text-align: center;line-height: 60rpx;" @tap="ToDetail">查看详情</button>
					</view>
			</view>
		</view>
		
		<!-- 服务完成 -->
		<view class="orders">
			<view class="order-middle-all">
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
				
					<view class="order-middle-7">
						<view class="userServie" style="display: flex;">
							<view style="display: flex;flex-direction: column;justify-content: center;">
								<text style="font-size: 26rpx;color: #999999;">客户已确认服务</text>
								<text  style="font-size: 22rpx;color:#DEDEDE ;">{{years}}&nbsp;{{time}}</text>
							</view>
							<image slot="icon" src="../../static/master/userservice.png" style="width: 36rpx;height: 36rpx; margin:28rpx;" ></image>
						</view>
						<button style="width:160rpx;height:60rpx;font-size:26rpx;color: #999999;border-radius: 30rpx;text-align: center;line-height: 60rpx;margin-left: 60rpx;">服务完成</button>
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
				Adress: "河南省郑州市郑东新区CBD商务外环路5号国际商会",
				years:"209.09.21"
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
		// height: 800rpx;
	}
	.order-middle-all {
			width: 690rpx;
			height: 400rpx;
			border-radius: 25rpx;
			margin-top: 23rpx;
			margin-left: 30rpx;
			background: #FFFFFF;
	
		}
	.order-middle-7 {
		display: flex;
		width: 670rpx;
		height: 110rpx;
		justify-content: space-between;
		align-items: center;
		margin-left:23rpx;
		
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

	.order-middle-all .order-middle-1 {
		width: 650rpx;
		height: 64rpx;
		border-bottom: 1rpx solid #dedede;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 24rpx;
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
		height: 550rpx;
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
