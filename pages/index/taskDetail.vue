<template>
	<view class="container" style="padding-bottom: 150upx;">
		<view class="main">
			<view class="user-card">
				<!-- 轮播图 -->
				<view class="user-card-top">
					<view class="home-bgi">
						<swiper class="swiper" autoplay="1500" :indicator-dots="true" :circular='true'
							indicator-active-color="#ffffff" indicator-color="#cccccc">
							<swiper-item class="swiper-wrap" v-for="(item,index) in banners" :key='index'>
								<image :src="item"></image>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<!-- 标题等 -->
				<view class="user-card-bottom" v-if="info">
					<view class="first-row">
						<view style="display: flex;align-items: center;margin-top: 10rpx;">
							<image @tap="goShop" v-if="info.classify == 2" class="zhuan"
								src="/static/img/home/storeLogo.png" mode="widthFix"></image>
							<image @tap="goShop" v-if="info.classify == 1" class="zhuan"
								src="/static/img/my/eleicon.png" mode="widthFix"></image>
							<view class="tit">{{info.goodsTitle}}</view>
						</view>
						<view class="times">
							<view style="width: 70%;display: flex;">
								<image class="timeIcon" src="../../static/img/home/time.png" mode="widthFix"></image>
								<view class="timeKs">{{info.endTime}}</view>
							</view>
							<view style="width: 30%;">
								<view
									style="font-size: 24rpx;font-family: PingFang SC Medium, PingFang SC Medium-Medium;font-weight: 500;text-align: right;color: #999999;">
									还剩{{info.endNum}}份</view>
							</view>
						</view>
					</view>
					<view class="tag-box" v-if="info">
						<view class='tag-item'>
							会员满{{info.memberPrice}}返{{info.memberMoney}}
						</view>
						<view class='tag-item tag-item-orange'>非会员满{{info.price}}返{{info.money}}</view>
						<!-- <view class='tag-item tag-item-orange'>还剩{{info.endNum}}份</view> -->
						<!-- <view class='tag-item tag-item-orange' v-if="status">{{status}}</view> -->
					</view>

					<view style="width: 630rpx;height: 1rpx;opacity: 1;border: 1rpx solid #e6e6e6;margin-top: 30rpx;">
					</view>
					<view style="width: 100%;display: flex;margin-top: 25rpx;">
						<view style="display: flex;width: 33%;" v-for="(nav, index) in recommendList" :key="index">
							<view v-if="index == 0" style="width: 100%;display: flex;">
								<image style="width: 42rpx;height: 42rpx;" :src="nav.iconImg" mode="widthFix"></image>
								<view style="margin-left:8rpx" v-if="index == 0">{{info.numStar}}星好评</view>
								<view style="margin-left:8rpx" v-if="index == 1">{{info.numImg}}张配图</view>
								<view style="margin-left:8rpx" v-if="index == 2">{{info.numWord}}字评论</view>
							</view>
							<view v-if="index == 1" style="width: 100%;display: flex;justify-content: center;">
								<image style="width: 42rpx;height: 42rpx;" :src="nav.iconImg" mode="widthFix"></image>
								<view style="margin-left:8rpx" v-if="index == 0">{{info.numStar}}星好评</view>
								<view style="margin-left:8rpx" v-if="index == 1">{{info.numImg}}张配图</view>
								<view style="margin-left:8rpx" v-if="index == 2">{{info.numWord}}字评论</view>
							</view>
							<view v-if="index == 2" style="width: 100%;display: flex;justify-content: flex-end;">
								<image style="width: 42rpx;height: 42rpx;" :src="nav.iconImg" mode="widthFix"></image>
								<view style="margin-left:8rpx" v-if="index == 0">{{info.numStar}}星好评</view>
								<view style="margin-left:8rpx" v-if="index == 1">{{info.numImg}}张配图</view>
								<view style="margin-left:8rpx" v-if="index == 2">{{info.numWord}}字评论</view>
							</view>
						</view>
					</view>
				</view>
			</view>


			<view class="fxandfl_view">
				<view class="fx_view">
					<view class="title">
						分享赚钱</view>
					<image src="https://bwc.xianmxkj.com/img/20210828/619687edbbc449bb8a75335308272e65.png"
						style="width: 204rpx;height: 48rpx;margin: 20rpx 0;"></image>
					<view class="btn" @tap="goShareUser">
						分享赚钱</view>
				</view>
				<view class="fx_view" style="margin-left: 20rpx;">
					<view style="display: flex;margin-top: 10rpx;">
						<image src="https://bwc.xianmxkj.com/img/20210828/b9f040f451304fb4bdc65c64f241b02f.png"
							style="width: 88rpx;height: 88rpx;"></image>
						<view style="margin-left: 20rpx;margin-top: 10rpx;">
							<view
								style="font-size: 28rpx;font-family: PingFang SC Medium, PingFang SC Medium-Medium;font-weight: 500;color: #333333;">
								粉丝福利号</view>
							<view
								style="margin-top: 15rpx;font-size: 24rpx;font-family: PingFang SC Medium, PingFang SC Medium-Medium;font-weight: 500;color: #CCCCCC;">
								已有999人加入</view>
						</view>
					</view>
					<!-- <view class="title">
						分享赚钱</view> -->
					<view class="btn" style="margin-top: 28rpx;" @tap="fensiImage">
						立即添加</view>
				</view>
			</view>


			<!-- 品鉴要求 -->
			<!-- <view class="schedule-card">
				<view class="schedule-card">
					<view class="title">
						<text>品鉴要求</text>
					</view>
					<view class="recommend">
						<view class="recommend-store1" v-for="(nav, index) in recommendList" :key="index">
							<image class="recommend-img" :src="nav.iconImg" mode="widthFix"></image>
							<view class="recommend-title" v-if="index == 0">{{info.numStar}}星好评</view>
							<view class="recommend-title" v-if="index == 1">{{info.numImg}}张配图</view>
							<view class="recommend-title" v-if="index == 2">评论至少{{info.numWord}}字</view>
						</view>
					</view>
				</view>
				<view class="tit" @tap="navigation(info.latitude,info.longitude,info.goodsTitle)">
					<view style="width: 5%;">
						<image class="positioning" src="../../static/img/home/dizhi.png" mode="widthFix"></image>
					</view>
					<view class="address">
						<view class="">{{info.city}}{{info.district}}{{info.address}}</view>
						<view class="juli">距离{{info.distance}}</view>
					</view>
				</view>
			</view> -->
			<view class="schedule-card">
				<!-- 优惠流程 -->
				<view class="schedule-card">
					<view class="title">
						<text>优惠流程</text>
					</view>
					<view class="recommend">
						<view style="width: 28%;display: flex;align-items: center;margin-bottom: 15rpx;">
							<view style="align-items: center;text-align: center;width: 80%;">
								<image class="recommend-img" src="../../static/img/home/qiangdan.png" mode="widthFix">
								</image>
								<view class="recommend-title">立即抢单</view>
							</view>
							<image src="../../static/img/home/jianyou.png" class="jiantou"></image>
						</view>
						<view style="width: 30%;display: flex;align-items: center;margin-bottom: 15rpx;">
							<view style="align-items: center;text-align: center;width: 80%;">
								<image class="recommend-img" src="../../static/img/home/wmpt.png" mode="widthFix">
								</image>
								<view class="recommend-title">外卖平台下单</view>
							</view>
							<image src="../../static/img/home/jianyou.png" class="jiantou"></image>
						</view>
						<view style="width: 28%;display: flex;align-items: center;margin-bottom: 15rpx;">
							<view style="align-items: center;text-align: center;width: 80%;">
								<image class="recommend-img" src="../../static/img/home/uoload.png" mode="widthFix">
								</image>
								<view class="recommend-title">订单上传</view>
							</view>
							<image src="../../static/img/home/jianyou.png" class="jiantou"></image>
						</view>
						<view
							style="width: 18%;display: flex;align-items: center;justify-content: center;margin-bottom: 15rpx;">
							<view style="align-items: center;text-align: center;width: 80%;">
								<image class="recommend-img" src="../../static/img/home/pinjian.png" mode="widthFix">
								</image>
								<view class="recommend-title">评鉴上传</view>
							</view>
						</view>

					</view>
					<!-- 注意事项 -->
					<view style="width:100%;">
						<!-- <view v-html="info.remark" style="width: 100%;"></view> -->
						<u-parse :content="info.remark" @navigate="navigate"
							style="display:block;width:100%;background-size: 100%;height:auto;">
						</u-parse>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="footer" v-if="status == 0">
			<view class="payinfo" @click="kefu">
				<image src="../../static/img/home/kefu.png" mode="widthFix"></image>
				<view>客服</view>
			</view>
			<view class="payinfo" @tap="navigation(info.latitude,info.longitude,info.goodsTitle)">
				<image src="../../static/img/home/dizhi.png" style="width: 50rpx;height: 52rpx;"></image>
				<view>地址</view>
			</view>
			<button class="tui-button-primar" formType="submit" type="primary" @click="btns">{{btnType}}</button>
		</view>
		
	</view>
