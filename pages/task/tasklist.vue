<template>
	<view class="container">
		<!-- <view class="header">
			<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="nav-item" v-for="(item, index) in navlist" :key="index" @tap="tabSelect(item.id,index)">
					<view class="tab-item-title" :class="{ 'tab-item-title-active': index == tabIndex }">
						<view class="name">{{ item.title }}</view>
						<view class="line"></view>
					</view>
				</view>
			</scroll-view>
		</view> -->
		<view class="main">
			<view class="card-box" v-if="tuijianList.length > 0">
				<task-home-list class="task-home" splitLine @click="clickItem" :list="tuijianList"></task-home-list>
			</view>
			<!-- 加载更多提示 -->
			<view v-if="tuijianList.length > 0">
				<load-more :loadingType="loadingType" :contentText="contentText" class="task-home"></load-more>
			</view>
			<!-- 暂无数据展示 -->
			<empty v-if="tuijianList.length === 0" des="暂无任务数据" show="false"></empty>
		</view>
	</view>
</template>

<script>
	import taskHomeList from "@/components/mask/task-home-list1.vue"
	export default {
		components: {
			taskHomeList
		},
		data() {
			return {
				tabIndex: 0,
				scrollLeft: 0,
				tabBars: [],
				tuijianList: [],
				page: 1,
				limit: 10,
				classify: -1,
				loadingType: 0,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				navlist: [],
			};
		},
		onLoad(e) {
			this.searchValue = e.searchValue;
			if (e.classifyId) {
				this.classify = e.classifyId;
			}
			if (e.name) {
				uni.setNavigationBarTitle({
					title: e.name
				})
			}
		},
		onShow() {
			this.page = 1;
			this.getHaoDianTuiJian();
		},
		methods: {
			getHaoDianTuiJian() {
				this.loadingType = 1;
				var longitude = this.$queue.getData('longitude');
				var latitude = this.$queue.getData('latitude');
				var city = this.$queue.getData('city');
				uni.showLoading({
					title: '加载中...',
				});
				let data = {
					page: this.page,
					limit: this.limit,
					longitude: longitude,
					latitude: latitude,
					city: city,
					activityId: this.classify,
					search: this.searchValue
				}
				this.$Request.getT('/wm/selectHomeGoodsList', data).then(res => {
					if (res.code === 0) {
						if (this.page == 1) {
							this.tuijianList = [];
						}

						res.data.list.forEach(d => {
							d.distance = this.setMorKm(d.distance);
							this.tuijianList.push(d)
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
			goLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				});
			},
			// 切换
			tabSelect: function(itemId, index) {
				let id = index;
				this.tabIndex = id;
				this.classifyId = itemId;
				this.scrollLeft = (id - 1) * 48;
				this.page = 1;
			},
			clickItem: function(options) {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					var longitude = this.$queue.getData('longitude');
					var latitude = this.$queue.getData('latitude');
					uni.navigateTo({
						url: '/pages/index/taskDetail?goodsId=' + options.item.goodsId + '&latitude=' + latitude + '&longitude=' + longitude
					})
				} else {
					this.goLogin();
				}
			}
		},
		onReachBottom: function() {
			this.page = this.page + 1;
			this.getHaoDianTuiJian()
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.getHaoDianTuiJian();
		}
	};
</script>

<style lang="scss">
	page {
		width: 100%;
		background-color: #f8f8f8;
	}

	.container {
		width: 100%;

		.header {
			width: 100%;
			// height: 80upx;
			background-color: #FFF;
			display: flex;
			align-items: center;
			position: fixed;
			z-index: 1;

			.nav {
				.nav-item {
					display: inline-block;
					margin: 0 34upx;

					.tab-item-title {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-between;
						padding-top: 20upx;

						.name {
							font-size: 32upx;
							font-weight: 500;
							color: #666;
							line-height: 32upx;
							text-align: center;
							margin-bottom: 20upx;
						}

						.line {
							width: 90upx;
							height: 8upx;
							background: #FFF;
							border-radius: 4upx;
						}
					}

					.tab-item-title-active {
						.name {
							font-size: 32upx;
							font-weight: 800;
							color: #333;
						}

						.line {
							width: 90upx;
							height: 8upx;
							background: #FF3530;
							border-radius: 4upx;
						}
					}
				}
			}
		}

		.main {
			width: 100%;
			margin-top: 20rpx;
			// padding: 20upx 20upx 20upx;
		}

		.card-box {
			// padding: 0 30upx;
			background-color: #FFF;
			// margin-top: 20upx;
			width: 100%;
			// margin-top: 82upx;

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

			.yu-home-list {
				display: block;
			}
		}

		.release {
			width: 120upx;
			height: 120upx;
			border-radius: 50%;
			background-color: #FF3630;
			color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: fixed;
			right: 5%;
			bottom: 15%;
			z-index: 100;

			.cuIcon-add {
				font-size: 38upx;
				font-weight: bold;
			}
		}

	}
</style>
