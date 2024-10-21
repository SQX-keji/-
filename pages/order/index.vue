<template>
	<view class="container">
		<view>
			<view class="tui-tabs">
				<scroll-view id="tab-bar" scroll-with-animation class="tui-scroll-h" :scroll-x="true"
					:show-scrollbar="false" style="border-bottom: 2upx solid #F8F8F8;">
					<view style="display: flex;">
						<view v-for="(tab, index) in tabList" :id="tab.id" :data-current="index"
							@tap='fromTabSelect(index)'>
							<view class="tui-tab-item-title"
								style="margin-left: 50upx;margin-right: 15upx;background: #FFFFFF;"
								:class="{ 'tui-tab-item-title-active': fromTabIndex === index }">{{ tab.name }}</view>
						</view>
					</view>
				</scroll-view>

			</view>
			<view class="main">
				<view class="card-box-order">
					<view class="list-item" v-for="(item,index) in list" :key="index" @tap="goDetail(item.goodsId)">
						<view class="info-cont">
							<image class="infoImg" :src="item.titleImg"></image>
							<view class="info-right">
								<view>
									<view class="logotitle" :class="item.status != 2 && item.status != 4 ? 'logotitle1' : 'logotitle'">
										<view style="width: 10%;">
											<image v-if="item.classify == 2" class="logos"
												src="/static/img/home/storeLogo.png">
											</image>
											<image v-if="item.classify == 1" class="logos"
												src="/static/img/my/eleicon.png">
											</image>
										</view>
										<view class="nickName">{{item.goodsTitle}}</view>
									</view>
									<view class="status">
										作业状态：{{item.status == 1 ? '待上传' : item.status == 2 ? '提交待审核' : item.status == 3 ? '审核成功' : item.status == 4 ? '审核失败' : item.status == 5 ? '放弃任务':''}}
									</view>
									<view class="jujue" v-if="item.status == 4">拒绝原因：{{item.auditContent}}</view>
									<view class="countdown_time" v-if="item.status === 2">
										<uni-countdown class="countdown_time" color="#999999" :day="item.endTime.day"
											:hour="item.endTime.hour" :minute="item.endTime.minute"
											:second="item.endTime.second">
										</uni-countdown>
									</view>
								</view>
							</view>
						</view>
						<view class="huixian" :class="item.status == 4 ? 'huixian' : 'huixian1'"
							v-if="item.status === 1 || item.status === 4"></view>
						<view class="info-wrap">
							<view class="btn-wrap">
								<view class="btn delete" v-if="item.status === 1 || item.status === 4"
									@tap.stop="fangqi(item.orderId)">取消作业</view>
								<view class="btn demand" v-if="item.status === 1 || item.status === 4"
									@tap.stop="shangchuan(item.orderId)">提交作业</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 加载更多提示 -->
			<view v-if="list.length > 0 ">
				<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
			</view>
			<!-- 暂无数据展示 -->
			<empty v-if="list.length === 0" des="暂无作业数据" show="false"></empty>
		</view>
	</view>
</template>

