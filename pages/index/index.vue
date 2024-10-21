<template>
	<view class="container">
		<view style="background: #FFFFFF;">
			<view class="header">
				<view class="nav">
					<view class="navLeft" @tap="goSelectCity">
						<view class="localName">{{ localCampus }}</view>
						<image src="../../static/img/home/xia.png" style="width: 20rpx;height: 14rpx;"></image>
						<!-- <text class="cuIcon-unfold"></text> -->
					</view>
					<view class="search-box">
						<view class="search-wrap" @tap="goSearch">
							<image class="search-icon" src="../../static/img/home/search.png"></image>
							<input class="search-input" type="text" value="输入美食、地点" disabled />
						</view>
					</view>
				</view>

			</view>
			<view class="main">
				<view class="home-bgi">
					<swiper class="swiper" autoplay="1500" :indicator-dots="true" :circular='true'
						indicator-active-color="#ffffff" indicator-color="#cccccc">
						<swiper-item class="swiper-wrap" v-for="(item,index) in banners" :key='index'
							@tap="toGoodsInfo(item.url)">
							<image :src="item.imageUrl"></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="menu-box">
					<view class="category">
						<!-- <view v-for="(nav, index) in navlist" :key="index"> -->
						<view class="category-list">
							<view class="icon-box" v-for="(item,ind) in navlist" :key="ind"
								@tap="toGoodsInfo(item.classifyUrl)">
								<image class="icon" :src="item.classifyIcon"
									style="height: 80rpx;width: 80rpx;margin-top: 10rpx;border-radius: 50%;">
								</image>
								<view class="text">{{ item.classifyName }}</view>
							</view>
						</view>
					</view>
				</view>

				<view style="display: flex;width: 98%;margin: 20rpx 11rpx;">
					<view v-if="mtelmCheck === '是'" style="width: 50%;height: 235rpx;" @tap="gochegnxu(2)">
						<image :src="elemeList.imageUrl" style="width: 371rpx;height: 235rpx;background-size: 100%;">
						</image>
					</view>
					<view v-if="mtelmCheck === '是'" style="width: 50%;height: 235rpx;" @tap="gochegnxu(1)">
						<image :src="meituanList.imageUrl" style="width: 371rpx;height: 235rpx;background-size: 100%;">
						</image>
					</view>
				</view>
			</view>
			<!-- 筛选 -->
			<view class="root" style="margin-top: 10upx;" v-if="filterData.length > 1">
				<ren-dropdown-filter v-if="filterData.length > 1" :filterData='filterData' @click="navClick"
					:defaultIndex='defaultIndex' @ed='ed' @dateChange='dateChange'></ren-dropdown-filter>
			</view>
			<view class="card-box" v-if="goodsHomeList.length > 0">
				<task-home-list class="task-home" splitLine @click="clickItem" :list="goodsHomeList"></task-home-list>
			</view>
			<!-- 加载更多提示 -->
			<view v-if="goodsHomeList.length > 0">
				<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
			</view>
		</view>
	</view>
</template>

