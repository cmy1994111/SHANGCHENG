<!-- <template>
	<view style="background: #DEDEDE;">
		<view class="middle">
			<view class="middle-left">
				<image src="../../static/master/未标题-2_03.png" style="width: 80rpx;height: 80rpx;"></image>
			</view>
			<view class="middle-right">
				<view>
					<text>{{name}}</text>
					<text>{{years}}</text>
				</view>
				<view>
					<van-rate :value="value" bind:change="onChange" disabled />
				</view>
			</view>
		</view>
	</view>
		
</template>

<script>
	import Allcomment from '@/components/allcomment/allcomment.vue'
	export default {
		components:{
			Allcomment
		},
		data() {
			return {
				value: 4,
				all:13,
				good:12,
				middle:16,
				bad:19,
				texts:[]
			}
		},
		onLoad() {
			
		},
		onReady() {
			const query =wx.createSelectorQuery()
			var props = query.select(".nav").boundingClientRect()
			console.log(props)
			props=this.texts
		},
		methods: {
			appraise(){
				uni.navigateTo({
					url:"../../components/appraise/appraise"
				})
			},
			onChange(event) {
			    this.setData({
			      value: event.detail
			    });
			  }
		}
	}
</script>

<style lang="scss" scoped>
	.middle .middle-left{
		width: 80rpx;
		
	}
		.middle{
			width: 690rpx;
			height: 250rpx;
			display: flex;
		}
		.nav{
			width: 750rpx;
			height: 88rpx;
			display: flex;
			justify-content: space-around;
			position: fixed;
			top: 0;
			background:rgba(255,255,255,1);
			font-size:30rpx ;
			font-family:PingFang-SC-Regular;
			background: #FFFFFF;
			align-items: center;
		}
</style>
 -->
 
 <template>
 	<view>
 		<van-tabs :active="active" v-bind:change="onChange" active-color="#333" color="#4B80FB">
 		  <van-tab :title="'全部('+all+')'"  >
 			  <AllComment></AllComment>
 		  </van-tab>
 		  <van-tab :title="'优('+ good +')'">
 			  <GoodComment></GoodComment>
 		  </van-tab>
 		  <van-tab :title="'良('+ middle +')'">
 			  <MiddleComment></MiddleComment>
 		  </van-tab>
 		  <van-tab :title="'差('+ bad +')'">
 			  <BadComment></BadComment>
 		  </van-tab>
 		</van-tabs>
 	</view>
 </template>
 <script>
 	import AllComment from '@/components/allcomment/allcomment.vue'
 	import GoodComment from '@/components/goodscomment/goodscomment.vue'
 	import MiddleComment from '@/components/middlecomment/middlecomment.vue'
 	import BadComment from '@/components/badcomment/badcomment.vue'
 	export default {
 		components:{
 				AllComment,
 				GoodComment,
 				MiddleComment,
 				BadComment
 				},
 		data() {
 			return {
 				active:0,
				all:12,
				good:13,
				middle:12,
				bad:13
				
 			}
 		},
		onLoad() {
			
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
 