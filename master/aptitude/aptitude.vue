<template>
	<view>
		<view class="nav">


			<van-cell-group>
				<van-field :value="username" label="姓名" placeholder="" />


				<van-field :value="phone" label="联系方式" placeholder="" />

				<van-field :value="shop" label="店铺名称" placeholder="" />

				<van-field custom-class="city" :value="city" label="所在城市" icon="arrow" />

				<van-field :value="Service" label="服务站" placeholder="" />
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
			<view class="card-1">
				<van-uploader v-model="fileList" multiple />
			</view>
			<view class="card-2"></view>
			<view class="card-3"></view>
		</view>
		<button type="danger" style="background: #1A78DF; color: #fff;margin-top: 100rpx;" @tap="submit">提交信息</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "1111",
				phone: "1111",
				shop: "1111",
				city: "1111",
				Service: "1111",
				fileList: [
				        { url: 'https://img.yzcdn.cn/vant/cat.jpeg' },
				        // Uploader 根据文件后缀来判断是否为图片文件
				        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
				        { url: 'https://cloud-image', isImage: true }
				      ]
			}
		},
		methods: {
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
