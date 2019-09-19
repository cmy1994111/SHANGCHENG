<template>
	<view>
		<view class="nav-all">
			<view class="nav-all-top">
				<text>分享给好友,好友成功使用后即可激活</text>
				<view class="nav-all-bottom">
					<view class="nav-all-bottom-left">
						<text style="font-size:36rpx;color: #fff;">￥</text>
						<text style="font-size:66rpx;color: #fff;">{{money}}</text>
					</view>
					<view class="nav-all-bottom-right">
						<view class="nav-all-bottom-right-left">
							<view class="nav-all-bottom-right-left-top">
								<text>满{{sum}}减{{sumURL}}</text>
							</view>
							<view class="nav-all-bottom-right-left-bottom">
								<text style="font-size: 24rpx;color:rgba(170,170,170,1);">{{year}}-{{years}}</text>
							</view>
						</view>
						<view class="nav-all-bottom-right-right">
							<button>分享使用</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 第二张优惠卷 -->
		<view class="nav-all-1">
			<view class="nav-all-top-1">
				<text>{{name1}}已领取并使用</text>
				<view class="nav-all-bottom-1">
					<view class="nav-all-bottom-left-1">
						<text style="font-size:36rpx;color: #fff;">￥</text>
						<text style="font-size:66rpx;color: #fff;">{{money}}</text>
					</view>
					<view class="nav-all-bottom-right-1">
						<view class="nav-all-bottom-right-left-1">
							<view class="nav-all-bottom-right-left-top-1">
								<text>满{{sum}}减{{sumURL}}</text>
							</view>
							<view class="nav-all-bottom-right-left-bottom-1">
								<text style="font-size: 24rpx;color:rgba(170,170,170,1);">{{year}}-{{years}}</text>
							</view>
						</view>
						<view class="nav-all-bottom-right-right-1">
							<button>去使用</button>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 第三张优惠卷
		 
		 
		 -->
		<view class="nav-all-2">
			<view class="nav-all-top-2">
				<text>{{name}}已领取</text>
				<view class="nav-all-bottom-2">
					<view class="nav-all-bottom-left-2">
						<text style="font-size:36rpx;color: #fff;">￥</text>
						<text style="font-size:66rpx;color: #fff;">{{money}}</text>
					</view>
					<view class="nav-all-bottom-right-2">
						<view class="nav-all-bottom-right-left-2">
							<view class="nav-all-bottom-right-left-top-2">
								<text>满{{sum}}减{{sumURL}}</text>
							</view>
							<view class="nav-all-bottom-right-left-bottom-2">
								<text style="font-size: 24rpx;color:rgba(170,170,170,1);">{{year}}-{{years}}</text>
							</view>
						</view>
						<view class="nav-all-bottom-right-right-2">
							<button>待激活</button>
						</view>
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
				name1:"张三",
				name:"王五",
				money: "20",
				sum: "100",
				sumURL: "10",
				year: "2019.9.30",
				years: "2019.9.31"
			}
		},
		methods: {

		}
	}
</script>

<style>
	.nav-all-1 {
		margin-top:250rpx;
		height: 300rpx;
	}
.nav-all-2 {
		margin-top:20rpx;
	}
	.nav-all .nav-all-top {
		width: 544rpx;
		height: 45rpx;
		font-size: 32rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(79, 79, 79, 1);
		line-height: 45rpx;
		margin-left: 30rpx;
		margin-top: 24rpx;
	}

	.nav-all-bottom {
		width: 690rpx;
		height: 180rpx;
		background: url(../../static/优惠券.png) no-repeat;
		background-size: 690rpx 180rpx;
		margin: 18rpx 0 0 15rpx;
		display: flex;
	}

	.nav-all-bottom .nav-all-bottom-left {
		width: 184rpx;
		height: 184rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.nav-all-bottom .nav-all-bottom-right {
		width: 510rpx;
		height: 180rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.nav-all-bottom .nav-all-bottom-right .nav-all-bottom-right-left {
		width: 250rpx;
		height: 180rpx;

		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 18rpx;
	}

	.nav-all-bottom-right-right button {
		width: 160rpx;
		height: 48rpx;
		border-radius: 24rpx;
		border: 1rpx solid rgba(0, 123, 255, 1);
		font-size: 24rpx;
		color: #007BFF;
		text-align: center;
		line-height: 48rpx;
		background: ;
	}

	/* 第二张优惠卷使用后 */
	.nav-all-1 .nav-all-top-1 {
		width: 544rpx;
		height: 45rpx;
		font-size: 32rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(79, 79, 79, 1);
		line-height: 45rpx;
		margin-left: 30rpx;
		margin-top: 24rpx;
	}

	.nav-all-bottom-1 {
		width: 690rpx;
		height: 180rpx;
		background: url(../../static/优惠券.png) no-repeat;
		background-size: 690rpx 180rpx;
		margin: 18rpx 0 0 15rpx;
		display: flex;
	}

	.nav-all-bottom-1 .nav-all-bottom-left-1 {
		width: 184rpx;
		height: 184rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.nav-all-bottom-1 .nav-all-bottom-right-1 {
		width: 510rpx;
		height: 180rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.nav-all-bottom-1 .nav-all-bottom-right-1 .nav-all-bottom-right-left-1 {
		width: 250rpx;
		height: 180rpx;

		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 18rpx;
	}

	.nav-all-bottom-right-right-1 button {
		width: 160rpx;
		height: 48rpx;
		border-radius: 24rpx;
		border: 1rpx solid rgba(0, 123, 255, 1);
		font-size: 24rpx;
		color: #007BFF;
		text-align: center;
		line-height: 48rpx;
		background: ;
	}

	/* 第三张优惠卷领取未使用 */
	.nav-all-2 .nav-all-top-2 {
		width: 544rpx;
		height: 45rpx;
		font-size: 32rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(79, 79, 79, 1);
		line-height: 45rpx;
		margin-left: 30rpx;
		margin-top: 24rpx;
	}

	.nav-all-bottom-2 {
		width: 690rpx;
		height: 180rpx;
		background: url(../../static/优惠券.png) no-repeat;
		background-size: 690rpx 180rpx;
		margin: 18rpx 0 0 15rpx;
		display: flex;
	}

	.nav-all-bottom-2 .nav-all-bottom-left-2 {
		width: 184rpx;
		height: 184rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.nav-all-bottom-2 .nav-all-bottom-right-2 {
		width: 510rpx;
		height: 180rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.nav-all-bottom-2 .nav-all-bottom-right-2 .nav-all-bottom-right-left-2 {
		width: 250rpx;
		height: 180rpx;

		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 18rpx;
	}

	.nav-all-bottom-right-right-2 button {
		width: 160rpx;
		height: 48rpx;
		border-radius: 24rpx;
		border: 1rpx solid rgba(0, 123, 255, 1);
		font-size: 24rpx;
		color: #007BFF;
		text-align: center;
		line-height: 48rpx;
		background: ;
	}
</style>
