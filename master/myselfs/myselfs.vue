<template>
	<view>
		<van-tabbar :active="active" active-color="#477DFC" inactive-color="#000" v-bind:change="onTabChange">
			<van-tabbar-item icon="home-o" @tap="ToHome">首页</van-tabbar-item>
			<van-tabbar-item icon="orders-o" @tap="ToChange">订单</van-tabbar-item>
			<van-tabbar-item icon="manager-o" @tap="ToMyself">我的</van-tabbar-item>
		</van-tabbar>
		<view class="nav">
			<view class="nav-left">
				<image src="../../static/日用家居.png"></image>
			</view>
			<view class="nav-right" @tap="ToRegister">{{name}}
				<uni-rate size="18" disabled="true" :value="num"></uni-rate>
			</view>
			<view style="width:204rpx; margin:170rpx 0 0 146rpx;display: flex;height:86rpx;flex-direction: column;align-items: flex-end ;">
				<view>
					<text style="font-size: 28rpx;color: #FFFFFF;">￥</text>
					<text style="font-size: 60rpx;color: #FFFFFF;">{{money}}</text>
				</view>
				<text style="font-size:26rpx;color: #FFFFFF;" @tap="ToGetMyMoney">提现</text>
			</view>
		</view>
		<view class="middle">
			<cmd-cell-item title="我的状态"  addon="开工" show-switch  @switch="fnClick" switch-color="#2f86f6" />
			<cmd-cell-item title="排行榜"  arrow @click="ToRanking"  />
			<cmd-cell-item title="订单记录"  arrow @click="OrderHistory" />
			<cmd-cell-item title="关于我们"  arrow @click="ToAbouts"/>
			<cmd-cell-item title="意见反馈"  arrow @click="ToOpinion"/>
			<cmd-cell-item title="切换身份"  arrow @click='ToCard' />
		</view>
	</view>
</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	import asyncSwitch from "@/components/helang-asyncSwitch/helang-asyncSwitch.vue"
	import uniRate from "../../components/uni-rate/uni-rate.vue"
	export default {
		components: {
			uniRate,
			"async-switch": asyncSwitch,
			cmdCellItem
		},
		data() {
			return {
				active: 2,
				name: "王大陆",
				num: 5,
				money: "255550",
				checked1: true
			}
		},

		methods: {
			ToRegister(){
				uni.navigateTo({
					url:"../register/register"
				})
			},
			onTabChange(e) {
				console.log(e.detail)
				console.log(111)
				this.active = e.detail
			},
			ToGetMyMoney(){
				uni.navigateTo({
					url:"../mymoney/mymoney"
				})
			},
			ToAbouts(){
				uni.navigateTo({
					url:"../abouts/abouts"
				})
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
			},
			ToHome(){
				uni.navigateTo({
					url:"../home/home"
				})
			},
			ToRanking(){
				uni.navigateTo({
					url:"../ranking/ranking"
				})
			},
			ToCard(){
				uni.navigateTo({
					url:"../../components/qidong/qidong"
				})
			}
			
			}
		}
</script>

<style lang="scss" scoped>
	.nav {
		width: 750rpx;
		height: 400rpx;
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
		width: 119rpx;
		height: 119rpx;
		border-radius: 100%;
		margin: 154rpx 32rpx 0 30rpx;
	}

	.nav .nav-right {
		margin: 154rpx 0 0 25rpx;
		width: 187rpx;
		height: 87rpx;
		font-size: 30rpx;
		font-family: PingFangSC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 72rpx;
	}
</style>
