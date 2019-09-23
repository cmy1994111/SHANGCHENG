<template>
	<view>
       
			<view class="nav">您好,请登录!</view>
		
		<!-- 账号密码输入框 -->
		<view class="form">
			<view class="username">
				<input placeholder="请输入手机号" v-model="phoneNumber" />
			</view>
			<view class="password">
				<input placeholder="请输入密码" v-model="passwd" password=true />
			</view>
			<view class="btn" @tap="doLogin" style="font-size:32rpx;color: #FFFFFF;margin-top:149rpx ;">登 录</view>
			<view class="res">
				<view @tap="toPage1"><text style="font-size: 28rpx;">还没有账号？</text><text style="color: #4C80FB;">注册</text></view>
				<view @tap="toPage2" >忘记密码</view>
			</view>
		</view>
		<!-- 第三方登录 -->
		<view class="oauth" v-if="isShowOauth">
			<view class="text">— 快速登录 —</view>
			<view class="list">
				<view @tap="oauthLogin('weixin')" v-if="showProvider.weixin" class="icon weixin"></view>
				<view @tap="oauthLogin('qq')" v-if="showProvider.qq" class="icon qq"></view>
				<view @tap="oauthLogin('sinaweibo')" v-if="showProvider.sinaweibo" class="icon sinaweibo"></view>
				 <view @tap="oauthLogin('xiaomi')" v-if="showProvider.xiaomi" class="icon xiaomi"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from "@/common/SDK/md5.min.js";
	export default {
		data() {
			return {
				phoneNumber: '',
				passwd:'',
				isShowOauth:true,
				showProvider:{
					weixin:true,
					qq:false,
					sinaweibo:false,
					xiaomi:false
				}
			}
		},
		onShow() {
			
		},
		onLoad() {
			// //APP显示第三方登录
			// // #ifdef APP-PLUS
			// 	this.isShowOauth=true;
			// // #endif
			// this.getProvider();
			
		}, 
		methods: {
			toPage1(){
				uni.navigateTo({
					url:"../register/register"
				})
			},
			toPage2(){
				uni.navigateTo({
					url:"../resetpasswd/resetpasswd"
				})
			},
			oauthLogin(provider){
				uni.showLoading();
				//第三方登录
				uni.login({
					provider: provider,
					success: (loginRes)=>{
						console.log("success: "+JSON.stringify(loginRes));
						//案例直接获取用户信息，一般不是在APP端直接获取用户信息，比如微信，获取一个code，传递给后端，后端再去请求微信服务器获取用户信息
						uni.getUserInfo({
							provider: provider,
							success: (infoRes)=>{
								console.log('用户信息：' + JSON.stringify(infoRes.userInfo));
								uni.setStorage({
									key: 'UserInfo',
									data: {
										username:infoRes.userInfo.nickName,
										face:infoRes.userInfo.avatarUrl,
										signature:'个性签名',
										integral:0,
										balance:0,
										envelope:0
									},
									success: function () {
										uni.hideLoading()
										uni.showToast({title: '登录成功',icon:"success"});
										setTimeout(function(){
											uni.navigateBack();
										},300)
									}
								});
							}
						});
					},
					fail:(e)=>{
						console.log("fail: "+JSON.stringify(e));
					}
				});
			},
			getProvider(){
				//获取第三方登录服务
				uni.getProvider({
					service: 'oauth',
					success: (res)=>{
						let len = res.provider.length;
						for(let i=0;i<len;i++){
							//有服务才显示按钮图标
							this.showProvider[res.provider[i]] = true;
						}
						if(res.provider.length==0){
							this.isShowOauth=false;
						}
					}
				});
			},
			toPage(page){
				uni.hideKeyboard()
				uni.navigateTo({
					url: page
				});
			},
			doLogin(){
				uni.hideKeyboard();
				//验证手机号码
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))){ 
					uni.showToast({title: '请填写正确手机号码',icon:"none"});
					return false; 
				}
				uni.showLoading({
					title: '提交中...'
				})
				//模板示例比对本地储存的用户信息，实际使用中请替换为上传服务器比对。
				setTimeout(()=>{
					let md5PW = md5(this.passwd)
					uni.getStorage({
						key: 'UserList',
						success: (res)=>{
							for(let i in res.data){
								let row = res.data[i];
								if(row.username==this.phoneNumber){
									uni.hideLoading()
									//比对密码
									if(md5PW == res.data[i].passwd){
										uni.showToast({title: '登录成功',icon:"success"});
									}else{
										uni.showToast({title: '账号或密码不正确',icon:"none"});
									}
								}
							}
						},
						fail:function(e){
							uni.hideLoading()
							uni.showToast({title: '手机号码未注册',icon:"none"});
						}
					});
				},1000)
			}
		}
	}
</script>

<style lang="scss">
	 @import "../../static/css/login.scss";
	 .form {
	 	margin-top: 161rpx;
	 	width: 690rpx;
	 	margin-left: 0;
	 }
	 
	 .nav {
	 	font-size: 60rpx;
	 	color: #333333;
	 	margin: 260rpx 0 0 33rpx;
	 }
	
	.form {
		.res {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100upx;
			// color: rgba($color: #ffffff, $alpha: 0.8);
		}
	}
	.oauth{
		@media all and (max-height:150vw){
			display: none;
		}
		position: absolute;
		bottom: 50upx;
		width: 100%;
		.text{
			width: 100%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			// color: rgba($color: #ffffff, $alpha: 0.8);
			font-size: 28upx;
		}
		.list{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20upx 0;
			.icon{
				font-size:80upx;
				margin: 0 30upx;
			}
		}
	}
</style>
