<template>
	<view>
		<van-tabs :active="active" v-bind:change="onChange" active-color="#333" color="#4B80FB">
		  <van-tab title="全部" >
			  <OrdersAll></OrdersAll>
		  </van-tab>
		  <van-tab title="待付款">
			  <Obligation></Obligation>
		  </van-tab>
		  <van-tab title="待服务">
			  <SerViera></SerViera>
		  </van-tab>
		  <van-tab title="已完成">
			  <Accomplish></Accomplish>
		  </van-tab>
		</van-tabs>
	</view>
</template>
<script>
	import OrdersAll from '@/components/order-sall/order-sall.vue'
	import Obligation from '@/components/obligation-pay/obligation-pay.vue'
	import SerViera from '@/components/obligation-servie/obligation-servie.vue'
	import Accomplish from '@/components/orderaccomplish/orderaccomplish.vue'
	export default {
		components:{
				OrdersAll,
				Obligation,
				SerViera,
				Accomplish
				},
		data() {
			return {
				active:0,
				
			}
		},
		methods: {
			 onChange(event) {
				  console.log(event.detail)
			    wx.showToast({
					
			      title: `${event.detail.index + 1}`,
			      icon: 'none',
				 
			    });
			  }
		}
	}
</script>

<style lang="scss" scoped>

</style>
