<template>
	<view>
		<view class="middle">
			<view class="middle-1">
				<view class="middle-1-top">
					<view class="middle-1-top-img">
						<image src="../../static/youyanji.png"></image>
					</view>
					<view class="middle-1-top-text">
						<view class="middle-1-top-text-top">
							<text class="middle-1-top-text-top-1">油烟机清洗</text>
							<text class="middle-1-top-text-top-2" >已完成</text>
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
								<text style="width: 176rpx;height: 56rpx;background:rgba(255,255,255,1);border-radius:28px;border:1px solid rgba(252,155,25,1);color: #FC9B19;text-align: center;line-height: 56rpx;font-size: 28rpx;" @tap="ToDetail">查看详情</text>
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
			
			ToDetail(){
				uni.navigateTo({
					url:"../../master/masterdetail/masterdetail"
				})
			},
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
