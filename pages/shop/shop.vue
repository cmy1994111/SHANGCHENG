<template>
	<view>
		<view class="nav">
		<view class="nav-left" @tap="weizhi">{{slot}}</view>
		<view class="nav-middle"></view>
		<button class="nav-middle-search"></button>
		<input class="nav-right" type="text" :placeholder="duct">
		</view>
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item>
				<view class="swiper-item uni-bg-green">
					<image src="../../static/banner-商城.png"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-green">
					<image src="../../static/banner-商城.png"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item uni-bg-green">
					<image src="../../static/banner-首页.png"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="middle">
			<view class="middle-1" >
				<image src="../../static/清洁剂.png"></image>
				<text>清洁剂</text>
			</view>
			<view class="middle-2" >
				<image src="../../static/家电.png"></image>
				<text>家电</text>
			</view>
			<view class="middle-3" >
				<image src="../../static/日用家居.png"></image>
				<text>日用家居</text>
			</view>
			<view class="middle-4" @tap="ToDetail">
				<image src="../../static/更多.png"></image>
				<text>更多</text>
			</view>
		</view>
		<view class="middle-nav">
			<view class="middle-nav-left">
				<text class="uni-flex">清洁服务</text>
			</view>
			<view class="shu"></view>
			<view class="middle-nav-right">
				<text>Hot goods</text>
			</view>
		</view> 
		<view class="footer">
			<view class="footer-left">
				<image src="../../static/空调-首页.png"></image>
				<view class="footer-left-text">
					<view class="footer-left-text-1">
						<text>￥</text>
						<text>{{money}}</text>
					</view>
					<view class="footer-left-text-2">
						<text>￥</text>
						<text>{{yuanjia}}</text>
					</view>
					<view class="footer-left-text-3">
						<text>已售</text>
						<text>{{num}}</text>
					</view>
				</view>
				<view class="footer-left-text-4">
					<text>丰本青空调清洗剂家用 挂机清洁洗内机</text>
				</view>
			</view>		
			<view class="footer-right">
				<image src="../../static/空调-首页.png"></image>
				<view class="footer-right-text">
					<view class="footer-right-text-1">
						<text>￥</text>
						<text>{{money}}</text>
					</view>
					<view class="footer-right-text-2">
						<text>￥</text>
						<text>{{yuanjia}}</text>
					</view>
					<view class="footer-right-text-3">
						<text>已售</text>
						<text>{{num}}</text>
					</view>
				</view>
				<view class="footer-right-text-4">
					<text>丰本青空调清洗剂家用 挂机清洁洗内机</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				slot:"郑州",
				duct:"丰本青",
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				money:700,
				yuanjia:300,
				num:4000,
				Details:[
					{name: "清洁剂",check:true},
					{name: "家电",check:true},
					{name: "日用家居",check:true},
					{name: "更多",check:true}
				]
			}
		},
		methods: {
			ToDetail(){
				uni.navigateTo({
					url:"../../components/detail/detail"
				})
			},
			weizhi(){
				uni.navigateTo({
					url:"../../master/selectadress/selectadress"
				})
			}
		}
	}
</script>

