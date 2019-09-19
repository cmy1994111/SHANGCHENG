<template>
	<view>
		<view class="all">
		<view class="shopPing">
			<view class="shopPing-left">
				<image :src="imageURL"></image>
			</view>
			<view class="shopPing-right">
				<view class="shopPing-right-top">
					<text>丰本青空调清洗剂家用挂机清洁洗内机</text>
				</view>
				<view class="shopPing-right-bottom">
					<view>
					<text class="shopPing-right-bottom-1">￥{{spirce}}</text>
					<text class="shopPing-right-bottom-2">￥{{spirceUL}}</text>
					</view>
					<text class="shopPing-right-bottom-3">已售{{sold}}</text>
				</view>
			</view>
		</view>
		<view class="collect" style="display: flex;justify-content:flex-end;">
			<text class="collect-text" style="font-size: 26rpx;color:rgba(102,102,102,1);">{{year}}收藏</text>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				spirceUL:"300",
				spirce:"600",
				imageURL:"/static/logo.png",
				num2:"2",
				sold:"88",
				year:"2018.9.1"
			}
		},
		onLoad(){
			
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.shopPing{
		width: 690rpx;
		height: 234rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 0rpx 10rpx 0rpx rgba(238,238,238,1);
		border-radius:10rpx;
		display: flex;
		justify-content: space-between;
		margin-left: 30rpx;
		}
	.shopPing image{
		width: 234rpx;
		height: 234rpx;
	}
	.shopPing .shopPing-right{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.shopPing .shopPing-right .shopPing-right-bottom{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.shopPing 
	.shopPing-right
	 .shopPing-right-bottom 
	 .shopPing-right-bottom-1{
		 width:116rpx;
		 height:42rpx;
		 font-size:30rpx;
		 font-family:PingFangSC;
		 font-weight:400;
		 color:rgba(255,0,0,1);
		 line-height:42rpx;
		 margin-left: 18rpx;
	 }
	 .shopPing
	 .shopPing-right
	  .shopPing-right-bottom 
	  .shopPing-right-bottom-2{
		  width:60rpx;
		  height:33rpx;
		  font-size:24rpx;
		  font-family:PingFangSC;
		  font-weight:500;
		  color:rgba(153,153,153,1);
		  line-height:33rpx;
		  margin-left: 30rpx;
		  text-decoration:line-through
	  }
	  .shopPing
	  .shopPing-right
	   .shopPing-right-bottom 
	   .shopPing-right-bottom-3{
		   /* width:76rpx;
		   height:33rpx; */
		   font-size:24rpx;
		   font-family:PingFangSC;
		   font-weight:400;
		   color:rgba(153,153,153,1);
		   line-height:33rpx;
	   }
	.shopPing
	.shopPing-right .shopPing-right-top{
		width:427rpx;
		height:90rpx;
		font-size:32rpx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:45rpx;
		margin-left: 13rpx;
	}
	.all .collect{
		width: 690rpx;
		height: 87rpx;
		line-height: 87rpx;
		margin-left:30rpx;
		display: flex;
		justify-content: space-between;
		 font-size:26px;;
	}
</style>
