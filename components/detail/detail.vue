<template>
	<view>
		<view class="product">
			<view class="product-img">
				<image src="../../static/youyanji.png"></image>
			</view>
			<view class="product-middle">
				<view class="product-middle-price">
					<view style="margin-left:30rpx;">
						<text style="font-size:36rpx;color: #FF0505;">￥</text>
						<text style="font-size:50rpx;color: #FF0505;">{{price}}</text>
					</view>
					<view>
						<text style="font-size:26rpx;color: #999999;margin-right:30rpx ;">已售{{sum}}万+</text>
					</view>
				</view>
				<view class="product-middle-price-bottom">
					<text style="font-size: 32rpx;color: #333333;margin-left: 30rpx;font-weight: 400;font-family: PingFangSC;">{{typeNAME}}</text>
				</view>
			</view>
			<!-- 选择类别 -->
			<view class="product-middle-type">
				<view class="product-middle-type-select">
					<view style="font-size: 28rpx;color: #333333;margin-left: 30rpx;margin-top: -10rpx;">选择类别</view>
					<view style="display: flex;">
						<view class="type1">{{type1}}</view>
						<view class="type2">{{type2}}</view>
					</view>
				</view>
			</view>
			<!-- 评价 -->
			<view class="product-footer-evaluate">
				<!-- <view class="product-footer-evaluate-nav">
					<text>商品评价({{sum222}})</text>
				</view> -->
				<view class="product-footer-evaluate-footer">
					<!-- 头像评分 -->
					<!-- <view>
					<view class="product-footer-evaluate-footer-touxiang" ></view>
					<view class="product-footer-evaluate-footer-pingfen" ></view>
					</view> -->
					<!-- 评语 -->
					<!-- <view>
						<text>{{remark}}</text>
					</view> -->
					<!-- 上传图片 -->
					<!-- <view>
						<image :src="imageURL"></image>
					</view> -->
					<uni-evaluate :list-data="evaluateData" :rate="rateData"/>
				</view>
				<navigator url="../cart/cart">
					<view class="cart">
						<image src="../../static/购物车.png"></image>
					</view>
				</navigator>
			</view>
			
		</view>
		<van-goods-action>
		  <van-goods-action-icon
		    icon="service-o"
		    text="客服"
		    bind:click="onClickIcon"
		  />
		  <van-goods-action-icon
		    icon="phone-o"
		    text="电话"
		    bind:click="onClickIcon"
		  />
		  <van-goods-action-button
		    text="发起拼团"
		    type="warning"
		    bind:click="onClickButton"
		  />
		  <van-goods-action-button
		    text="立即购买"
		    bind:click="onClickButton"
		  />
		</van-goods-action>
	</view>
</template>

<script>
	import uniEvaluate from '../../components/xiujun-evaluate/uni-evaluate.vue';
	export default {
		components: {uniEvaluate},
		data() {
			return {
				price: "108",
				sum: "5",
				typeNAME: "专业去油污清洁油烟机",
				type1: "侧吸98.00",
				type2: "顶吸88.00",
				sum222:"23232",
				remark:"好好好好好好好好好好好好好好好好好好好好好好",
				imageURL:"static/banner-商城.png"
			}
		},
		methods: {

		}
	}
</script>

<style>
		.cart{
			width: 120rpx;
			height: 120rpx;
			background:rgba(26,120,223,1);
			position: fixed;
			right:36rpx;
			bottom:173rpx;
			border-radius: 100%;
		}
		.cart image{
			width: 120rpx;
			height: 120rpx;
		}
		.product-footer-evaluate{
			width: 750rpx;
			min-height: 779rpx;
			line-height: 105rpx;
			/* margin-left: 30rpx; */
			font-size: 32rpx;
			color: #333333;
			font-family:PingFangSC;
			font-weight:400;
			border: 1rpx solid rgba(238,238,238,1) ;
			background:rgba(255,255,255,1);
			border-radius:24px;
		}
		.product-footer-evaluate .product-footer-evaluate-nav{
			line-height: 105rpx;
			 margin-left: 30rpx; 
			font-size: 32rpx;
			color: #333333;
			font-family:PingFangSC;
			font-weight:400;
			border-bottom: 1rpx solid rgba(238,238,238,1) ;
			background:rgba(255,255,255,1);
			
		}
	
	
	
	
	
	.product {
		background: rgba(242, 243, 245, 1);
	}
	.product .product-img {
		width: 678rpx;
		height: 401rpx;
		margin-left: 25rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.product .product-img image {
		width: 450rpx;
		height: 260rpx;
	}

	.product-middle {
		width: 750rpx;
		height: 216rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		background: rgba(255, 255, 255, 1);
		border-radius: 25rpx;
		overflow: hidden;
	}

	.product-middle .product-middle-price {
		display: flex;
		justify-content: space-between;
	}

	.product .product-middle-type {
		width: 750rpx;
		height: 178rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 25rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
          .product .product-middle-type .product-middle-type-select{
			  display: flex;
			  flex-direction: column;
			  height:178rpx;
			  justify-content: space-around;
			  margin-top: 20rpx;
		  }
	.product .product-middle-type .type1 {
		width: 210rpx;
		height: 58rpx;
		border-radius: 29rpx;
		text-align: center;
		line-height: 58rpx;
		margin: 0 30rpx;
		background: rgba(238, 238, 238, 1);
		font-size:26rpx;
	}
	.product .product-middle-type .type2 {
		width: 210rpx;
		height: 58rpx;
		border-radius: 29rpx;
		text-align: center;
		line-height: 58rpx;
		margin: 0 30rpx;
		background: rgba(238, 238, 238, 1);
		font-size:26rpx;
	}
</style>
