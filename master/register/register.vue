<template>
	<view>
		<view class="nav">您好,请注册!</view>
		<view class="form re">
			<view class="username">
				<view class="get-code" :style="{'color':getCodeBtnColor}" @click.stop="getCode()">{{getCodeText}}</view>
				<input placeholder="请输入手机号" v-model="phoneNumber" />
			</view>
			<view class="code">
				<input placeholder="请输入验证码" v-model="code" />
			</view>
			<view class="password">
				<input placeholder="请输入密码" v-model="passwd" password=true placeholder-style="color:#9999" />
			</view>
			<view class="btn" @tap="doReg" style="font-size:32rpx;color: #FFFFFF;margin-top:149rpx ;">立即注册</view>
			<view class="res">
				<view @tap="toLogin">已有账号立即登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from "@/common/SDK/md5.min.js";
	export default {
		data() {
			return {
				phoneNumber: "",
				code: '',
				passwd: "",
				getCodeText: '获取验证码',
				getCodeBtnColor: "#4C80FB",
				getCodeisWaiting: false,
				
			}
		},
		methods: {
			Timer() {},
			//验证码发送
			getCode() {
				uni.hideKeyboard()
				if (this.getCodeisWaiting) {
					return;
				}
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))) {
					uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
					return false;
				}
				this.getCodeText = "发送中..."
				this.getCodeisWaiting = true;
				this.getCodeBtnColor = "#4C80FB"
				setTimeout(() => {
					uni.showToast({
						title: '验证码已发送',
						icon: "none"
					});
					this.code = 1234;
					this.setTimer();
				}, 1000)
			},
			setTimer() {
				let holdTime = 60;
				this.getCodeText = "重新获取(60)"
				this.Time = setInterval(() => {
					if (holdTime <= 0) {
						this.getCodeisWaiting = false;
						this.getCodeBtnColor = "";
						this.getCodeText = "获取验证码"
						clearInterval(this.Timer);
						return;
					}
					this.getCodeText = "重新获取(" + holdTime + ")"
					holdTime--;
				}, 1000)
			},
			//存本地密码账号
			doReg() {
				setTimeout(()=>{
					uni.hideKeyboard()
					//验证手机号
					if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phoneNumber))) {
						uni.showToast({
							title: '请填写正确手机号码',
							icon: "none"
						});
						return false;
					}
					//示例验证码
					if (this.code != 1234) {
						uni.showToast({
							title: '验证码不正确',
							icon: "none"
						});
						return false;
					}
					uni.showLoading({
						title: '提交中...'
					})
					判断localstorage是否已存在该用户
					let usern = this.phoneNumber
					let uList= uni.getStorageSync("UserList")||[]
					let index =uList.indexOf(usern)
					if(index>-1){
						uni.showToast({
							title:"该手机号已注册"
						})
						return  false;
					}else{
						uni.setStorage({
							key:"UserList",
							data:usern,
							success() {
								uni.showToast({title: '注册成功',icon: "success"});
								uni.navigateBack({
								})
							}
						})
						setTimeout(()=>{
							uni.setStorage({
								key:'UserList',
								success: (res) => {
									res.data.push({username:this.phoneNumber,passwd:md5(this.passwd)})
									uni.setStorage({
										key:"UserList",
										data:res.data,
										success:function(){
											uni.hideLoading()
											uni.showToast({
												title:'注册成功',icon:'success'
											});
											setTimeout(function(){
												uni.navigateBack({
													
												})
											},1000)
										}
									})
								}
							})
						})
					}
				})
			},
			toLogin() {
				uni.hideKeyboard()
				uni.redirectTo({
					url: "../login/login"
				});
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/css/login.scss";

	.username,
	.password,
	.code {
		color: #999999;

		border-bottom: 1rpx solid #DEDEDE;
	}

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
</style>
