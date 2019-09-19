<template>
	<view>
		<view class="nav">
			
		
		<van-cell-group>
		  <van-field
		    :value="username" 
		    label="姓名"
		    placeholder=""
		  />
		  <van-cell-group>
		    <van-field
		      :value="phone" 
		      label="联系方式"
		      placeholder=""
		    />
			<van-cell-group>
			  <van-field
			    :value="shop" 
			    label="店铺名称"
			    placeholder=""
			  />
			  <van-cell-group>
			    <van-field
				custom-class="city"
			      :value="city" 
			      label="所在城市"
				  icon="arrow"
				  bind:click-icon="onClickIcon"
			    />
				<van-cell-group>
				  <van-field
				    :value="Service" 
				    label="服务站"
				    placeholder=""
				  />
			</view>	  
			<view class="shop-adress">
				<view class="shop-adress-text">店铺详细地址</view>
				<editor class="editor-text"></editor>
			</view> 
			<view>
				<view class="card-text">
					证件信息
				</view>
				<view class="caed-1">
					
				</view>
				<view class="caed-2"></view>
				<view class="caed-3"></view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:"1111",
				phone:"1111",
				shop:"1111",
				city:"1111",
				Service:"1111",
			}
		},
		methods: {
			onClickIcon(event) {
			  // event.detail 为当前输入的值
			  console.log(event.detail);
			}
		}
	}
</script>

<style scoped>
		.card-text{
			margin-top:124rpx ;
			font-size: 30rpx;
			margin-left: 30rpx;
		}
		.shop-adress{
			width: 690rpx;
			height: 350rpx;
			margin-left:30rpx ;
		}
 .shop-adress .editor-text{
		width:690rpx;
		min-height:260rpx;
		background:rgba(244,244,244,1);
		border-radius: 5rpx;
		font-size: 26rpx;
		margin-top:35rpx ;
	}
	.nav .city{
		font-size: 50rpx;
	}
	.nav{
		width: 690rpx;
		margin-left:29rpx ;
		font-size: 30rpx;
	}
	.shop-adress .shop-adress-text{
		font-size: 30rpx;
		color: #333;
		margin:35rpx 0 35rpx 29rpx;
	}
</style>
