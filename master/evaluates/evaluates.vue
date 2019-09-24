
 
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
 