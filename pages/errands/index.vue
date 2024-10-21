<template>
	<view class="container">
		<!-- 轮播图 -->
		<view class="home-bgi">
			<swiper class="swiper" autoplay="1500" :indicator-dots="true" :circular='true'
				indicator-active-color="#ffffff" indicator-color="#cccccc">
				<swiper-item @tap="toGoodsInfo(item.url)" class="swiper-wrap" v-for="(item,index) in banners" :key='index'>
					<image :src="item.imageUrl"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<view style="display: flex;width: 98%;margin: 20rpx 11rpx;">
			<view style="width: 50%;height: 235rpx;" @tap="gochegnxu(2)">
				<image :src="elemeList.imageUrl" style="width: 371rpx;height: 235rpx;background-size: 100%;">
				</image>
			</view>
			<view style="width: 50%;height: 235rpx;" @tap="gochegnxu(1)">
				<image :src="meituanList.imageUrl" style="width: 371rpx;height: 235rpx;background-size: 100%;">
				</image>
			</view>
		</view>
		<!-- <view style="width: 690rpx;height: 232rpx;margin: 30rpx;" @tap="gochegnxu(1)">
			<image :src="meituanList.imageUrl" style="width: 100%;height: 100%;background-size: 100%;"></image>
		</view>
		<view style="width: 690rpx;height: 232rpx;margin: 30rpx;" @tap="gochegnxu(2)">
			<image :src="elemeList.imageUrl" style="width: 100%;height: 100%;background-size: 100%;"></image>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				meituanList: {},
				elemeList: {},
				banners: []
			};
		},
		onShow() {
			this.getSelectBanner();
		},
		methods: {
			// 轮播图跳转小程序
			toGoodsInfo: function(url) {
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
			getSelectBanner() {
				this.$Request.getT('/banner/selectBannerList?classify=3&state=1').then(res => {
					if (res.code === 0) {
						this.banners = res.data;
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
			// 点击优惠券跳转小程序
			gochegnxu(classify) {
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
			}
		}
	};
</script>

<style lang="scss">
	page {
		width: 100%;
	}

	.container {
		width: 100%;

		.home-bgi {
			width: 100%;
			height: 320rpx;
			background: #FFF;

			.swiper {
				width: 100%;
				height: 100%;

				.swiper-wrap {
					width: 750rpx;
					height: 320rpx;

					image {
						width: 750rpx;
						height: 320rpx;
					}
				}

			}
		}
	}
</style>