<script>
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	import taskHomeList from "@/components/mask/task-home-list1.vue"
	var QQMapWX = require('@/js_sdk/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
	var qqmapsdk;
	export default {
		components: {
			taskHomeList,
			RenDropdownFilter
		},
		data() {
			return {
				localCampus: '未知',
				city: '',
				meituanList: {},
				elemeList: {},
				banners: [],
				latitude: '',
				longitude: '',
				mtelmCheck: '',
				authorize: false,
				weizhinames: '',
				weizhidizhi: '',
				categoryHeight: '320rpx', //菜单默认高度
				currentPageindex: 0, //菜单滚动小点
				navlist: [],
				sortType: 0,
				typeId: 0,
				recommendList: [],
				content: "",
				phone: "",
				isDisable: false,
				tuijianList: [],
				goodsHomeList: [],
				page: 1,
				limit: 10,
				loadingType: 0,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				filterData: [
					[{
						text: '综合分类',
						value: ''
					}, {
						text: '返现最高',
						value: 1
					}, {
						text: '最新发布',
						value: 2
					}, {
						text: '距离最近',
						value: 3
					}]
				],
				defaultIndex: [0, 0]
			}
		},
		onLoad(e) {
			let that = this;
			if (e.userByinvitationId) {
				this.$queue.setData('userByinvitationId', e.userByinvitationId);
			}

			// #ifdef MP-WEIXIN
			if (e.scene) {
				const scene = decodeURIComponent(e.scene);
				this.$queue.setData('userByinvitationId', scene.split(',')[0]);
			}
			// #endif

			// #ifdef MP-WEIXIN
			// 实例化API核心类
			qqmapsdk = new QQMapWX({
				key: 'J5FBZ-XCUKI-UFEG2-5KOJJ-XD4L3-KNFNG'
			});
			that.authorizationLocation();
			// #endif
			this.getBannerList();
			this.getnavlistClassify();
			this.getClassify();

			//美团饿了么优惠券开关
			this.$Request.getT('/common/type/138').then(res => {
				if (res.code == 0) {
					if (res.data && res.data.value) {
						this.mtelmCheck = res.data.value;
					}
				}
			});

			this.$Request.getT('/banner/selectBannerList?classify=4&state=1').then(res => {
				if (res.code === 0) {
					this.meituanList = res.data[0];
				}
			});
			this.$Request.getT('/banner/selectBannerList?classify=4&state=2').then(res => {
				if (res.code === 0) {
					this.elemeList = res.data[0];
				}
			});
		},
		onShow() {
			let that = this;
			var city = this.$queue.getData('city');
			var localCampus = this.$queue.getData('localCampus');
			if (city && localCampus) {
				console.log(city)
				this.latitude = this.$queue.getData('latitude');
				this.longitude = this.$queue.getData('longitude');
				this.city = city;
				this.localCampus = localCampus;
				this.$queue.remove('localCampus');
				this.page = 1;
				this.getHaoDianTuiJian1();
				this.getHaoDianTuiJian();
			}
		},
		methods: {
			// 点击优惠券跳转小程序
			gochegnxu(classify) {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					if (classify == 1) { //美团
						// #ifdef MP-WEIXIN
						uni.navigateToMiniProgram({
							appId: 'wxde8ac0a21135c07d',
							path: this.meituanList.url,
							fail(res) {
								console.error(res)
							}
						})
						// #endif
					} else if (classify == 2) { //饿了么
						// #ifdef MP-WEIXIN
						uni.navigateToMiniProgram({
							appId: 'wxece3a9a4c82f58c9',
							path: this.elemeList.url,
							fail(res) {
								console.error(res)
							}
						})
						// #endif
					}
				} else {
					this.goLogin();
				}
			},
			tuijianClickItem(index) {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					uni.navigateTo({
						url: '/pages/index/tuijianList'
					});
				} else {
					this.goLogin();
				}
			},
			ed(res) {
				console.log(res)
			},
			dateChange(d) {
				console.log(d)
			},
			getHaoDianTuiJian() {
				this.loadingType = 1;
				uni.showLoading({
					title: '加载中...',
				});
				let data = {
					page: 1,
					limit: 4,
					longitude: this.longitude,
					latitude: this.latitude,
					city: this.city,
					search: '',
					isGoods: '1'
				}
				this.$Request.getT('/wm/selectHomeGoodsList', data).then(res => {
					if (res.code === 0) {
						this.tuijianList = [];

						res.data.list.forEach(d => {
							d.distance = this.setMorKm(d.distance);
							this.tuijianList.push(d)
						});
					}
					uni.hideLoading();
				})
			},
			getHaoDianTuiJian1() {
				this.loadingType = 1;
				uni.showLoading({
					title: '加载中...',
				});
				let data = {
					page: this.page,
					limit: this.limit,
					longitude: this.longitude,
					latitude: this.latitude,
					city: this.city,
					search: '',
					sort: this.sortType,
					typeId: this.typeId

				}
				this.$Request.getT('/wm/selectHomeGoodsList', data).then(res => {
					if (res.code === 0) {
						if (this.page === 1) {
							this.goodsHomeList = [];
						}

						res.data.list.forEach(d => {
							d.distance = this.setMorKm(d.distance);
							this.goodsHomeList.push(d)
						});
						if (res.data.list.length === this.limit) {
							this.loadingType = 0;
						} else {
							this.loadingType = 3;
						}
					} else {
						this.loadingType = 2;
					}
					uni.hideLoading();
				})
			},
			setMorKm(m) {
				var n = ''
				if (m) {
					if (m >= 1000) {
						n = (m / 1000).toFixed(0) + 'km'
					} else {
						n = parseInt(m) + 'm'
					}
				} else {
					n = '0m'
				}
				return n
			},
			getClassify() {
				this.$Request.getT('/helpClassify/selectClassifyList').then(res => {
					if (res.code === 0) {
						this.navlist = res.data;
					}
				});
			},
			getnavlistClassify() {
				this.$Request.getT('/banner/selectBannerList?state=-1&classify=2').then(res => {
					if (res.code === 0) {
						let dataList = [];
						let data = {
							text: '全部品类',
							value: 0
						}
						dataList.push(data);

						res.data.forEach(d => {
							let data = {
								text: '',
								value: ''
							}
							data.text = d.name;
							data.value = d.id;
							if (d.state == 1) {
								dataList.push(data);
							}

						});
						this.filterData.push(dataList);
					}
				});
			},
			initLocation(latitude, longitude) {
				var that = this;
				qqmapsdk.reverseGeocoder({
					location: latitude + ',' + longitude || '',
					success: function(res) { //成功后的回调
						if (res.status == 0) {
							console.log(res)
							that.authorize = false;
							var res = res.result;
							that.latitude = latitude;
							that.longitude = longitude;
							that.$queue.setData('latitude', latitude)
							that.$queue.setData('longitude', longitude)
							let s = res.ad_info.city.substring(0, res.ad_info.city.length - 1);
							that.city = s;
							that.$queue.setData('city', that.city);
							that.localCampus = res.address_reference.landmark_l2.title;
							that.getHaoDianTuiJian1();
							that.getHaoDianTuiJian();
						}
					},
					fail: function(error) {
						console.error(error);
					},
					complete: function(res) {
						console.log(res);
					}
				})
			},
			startSetting() {
				let that = this;
				// #ifdef APP-PLUS
				permision.gotoAppSetting();
				// #endif
				// #ifdef MP-WEIXIN
				uni.openSetting({
					success(res3) {
						console.log(res3)
						if (res3.authSetting[
								'scope.userLocation'
							]) {
							uni.hideToast();
							that.initMyPosition();
						} else {
							that.authorizationLocation();
						}
						// 已授权-(获取位置信息)
					}
				});
				// #endif
			},
			initMyPosition() {
				let that = this;
				uni.getLocation({
					type: 'gcj02',
					altitude: true,
					success: res => {
						that.initLocation(res.latitude, res.longitude);
					}
				});
			},
			authorizationLocation: function() {
				let that = this;
				uni.getSetting({
					success(res1) {
						if (!res1.authSetting['scope.userLocation']) {
							// 未授权
							uni.authorize({
								scope: 'scope.userLocation',
								success() { //1.1 允许授权
									that.initMyPosition();
								},
								fail() { //1.2 拒绝授权
									that.authorize = true; //用户是否拒绝了定位授权 true:用户拒绝 false:用户授权
								}
							})
						} else {
							// 已授权-(获取位置信息)
							that.initMyPosition();
						}
					}
				});
			},
			getBannerList() {
				this.$Request.getT('/banner/selectBannerList?state=-1&classify=1').then(res => {
					if (res.code === 0) {
						this.banners = [];
						res.data.forEach(d => {
							if (d.state == 1) {
								this.banners.push(d);
							}
						});
					}
				});
			},
			// 轮播图跳转小程序
			toGoodsInfo: function(url) {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (url.indexOf('/pages/') !== -1) {
					uni.navigateTo({
						url
					});
				} else {
					//#ifndef H5
					uni.navigateTo({
						url: '/pages/public/webview?url=' + url
					});
					//#endif
					//#ifdef H5
					window.location.href = url;
					//#endif
				}
			},
			goSearch() {
				uni.navigateTo({
					url: '/pages/task/search'
				});
			},
			goSelectCity() {
				if (!this.authorize) {
					uni.navigateTo({
						url: '/pages/index/selectCampus?city=' + this.city
					});
				} else {
					this.startSetting();
				}
			},
			goLogin() {
				this.$queue.setData('href', '/pages/index/index');
				uni.navigateTo({
					url: '/pages/public/login'
				});
			},
			navClick: function(res) {
				console.log('点击', res)
				this.page = 1;
				if (res.index1 == 0) {
					this.sortType = res.index ? res.index : 0;
					this.getHaoDianTuiJian1();
				} else if (res.index1 == 1) {
					this.typeId = res.index ? res.index : 0;
					this.getHaoDianTuiJian1();
				}
			},
			clickItem: function(options) {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					uni.navigateTo({
						url: '/pages/index/taskDetail?goodsId=' + options.item.goodsId + '&latitude=' + this
							.latitude + '&longitude=' + this.longitude
					})
				} else {
					this.goLogin();
				}
			},
			toNavList: function(item) {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					uni.navigateTo({
						url: '/pages/task/tasklist?searchValue=&classifyId=' + item.id + '&name=' + item
							.classifyName
					});
				} else {
					this.goLogin();
				}
			},
			// 传进数组和指定个数，进行拆分
			chunk: function(array, size) {
				const length = array.length
				if (!length || !size || size < 1) {
					return []
				}
				let index = 0
				let resIndex = 0
				let result = new Array(Math.ceil(length / size))
				while (index < length) {
					result[resIndex++] = array.slice(index, (index += size))
				}
				return result
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			}
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
		},
		onReachBottom: function() {
			this.page = this.page + 1;
			this.getHaoDianTuiJian1();
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		background: #faf7f5;
	}

	.container {
		width: 100%;

		.header {
			width: 100%;
			background: #FFFFFF;

			.nav {
				height: 88upx;
				padding: 0 30upx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.navLeft {
					width: fit-content;
					max-width: 170rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;

					image {
						width: 34upx;
						height: 48upx;
					}

					.localName {
						width: fit-content;
						max-width: 150rpx;
						font-size: 28upx;
						font-weight: bold;
						color: #333333;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}

					text {
						font-size: 22upx;
						color: #333333;
						margin-left: 12upx;
					}
				}

				.navRight {
					width: 44upx;
					height: 39upx;

					image {
						width: 100%;
						height: 100%;
					}

				}
			}

			.search-box {
				width: 95%;
				height: 78upx;
				padding: 0 0 0 30upx;
				display: flex;
				align-items: center;

				.search-wrap {
					width: 100%;
					height: 60upx;
					background: #F2F2F2;
					border-radius: 8upx;
					display: flex;
					align-items: center;
					padding: 0 20upx;

					.search-icon {
						width: 35upx;
						height: 34upx;
					}

					.search-input {
						flex: 1;
						font-size: 24upx;
						font-weight: 500;
						color: #CCCCCC;
						margin-left: 10upx;
					}
				}
			}
		}

		.main {
			width: 100%;
			padding: 20upx 20upx 0upx;

			.home-bgi {
				width: 100%;
				height: 260rpx;
				background: #FFF;

				.swiper {
					width: 100%;
					height: 100%;

					.swiper-wrap {
						width: 100%;
						height: 100%;

						image {
							width: 100%;
							height: 100%;
							border-radius: 20rpx;
							display: block;
						}
					}

				}
			}

			.menu-box {
				width: 100%;
				padding: 20upx 0 0;
				display: flex;

				.category {
					width: 100%;
					border-radius: 20upx;

					.swiper {
						width: 100%;

						.uni-swiper-dot {
							width: 20upx;
						}
					}

					.category-list {
						width: 100%;
						height: auto;
						display: flex;
						justify-content: flex-start;
						flex-flow: wrap;

						.icon-box {
							width: 20%;
							display: flex;
							flex-flow: wrap;
							justify-content: center;
							font-size: 22upx;
							color: #666;
							text-align: center;

							.icon {
								width: 100upx;
								height: 100upx;
							}

							.text {
								width: 100%;
								display: flex;
								justify-content: center;
								padding-bottom: 18upx;
								padding-top: 10upx;
							}
						}
					}


					.dots {
						display: flex;
						align-items: center;
						justify-content: center;
						height: 15upx;
						width: 100%;

						view {
							width: 30upx;
							height: 5upx;
							background-color: rgba(0, 0, 0, 0.2);

							&.active {
								background-color: #ff570a;
							}
						}
					}
				}

				.menu-item {
					width: 20%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.iconImg {
						width: 100upx;
						height: 100upx;
					}

					text {
						margin-top: 17upx;
						font-size: 24upx;
						font-weight: bold;
						color: #333333;
					}
				}
			}

			.demand-release {
				background-color: #FFF;
				padding: 32upx 20upx 30upx;

				.title {
					font-size: 34upx;
					font-weight: 800;
					color: #333333;
					line-height: 34upx;
					margin-bottom: 26upx;
				}

				.search-wrap {
					height: 88upx;
					padding: 0 20upx;
					background: #F5F5F5;
					border-radius: 5upx;
					display: flex;
					justify-content: space-between;
					margin-bottom: 10upx;

					text {
						margin-right: 40upx;
						line-height: 88upx;
						font-size: 28upx;
					}

					.search-input {
						flex: 1;
						height: 100%;
						font-size: 28upx;
					}

					.placeholder-search-input {
						font-size: 28upx;
					}

					.edit {
						height: 88upx;
						line-height: 88upx;
						font-size: 24upx;
						font-weight: 500;
						color: #FF3530;
					}
				}

				.btn {
					width: 100%;
					height: 88upx;
					text-align: center;
					line-height: 88upx;
					background: #FF3530;
					border-radius: 5upx;
					font-size: 28upx;
					font-weight: bold;
					color: #FFFFFF;
					margin-top: 20upx;
				}
			}

			.recommend-release {
				background-image: linear-gradient(to right, #FF4700, #FFF0EB);
				background-size: 100%;
				padding: 24upx;
				border-radius: 8upx;

				.title {
					font-size: 38rpx;
					color: #FFFFFF;
					font-weight: 600;
					margin-bottom: 20rpx;
				}

				.recommend {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
				}

				.recommend-store {
					width: 150rpx;
					height: 210rpx;
					display: inline-block;
					background-color: #fff;
					border-radius: 8upx;
					padding: 8upx;
				}

				.recommend-img {
					width: 135rpx;
					height: 120rpx;
				}

				.recommend-title {
					font-size: 26upx;
					color: #333;
					line-height: 40upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.recommend-jinbi {
					position: relative;
					align-items: center;
				}

				.jinbi-king {
					width: 26rpx;
					height: 26rpx;
					margin-right: 6upx;
					position: absolute;
					top: 4upx;
				}

				.jinbi-num {
					padding-left: 30rpx;
					font-size: 26rpx;
					color: #333333;
				}
			}

			.card-box {
				// padding: 0 30upx;
				background-color: #FAF7F5;
				width: 100%;

				.title {
					height: 86upx;
					font-size: 34upx;
					font-weight: 800;
					color: #333333;
					line-height: 86upx;
					padding: 0 30upx;
				}

				.task-home {
					display: inline-block;
					width: 100%;
					// margin-top: 30upx;
				}
			}
		}

	}
</style>
