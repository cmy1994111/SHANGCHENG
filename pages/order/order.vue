<template>
	<view>
		<view class="nav-top" style="display: flex;width: 690rpx;height: 98rpx;align-items: center;justify-content: space-between;    border-radius: 100rpx;margin-left: 29rpx;border:1px solid rgba(229,229,229,1);">
			<!-- <button style="width:335rpx;height:78rpx;border-radius: 100px;line-height: 78rpx;" @tap="Toservice">服务订单</button>
			<button style="width:335rpx;height:78rpx;border-radius: 100px;line-height: 78rpx;" @tap="Toshop">商品订单</button> -->
			<view style="width:335rpx;height:78rpx;border-radius: 100px;line-height: 78rpx;" v-for="(but,index) in Buttons" @tap="ItemButtonChange(index)" :key="index" :class="{'bg3':index===list,'bg1':!(index===list)}">{{but.name}}</view>
		</view>
		<view v-if="list===0">
			<view class="nav">
				<text v-for="(item,index) in Tabs" @tap="ItemChange(index)" :key="index" :class="{'bg2':index===type,'bg1':!(index===type)}">{{item.name}}</text>
			</view>
			<view class="middle">
				<!-- 待付款 -->
				<view class="middle-1" v-if="type===0">
					<view class="middle-1-top">
						<view class="middle-1-top-img">
							<image src="../../static/youyanji.png"></image>
						</view>
						<view class="middle-1-top-text">
							<view class="middle-1-top-text-top">
								<text class="middle-1-top-text-top-1">油烟机清洗</text>
								<text class="middle-1-top-text-top-2">待付款</text>
							</view>
							<view class="middle-1-top-text-bottom">
								<view class="middle-1-top-text-bottom-left">
									<text>类别：{{slot}}</text>
								</view>
							</view>
							<view class="middle-1-bottom">
								<view style="display: flex; justify-content: space-between;width: 462rpx;">
									<text style="margin: 12rpx 0 0 24rpx;">
										<text class="middle-1-bottom-22" style="font-size: 26rpx;">￥</text>
										<text style="font-size: 36rpx;">{{money}}</text>
									</text>
									<text style="font-size: 26rpx;">
										<text>×</text>
										<text>{{num1}}</text>
									</text>
								</view>
								<view style="width:462rpx;height: 46rpx;font-size: 26rpx;display: flex;margin-top: 37rpx;justify-content: flex-end;align-items: center;">
									<text>共{{num1}}件商品&nbsp;&nbsp;&nbsp;实付￥{{num1*money}}</text>
								</view>
								<view style="width: 462rpx;display: flex;justify-content: flex-end;margin-top: 32rpx;">
									<text style="width: 176rpx;height: 56rpx;background:rgba(255,255,255,1);border-radius:28px;border:1px solid rgba(252,155,25,1);color: #FC9B19;text-align: center;line-height: 56rpx;font-size: 28rpx;">去付款</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 已完成待评价 -->
				<view class="middle-2" v-if="type===1">
					<view class="middle-2-top">
						<view class="middle-2-top-img">
							<image src="../../static/youyanji.png"></image>
						</view>
						<view class="middle-2-top-text">
							<view class="middle-2-top-text-top">
								<text class="middle-2-top-text-top-1">油烟机清洗</text>
								<text class="middle-2-top-text-top-2">待评价</text>
							</view>
							<view class="middle-2-top-text-bottom">
								<view class="middle-2-top-text-bottom-left">
									<text>类别：{{slot1}}</text>
								</view>
							</view>
							<view class="middle-2-bottom">
								<view style="display: flex; justify-content: space-between;width: 462rpx;">
									<text style="margin: 12rpx 0 0 24rpx;">
										<text class="middle-2-bottom-22" style="font-size: 26rpx;">￥</text>
										<text style="font-size: 36rpx;">{{money}}</text>
									</text>
									<text style="font-size: 26rpx;">
										<text>×</text>
										<text>{{num1}}</text>
									</text>
								</view>
								<view style="width:462rpx;height: 46rpx;font-size: 26rpx;display: flex;margin-top: 37rpx;justify-content: flex-end;align-items: center;">
									<text>共{{num1}}件商品&nbsp;&nbsp;&nbsp;实付￥{{num1*money}}</text>
								</view>
								<view style="width: 380rpx;display: flex;justify-content:space-between;margin-top: 32rpx;margin-left: 70rpx;">
									<text style="width: 176rpx;height: 56rpx;background:rgba(255,255,255,1);border-radius:28px;text-align: center;border:1px solid rgba(151,151,151,1) ;line-height: 56rpx;font-size: 28rpx;">查看详情</text>
									<text style="width: 176rpx;height: 56rpx;background:rgba(255,255,255,1);border-radius:28px;border:1px solid rgba(252,155,25,1);color: #FC9B19;text-align: center;line-height: 56rpx;font-size: 28rpx;"
									 @tap="appraise">评价</text>
								</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 待服务 -->
				<view class="middle-3" v-if="type===2">
					<view class="middle-3-top">
						<view class="middle-3-top-img">
							<image src="../../static/youyanji.png"></image>
						</view>
						<view class="middle-3-top-text">
							<view class="middle-3-top-text-top">
								<view class="middle-3-top-text-top-1" style="display:flex;align-content: center; justify-content: space-between;">
									<text class="middle-3-top-text-top-1-middle-top">油烟机清洗</text>
									<text class="middle-3-top-text-top-1-middle">拼团</text>
								</view>

								<text class="middle-3-top-text-top-2">进行中</text>
							</view>
							<view class="middle-3-top-text-bottom">
								<view class="middle-3-top-text-bottom-left">
									<text>类别：{{slot1}}</text>
								</view>
							</view>
							<view class="middle-3-bottom">
								<view style="display: flex; justify-content: space-between;width: 462rpx;">
									<text style="margin: 12rpx 0 0 24rpx;">
										<text class="middle-2-bottom-22" style="font-size: 26rpx;">￥</text>
										<text style="font-size: 36rpx;">{{money}}</text>
									</text>
									<text style="font-size: 26rpx;">
										<text>×</text>
										<text>{{num1}}</text>
									</text>
								</view>
								<view style="width:462rpx;height: 46rpx;font-size: 26rpx;display: flex;margin-top: 37rpx;justify-content: flex-end;align-items: center;">
									<text>共{{num1}}件商品&nbsp;&nbsp;&nbsp;实付￥{{num1*money}}</text>
								</view>
								<view style="width: 462rpx;display: flex;justify-content:flex-end;margin-top: 32rpx;">
									<text style="width: 176rpx;height: 56rpx;background:rgba(255,255,255,1);border-radius:28px;text-align: center;border:1px solid rgba(151,151,151,1) ;line-height: 56rpx;font-size: 28rpx;">查看详情</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 商品订单 -->
		<view v-if="list===1">
			<view class="nav">
				<text v-for="(tab,i) in tabs" @tap="tabChange(i)" :key="i" :class="{'bg2':i===type,'bg1':!(i===type)}">{{tab.name}}</text>
			</view>

			<view class="middle">
				<!-- 待付款 -->
				<view class="middle-1" v-if="type===0">
					<view class="middle-1-top">
						<view class="middle-1-top-img">
							<image src="../../static/youyanji.png"></image>
						</view>
						<view class="middle-1-top-text">
							<view class="middle-1-top-text-top">
								<text class="middle-1-top-text-top-1">丰本青空调清洗剂家用 挂机清洁洗内机</text>
								<text class="middle-1-top-text-top-2">待付款</text>
							</view>
							<view class="middle-1-top-text-bottom">
								<view class="middle-1-top-text-bottom-left">
									<text>规格:{{ml}}ml</text>
								</view>
							</view>
							<view class="middle-1-bottom">
								<view style="display: flex; justify-content: space-between;width: 462rpx;">
									<text style="margin: 12rpx 0 0 24rpx;">
										<text class="middle-1-bottom-22" style="font-size: 26rpx;">￥</text>
										<text style="font-size: 36rpx;">{{money}}</text>
									</text>
									<text style="font-size: 26rpx;">
										<text>×</text>
										<text>{{num1}}</text>
									</text>
								</view>
								<view style="width:462rpx;height: 46rpx;font-size: 26rpx;display: flex;margin-top: 37rpx;justify-content: flex-end;align-items: center;">
									<text>共{{num1}}件商品&nbsp;&nbsp;&nbsp;实付￥{{num1*money}}</text>
								</view>
								<view style="width: 462rpx;display: flex;justify-content: flex-end;">
									<text style="width: 176rpx;height: 56rpx;background:rgba(255,255,255,1);border-radius:28px;border:1px solid rgba(252,155,25,1);color: #FC9B19;text-align: center;line-height: 56rpx;font-size: 28rpx;margin-top: 30rpx;">去付款</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 待评价 已完成-->
				<view class="middle-2" v-if="type===1">
					<view class="middle-2-top">
						<view class="middle-2-top-img">
							<image src="../../static/youyanji.png"></image>
						</view>
						<view class="middle-2-top-text">
							<view class="middle-2-top-text-top">
								<text class="middle-2-top-text-top-1">丰本青空调清洗剂家用 挂机清洁洗内机</text>
								<text class="middle-2-top-text-top-2">已完成</text>
							</view>
							<view class="middle-2-top-text-bottom">
								<view>
									<text>规格:{{specification}}ml</text>
								</view>
							</view>
							<view class="middle-2-bottom">
								<view style="display: flex; justify-content: space-between;width: 462rpx;">
									<text style="margin: 12rpx 0 0 24rpx;">
										<text class="middle-2-bottom-22" style="font-size: 26rpx;">￥</text>
										<text style="font-size: 36rpx;">{{money}}</text>
									</text>
									<text style="font-size: 26rpx;">
										<text>×</text>
										<text>{{num1}}</text>
									</text>
								</view>
								<view style="width:462rpx;height: 46rpx;font-size: 26rpx;display: flex;margin-top: 37rpx;justify-content: flex-end;align-items: center;">
									<text>共{{num1}}件商品&nbsp;&nbsp;&nbsp;实付￥{{num1*money}}</text>
								</view>
								<view style="width: 380rpx;display: flex;justify-content:space-between;margin-top: 32rpx;margin-left: 70rpx;">
									<text style="width: 176rpx;height: 56rpx;background:rgba(255,255,255,1);border-radius:28px;text-align: center;border:1px solid rgba(151,151,151,1) ;line-height: 56rpx;font-size: 28rpx;">查看详情</text>
									<text style="width: 176rpx;height: 56rpx;background:rgba(255,255,255,1);border-radius:28px;border:1px solid rgba(252,155,25,1);color: #FC9B19;text-align: center;line-height: 56rpx;font-size: 28rpx;"
									 @tap="appraise">评价</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="middle-3" v-if="type===2">
					<view class="middle-3-top">
						<view class="middle-3-top-img">
							<image src="../../static/youyanji.png"></image>
						</view>
						<view class="middle-3-top-text">
							<view class="middle-3-top-text-top">
								<view class="middle-3-top-text-top-1" style="display:flex;align-content: center; justify-content: space-between;">
									<text class="middle-3-top-text-top-1-middle-top">丰本青空调清洗剂家用 挂机清洁洗内机丰本青空调清洗剂</text>
									<!-- <text class="middle-3-top-text-top-1-middle">拼团</text> -->
								</view>

								<text class="middle-3-top-text-top-2">待发货</text>
							</view>
							<view class="middle-3-top-text-bottom">
								<view class="middle-3-top-text-bottom-left">
									<text>规格:{{slot1}}ml</text>
								</view>
							</view>
							<view class="middle-3-bottom">
								<view style="display: flex; justify-content: space-between;width: 462rpx;">
									<text style="margin: 12rpx 0 0 24rpx;">
										<text class="middle-2-bottom-22" style="font-size: 26rpx;">￥</text>
										<text style="font-size: 36rpx;">{{shopmoney}}</text>
									</text>
									<text style="font-size: 26rpx;">
										<text>×</text>
										<text>{{num1}}</text>
									</text>
								</view>
								<view style="width:462rpx;height: 46rpx;font-size: 26rpx;display: flex;margin-top: 37rpx;justify-content: flex-end;align-items: center;">
									<text>共{{num1}}件商品&nbsp;&nbsp;&nbsp;实付￥{{num1*money}}</text>
								</view>
								<view style="width: 462rpx;display: flex;justify-content:flex-end;margin-top: 32rpx;">
									<text style="width: 176rpx;height: 56rpx;background:rgba(255,255,255,1);border-radius:28px;text-align: center;border:1px solid rgba(151,151,151,1) ;line-height: 56rpx;font-size: 28rpx;">提醒发货</text>
								</view>
							</view>
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
				slot: "顶吸",
				money: "2.00",
				num1: "2",
				slot1: "22",
				service: false, //服务订单
				shop: true, //商品订单
				obligation: true, //付款
				accomplish: true, //完成
				evaluate: true, //评价
				waitservice: true, //待服务
				ml: 300,
				shopmoney: 3000,
				specification: 6000,
				bg: "bg1",
				type:0,
				list:0,
				tabs:[
					{name:"全部",check:true},
					{name:"待付款",check:false},
					{name:"待发货",check:false},
					{name:"待收货",check:false},
					{name:"已完成",check:false},
				],
				Tabs:[
					{name:"全部",check:true},
					{name:"待付款",check:false},
					{name:"待服务",check:false},
					{name:"待评价",check:false},
					{name:"已完成",check:false},
				],
				Buttons:[
					{name:"服务订单",check:true},
					{name:"商城订单",check:false}
				]
			}
		},
		methods: {
			ItemButtonChange(index){
				this.list = index
			},
			tabChange(i){
				this.type=i;
			},
			ItemChange(index){
				this.type=index;
			},
			appraise() {
				uni.navigateTo({
					url: "../../components/appraise/appraise"
				})
			},
			Toshop() {
				this.service = false
				this.shop = true
			},
			Toservice() {
				this.service = true
				this.shop = false
			},
			all() {
				this.obligation = true; //服务订单
				this.accomplish = true; //商品订单
				this.evaluate = true; //付款
				this.waitservice = true; //评价
				this.bg = "bg2"
			},
			Obligation() {
				this.obligation = true, //服务订单
					this.accomplish = false, //商品订单
					this.evaluate = false, //付款
					this.waitservice = false //评价
			},
			WaiteValuate() {
				this.obligation = false, //服务订单
					this.accomplish = false, //商品订单
					this.evaluate = false, //付款
					this.waitservice = true //评价
			},
			Over() {
				this.obligation = false, //服务订单
					this.accomplish = true, //商品订单
					this.evaluate = false, //付款
					this.waitservice = true //评价
			}
		}
	}
