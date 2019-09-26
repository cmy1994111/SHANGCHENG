<template>
	<view>
		<view>
		<van-nav-bar :title="product" 
		 title-class="title-class"
		 left-arrow bind:click-left="onClickLeft"
		  />
		  
		  </view>
		  <view style="display: flex;flex-wrap: wrap;justify-content: space-around;">
		  <view class="product" v-for="(item ,index) in products" :key="index">
			  <view class="pt">
				  <image src="../../static/热水器-首页.png"style="width: 336rpx;height:336rpx;"></image>
				  <view style="display: flex;justify-content: space-around;align-items: center;margin-top: 28rpx;">
					  <text style="font-size:26rpx;color:#FF0033;" >￥<text style="font-size: 36rpx;color: #FF0033;font-weight: 300;font-family:PingFangSC-Medium,PingFangSC;">{{item.money}}</text></text>
					   <text style="font-size:24rpx; color:#999999;text-decoration: line-through;">￥{{item.money1}}</text>
					    <text style="font-size:24rpx;color:#999999;">已售{{sum}}</text>
				  </view>
				  <view style="font-size: 28rpx;color: #333333;width: 280rpx;margin:19rpx 0 0 20rpx;">丰本青空调清洗剂家用 挂机清洁洗内机</view>
			  </view>
		  </view>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// money:"300",
				// money1:"360",
				sum:"99",
				product: "丰本青",
				products: [{
					name: "风本青1",
					money:300,
					money1:360,
				}, {
					name: "风本青2",
					money:300,
					money1:360,
				}, {
					name: "风本青3",
					money:300,
					money1:360,
				}, {
					name: "风本青4",
					money:300,
					money1:360,
				}]
			}
		},
		methods: {
			onClickLeft() {
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pt{
		display: flex;
		flex-direction: column;
		align-content: center;
	}
.title-class{
	font-size: 36rpx;
	color: #000000;
}
.product{
	width:336rpx;
	height:547rpx;
	background:rgba(255,255,255,1);
	box-shadow:0rpx 5rpx 15rpx 0rpx rgba(238,238,238,1);
	border-radius:15rpx;
	margin-top: 20rpx;
}
</style>