<script>
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
	export default {
		components: {
			uniCountdown
		},
		data() {
			return {
				fromTabIndex: 0,
				tabList: [{
						name: "全部"
					},
					{
						name: "待提交"
					},
					{
						name: "提交待审核"
					},
					{
						name: "审核成功"
					},
					{
						name: "审核失败"
					},
					{
						name: "放弃"
					}
				],
				page: 1,
				limit: 10,
				list: [],
				loadingType: 0,
				scrollTop: false,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				isLogin: false
			}
		},
		onShow() {
			let token = this.$queue.getData('token');
			if (token) {
				this.userId = this.$queue.getData('userId');
				this.page = 1;
				this.getList();
			} else {
				this.goLogin();
			}
		},
		methods: {
			// 放弃任务
			fangqi(id) {
				uni.showModal({
					title: '温馨提示',
					content: '您是否要放弃当前任务？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: d => {
						var that = this;
						if (d.confirm) {
							console.log('用户点击确定');
							that.$queue.showLoading('提交中...');
							that.$Request.postT('/wm/abandonOrders?orderId=' + id).then(res => {
								if (res.code === 0) {
									that.$queue.showToast('已放弃当前任务！');
									that.page = 1;
									that.getList();
									uni.hideLoading();
								} else {
									that.$queue.showToast(res.msg);
									uni.hideLoading();
								}
							})
						}
					}
				});
			},
			// 上传凭证
			shangchuan(id) {
				uni.navigateTo({
					url: '/pages/order/release?orderId=' + id
				});
			},
			timeFormat(param) {
				return param < 10 ? '0' + param : param;
			},
			getList() {
				this.loadingType = 1;
				uni.showLoading({
					title: '加载中...',
				});
				this.$Request.getT('/wm/selectOrdersListByUserId?page=' + this.page + '&limit=' + this.limit + '&userId=' +
					this.userId + '&status=' + this.fromTabIndex).then(res => {
					if (res.code === 0) {
						if (this.page === 1) {
							this.list = [];
						}

						res.data.list.forEach(d => {
							let data = {}
							data.day = 0;
							data.hour = 0;
							data.minute = 0;
							data.second = 0;
							var now = new Date().getTime();
							var endDate = new Date(d.endTime).getTime();
							let time = (endDate - now) / 1000;
							data.day = this.timeFormat(parseInt(time / (60 * 60 * 24)));
							data.hour = this.timeFormat(parseInt(time % (60 * 60 * 24) / 3600));
							data.minute = this.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 / 60));
							data.second = this.timeFormat(parseInt(time % (60 * 60 * 24) % 3600 % 60));
							d.endTime = data;
							this.list.push(d);
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
				});
			},
			fromTabSelect(index) {
				this.fromTabIndex = index;
				this.page = 1;
				this.getList();
			},
			goLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				});
			},
			goDetail(id) {
				var latitude = this.$queue.getData('latitude')
				var longitude = this.$queue.getData('longitude')
				uni.navigateTo({
					url: '/pages/index/taskDetail?goodsId=' + id + '&latitude=' + latitude + '&longitude=' +
						longitude
				})
			},
			endTask(item) {
				let that = this;
				uni.showModal({
					title: '温馨提示',
					content: '取消作业将会扣除您的信誉分，确认取消作业吗？',
					showCancel: true,
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							that.$queue.showLoading('取消中...');
							that.$Request.postT('/help/endHelpTake?id=' + item.helpTakeId).then(res => {
								if (res.code === 0) {
									that.$queue.showToast('取消成功!');
									uni.hideLoading();

								} else {
									that.$queue.showToast(res.msg);
								}
							})
						}
					}
				});
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
			this.getList();
		}
	}
</script>

