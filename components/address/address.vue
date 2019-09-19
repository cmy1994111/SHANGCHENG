<template>
	<view>
		<semp-city @confirm="onCityConfirm" platform="jd"></semp-city>
	</view>
</template>

<script>
	import sempCity from "../../components/semp-city/semp-city.vue"
	export default {
		 components: {
			 sempCity
			},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