</script>

<style>
	.middle-3-top-text-top-1-middle {
		width: 90rpx;
		height: 38rpx;
		margin-left: -20rpx;
		font-size: 24rpx;
		background: #FC9B19;
		text-align: center;
		line-height: 38rpx;
		color: #FFFFFF;

	}

	.middle .middle-3 {
		width: 690rpx;
		height: 417rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 5rpx 15rpx 0rpx rgba(238, 238, 238, 1);
		border-radius: 10rpx;
	}

	.bg3{
		background: #007AFF;
		color: #FFFFFF;
	}
	.middle .middle-3-bottom .middle-3-bottom22 {
		font-size: 26rpx;
	}

	.middle-3-bottom {
		width: 120rpx;
		height: 50rpx;
		font-family: PingFangSC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 37rpx;
	}

	.middle-3-top-text-bottom {

		height: 37rpx;
		font-size: 26rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		line-height: 37rpx;
		margin-left: 19rpx;
		margin-top: 80rpx;
	}

	.middle-3-top-text .middle-3-top-text-top {
		margin: 40rpx 0 40rpx 19rpx;
		display: flex;
		justify-content: space-between;
		width: 462rpx;
	}

	.middle-3-top-text .middle-3-top-text-top .middle-3-top-text-top-1 {
		display: flex;
		justify-content: space-between;
		width: 350rpx;
		height: 42rpx;
		font-size: 30rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 42rpx;

	}

	.middle-3-top-text .middle-3-top-text-top .middle-3-top-text-top-2 {
		width: 78rpx;
		height: 37rpx;
		font-size: 26rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(26, 120, 223, 1);
		line-height: 37rpx;
	}

	.middle .middle-3 .middle-3-top {
		display: flex;
	}

	.middle .middle-2-bottom .middle-2-bottom22 {
		font-size: 26rpx;
	}

	.middle-2-bottom {
		width: 120rpx;
		height: 50rpx;
		font-family: PingFangSC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 37rpx;
	}

	.middle-2-top-text-bottom {

		height: 37rpx;
		font-size: 26rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);

		margin-left: 19rpx;
	}

	.middle-2-top-text .middle-2-top-text-top {
		margin: 40rpx 0 40rpx 19rpx;
		display: flex;
		justify-content: space-between;
		width: 462rpx;
	}

	.middle-2-top-text .middle-2-top-text-top .middle-2-top-text-top-1 {
		width: 300rpx;
		height: 42rpx;
		font-size: 30rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 42rpx;
	}

	.middle-2-top-text .middle-2-top-text-top .middle-2-top-text-top-2 {
		width: 78rpx;
		height: 37rpx;
		font-size: 26rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(26, 120, 223, 1);
		line-height: 37rpx;
	}

	.middle .middle-2 .middle-2-top {
		display: flex;
	}

	.bg1 {}

	.bg2 {
		color: #007AFF;
		border-bottom: 1rpx solid #007AFF;
	}

	.nav-top {
		background: rgba(255, 255, 255, 1);
	}

	.nav-top button::after {
		border: none;
	}

	.nav-top button {
		color: #999999;
		background: rgba(255, 255, 255, 1);
	}

	.nav-top button:hover {
		background: rgba(26, 120, 223, 1);
		color: #FFFFFF;
	}

	.middle .middle-1-bottom .middle-1-bottom22 {
		font-size: 26rpx;
	}

	.middle-1-bottom {
		width: 120rpx;
		height: 50rpx;
		font-family: PingFangSC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		line-height: 37rpx;
	}

	.middle-1-top-text-bottom {

		font-size: 26rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		line-height: 37rpx;
		margin-left: 19rpx;
	}

	.middle-1-top-text .middle-1-top-text-top {
		margin: 40rpx 0 40rpx 19rpx;
		display: flex;
		justify-content: space-between;
		width: 462rpx;
	}

	.middle-1-top-text .middle-1-top-text-top .middle-1-top-text-top-1 {
		height: 42rpx;
		width: 300rpx;
		font-size: 30rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1)
	}

	.middle-1-top-text .middle-1-top-text-top .middle-1-top-text-top-2 {
		/* width: 78rpx; */
		height: 37rpx;
		font-size: 26rpx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(26, 120, 223, 1);
		line-height: 37rpx;

	}

	.middle .middle-1 .middle-1-top {
		display: flex;
	}

	.middle image {
		width: 190rpx;
		height: 190rpx;
		margin: 30rpx 0 0 24rpx;
	}

	.middle {
		width: 690rpx;
		margin: 24rpx 0 0 36rpx;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	.nav {
		width: 750rpx;
		height: 77rpx;
		display: flex;
		justify-content: space-around;
		/* position: fixed; */
		font-size: 32rpx;
		line-height: 77rpx;

		overflow: hidden;
	}

	.nav .nav-text-1 {
		/* border-bottom: 4rpx solid #1A78DFFF; */
		/* color: #1A78DFFF; */

	}

	.nav text:hover {
		/* border-bottom: 4rpx solid #1A78DFFF; */
		/* color:#1A78DFFF; */
	}

	.middle .middle-1 {
		width: 690rpx;
		height: 417rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 5px 15px 0px rgba(238, 238, 238, 1);
		border-radius: 10px;
	}

	.middle .middle-2 {
		width: 690rpx;
		height: 417rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 5rpx 15rpx 0rpx rgba(238, 238, 238, 1);
		border-radius: 10rpx;
	}
</style>
