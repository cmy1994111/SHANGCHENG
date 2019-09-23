<template>
	<view>
	<view class="nav">
			<view class="nav-middle-233" v-for="(item , index) in systems" :key="index">
			<view class="nav-middle">
				<view class="nav-left-img">
					<image src="../../static/master/图层3.png" style="width: 90rpx;height: 90rpx;margin-left: 32rpx;"></image>
				</view>
				<view class="nav-right">
					<view class="nav-right-top">
						<text style="font-size: 28rpx;color: #333333;">温馨提示</text>
						<text style="font-size: 24rpx;color: #999;">{{item.time}}</text>
					</view>
					<view class="nav-right-bottom" style="font-size: 24rpx;color: #999;" >
						{{item.xioaxi}}
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
				time:"10:23",
				time1:"20:34",
				name:"沈剑心",
				chat:"你好方便加下微信吗",
				time3:"19:56",
				systems:[
					{name:"121212121",xioaxi:"how are you",time:"19:24"},
					{name:"11323",xioaxi:"I,m fine",time:"19:25"},
					{name:"121323",xioaxi:"and you",time:"19:26"}]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.nav-right-top{
		display: flex;
		justify-content: space-between;
	}
	.nav-middle-233{
		width: 750rpx;
		height: 130rpx;
		border-bottom: 1rpx solid #DEDEDE;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.nav-left-img{
		width: 90rpx;
		height: 90rpx;
	}
	.nav-right{
		width: 575rpx;
		height: 90rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 32rpx;
	}
	.nav-middle{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.nav-right-top-1{
		display: flex;
		justify-content: space-between;
	}
	.nav-left-img-1{
		width: 90rpx;
		height: 90rpx;
	}
	.nav-right-1{
		width: 575rpx;
		height: 90rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 52rpx;
	}
	.nav-middle-1{
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom: 1rpx solid #DEDEDE;
		width: 750rpx;
		height: 130rpx;
	}
</style>
