<template>
	<view>
		<view class="nav">
			<text>申请人</text>
			<!-- <van-radio-group :value="radio" :change="onChange">
			<view class="nav-right">
			<van-radio>自己</van-radio>
			<van-radio>亲友</van-radio>
			</view>
			</van-radio-group> -->

			<radio-group class="radio-group" bindchange="radioChange">
				<label class="radio" v-for="(item ,index) in items" :key="index">
					<radio :value="item.name" :checked="item.checked" />{{item.value}}
				</label>
			</radio-group>
		</view>

		<van-field :value="number" clearable label="用户名" placeholder="请输入用户名" bind:click-icon="onClickIcon" />

		<van-field :value="username" clearable label="用户名" placeholder="请输入用户名" bind:click-icon="onClickIcon" />
		<view class="submit">
			<button @tap="ToMaster">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				number: "",
				radio: '1',
				checked: false,
				items: [{
						name: '自己',
						value: '自己'
					},
					{
						name: '亲人',
						value: '亲人',
						checked: 'true'
					},
				]
			}
		},
		methods: {
			checkedTap() {
				let checked = this.checked;
				this.setData({
					"checked": !checked
				});
			},
			ToMaster() {
				uni.navigateTo({
					url: "../topalymaster/topalymaster"
				})
			}
		}
	}
</script>

<style>
	.submit button {
		margin-top: 964rpx;
		width: 750rpx;
		height: 98rpx;
		background: rgba(26, 120, 223, 1);
		box-shadow: 0px 5rpx 20rpx 0rpx rgba(229, 229, 229, 1);
		color: rgba(255, 255, 255, 1);
		font-size: 32rpx;
		line-height: 98rpx;
	}

	.nav {
		width: 720rpx;
		height: 105rpx;
		border-bottom: 1rpx solid gray;
		display: flex;
		font-size: 30rpx;
		color: rgba(102, 102, 102, 1);
		align-items: center;
		margin-left: 30rpx;
		justify-content: space-between;
	}

	.nav .nav-right {
		width: 300rpx;
		display: flex;
		justify-content: space-between;
	}
</style>
