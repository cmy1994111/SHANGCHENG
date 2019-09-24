<template>
	<view class="all">
		<view class="left" >
			<view class="left-1" v-for="(item,index) in SafeList" :key="index" @tap="Safe(index)" :class="{'bg2':index===type,'bg1':!(index===type)}">{{item.name}}</view>
		</view>
		<!-- 智能家居 -->
		<view class="right" v-if="type===0">
			<view class="right-top" v-for="(arr ,index) in SafeList" :key=index>
				<view class="right-top-top">{{arr.name}}</view>
				<view style="display: flex;flex-wrap: wrap;justify-content: space-between;">
				<view class="producttype" v-for="(item,index) in products" :key="index">
					<image :src="imagurl" style="width:70rpx;height: 70rpx;background: #007BFF;"></image>
					<text>{{item.name}}</text>
				</view>
				</view>
				<view style="font-size: 30rpx;color: #DEDEDE;">更多</view>
			</view>
		</view>
		<!-- 清洁剂 -->
		<view class="right"  v-if="type===1">
			<view class="right-top" v-for="(arr ,index) in SafeList" :key=index>
				<view class="right-top-top">{{arr.name}}</view>
				<view style="display: flex;flex-wrap: wrap;justify-content: space-between;">
				<view class="producttype" v-for="(item,index) in products" :key="index">
					<image :src="imagurl" style="width:70rpx;height: 70rpx;background: #007BFF;"></image>
					<text>{{item.name}}</text>
				</view>
				</view>
				<view style="font-size: 30rpx;color: #DEDEDE;">更多1</view>
			</view>
		</view>
		<!-- 日用百货 -->
		<view class="right"  v-if="type===2">
			<view class="right-top" v-for="(arr ,index) in SafeList" :key=index>
				<view class="right-top-top">{{arr.name}}</view>
				<view style="display: flex;flex-wrap: wrap;justify-content: space-between;">
				<view class="producttype" v-for="(item,index) in products" :key="index">
					<image :src="imagurl" style="width:70rpx;height: 70rpx;background: #007BFF;"></image>
					<text>{{item.name}}</text>
				</view>
				</view>
				<view style="font-size: 30rpx;color: #DEDEDE;">更多2</view>
			</view>
		</view>
		<!-- 服装服饰 -->
		<view class="right"  v-if="type===3">
			<view class="right-top" v-for="(arr ,index) in SafeList" :key=index>
				<view class="right-top-top">{{arr.name}}</view>
				<view style="display: flex;flex-wrap: wrap;justify-content: space-between;">
				<view class="producttype" v-for="(item,index) in products" :key="index">
					<image :src="imagurl" style="width:70rpx;height: 70rpx;background: #007BFF;"></image>
					<text>{{item.name}}</text>
				</view>
				</view>
				<view style="font-size: 30rpx;color: #DEDEDE;">更多3</view>
			</view>
		</view>
		<!-- 美容护肤 -->
		<view class="right"  v-if="type===4">
			<view class="right-top" v-for="(arr ,index) in SafeList" :key=index>
				<view class="right-top-top">{{arr.name}}</view>
				<view style="display: flex;flex-wrap: wrap;justify-content: space-between;">
				<view class="producttype" v-for="(item,index) in products" :key="index">
					<image :src="imagurl" style="width:70rpx;height: 70rpx;background: #007BFF;"></image>
					<text>{{item.name}}</text>
				</view>
				</view>
				<view style="font-size: 30rpx;color: #DEDEDE;">更多4</view>
			</view>
		</view>
		<!-- 食品饮料 -->
		<view class="right"  v-if="type===5">
			<view class="right-top" v-for="(arr ,index) in SafeList" :key=index>
				<view class="right-top-top">{{arr.name}}</view>
				<view style="display: flex;flex-wrap: wrap;justify-content: space-between;">
				<view class="producttype" v-for="(item,index) in products" :key="index">
					<image :src="imagurl" style="width:70rpx;height: 70rpx;background: #007BFF;"></image>
					<text>{{item.name}}</text>
				</view>
				</view>
				<view style="font-size: 30rpx;color: #DEDEDE;">更多5</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:0,
				SafeList:[
					{name:"智能家居",check:true},
					{name:"清洁剂",check:false},
					{name:"日用百货",check:false},
					{name:"服装服饰",check:false},
					{name:"美容护肤",check:false},
					{name:"食品饮料",check:false},
				],
				Product:[
					{name:"智能家居"},
					{name:"智能安防"},
					{name:"厨卫大电"}
				],
				products:[
					{name:"路由器",imageurl:""},
					{name:"路由器",imageurl:""},
					{name:"路由器",imageurl:""},
					{name:"路由器",imageurl:""},
					{name:"路由器",imageurl:""},
					{name:"路由器",imageurl:""},
					{name:"路由器",imageurl:""}
				]
			}
		},
		methods: {
			Safe(index){
				this.type = index;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bg1{
		
	}
	.bg2{
		border-left:6rpx solid #FEC403 ;
		color: #FEC403;
		background: #FFFFFF;
	}
	.all{
		display: flex;
	}
	.left{
		width: 180rpx;
		display: flex;
		flex-direction: column;
		background:rgba(248,248,248,1);
	}
	.left-1{
		width: 180rpx;
		height:121rpx;
		text-align: center;
		line-height: 121rpx;
		font-size:30rpx 
		
	}
	.right{
		width: 570rpx;
	}
	.right-top-top{
		height: 130rpx;
		padding-left: 32rpx;
		font-size:26rpx;
		color: #404040;
		line-height: 130rpx;
	}
	.producttype{
		width:150rpx;
		height: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		font-size: 32rpx;
		color: #333333;
	}
</style>
