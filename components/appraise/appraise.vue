<template>
	<view>
		<view class="nav">
			<view class="nav-top">
				<text>你的总体经验如何?</text>
			</view>
			<view class="nav-top-1">
				<text>它能更好的帮助我们更好地为您服务</text>
			</view>
			<view>
				<sunui-star :defaultStar="start" :maxStar="6" @changeStar="changeStar" class='sunui-star'>
					<!-- <view class="sunui-small">(这里可以写评价内容...)</view> -->
				</sunui-star>
			</view>
			<view class="middle">
				<view class="middlle-top">清洁程度</view>
				<view class="middle-bottom">
					<view>不干净</view>
					<view>马马虎虎</view>
					<view>焕然一新</view>
				</view>
			</view>
			
			<view class="middle">
				<view class="middlle-top">清洁速度</view>
				<view class="middle-bottom">
					<view>太慢了</view>
					<view>还可以</view>
					<view>非常快</view>
				</view>
			</view>
			
			<view class="middle">
				<view class="middlle-top">服务态度</view>
				<view class="middle-bottom">
					<view>很差</view>
					<view>一般</view>
					<view>很好</view>
				</view>
			</view>
			<view class="footer">
				<view class="remark">备注(可选)</view>
				<editor class="editor-text" placeholder="请输入详细说明" @input='contentChange'></editor>
			</view>
			<view class="footer-bottom">
				<view class="uploading" @tap="UploadFiles">上传照片</view>
				<image class="uploading-img" @tap="Upload" :src="ImagUrl" ></image>
				<image class="uploading-img" @tap="Upload1" :src="ImagUrl1" ></image>
				<image class="uploading-img" @tap="Upload2" :src="ImagUrl2" ></image>
			</view>
			<button type="primary">提交信息</button>
		</view>
	</view>
</template>

<script>
	// import 
	import sunuiStar from '@/components/sunui-star/sunui-star.vue';
	export default {
		components:{
			'sunui-star':sunuiStar
		},
		data() {
			return {
				start:4,
				ImagUrl:"",
				ImagUrl1:"",
				ImagUrl2:""
			}
		},
		methods: {
		
			Upload(){
				let that = this
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album',"camera"], //从相册选择
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));
						
						that.ImagUrl = res.tempFilePaths[0]
						
				    }
				});
			},
			Upload1(){
				let that = this
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));
						
						that.ImagUrl1 = res.tempFilePaths[0]
						
				    }
				});
			},
			Upload2(){
				let that = this
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));					
						that.ImagUrl2 = res.tempFilePaths[0]
				    }
				});
			},
			changeStar(e){
				console.log(e.curStar)
				this.start=e.curStar
			},
			contentChange(e){
				console.log(e.detail.text)
			}
		}
	}
</script>

<style scoped>
		.uploading-img{
			width: 210rpx;
			height:143rpx;
			margin: 30rpx 0 29rpx 40rpx;
			background: #DEDEDE;
		}
		.uploading-img image{
			width: 210rpx;
			height: 143rpx;
		}
		.uploading{
			width: 120rpx;
			height: 44rpx;
			font-size: 30rpx;
			font-family:PingFangSC;
			font-weight:400;
			color:rgba(51,51,51,1);
			line-height:44px;
			margin:66rpx 0 30rpx 40rpx;
		}
		.footer .editor-text{
			width:670rpx;
			min-height:216rpx;
			border-radius:12rpx;
			border:2rpx solid rgba(238,238,238,1);
			margin:30rpx 0 0 40rpx;
			font-size:28rpx;
			font-family:PingFangSC;
			font-weight:400;
			font-style: normal;
		}
		.footer .remark{
			width:140rpx;
			height:44rpx;
			font-size:30rpx;
			font-family:PingFangSC;
			font-weight:400;
			color:rgba(51,51,51,1);
			line-height:44rpx;
			margin-left:40rpx;
			margin-top:56rpx
		}
		.footer .editor{
			
		}
	.middle-bottom view{
			width: 208rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			background:rgba(255,255,255,1);
			border-radius:4rpx;
			border:1rpx solid rgba(238,238,238,1)
		}
		.middle-bottom{
			width: 664rpx;
			height: 80rpx;
			margin-left:43rpx;
			margin-top: 24rpx;
			display: flex;
			justify-content: space-between;
		}
	    .middlle-top{
			width: 120rpx;
			height: 44rpx;
			font-size: 30rpx;
			color: #333333;
			margin:72rpx 0 0 40rpx;
		}
		.nav .nav-top-1{
			height:38rpx;
			font-size:32rpx;
			font-family:PingFangSC;
			font-weight:400;
			color:rgba(102,102,102,1);
			line-height:38rpx;
			margin:32rpx 0 0 40rpx;
		}
		.nav .nav-top{
			width: 672rpx;
			height: 76rpx;
			font-size: 56rpx;
			line-height: 76rpx;
			margin:24rpx 0 0 40rpx;
			font-family:PingFangSC;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
</style>
