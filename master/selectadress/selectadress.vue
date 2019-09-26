<template>
	<view>
		<view class="input">
			<input @input="bindKeyInput" @blur="bindBlur" placeholder="输入城市名或拼音查询" placeholder-style="font-size: 30rpx"
			 :value="inputName"></input>
		</view>
		<view class="container-inner">
			<view class="side-bar-letter-list touch-class">
				<view class="side-bar-hot-city" :tap="hotCity">
					<view style="margin-top:0;">当前</view>
					<view style="margin-top:0;">热门</view>
				</view>
				<view v-for="( items , index ) in sideBarLetterList" :key="index" style="color:#8BC34A;font-size:20rpx;" :data-letter="items.name"
				 catchtouchend="touchSideBarLetter">{{item.name}}</view>
			</view>
			<view class="container">

				<block v-if="showChosenLetterToast">
					<view class="show-chosen-letter">
						{{toastShowLetter}}
					</view>
				</block>

				<scroll-view scroll-y="true"  @scroll="bindScroll" :scroll-into-view="scrollTopId"
				 :scroll-top="scrollTop">

					<ul class="ul">
						<li v-for="(item,index ) in completeList" :key="index" @tap="chooseCity" :data-city="item.city" :data-code="item.code"
						 class="li">{{item.city}}</li>
					</ul>

					<view class="county-picker">
						<view v-if="showCountyPicker" class="county-picker-title">选择区县</view>
						<view v-if="showCountyPicker" class="county">
							<block class="county-picker-list" v-for="(item ,id) in countyList" :key="id">
								<view class="weui-grid" :data-code="item.id" :data-city="item.fullname" @tap="chooseCounty">
									<view class="weui-grid-label">{{item.fullname}}</view>
								</view>
							</block>
						</view>
					</view>

					<view class="city-picker">
						<view class="hotcity-common" @tap="reGetLocation">点击定位城区</view>
						<view class="current-city" :data-city="city" :data-code="currentCityCode" :data-county="county">{{city}}
							{{county}}</view>

						<view class="hotcity-common">热门城市</view>

						<view class="hot-city" :key="initial">
							<view v-for="(item,cityCode ) in hotCityList" :key="cityCode">
								<view class="weui-grid" :data-code="item.cityCode" :data-city="item.city" @tap="chooseCity">
									<view class="weui-grid-label">{{item.city}}</view>
								</view>
							</view>
						</view>
					</view>

					<view class="selection" v-for="(item , initial ) in cityList" :key="initial">
						<view class="item-letter" :id="item.initial">{{item.initial}}</view>
						<view class="item-city" v-for="(items,index) in item.cityInfo"  :key="index"  
						 @tap="chooseCity">
							{{ct.city}}
						</view>
					</view>

				</scroll-view>
			</view>
		</view>

	</view>

</template>

<script>
	import {
		commonMessage
	} from '../../common/commonMessageZhCn.js'
	import {
		LETTERS,
		HOT_CITY_LIST
	} from '../../common/citydata.js'
	import {
		AutoPredictor
	} from '../../common/autoPredictor.js'
	import utils from '../../common/utils.js'
	const {
		isNotEmpty,
		safeGet,
		getCityListSortedByInitialLetter,
		getLocationUrl,
		getCountyListUrl,
		getIndexUrl,
		onFail,
	} = utils;
	export default {
		data() {
			return {
				sideBarLetterList: [],
				winHeight: 0,
				cityList: [],
				hotCityList: HOT_CITY_LIST,
				showChosenLetterToast: false,
				scrollTop: 0, //置顶高度
				scrollTopId: '', //置顶id
				city: commonMessage['location.getting'],
				currentCityCode: '',
				inputName: '',
				completeList: [],
				county: '',
				showCountyPicker: false,
				auto: true, // 自动手动定位开关
			}
		},
		onLoad: function() {
			// 生命周期函数--监听页面加载
			const cityListSortedByInitialLetter = getCityListSortedByInitialLetter();
			const sysInfo = uni.getSystemInfoSync();
			const winHeight = sysInfo.windowHeight;
			const sideBarLetterList = LETTERS.map(letter => ({
				name: letter
			}));
				this.winHeight =winHeight,
				 this.sideBarLetterList= sideBarLetterList,
				 this.cityList= cityListSortedByInitialLetter
			定位
			this.getLocation();
		},
		methods: {
			touchSideBarLetter: function(e) {
				const chosenLetter = safeGet(['currentTarget', 'dataset', 'letter'], e)
				
					this.toastShowLetter=chosenLetter,
					this.showChosenLetterToast= true,
					this.scrollTopId=chosenLetter,
				
			// close toast of chosenLetter
				setTimeout(() => {
					
					 	this.showChosenLetterToast= false
					 
				}, 500)
			},
			chooseCity: function (e) {
			  const { city, code } = safeGet(['currentTarget', 'dataset'], e)
			 
			   this.auto= false,
			   this. showCountyPicker=true,
			    this .city=city,
			    this. currentCityCode= code,
			   this. scrollTop=0,
			   this. completeList= [],
			    this.county= ''
			 this.getCountyList(),
			 
			 appInstance.globalData.defaultCity = city,
			 appInstance.globalData.defaultCounty = ''
			 },
			 // chooseCounty: function (e) {
			 //   const county = safeGet(['currentTarget', 'dataset', 'city'], e)
			 //   this. county= county
			 //   appInstance.globalData.defaultCounty = county
			 //   // 返回首页
			 //   uni.switchTab({ url: getIndexUrl() })
			 // },
			 //点击热门城市回到顶部
			   // hotCity: function () {
			   //   this.scrollTop= 0 
			   // },
		}
	}