<style>
	.footer .footer-left .footer-left-text{
		width: 336rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top:34rpx ;
	}
	.footer .footer-left .footer-left-text .footer-left-text-1{
		font-size: 26rpx;
		color:#FF0033FF;
		font-family:PingFangSC;
		font-weight:500;
	}
	.footer .footer-left .footer-left-text .footer-left-text-2{
		font-family:PingFangSC;
		font-weight:500;
		color:rgba(153,153,153,1);
		font-size: 24rpx;
		text-decoration:line-through
	}
	.footer .footer-left .footer-left-text .footer-left-text-3{
		font-size:24rpx;
		font-family:PingFangSC;
		color:rgba(153,153,153,1);
	}
	.footer .footer-left .footer-left-text-4{
		width:280rpx;
		height:80rpx;
		font-size:28rpx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:40rpx;
		margin-top:19rpx;
	}
	
	
	
	.footer .footer-right .footer-right-text{
		width: 336rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top:34rpx ;
	}
	.footer .footer-right .footer-right-text .footer-right-text-1{
		font-size: 26rpx;
		color:#FF0033FF;
		font-family:PingFangSC;
		font-weight:500;
	}
	.footer .footer-right .footer-right-text .footer-right-text-2{
		font-family:PingFangSC;
		font-weight:500;
		color:rgba(153,153,153,1);
		font-size: 24rpx;
		text-decoration:line-through
	}
	.footer .footer-right .footer-right-text .footer-right-text-3{
		font-size:24rpx;
		font-family:PingFangSC;
		color:rgba(153,153,153,1);
	}
	.footer .footer-right .footer-right-text-4{
		width:280rpx;
		height:80rpx;
		font-size:28rpx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:40rpx;
		margin-top:19rpx;
	}
	
	
	
	
	.footer{
		width: 714rpx;
		height:547rpx;
		margin: 34rpx 0 0 31rpx;
		display: flex;
		justify-content: space-between;
		}
	.footer image{
		width:336rpx;
		height: 336rpx;
		}
	.shu {
		width: 2rpx;
		height: 38rpx;
		background: rgba(238, 238, 238, 1);
	}
		.middle-nav{
			width: 315rpx;
			height: 62rpx;
			margin:48rpx 0 0 36rpx;
			display: flex;
			justify-content: space-between;
			
			align-items: center;
		}
		.middle-nav .middle-nav-left{
			width:176rpx;
			height:62rpx;
			font-size:44rpx;
			font-family:PingFangSC;
			font-weight:500;
			color:rgba(36,46,66,1);
			line-height:62rpx;
		}
		.middle-nav .middle-nav-right{
			display: flex;
			font-size:24rpx;
			font-family:PingFangSC;
			font-weight:400;
			color:rgba(153,153,153,1);
		}
		.nav{
			width: 646rpx;
			height: 58rpx;
			margin: 24rpx 0  0 30rpx;
			 background:rgba(249,249,249,1); 
			border-radius: 10rpx;
		} 
		.nav .nav-left{
			width: 78rpx;
			padding-left: 44rpx;
			height: 58rpx;
			background: url(../../static/位置-商城.png) no-repeat ;
			background-position: 15rpx 8rpx;
			background-size: 30rpx;
			border-radius: 10rpx 0  0 10rpx;
			font-size: 28rpx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			color: #BEC2CE;
		}
		.nav{
			display: flex;
			justify-content:space-between;
			align-content: center;
			align-items: center;
			}
		.nav .nav-middle{
			width: 2rpx;
			height:32rpx;
			background: #BEC2CE;
			}
		.nav .nav-right{
			width: 515rpx;
			height: 58rpx;
			/* background: url(../../static/搜索-商城.png) no-repeat; */
			/* background-size: 28rpx;
			background-position: 25rpx 18rpx; */
			/* padding-left: 50rpx; */
			font-size: 29rpx;
			display: flex;
			align-items: center;
			color: #BEC2CE;
		}
		.nav-middle-search{
			width: 50rpx;
			height: 58rpx;
			background: url(../../static/搜索-商城.png) no-repeat;
			background-size: 28rpx;
			background-position: 25rpx 18rpx; 
			padding-left: 50rpx;
			
		}
		.nav-middle-search::after{
			display: none;
		}
		.swiper{
			width: 690rpx;
			height: 260rpx;
			margin:25rpx 30rpx 0 30rpx;
			}
	.swiper .swiper-item image{
		width:690rpx;
		height: 260rpx;
		}
	.middle{
		width: 690rpx;
		height: 141rpx;
		margin: 41rpx 0 0 30rpx;
		
		display: flex;
		justify-content: space-around;
		}
		.middle .middle-1{
			width: 94rpx;
			height: 141rpx;
			
		}
		.middle .middle-2{
			width: 94rpx;
			height: 141rpx;
			
		}
		.middle .middle-3{
			width: 94rpx;
			height: 141rpx;
			
		}
		.middle .middle-4{
			width: 94rpx;
			height: 141rpx;
			
		}
		.middle image{
				width: 94rpx;
				height: 94rpx;
			}
		.middle-1,.middle-2,.middle-3,.middle-4{
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			font-size: 26rpx;
			align-items: center;
			color: #333333FF;
			}
			.middle .middle-3{
				width: 104rpx;
				}
</style>