</template>

<script>
	import shmilyDragImage from '@/components/shmily-drag-image/shmily-drag-image.vue'
	export default {
		components: {
			shmilyDragImage
		},
		data() {
			return {
				// 页面信息
				info: {},
				items: [{
						title: "立即抢单",
					},
					{
						title: "外卖平台下单",
					},
					{
						title: "订单上传",
					},
					{
						title: "评鉴上传",
					},
				],
				banners: [],
				imageList: [],
				isJieDanUser: false,
				activeSteps: -1,
				orderId: '',
				goodsId: '',
				latitude: '',
				longitude: '',
				isMyOrder: false,
				isLogin: false,
				recommendList1: [{
						iconImg: '../../static/img/home/qiangdan.png',
						title: '立即抢单'
					},
					{
						iconImg: '../../static/img/home/wmpt.png',
						title: '外卖平台下单'
					},
					{
						iconImg: '../../static/img/home/uoload.png',
						title: '订单上传'
					},
					{
						iconImg: '../../static/img/home/pinjian.png',
						title: '评鉴上传'
					}
				],
				recommendList: [{
						iconImg: '../../static/img/home/star.png',
						title: ''
					},
					{
						iconImg: '../../static/img/home/peitu.png',
						title: ''
					},
					{
						iconImg: '../../static/img/home/wenzi.png',
						title: ''
					}
				],
				btnType: '立即抢单',
				status: 1,
				id: 0
			}
		},
		onLoad(e) {
			this.goodsId = e.goodsId;
			this.latitude = e.latitude;
			this.longitude = e.longitude;
			let token = this.$queue.getData('token');
			let userId = this.$queue.getData('userId');
			if (!token) {
				this.goLogin();
			}
		},
		onShow() {
			if (this.goodsId != '') {
				this.initHelpOrder(this.goodsId);
			}
		},
		methods: {
			fensiImage(){
				let fensiImage = this.$queue.getData('fensiImage');
				//#ifndef H5
				uni.navigateTo({
					url: '/pages/public/webview?url=' + fensiImage
				});
				//#endif
				//#ifdef H5
				window.location.href = fensiImage;
				//#endif
			},
			goShareUser() {
				uni.navigateTo({
					url: '/pages/my/shareFriends'
				});
			},
			navigate(href, e) {
				// #ifdef H5
				window.location.href = href;
				//#endif

				//#ifdef APP-PLUS
				setTimeout(function() {
					plus.runtime.openURL(href);
				}, 500);
				// #endif
			},
			navigation(latitude, longitude, name) {
				// #ifdef APP-PLUS
				let url = "";
				if (plus.os.name == "Android") { //判断是安卓端
					plus.nativeUI.actionSheet({ //选择菜单
						title: "选择地图应用",
						cancel: "取消",
						buttons: [{
							title: "腾讯地图"
						}, {
							title: "百度地图"
						}, {
							title: "高德地图"
						}]
					}, function(e) {
						switch (e.index) {
							//下面是拼接url,不同系统以及不同地图都有不同的拼接字段
							case 1:
								//注意referer=xxx的xxx替换成你在腾讯地图开发平台申请的key
								url = `qqmap://map/geocoder?coord=${latitude},${longitude}&referer=xxx`;
								break;
							case 2:
								url =
									`baidumap://map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo`;
								break;
							case 3:
								url =
									`androidamap://viewMap?sourceApplication=appname&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`;
								break;
							default:
								break;
						}
						if (url != "") {
							url = encodeURI(url);
							//plus.runtime.openURL(url,function(e){})调起手机APP应用
							plus.runtime.openURL(url, function(e) {
								plus.nativeUI.alert("本机未安装指定的地图应用");
							});
						}
					})
				} else {
					// iOS上获取本机是否安装了百度高德地图，需要在manifest里配置
					// 在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加
					//（如urlschemewhitelist:["iosamap","baidumap"]）  
					plus.nativeUI.actionSheet({
						title: "选择地图应用",
						cancel: "取消",
						buttons: [{
							title: "腾讯地图"
						}, {
							title: "百度地图"
						}, {
							title: "高德地图"
						}]
					}, function(e) {
						switch (e.index) {
							case 1:
								url = `qqmap://map/geocoder?coord=${latitude},${longitude}&referer=xxx`;
								break;
							case 2:
								url =
									`baidumap://map/marker?location=${latitude},${longitude}&title=${name}&content=${name}&src=ios.baidu.openAPIdemo&coord_type=gcj02`;
								break;
							case 3:
								url =
									`iosamap://viewMap?sourceApplication=applicationName&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`;
								break;
							default:
								break;
						}
						if (url != "") {
							url = encodeURI(url);
							plus.runtime.openURL(url, function(e) {
								plus.nativeUI.alert("本机未安装指定的地图应用");
							});
						}
					})
				}
				// #endif
				// #ifdef MP-WEIXIN
				uni.openLocation({
					latitude: Number(latitude),
					longitude: Number(longitude),
					success: function() {
						console.log('success');
					}
				});
				// #endif
			},
			goShop() {
				if (this.info.classify == 2) { //美团
					// #ifdef MP-WEIXIN
					uni.navigateToMiniProgram({
						appId: 'wx2c348cf579062e56',
						path: this.info.url,
						fail(res) {
							console.error(res)
						}
					})
					// #endif
				} else if (this.info.classify == 1) { //饿了么
					// #ifdef MP-WEIXIN
					uni.navigateToMiniProgram({
						appId: 'wxece3a9a4c82f58c9',
						path: this.info.url,
						fail(res) {
							console.error(res)
						}
					})
					// #endif
				}
			},
			initHelpOrder(goodsId) {
				this.$queue.showLoading('加载中...');
				let that = this;
				let userId = this.$queue.getData('userId') ? this.$queue.getData('userId') : 0;
				this.$Request.getT('/wm/selectGoodsDetails?goodsId=' + goodsId + '&userId=' + userId + '&latitude=' + this
					.latitude + '&longitude=' + this.longitude).then(res => {
					if (res.code == 0) {
						let image = res.goods.img.split(",");

						if (Date.parse(res.goods.endTime.replace('-', '/').replace('-', '/')) < Date.parse(
								new Date())) {
							console.log('这个已经过期了')
							this.status = 99;
						} else {
							this.status = res.status;
						}

						this.banners = image;
						if (res.orders) {
							this.orderId = res.orders.orderId;
						}
						res.goods.distance = this.setMorKm(res.goods.distance);
						this.info = res.goods;
						uni.hideLoading();
					} else {
						this.$queue.showToast(res.msg);
						setTimeout(d => {
							uni.hideLoading();
							uni.navigateBack();
						}, 1000);
					}
				});
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
			// 联系
			kefu() {
				uni.navigateTo({
					url: '/pages/my/customer'
				});
			},
			// 立即下单 打开美团外卖
			btns() {
				this.$queue.showLoading('抢单中...');
				let userId = this.$queue.getData('userId');
				this.$Request.postT('/wm/insertOrders?goodsId=' + this.goodsId + '&userId=' + userId).then(res => {
					if (res.code == 0) {
						this.$queue.showToast('抢单成功！');
						this.initHelpOrder(this.goodsId);
						setTimeout(d => {
							if (this.info.classify == 2) { //美团
								// #ifdef MP-WEIXIN
								uni.navigateToMiniProgram({
									appId: 'wx2c348cf579062e56',
									path: this.info.url,
									fail(res) {
										console.error(res)
									}
								})
								// #endif
							} else if (this.info.classify == 1) { //饿了么
								// #ifdef MP-WEIXIN
								uni.navigateToMiniProgram({
									appId: 'wxece3a9a4c82f58c9',
									path: this.info.url,
									fail(res) {
										console.error(res)
									}
								})
								// #endif
							}
						}, 500);
					} else {
						uni.hideLoading();
						this.$queue.showToast(res.msg);
					}
				});
			},
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
									that.initHelpOrder(that.goodsId);
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
			callContact(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			goLogin() {
				this.$queue.setData('href', '/pages/index/taskDetail?helpOrderId=' + this.helpOrderId);
				uni.navigateTo({
					url: '/pages/public/login'
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		background: #f3f5f7;
	}

	.fxandfl_view {
		width: 95%;
		display: flex;
		margin: 25rpx 30rpx;

		.fx_view {
			width: 335rpx;
			height: 226rpx;
			opacity: 1;
			background: #ffffff;
			border-radius: 16rpx;
			padding: 25rpx 20rpx;

			.title {
				font-size: 28rpx;
				font-family: PingFang SC Medium, PingFang SC Medium-Medium;
				font-weight: 500;
				color: #333333;
			}

			.btn {
				width: 295rpx;
				height: 54rpx;
				opacity: 1;
				background: #fed00b;
				border-radius: 8rpx;
				font-size: 24rpx;
				font-family: PingFang SC Medium, PingFang SC Medium-Medium;
				font-weight: 500;
				text-align: center;
				color: #333333;
				line-height: 54rpx;
			}
		}
	}

	.container {
		width: 100%;

		.main {
			.user-card {
				background: #f3f5f7;
				height: 745rpx;

				.user-card-top {
					display: flex;
					width: 100%;
					height: 500rpx;

					.home-bgi {
						width: 100%;
						height: 500rpx;
						background: #FFF;

						.swiper {
							width: 100%;
							height: 500rpx;

							.swiper-wrap {
								width: 100%;
								height: 500rpx;

								image {
									width: 100%;
									height: 500rpx;
									display: block;
								}
							}

						}
					}

					.right {
						flex: 1;
						margin-left: 20upx;
						padding-top: 14upx;
						padding-bottom: 14upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.first-row {
							display: flex;
							justify-content: space-between;

							.nickName {
								font-size: 28upx;
								font-weight: bold;
								color: #333333;
							}

							.icon-wrap {
								display: flex;
								margin-top: -18upx;

								image {
									width: 44upx;
									height: 44upx;
									margin-left: 20upx;
								}
							}
						}

						.last-row {
							font-size: 24upx;
							font-weight: 500;
							color: #666666;
							display: flex;
							align-items: center;

							.line {
								margin: 0 10upx;
							}
						}
					}
				}

				.user-card-bottom {
					width: 690rpx;
					height: 326rpx;
					margin: -80upx 30upx 0;
					background: #FFFFFF;
					padding: 30rpx;
					border-radius: 24rpx;
					position: absolute;

					.first-row {
						justify-content: space-between;

						.zhuan {
							width: 38rpx;
							height: 38rpx;
						}

						.tit {
							width: 90%;
							height: fit-content;
							font-size: 32upx;
							font-weight: 800;
							margin-left: 10rpx;
							color: #333333;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.times {
							display: flex;
							align-items: center;
							margin-top: 20rpx;

							.timeIcon {
								width: 34rpx;
								height: 34rpx;
							}

							.timeKs {
								margin-left: 6rpx;
								font-size: 24rpx;
								font-family: PingFang SC Medium, PingFang SC Medium-Medium;
								font-weight: 500;
								text-align: center;
								color: #999999;
							}
						}
					}

					.tag-box {
						display: flex;
						margin-top: 20upx;

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

						.tag-item-blue {
							background: #D9EDFF;
							color: #66A6FF;
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

						.tag-item-pink {
							background: #FFD9D9;
							color: #FF6666;
						}

						.tag-item-green {
							background: #D9FFFB;
							color: #17D2BD;
						}
					}
				}
			}

			.schedule-card {
				background-color: #FFF;
				width: 91%;
				margin: 25rpx 30rpx;
				padding-bottom: 50rpx;

				.tit {
					display: flex;
					align-items: center;
					height: fit-content;
					max-height: 150rpx;

					.positioning {
						width: 24rpx;
						height: 44rpx;
					}

					.address {
						width: 95%;
						color: #333333;
						margin-left: 20upx;
						font-size: 26upx;
					}

					.juli {
						color: #999;
					}
				}

				// 品鉴要求
				.title {
					padding: 30rpx 0;
					font-size: 32rpx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;
					color: #333333;
				}

				.recommend {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					// border-bottom: 1upx solid #E6E6E6;
				}

				.recommend-store {
					width: 25%;
					display: flex;
					align-items: center;
					background-color: #fff;
					border-radius: 8upx;
					padding: 8upx;
					text-align: center;
				}

				.recommend-store1 {
					width: 25%;
					display: inline-flexbox;
					align-items: center;
					background-color: #fff;
					border-radius: 8upx;
					padding: 8upx;
					text-align: center;
				}

				.recommend-img {
					width: 60upx;
				}

				.recommend-title {
					font-size: 20upx;
					color: #333;
					line-height: 40upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.jiantou {
					width: 62rpx;
					height: 15rpx;
				}

				.recommend-jinbi {
					position: relative;
				}

				.jinbi-king {
					width: 20upx;
					height: 20upx;
					margin-right: 6upx;
					position: absolute;
					top: 4upx;
				}

				.jinbi-num {
					padding-left: 26upx;
					font-size: 26upx;
				}

				.steps-box-bar {
					padding: 30upx;
					border-bottom: 1upx solid #E6E6E6;

					.title {
						font-size: 28upx;
						font-weight: bold;
						color: #666666;
						display: flex;
						justify-content: space-between;
						padding: 0 30upx 30upx;

						.date {
							font-size: 28upx;
							font-weight: bold;
							color: #FF3530;
						}
					}
				}

				.steps-box-bar1 {
					border-bottom: none;
					padding: 0 30upx 30upx;

					.zysx {
						font-size: 22upx;
						line-height: 30upx;
						margin-bottom: 20upx;
						color: #999;
						position: relative;

						.yuan {
							display: block;
							width: 16upx;
							height: 16upx;
							background: #EF5127;
							position: absolute;
							border-radius: 50%;
							top: 6upx;
						}

						.wenzis {
							margin-left: 30upx;
						}
					}
				}

			}

			.contact-user-card {
				background: #FFFFFF;
				border-radius: 20upx;
				margin-top: 20upx;

				.tit {
					line-height: 80upx;
					height: 80upx;
					padding: 0 30upx;
					font-size: 32upx;
					font-weight: bold;
					color: #333333;
					border-bottom: 1upx solid #E6E6E6;
				}

				.user-card-top {
					padding: 30upx;
					display: flex;

					.img {
						width: 100upx;
						height: 100upx;
						border-radius: 50%;
					}

					.right {
						flex: 1;
						margin-left: 20upx;
						padding-top: 14upx;
						padding-bottom: 14upx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.nickName {
							font-size: 28upx;
							font-weight: bold;
							color: #333333;
						}

						.last-row {
							font-size: 24upx;
							font-weight: 500;
							color: #666666;
							display: flex;
							align-items: center;

							.deta {
								font-size: 24upx;
								color: #FF3530;
							}

							.line {
								margin: 0 10upx;
							}
						}
					}
				}

			}
		}

		// 底部按钮
		.footer {
			width: 100%;
			height: calc(98upx + env(safe-area-inset-bottom));
			height: calc(98upx + constant(safe-area-inset-bottom));
			padding-bottom: env(safe-area-inset-bottom);
			/*兼容IOS>11.2*/
			padding-bottom: constant(safe-area-inset-bottom);
			/*兼容IOS<11.2*/
			background: #FFFFFF;
			position: fixed;
			bottom: 0;
			padding: 0 20upx;
			z-index: 10;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.payinfo {

				width: 100rpx;
				color: #666;
				font-size: 20rpx;
				text-align: center;

				image {
					width: 42rpx;
					height: 50rpx;
				}
			}

			.payinfo1 {
				width: 25%;
				display: inline-block;
			}

			.tui-button-primar {
				width: 60%;
				height: 78upx;
				line-height: 78upx;
				opacity: 1;
				background: #ffc705;
				border-radius: 16rpx;
			}
		}



	}

	.container .main .user-card .user-card-top .home-bgi {
		height: 150px !important;
	}
</style>
