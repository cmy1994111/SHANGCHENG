<template>
	<view>
		<view class="nav">


			<van-cell-group>
				<van-field :value="username" label="姓名"  />


				<van-field :value="phone" label="联系方式"  />

				<van-field :value="shop" label="店铺名称"  />

				<van-field custom-class="city" :value="city"  disabled  label="所在城市" icon="arrow" />

				<van-field :value="Service" label="服务站" />
			</van-cell-group>
		</view>
		<view class="shop-adress">
			<view class="shop-adress-text">店铺详细地址</view>
			<editor class="editor-text"></editor>
		</view>
		<view>
			<view class="card-text">
				证件信息
			</view>
			<view class="card-1" @tap="UploadFiles">
				<image :src="imageUrl" style="width: 540rpx;height: 360rpx;"></image>
			</view>
			<view class="card-2"  @tap="UploadFiles1">
				<image :src="imageUrl1" style="width: 540rpx;height: 360rpx;"></image>
			</view>
			<view class="card-3"  @tap="UploadFiles2">
				<image :src="imageUrl2" style="width: 540rpx;height: 360rpx;"></image>
			</view>
		</view>
		<button type="danger" style="background: #1A78DF; color: #fff;margin-top: 100rpx;" @tap="submit">提交信息</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl:"",
				imageUrl1:"",
				imageUrl2:"",
				username: "",
				phone: "",
				shop: "",
				city: "",
				Service: "",
			}
		},
		methods: {
			UploadFiles(){
				let that = this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album',"camera "], //从相册选择
				    success: function (res) {
				  //       console.log(JSON.stringify(res.tempFilePaths));
						// console.log(res.tempFilePaths[0]);
						that.imageUrl = res.tempFilePaths[0]
				    }
				});
			},
			UploadFiles1(){
				let that = this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album',"camera "], //从相册选择
				    success: function (res) {
				  //       console.log(JSON.stringify(res.tempFilePaths));
						// console.log(res.tempFilePaths[0]);
						that.imageUrl1 = res.tempFilePaths[0]
				    }
				});
			},
			UploadFiles2(){
				let that = this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album',"camera "], //从相册选择
				    success: function (res) {
				  console.log(JSON.stringify(res.tempFilePaths));
						 console.log(res.tempFilePaths);
						that.imageUrl2 = res.tempFilePaths[0]
				    }
				});
			},
			onClickIcon(event) {
				// event.detail 为当前输入的值
				console.log(event.detail);
			},
			submit(e){
				console.log(e)
			}
		}
	}
</script>

<style scoped>
	.card-1{
		width: 540rpx;
		height:360rpx;
		margin:36rpx 0 0 108rpx;
		background: #F4F4F4;
		
	}
	.card-2{
		width: 540rpx;
		height:360rpx;
		margin:36rpx 0 0 108rpx;
		background: #F4F4F4;
		
	}
	.card-3{
		width: 540rpx;
		height:360rpx;
		margin:36rpx 0 0 108rpx;
		background: #F4F4F4;
		
	}
	.card-text {
		margin-top: 124rpx;
		font-size: 30rpx;
		margin-left: 30rpx;
	}

	.shop-adress {
		width: 690rpx;
		height: 350rpx;
		margin-left: 30rpx;
	}

	.shop-adress .editor-text {
		width: 690rpx;
		min-height: 260rpx;
		background: rgba(244, 244, 244, 1);
		border-radius: 5rpx;
		font-size: 26rpx;
		margin-top: 35rpx;
	}

	.nav .city {
		font-size: 50rpx;
	}

	.nav {
		width: 690rpx;
		margin-left: 29rpx;
		font-size: 30rpx;
	}

	.shop-adress .shop-adress-text {
		font-size: 30rpx;
		color: #333;
		margin: 35rpx 0 35rpx 29rpx;
	}
</style>
