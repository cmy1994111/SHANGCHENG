<template>
	<view>
		<view class="nav">
			<van-progress :percentage="sun" stroke-width="9" />
			<view>
			<text  style="font-size: 22rpx;color: #666666;margin-left: ;">开团</text>
			<text style="font-size: 22rpx;color: #666666;margin-left:356rpx;">剩余{{number}}人即可拼团成功</text>
			</view>
		</view>
		<view class="product">
			<view class="product-left">
				<image src="../../static/youyanji.png" style="width:182rpx;height: 182rpx;"></image>
			</view>
			<view class="product-right">
				<view class="">
					
				
				<view style="font-size: 24rpx;color: #333333;">{{producttype}}</view>
				<view style="font-size: 21rpx;color: 21rpx;">{{type}}</view>
				</view>
				<view class="product-right-footer">
					<view>
						<text style="font-size:31rpx;color:#FF0101;">￥<text>{{money}}</text></text>
						<text style="font-size:24rpx;color:#999999;text-decoration: line-through;margin-left: 14rpx;">￥{{money1}}</text>
					</view>
					<view style="font-size:31rpx;color:#1A78DF ;font-weight: 500;font-family:Source Han Sans CN;">{{active}}</view>
				</view>
			</view>
		</view>
		<view class="product-type">
			<view style="width:664rpx;height: 105rpx;font-size: 28rpx;color: #353535;text-align: center;line-height: 105rpx;">
				<text>拼团怎么玩</text>
			</view>
			<view style="display: flex;width: 664rpx;justify-content: space-around;font-size:22rpx;color:#666">
				<view style="200rpx;height: 105rpx;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
					<view style="width: 53rpx;height: 53rpx;color: #FFFFFF;font-size: 24rpx;text-align: center;line-height: 53rpx;border-radius: 50%;background:#528DDB ;">1</view>
					<text>选择商品</text>
				</view>
				<view style="200rpx;height: 105rpx;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
					<view style="width: 53rpx;height: 53rpx;color: #FFFFFF;font-size: 24rpx;text-align: center;line-height: 53rpx;border-radius: 50%;background:#528DDB ;">2</view>
					<text>支付开团</text>
				</view>
				<view style="200rpx;height: 105rpx;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
					<view style="width: 53rpx;height: 53rpx;color: #FFFFFF;font-size: 24rpx;text-align: center;line-height: 53rpx;border-radius: 50%;background:#528DDB ;">3</view>
					<text>邀请拼团</text>
				</view>
				<view style="200rpx;height: 105rpx;display: flex;flex-direction: column;align-items: center;justify-content: space-between;">
					<view style="width: 53rpx;height: 53rpx;color: #FFFFFF;font-size: 24rpx;text-align: center;line-height: 53rpx;border-radius: 50%;background:#528DDB ;">4</view>
					<text>拼团成功</text>
				</view>
			</view>
		</view>
		<view class="product-name">
			<view style="width: 73rpx;height: 73rpx;border-radius: 50%;background: a9d2f8;">
				<image src="../../static/master/未标题-2_03.png" style="width: 73rpx;height: 73rpx;border-radius: 50%;"></image>
			</view>
			<view style="width: 73rpx;height: 73rpx;border-radius: 50%;background: a9d2f8;">
				<image src="../../static/master/未标题-2_03.png" style="width: 73rpx;height: 73rpx;border-radius: 50%;"></image>
			</view>
			<view style="width: 73rpx;height: 73rpx;border-radius: 50%;background: a9d2f8;">
				<image src="../../static/master/未标题-2_03.png" style="width: 73rpx;height: 73rpx;border-radius: 50%;"></image>
			</view>
			<view style="width: 73rpx;height: 73rpx;border-radius: 50%;background: a9d2f8;">
				<image src="../../static/master/未标题-2_03.png" style="width: 73rpx;height: 73rpx;border-radius: 50%;"></image>
			</view>
			<view style="width: 73rpx;height: 73rpx;border-radius: 50%;background: a9d2f8;">
				<image src="../../static/master/未标题-2_03.png" style="width: 73rpx;height: 73rpx;border-radius: 50%;"></image>
			</view>
			<view style="width: 73rpx;height: 73rpx;border-radius: 50%;background: a9d2f8;">
				<image src="../../static/master/未标题-2_03.png" style="width: 73rpx;height: 73rpx;border-radius: 50%;"></image>
			</view>
		</view>
		<button class="but">马上抢</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				producttype:"清洁热水器",
				type:"深度清洁水垢",
				sun:50,
				number:5,
				active:"拼团中...",
				money:68,
				money1:98
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.but{
		width:690rpx;
		height:88rpx;
		background:linear-gradient(-90deg,rgba(26,120,223,1),rgba(98,166,240,1));
		box-shadow:0rpx 5rpx 18rpx 0rpx rgba(26,120,223,0.33);
		border-radius:25rpx;
		margin-top:43rpx;
		font-family:Source Han Sans CN;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.product-name{
		width: 664rpx;
		height: 73rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 32rpx;
		margin-top: 29rpx;
	}
	.product-type{
		width: 664rpx;
		height: 243rpx;
		 background:#ecf3fc;
		margin:24rpx 0 0 30rpx;
		display: flex;
		flex-direction: column;
	}
	.product-right{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-direction: column;
	}
	.product-right-footer{
		display: flex;
		justify-content: space-between;
	}
	.nav{
		width: 650rpx;
		height: 200rpx;
		margin-left: 50rpx;
		display: flex;
		align-content: center;
		flex-direction: column;
		justify-content: center;
		
	}
	.product{
		width:664rpx;
		height: 182rpx;
		margin-left: 32rpx;
		
		display: flex;
	}
	.product-right{
		width: 450rpx;
		height: 182rpx;
		margin-left:32rpx ;
	}
</style>