</script>

<style lang="scss" scoped>
	.container-inner {
		display: flex;
		flex-direction: row-reverse;
	}

	.container {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		padding: 10rpx;
	}

	input {
		text-align: center;
		font-size: 32rpx;
		padding: 5px;
	}

	scroll-view {
		padding-left: 16rpx;
	}


	.side-bar-letter-list {
		flex-shrink: 0;
		width: 80rpx;
		text-align: center;
		display: flex;
		flex-direction: column;
		color: #666;
	}

	.side-bar-letter-list view {
		margin-top: 20rpx;
	}

	.touch-class {
		background-color: #fff;
		color: #fff;
		padding-top: 16rpx;
		padding-bottom: 16rpx;
	}

	.show-chosen-letter {
		background-color: rgba(0, 0, 0, 0.5);
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 50%;
		left: 50%;
		margin: -100rpx;
		width: 200rpx;
		height: 200rpx;
		border-radius: 20rpx;
		font-size: 52rpx;
		z-index: 1;
	}

	.selection {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin-top: 10rpx;
	}

	.city-picker {
		padding: 16rpx 0 16rpx 16rpx;
		background-color: #f5f5f5;
		margin-bottom: -10rpx;
	}

	.county-picker {
		padding-left: 20rpx;
		margin-bottom: 10rpx;
	}

	.county-picker-title {
		font-size: 24rpx;
		color: #666;
		padding-bottom: 0;
		margin: 8rpx 0;
		padding-left: 4px;
	}

	.hot-city {
		background-color: #f5f5f5;
		margin-bottom: -10rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.item-letter {
		display: flex;
		background-color: #f5f5f5;
		height: 40rpx;
		padding-left: 34rpx;
		align-items: center;
		font-size: 24rpx;
		color: #666;
	}

	.item-city {
		display: flex;
		background-color: #fff;
		height: 100rpx;
		padding-left: 34rpx;
		align-items: center;
		border-bottom: 1rpx solid #ededed;
		font-size: 24rpx;
		color: #666;
	}

	.hotcity-common {
		font-size: 24rpx;
		color: #666;
		padding-bottom: 0;
		margin: 8rpx 0;
		margin-left: 16rpx;
	}

	.county-picker-list {
		padding-right: 50rpx;
		margin: auto;
	}

	.current-city {
		display: inline-block;
		border: 1rpx solid #8BC34A;
		border-radius: 8rpx;
		padding: 10rpx;
		font-size: 24rpx;
		color: #8BC34A;
		text-align: center;
		min-width: 149.5rpx;
		margin: 16rpx;
	}

	.side-bar-hot-city {
		color: #8BC34A;
		font-size: 20rpx;
		margin: 0 !important;
	}

	.slectCity {
		border-color: #8BC34A !important;
	}

	.slectCity view {
		color: #8BC34A !important;
	}

	.weui-grid {
		padding: 10rpx 0;
		width: 200rpx;
		box-sizing: border-box;
		border: 1rpx solid #ececec;
		border-radius: 8rpx;
		background-color: white;
		margin: 8rpx 0 8rpx 8rpx;
	}

	.weui-grids {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.weui-grid-label {
		display: block;
		text-align: center;
		color: #333;
		font-size: 24rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.ul {
		display: block;
		color: grey;
		margin-left: 20rpx;
	}

	.li {
		display: block;
		font-weight: 100;
		font-size: 28rpx;
		padding: 16rpx 0;
	}

	input {
		background-color: #eee;
	}

	.input {
		padding: 16rpx;
		border-bottom: 1rpx solid #f1f1f1;
	}

	.county {
		display: flex;
		flex-wrap: wrap;
	}
</style>