<style lang="scss">
	page {
		background: #f3f5f7;
	}

	.container {
		width: 100%;

		.header {
			width: 100%;
			height: 86upx;
			background-color: #FFF;
			position: fixed;
			z-index: 99;

			.menuTab {
				width: 100%;
				height: 78upx;
				display: flex;

				.menuTab-item {
					width: 50%;
					background-color: #FFF;
					font-size: 32upx;
					font-weight: bold;
					color: #333333;
					text-align: center;
					line-height: 78upx;
				}

				.active {
					background: #F7F6FD;
				}
			}

			.navbar {
				width: 100%;
				height: 78upx;
				background: #FFF;
				padding-top: 10upx;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.nav-item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.txt {
						font-size: 32upx;
						font-weight: 500;
						color: #666666;
					}

					.active_txt {
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;
					}

					.line {
						width: 60upx;
						height: 8upx;
						border-radius: 4upx;
						margin-top: 10upx;
					}

					.active_line {
						background: #FF3530;
					}
				}
			}
		}

		.countdown_time {
			display: flex;
			font-size: 28rpx;
			font-family: PingFang SC Medium, PingFang SC Medium-Medium;
			font-weight: 500;
			color: #999999;
		}

		.huixian {
			height: 1rpx;
			opacity: 1;
			border: 1rpx solid #e6e6e6;
			margin-top: 30rpx;
		}

		.huixian1 {
			height: 1rpx;
			opacity: 1;
			border: 1rpx solid #e6e6e6;
			margin-top: 60rpx;
		}

		.main {
			padding: 106upx 20upx 0;

			.card-box-order {
				.list-item {
					background: #FFFFFF;
					border-radius: 20upx;
					padding: 30upx 30upx 40upx;
					margin-bottom: 20upx;

					.title {
						display: flex;
						align-items: center;
						width: 100%;
						// justify-content: space-between;

						padding-bottom: 20upx;

						.logos {
							width: 50upx;
							height: 50upx;
							border-radius: 100upx;
						}


						.nickName {
							width: 90%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 28upx;
							font-weight: 500;
							color: #666666;
						}
					}

					.info-cont {
						position: relative;

						.infoImg {
							width: 140upx;
							height: 140upx;
							border-radius: 4upx;
							position: absolute;
						}

						.info-right {
							margin-left: 150upx;
							// height: 100upx;

							.logotitle {
								width: 100%;
								display: flex;
								align-items: center;
							}
							
							.logotitle1 {
								width: 100%;
								display: flex;
								align-items: center;
								padding-top: 20rpx;
								// margin-top: 20rpx;
							}

							.logos {
								width: 34upx;
								height: 34upx;
							}


							.nickName {
								width: 90%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								margin-left: 9rpx;
								font-size: 32rpx;
								font-family: PingFang SC Bold, PingFang SC Bold-Bold;
								font-weight: 700;
								color: #333333;
							}

							.express {
								width: 90%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								font-size: 32rpx;
								font-family: PingFang SC Bold, PingFang SC Bold-Bold;
								font-weight: 700;
								color: #333333;
								padding-top: 5rpx;
							}

							.status {
								margin: 10rpx 0;
								width: 95%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								font-size: 28rpx;
								font-family: PingFang SC Medium, PingFang SC Medium-Medium;
								font-weight: 400;
								color: #999999;
							}

							.jujue {
								font-size: 28rpx;
								font-family: PingFang SC Medium, PingFang SC Medium-Medium;
								font-weight: 500;
								color: #999999;
							}
						}
					}

					.info-wrap {
						.express {
							padding-top: 30upx;
							padding-bottom: 20upx;
							font-size: 32upx;
							line-height: 32upx;
							font-weight: bold;
							color: #333333;
						}

						.tag-box {
							display: flex;
							margin-bottom: 20upx;

							.tag-item {
								display: inline-block;
								height: 38upx;
								line-height: 38upx;
								border-radius: 5upx;
								padding: 0 13upx;
								margin-right: 10upx;
							}

							.tag-item-blue {
								background: #D9EDFF;
								color: #66A6FF;
							}

							.tag-item-orange {
								background: #FFE8D9;
								color: #FF7D26;
							}

							.tag-item-pink {
								background: #FFD9D9;
								color: #FF6666;
							}

							.tag-item-green {
								background: #D9FFFB;
								color: #17D2BD;
							}
						}

						.times {
							font-size: 28upx;
							font-weight: 500;
							color: #666666;
							margin-bottom: 20upx;
						}

						.code {
							display: flex;
							justify-content: space-between;

							.ma {
								font-size: 28upx;
								font-weight: 500;
								color: #666666;
							}

							.pay {
								font-size: 24upx;
								font-weight: 500;
								color: #666666;

								text {
									color: #333333;
									font-size: 32upx;
								}
							}
						}

						.btn-wrap {
							display: flex;
							justify-content: flex-end;
							margin-top: 25upx;

							.btn {
								width: 150upx;
								height: 46upx;
								line-height: 42upx;
								text-align: center;
								margin-left: 20upx;
								font-size: 24upx;
								border-radius: 8upx;
							}

							.delete {
								width: 160rpx;
								height: 64rpx;
								opacity: 1;
								border: 2rpx solid #999999;
								border-radius: 16rpx;
								font-size: 28rpx;
								font-family: PingFang SC Bold, PingFang SC Bold-Bold;
								font-weight: 700;
								color: #333333;
								line-height: 64rpx;
								// color: #333333;
								// border: 2upx solid #999999;
							}

							.demand {
								width: 160rpx;
								height: 64rpx;
								opacity: 1;
								background: #fec103;
								border-radius: 16rpx;
								font-size: 28rpx;
								font-family: PingFang SC Bold, PingFang SC Bold-Bold;
								font-weight: 700;
								color: #333333;
								line-height: 64rpx;
								// color: #FFFFFF;
								// border: 2upx solid #FEC103;
								// background: #FEC103;
							}
						}
					}
				}

				.list-item:last-child {
					margin-bottom: 0;
				}
			}

			.card-box-run {
				.list-item {
					background: #FFFFFF;
					border-radius: 20upx;
					padding: 30upx;
					margin-bottom: 20upx;

					.title {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding-bottom: 20upx;

						.date {
							display: flex;
							align-items: center;

							image {
								width: 30upx;
								height: 32upx;
							}

							.txt {
								font-size: 28upx;
								font-weight: bold;
								color: #FF3530;
								margin-left: 10upx;
							}
						}

						.status {
							font-size: 32upx;
							font-weight: 800;
							color: #FF3530;

							text {
								font-size: 24upx;
							}
						}
					}

					.info-wrap {
						.steps-box {
							display: flex;

							.left {
								padding: 30upx 0;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								position: relative;

								.round {
									width: 20upx;
									height: 20upx;
									background: #CCCCCC;
									border-radius: 50%;
									z-index: 2;
								}

								.vertical-line {
									width: 2upx;
									height: 140upx;
									background: #D9D9D9;
									position: absolute;
									left: 9upx;
									top: 40upx;
									z-index: 1;
								}
							}

							.right {
								margin-left: 10upx;

								.text {
									display: flex;
									font-size: 32upx;
									align-items: center;
									height: 80upx;
								}

								.distance {
									font-size: 28upx;
									font-family: PingFang SC;
									font-weight: 500;
									color: #999999;
									height: 58upx;
									line-height: 58upx;
								}
							}
						}

						.contact-person {
							display: flex;
							align-items: center;
							padding: 0 30upx;
							margin: 20upx 0 10upx;

							.nickName {
								font-size: 28upx;
								font-weight: 500;
								color: #666666;
							}

							.moblie {
								font-size: 28upx;
								font-weight: 500;
								color: #FF3530;
							}
						}

						.btn-wrap {
							display: flex;
							justify-content: flex-end;

							.btn {
								width: 200upx;
								height: 60upx;
								background: #FF3530;
								border-radius: 30upx;
								font-size: 28upx;
								font-weight: bold;
								line-height: 60upx;
								text-align: center;
								color: #FFFFFF;
							}
						}
					}
				}
			}
		}
	}

	.tui-tabs {
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		background-color: #fafafa;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
	}

	.tui-scroll-h {
		width: 750rpx;
		height: 80rpx;
		background-color: #ffffff;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		/* #ifdef APP-PLUS */
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		/* #endif */
		/* #ifdef H5 */
		position: fixed;
		top: 44px;
		left: 0;
		z-index: 999;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		/* #endif */
	}

	.tui-line-h {
		/* #ifdef APP-PLUS */
		height: 1rpx;
		background-color: #cccccc;
		/* #endif */
		position: relative;
	}

	/* #ifndef APP-PLUS*/
	.tui-line-h::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #cccccc;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	/* #endif */

	.tui-tab-item {
		/* #ifndef APP-PLUS */
		display: flex;
		/* #endif */
	}

	.tui-tab-item-title {
		color: #999999;
		font-size: 28rpx;
		height: 80rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		white-space: nowrap;
	}

	.tui-tab-item-title-active {
		border-bottom: 8rpx solid rgb(255, 199, 5);
		font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
		font-weight: 800;
		text-align: left;
		color: #333333;
		font-size: 28upx;
		font-weight: bold;
		border-bottom-width: 10upx;
		text-align: center;
	}
</style>
