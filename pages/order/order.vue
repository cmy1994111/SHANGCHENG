<template>
	<view>
		<view class="nav-top" style="display: flex;width: 690rpx;height: 98rpx;align-items: center;justify-content: space-between;    border-radius: 100rpx;margin-left: 29rpx;border:1px solid rgba(229,229,229,1);">
			<button style="width:335rpx;height:78rpx;border-radius: 100px;line-height: 78rpx;">服务订单</button>
			<button style="width:335rpx;height:78rpx;border-radius: 100px;line-height: 78rpx;">商品订单</button>
		</view>
		<view class="nav">
			<text class="nav-text-1">全部</text>
			<text>待付款</text>
			<text>待服务</text>
			<text>待评价</text>
			<text>已完成</text>
		</view>
		
		<view class="middle">
			<view class="middle-1">
				<view class="middle-1-top">
					<view class="middle-1-top-img">
						<image src="../../static/youyanji.png"></image>
					</view>
					<view class="middle-1-top-text">
						<view class="middle-1-top-text-top">
							<text class="middle-1-top-text-top-1">油烟机清洗</text>
							<text class="middle-1-top-text-top-2" >待付款</text>
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
									<text >×</text>
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
			<view class="middle-2">
				<view class="middle-2-top">
					<view class="middle-2-top-img">
						<image src="../../static/youyanji.png"></image>
					</view>
					<view class="middle-2-top-text">
						<view class="middle-2-top-text-top">
							<text class="middle-2-top-text-top-1">油烟机清洗</text>
							<text class="middle-2-top-text-top-2" >待评价</text>
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
									<text >×</text>
									<text>{{num1}}</text>
									</text>
							</view>
							<view style="width:462rpx;height: 46rpx;font-size: 26rpx;display: flex;margin-top: 37rpx;justify-content: flex-end;align-items: center;">
								<text>共{{num1}}件商品&nbsp;&nbsp;&nbsp;实付￥{{num1*money}}</text>
							</view>
							<view style="width: 380rpx;display: flex;justify-content:space-between;margin-top: 32rpx;margin-left: 70rpx;">
						<text style="width: 176rpx;height: 56rpx;background:rgba(255,255,255,1);border-radius:28px;text-align: center;border:1px solid rgba(151,151,151,1) ;line-height: 56rpx;font-size: 28rpx;">查看详情</text>	
								<text style="width: 176rpx;height: 56rpx;background:rgba(255,255,255,1);border-radius:28px;border:1px solid rgba(252,155,25,1);color: #FC9B19;text-align: center;line-height: 56rpx;font-size: 28rpx;" @tap="appraise">评价</text>
							</view>
						</view> 
					</view>
				</view>
			</view>
			
			
			<view class="middle-3">
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
							
							<text class="middle-3-top-text-top-2" >进行中</text>
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
									<text >×</text>
									<text>{{num1}}</text>
									</text>
							</view>
							<view style="width:462rpx;height: 46rpx;font-size: 26rpx;display: flex;margin-top: 37rpx;justify-content: flex-end;align-items: center;">
								<text>共{{num1}}件商品&nbsp;&nbsp;&nbsp;实付￥{{num1*money}}</text>
							</view>
							<view style="width: 462rpx;display: flex;justify-content:flex-end;margin-top: 32rpx;">
								<text style="width: 176rpx;height: 56rpx;background:rgba(255,255,255,1);border-radius:28px;text-align: center;border:1px solid rgba(151,151,151,1) ;line-height: 56rpx;font-size: 28rpx;">查看详情</text>
								<!-- <text style="width: 176rpx;height: 56rpx;background:rgba(255,255,255,1);border-radius:28px;border:1px solid rgba(252,155,25,1);color: #FC9B19;text-align: center;line-height: 56rpx;font-size: 28rpx;">评价</text> -->
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
				slot:"顶吸",
				money:"2.00",
				num1:"2",
				slot1:"22"
			}
		},
		methods: {
			appraise(){
				uni.navigateTo({
					url:"../../components/appraise/appraise"
				})
			}
		}
	}
</script>

