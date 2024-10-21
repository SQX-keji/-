<template>
	<view class="yu-home-list" style="padding-top: 20rpx;">
		<block v-for="(item, index) in list" :key="index" class="lists">
			<view class="home-list-item"
				:class="{'active-margin-bottom': bottomMargin, 'active-border-radius' : radius}"
				:style="{ background: backgroundColor }" @tap="clickItem(item,index)">
				<view class="item-wrap" :class="{'active-border-bottom': splitLine }">
					<image :src="item.titleImg" class="item-storeImg"></image>
					<view class="right">
						<view class="tag-title">
							<image v-if="item.classify == 2" class="item-Logo" mode="widthFix"
								src="/static/img/home/storeLogo.png"></image>
							<image v-if="item.classify == 1" class="item-Logo" mode="widthFix"
								src="/static/img/my/eleicon.png"></image>
							<view class="tag-titles">{{item.goodsTitle}}</view>
						</view>
						<view class="item-wz">
							<view style="width: 63%;display: flex;;">
								<view style="width: 8%;">
									<image src="../../static/img/home/weizhi.png" class="weizhi"></image>
								</view>
								<view class="item-weizhi">{{item.city}}{{item.address}}</view>
							</view>
							<view v-if="item.distance" class="item-juli">距离：{{item.distance}}</view>
						</view>
						<view class="item-wz" v-if="item.memberPrice">
							<view class='tag-item'>
								会员满{{item.memberPrice}}返{{item.memberMoney}}
							</view>
							<view class='tag-item-orange'>非会员满{{item.price}}返{{item.money}}</view>
						</view>
					</view>
					<view style="border:1upx solid #f1f1f1;margin: 30rpx 0 20rpx;"></view>
					<view style="display: flex;width: 100%;">
						<view class="avatar">
							<view class="item-money" style="align-items: center;">
								<image style="width: 32rpx;height: 32rpx;margin-right: 6upx;"
									src="../../static/img/home/yingbi.png"></image>
								<view class="jinbi-num">{{item.memberMoneys}}</view>
								<view class="item-yu" v-if="item.endNum > 0">剩余{{item.endNum}}份</view>
								<view class="item-yu" v-else>已售罄</view>
							</view>
						</view>
						<view class="baoming">报名</view>
						<!-- <view class="date">结束时间: {{item.endTime}}</view> -->
						<!-- <view style="width: 40%;text-align: right;font-size: 28rpx;color: #FD6416;" v-if="item.channelMoney">每单返：{{item.channelMoney}}积分</view> -->
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'taskHomeList',
		props: {
			list: {
				type: Array,
				default () {
					return [];
				}
			},
			//背景颜色
			backgroundColor: {
				type: String,
				default: '#FFFFFF'
			},
			//是否需要下方横线
			splitLine: {
				type: Boolean,
				default: false
			},
			//下方20rpx margin
			bottomMargin: {
				type: Boolean,
				default: false
			},
			radius: {
				type: Boolean,
				default: false
			},
		},
		watch: {

		},
		data() {
			return {};
		},
		methods: {
			clickItem(item, index) {
				this.$emit('click', {
					item: item,
					index: index,
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.baoming {
		width: 180rpx;
		height: 60rpx;
		opacity: 1;
		background: #ffc705;
		border-radius: 30rpx;
		font-size: 28rpx;
		font-family: PingFang SC Medium, PingFang SC Medium-Medium;
		font-weight: 500;
		text-align: center;
		color: #333333;
		line-height: 60rpx;
	}

	.yu-home-list {
		justify-content: space-between;
		background: #FAF7F5;

		.lists {
			display: inline-block;
		}

		.home-list-item {
			// padding: 0 30upx;
			// width: 100%;
			width: 690rpx;
			height: 311rpx;
			margin: 0 30rpx;
			position: relative;
			background: #FFFFFF;
			box-sizing: border-box;
			border-bottom: 10px solid #F5F5F5;
			border-radius: 24rpx;

			.item-wrap {
				// width: 79%;
				padding: 20upx;
				// width: 750upx;
				// height: 263upx;
			}

			.item-storeImg {
				position: absolute;
				width: 146upx;
				height: 146upx;
				border-radius: 8upx;
			}

			.right {
				padding-left: 160upx;

				.tag-title {
					display: flex;
					font-size: 30upx;
					color: #333;
					line-height: 50upx;
					align-items: center;

					.item-Logo {
						width: 40upx;
						height: 40upx;
					}

					.tag-titles {
						padding-left: 10rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 32rpx;
						font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
						font-weight: 800;
						text-align: left;
						color: #333333;
					}
				}

				.item-wz {
					display: flex;
					align-items: center;
					position: relative;
					margin-top: 10upx;
					color: #999;
					font-size: 20upx;

					.tag-item {
						font-size: 12px;
						color: #d3a25a;
						background: #fff4e5;
						border: 2rpx solid #d3a25a;
						border-radius: 4rpx;
						display: inline-block;
						height: 38upx;
						line-height: 38upx;
						border-radius: 5upx;
						padding: 0 13upx;
						margin-right: 10upx;

						.huiyaun {
							width: 20upx;
						}
					}

					.tag-item-orange {
						height: 38upx;
						line-height: 38upx;
						border-radius: 5upx;
						padding: 0 13upx;
						background: #fff4e5;
						border: 2rpx solid #d3a25a;
						border-radius: 4rpx;
						color: #d3a25a;
					}

					.weizhi {
						width: 26rpx;
						height: 30rpx;
						margin-top: 3rpx;
					}

					.item-weizhi {
						padding-left: 10upx;
						color: #999999;
						width: 92%;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						font-size: 24rpx;
					}

					.item-juli {
						width: 35%;
						color: #999999;
						font-size: 24rpx;
						text-align: right;
					}
				}
			}

			.date {
				margin-top: 10rpx;
				width: 60%;
				text-align: left;
				color: #999999;
				font-size: 24rpx;
			}


		}

		.avatar {
			display: flex;
			margin-top: 10upx;
			line-height: 50upx;
			color: #999;
			font-size: 20upx;
			width: 70%;

			.jinbi-num {
				margin-left: 10rpx;
				font-size: 38rpx;
				color: #333333;
				font-family: DINPro Bold, DINPro Bold-Bold;
				font-weight: 700;
			}

			.item-money {
				display: flex;
				align-content: center;
				width: 100%;
				color: #333333;
				font-weight: bold;

				span {
					font-size: 30upx;
				}
			}

			.item-yu {
				margin-left: 20rpx;
				color: #999999;
				font-size: 24rpx;
				font-family: PingFang SC Regular, PingFang SC Regular-Regular;
				font-weight: 400;
				text-align: center;
			}
		}

		// 是否有底部线条
		.home-list-item .active-border-bottom {
			// border-bottom: 2rpx solid #E6E6E6;
		}

		.home-list-item:last-child .active-border-bottom {
			// 是否有底部线条
			border-bottom: 0;
		}

		// 是否圆角
		.active-border-radius {
			border-radius: 10upx;
		}

		// 是否有底部20rpx边距
		.active-margin-bottom {
			margin-bottom: 20upx;
		}

		.active-margin-bottom:last-child {
			margin-bottom: 0;
		}
	}
</style>