<style>
	.middle-3-top-text-top-1-middle{
		width: 90rpx;
		height: 38rpx;
		margin-left:-20rpx;
		font-size: 24rpx;
		background:#FC9B19;
		text-align: center;
		line-height:38rpx;
		color: #FFFFFF;
		
	}
	.middle .middle-3{
		width: 690rpx;
		height: 417rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 5rpx 15rpx 0rpx rgba(238,238,238,1);
		border-radius:10rpx;
	}
	
	
	.middle .middle-3-bottom .middle-3-bottom22{
		font-size: 26rpx;
	}
	.middle-3-bottom{
		width:120rpx;
		height:50rpx;
		font-family:PingFangSC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:37rpx;
	}
	.middle-3-top-text-bottom{
		width:130rpx;
		height:37rpx;
		font-size:26rpx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(153,153,153,1);
		line-height:37rpx;
		margin-left:19rpx ;
		}
	.middle-3-top-text .middle-3-top-text-top{
		margin: 40rpx 0 40rpx 19rpx;
		display: flex;
		justify-content: space-between;
		width: 462rpx;
	}
	 .middle-3-top-text .middle-3-top-text-top	.middle-3-top-text-top-1{
		display: flex;
		justify-content: space-between;
		width:260rpx;
		height:42rpx;
		font-size:30rpx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:42rpx;
		
	}
	.middle-3-top-text .middle-3-top-text-top	.middle-3-top-text-top-2{
		width:78rpx;
		height:37rpx;
		font-size:26rpx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(26,120,223,1);
		line-height:37rpx;
	}
	.middle  .middle-3 .middle-3-top{
		display: flex;
		}
	
	
	
	
	
	
	
	
	
	
	
	.middle .middle-2-bottom .middle-2-bottom22{
		font-size: 26rpx;
	}
	.middle-2-bottom{
		width:120rpx;
		height:50rpx;
		font-family:PingFangSC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:37rpx;
	}
	.middle-2-top-text-bottom{
		width:130rpx;
		height:37rpx;
		font-size:26rpx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(153,153,153,1);
		line-height:37rpx;
		margin-left:19rpx ;
		}
	.middle-2-top-text .middle-2-top-text-top{
		margin: 40rpx 0 40rpx 19rpx;
		display: flex;
		justify-content: space-between;
		width: 462rpx;
	}
	.middle-2-top-text .middle-2-top-text-top	.middle-2-top-text-top-1{
		width:150rpx;
		height:42rpx;
		font-size:30rpx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:42rpx;
	}
	.middle-2-top-text .middle-2-top-text-top	.middle-2-top-text-top-2{
		width:78rpx;
		height:37rpx;
		font-size:26rpx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(26,120,223,1);
		line-height:37rpx;
	}
	.middle  .middle-2 .middle-2-top{
		display: flex;
		}
		
		
	
	.nav-top{
		background:rgba(255,255,255,1);
	}
	.nav-top button::after{
		border: none;
	}
	.nav-top button{
		color: #999999;
		background:rgba(255,255,255,1);
	}
	.nav-top button:hover{
		background:rgba(26,120,223,1);
		color: #FFFFFF;
	}
	.middle .middle-1-bottom .middle-1-bottom22{
		font-size: 26rpx;
	}
	.middle-1-bottom{
		width:120rpx;
		height:50rpx;
		font-family:PingFangSC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:37rpx;
	}
	.middle-1-top-text-bottom{
		width:130rpx;
		height:37rpx;
		font-size:26rpx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(153,153,153,1);
		line-height:37rpx;
		margin-left:19rpx ;
		}
	.middle-1-top-text .middle-1-top-text-top{
		margin: 40rpx 0 40rpx 19rpx;
		display: flex;
		justify-content: space-between;
		width: 462rpx;
	}
	.middle-1-top-text .middle-1-top-text-top	.middle-1-top-text-top-1{
		width:150rpx;
		height:42rpx;
		font-size:30rpx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:42rpx;
	}
	.middle-1-top-text .middle-1-top-text-top	.middle-1-top-text-top-2{
		width:78rpx;
		height:37rpx;
		font-size:26rpx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(26,120,223,1);
		line-height:37rpx;
		
	}
	.middle  .middle-1 .middle-1-top{
		display: flex;
		}
	.middle image{
		width: 190rpx;
		height: 190rpx;
		margin: 30rpx 0 0 24rpx;
		}
	.middle{
		width: 690rpx;
		margin: 24rpx 0 0 36rpx;
		display: flex;
		justify-content:space-between;
		flex-direction: column;
	}
.nav{
	width: 750rpx;
	height: 77rpx;
	display: flex;
	justify-content: space-around;
	/* position: fixed; */
	font-size: 32rpx;
	line-height: 77rpx;
	
	overflow: hidden;
	}
	.nav .nav-text-1{
		border-bottom: 4rpx solid #1A78DFFF;
		color: #1A78DFFF;
		
	}
.nav text:hover{
	border-bottom: 4rpx solid #1A78DFFF;
	color:#1A78DFFF;
}
.middle .middle-1{
	width: 690rpx;
	height: 417rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 5px 15px 0px rgba(238,238,238,1);
	border-radius:10px;
	}
	.middle .middle-2{
		width: 690rpx;
		height: 417rpx;
		background:rgba(255,255,255,1);
		box-shadow:0rpx 5rpx 15rpx 0rpx rgba(238,238,238,1);
		border-radius:10rpx;
	}
</style>
