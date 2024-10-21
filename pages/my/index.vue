<template>
	<view class="container">
		<view class="header">
			<!-- <image src="../../static/img/my/user-bj.png" class="user-bj"></image> -->
			<view class="user-box">
				<view class="user-info-box">
					<view class="avatar" @tap="checkLogin()">
						<image :src="avatar"></image>
					</view>
					<view class="user-info" v-if="userId">
						<view class="nick-wrap">
							<!-- #ifdef MP-WEIXIN -->
							<text class="nick">{{ nickName }}
							</text>
							<!-- #endif -->
							<!-- #ifndef MP-WEIXIN -->
							<text class="nick" @tap="goPageLogin('/pages/my/updataNickName')">{{ nickName }}
							</text>
							<!-- #endif -->
						</view>
						<text class="code" v-if="member == 1">会员到期时间：{{endTime}}</text>
						<view v-if="member == 0" class="nohuiyuan">
							暂未成为会员</view>
					</view>
					<view class="noLogin" @tap="checkLogin()" v-else>登录</view>
				</view>
				<!-- <view class="info-icon" @tap="goPageLogin('/pages/task/renwu')">
					<image src="../../static/img/my/info.png"></image>
				</view> -->

			</view>

			<view class="huiyuan_view">
				<view class="huiyuan_view_item" @tap="goPageLogin('/pages/my/myVIP')">
					<image src="../../static/img/my/huiyuanmy.png"></image>
					<view class="kaitong" v-if="member == 0">立即开通</view>
					<view class="kaitong" v-if="member == 1">我的权益</view>
				</view>
			</view>

			<view class="jifen_view">
				<view style="display: flex;">
					<view class="title">我的积分</view>
					<view class="title_right" @tap="goPageLogin('/pages/member/chongzhi')">
						<view class="right_name">立即兑换</view>
						<image src="../../static/img/my/right_icon.png"></image>
					</view>
				</view>
				<view class="jifen_item">
					<view class="item_view" @tap="goPageLogin('/pages/member/jifen')">
						<view class="money">{{sumMoney}}</view>
						<view class="text">我的总收益</view>
					</view>
					<view class="item_view" @tap="goPageLogin('/pages/my/my')">
						<view class="money">{{teamMoney}}</view>
						<view class="text">团队收益</view>
					</view>
					<view class="item_view" @tap="goPageLogin('/pages/member/chongzhi')">
						<view class="money">{{money}}</view>
						<view class="text">可兑换</view>
					</view>
					<view class="item_view" @tap="goPageLogin('/pages/member/cashList')">
						<view class="money">{{cashMoney}}</view>
						<view class="text">已兑换</view>
					</view>
				</view>

			</view>

			<view class="fxandfl_view">
				<view class="fx_view" @tap="goPageLogin('/pages/my/teamList')">
					<view class="title">我的团队</view>
					<view class="btn" @tap="goShareUser">团队成员 <text style="color: #ffc705;">{{oneUserCount}}人</text> </view>
				</view>
				<view class="fx_view" style="margin-left: 20rpx;" @tap="goPageLoginS('/pages/order/index')">
					<view class="title">我的作业</view>
					<view class="btn" @tap="goShareUser">查看全部作业</view>
				</view>
			</view>
		</view>

		<view style="width: 91%;margin: 25rpx 30rpx;padding-bottom: 20rpx;" class="tools">
			<!-- @tap="href(7)" -->
			<view class="tui-box tui-tool-box" style="margin:0 auto;padding-bottom: 20rpx;">
				<view class="tui-cell-header">
					<view class="tui-cell-title">常用工具</view>
				</view>
				<view class="tui-order-list tui-flex-wrap">
					<view class="tui-tool-item" @tap="goPageLoginAndChannel('/pages/my/mychannel')">
						<view class="tui-icon-box">
							<image src="https://bwc.xianmxkj.com/img/20210828/2e474854f47242bb8a5c5a43bb1f15dc.png"
								class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">我的渠道</view>
					</view>
					<view class="tui-tool-item"
						@tap="goPageLoginAndNoChannel('/pages/my/savechannel')">
						<view class="tui-icon-box">
							<image src="https://bwc.xianmxkj.com/img/20210828/2b1381937f8549aebdf337c15c15aa07.png"
								class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">渠道申请</view>
					</view>
					<view class="tui-tool-item" @tap="goPageLogin('/pages/my/customer')">
						<view class="tui-icon-box">
							<image src="https://bwc.xianmxkj.com/img/20210828/bd4d235c082e4f9e8e62256e50cb2f02.png"
								class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">联系客服</view>
					</view>
					<view class=" tui-tool-item" @tap="goPageLogin('/pages/my/ranking')">
						<view class="tui-icon-box">
							<image src="https://bwc.xianmxkj.com/img/20210828/aeb37b2be17d40829fb05650d17e819b.png"
								class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text ">我的邀请</view>
					</view>
					<view class=" tui-tool-item" @tap="goPageLogin('/pages/my/cooperation')">
						<view class="tui-icon-box">
							<image src="https://bwc.xianmxkj.com/img/20210828/d313e7e10452488fb14814d3081ef5ae.png"
								class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">商户合作</view>
					</view>
					<view class="tui-tool-item" v-if="userId && shopIsEn != '否'" @tap='goShop()'>
						<view class="tui-icon-box">
							<image src="https://bwc.xianmxkj.com/img/20210828/ac03a1a4c9564abdad2922f5221b1677.png"
								class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">前往商户端</view>
					</view>
					<view class=" tui-tool-item" @tap="goPageLogin('/pages/my/account')">
						<view class="tui-icon-box">
							<image src="https://bwc.xianmxkj.com/img/20210828/888ca256b4814a9d95c8cb97dba707c2.png"
								class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">设置中心</view>
					</view>

					<view class=" tui-tool-item" v-if="userId" @tap='loginOut()'>
						<view class="tui-icon-box">
							<image src="https://bwc.xianmxkj.com/img/20210828/e8f096d23a5c4cb0bf0f716901e0ce9a.png"
								class="tui-tool-icon"></image>
						</view>
						<view class="tui-tool-text">退出登录</view>
					</view>
				</view>
			</view>
		</view>
		<!-- cashMoney: 0, //已兑换 
				money: 0, //可兑换 
				oneUserCount: 0, //邀请人数 
				stayMoney: 0, //待入账 
				sumMoney: 0 //总收益 -->

		<!-- <view class="info-jifen">
				<view class="wdjf">我的总收益</view>
				<view class="zsy_view">
					<view class="sumMoney_view">{{sumMoney}}</view>
					<view @tap="goPageLogin('/pages/member/chongzhi')" class="duihuan_btn">
						立即兑换
					</view>
				</view>
				<view class="shouye_item">
					<view class="shouye_item_left">
						<view class="shouye_item_text">团队收益</view>
						<view class="shouye_item_money">{{teamMoney}}</view>
					</view>
					<view class="shouye_item_center">
						<view class="shouye_item_text">可兑换</view>
						<view class="shouye_item_money">{{money}}</view>
					</view>
					<view class="shouye_item_right">
						<view class="shouye_item_text">已兑换</view>
						<view class="shouye_item_money">{{cashMoney}}</view>
					</view>
				</view>
				<view class="tuandui_item">
					<view class="tuandui_item_left" @tap="goPageLogin('/pages/member/yaoqing')">
						团队成员：{{oneUserCount}}人</view>
					<view @tap="goPageLogin('/pages/my/shareFriends')" class="yaoqing_btn">
						邀请好友</view>
				</view>
			</view>
		 -->
		<!-- <view class="main">
			<view class="integrals-box">
				<view class="integral" @tap="goPageLoginS('/pages/order/index')">
					<view class="left">
						<image src="../../static/img/my/waimai.png"></image>
						<text>我的外卖</text>
					</view>
					<text class="right cuIcon-right"></text>
				</view>
				<view class="integral" @tap="goPageLogin('/pages/my/myVIP')">
					<view class="left">
						<image src="../../static/img/my/huiyuan.png"></image>
						<text>会员中心</text>
					</view>
					<text class="right cuIcon-right"></text>
				</view>
				<view class="integral" @tap="goPageLogin('/pages/my/teamList')">
					<view class="left">
						<image src="../../static/img/my/myteam.png"></image>
						<text>我的团队</text>
					</view>
					<text class="right cuIcon-right"></text>
				</view>
				<view class="integral" @tap="goPageLoginAndChannel('/pages/my/mychannel')">
					<view class="left">
						<image src="../../static/img/my/mychannel.png"></image>
						<text>我的渠道</text>
					</view>
					<text class="right cuIcon-right"></text>
				</view>
				<view class="integral" v-if="channelSQ" @tap="goPageLoginAndNoChannel('/pages/my/savechannel')">
					<view class="left">
						<image src="../../static/img/my/channeladd.png"></image>
						<text>渠道申请</text>
					</view>
					<text class="right cuIcon-right"></text>
				</view>
				<view class="integral" @tap="goPageLogin('/pages/my/customer')">
					<view class="left">
						<image src="../../static/img/my/kefu.png"></image>
						<text>联系客服</text>
					</view>
					<text class="right cuIcon-right"></text>
				</view>
				<view class="integral" @tap="goPageLogin('/pages/my/ranking')">
					<view class="left">
						<image src="../../static/img/my/yaoqing.png"></image>
						<text>我的邀请</text>
					</view>
					<text class="right cuIcon-right"></text>
				</view>
				<view class="integral" @tap="goPageLogin('/pages/my/cooperation')">
					<view class="left">
						<image src="../../static/img/my/hezuo.png"></image>
						<text>商户合作</text>
					</view>
					<text class="right cuIcon-right"></text>
				</view>
				<view class="integral" v-if="userId && shopIsEn != '否'" @tap='goShop()'>
					<view class="left">
						<image src="../../static/img/my/qwyhd.png"></image>
						<text>前往商户端</text>
					</view>
					<text class="right cuIcon-right"></text>
				</view>
				<view class="integral" @tap="goPageLogin('/pages/my/account')">
					<view class="left">
						<image src="../../static/img/my/shezhi.png"></image>
						<text>设置中心</text>
					</view>
					<text class="right cuIcon-right"></text>
				</view>
				<view class="integral" v-if="userId" @tap='loginOut()'>
					<view class="left">
						<image src="../../static/img/my/loginout.png"></image>
						<text>退出登录</text>
					</view>
					<text class="right cuIcon-right"></text>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar: "/static/img/logo.png",
				member: 0,
				total: 0,
				SumMoney: 0,
				userId: '',
				shopAppId: '',
				shopIsEn: '否',
				nickName: "",
				isStudent: -1,
				invitationCode: "",
				endTime: '',
				channelSQ: false,
				sex: '',
				cashMoney: 0, //已兑换 
				money: 0, //可兑换 
				oneUserCount: 0, //邀请人数 
				stayMoney: 0, //待入账 
				teamMoney: 0, //团队收益
				sumMoney: 0 //总收益

			}
		},
		onShow() {

			let shopAppId = this.$queue.getData('shopAppId');
			if (shopAppId) {
				this.shopAppId = shopAppId;
			}
			let shopIsEn = this.$queue.getData('shopIsEn');
			if (shopIsEn) {
				this.shopIsEn = shopIsEn;
			} else {
				this.shopIsEn = '否';
			}

			let avatar = this.$queue.getData('avatar');
			if (avatar && avatar !== 'undefined') {
				this.avatar = avatar;
			} else {
				this.avatar = '/static/img/logo.png';
			}
			let nickName = this.$queue.getData('nickName');
			if (nickName && nickName !== 'undefined') {
				this.nickName = nickName;
			} else {
				this.nickName = '';
			}
			let invitationCode = this.$queue.getData('invitationCode');
			if (invitationCode && invitationCode !== 'undefined') {
				this.invitationCode = invitationCode;
			} else {
				this.invitationCode = '';
			}
			this.sex = this.$queue.getData('sex');
			this.userId = this.$queue.getData('userId');
			if (this.userId) {
				this.getUserInfo(this.userId);
				this.getUserInfointegral(this.userId);
				this.getUserInfoSumMoney(this.userId);
				this.checkChannel();
			}
		},
		methods: {
			goShop() {
				let that = this;
				uni.showModal({
					title: '温馨提示',
					content: '确定要前往商户端么',
					success: e => {
						if (e.confirm) {
							uni.navigateToMiniProgram({
								appId: '' + that.shopAppId,
								path: '/pages/index/shopIndex',
								fail(res) {
									console.error(res)
								}
							})
						}
					}
				});
			},
			checkChannel() {
				let userId = this.$queue.getData('userId');
				this.$Request.getT('/channel/selectChannelByUserId?userId=' + userId).then(res => {
					if (res.code === 0) {
						// if (!res.data) {
						// 	this.channelSQ = true;
						// }else{
						// 	this.channelSQ = false;
						// }


						if (res.data) {
							if (res.data.status === 1) { //审核中

							} else if (res.data.status === 2) { //通过
								this.channelSQ = false;
							} else if (res.data.status === 3) { //拒绝
								this.channelSQ = true;
							}
						} else {
							this.channelSQ = true;
						}

					}
				});
			},
			//获取用户积分信息
			getUserInfointegral(userId) {
				this.$Request.getT('/statistical/statisticalMoney?userId=' + userId).then(res => {
					if (res.code === 0) {
						this.cashMoney = res.data.cashMoney ? res.data.cashMoney : 0;
						this.money = res.data.money ? res.data.money : 0;
						this.oneUserCount = res.data.oneUserCount ? res.data.oneUserCount : 0;
						this.stayMoney = res.data.stayMoney ? res.data.stayMoney : 0;
						this.sumMoney = res.data.sumMoney ? res.data.sumMoney : 0;
						this.teamMoney = res.data.teamMoney ? res.data.teamMoney : 0;
						// this.cashMoney = res.data.cashMoney > 10000 ? (res.data.cashMoney / 10000).toFixed(1) + '万'  : res.data.cashMoney;
						// this.money = res.data.money > 10000 ? (res.data.money / 10000).toFixed(1) + '万'  : res.data.money;
						// this.oneUserCount = res.data.oneUserCount > 10000 ? (res.data.oneUserCount / 10000).toFixed(1) + '万'  : res.data.oneUserCount;
						// this.stayMoney = res.data.stayMoney > 10000 ? (res.data.stayMoney / 10000).toFixed(1) + '万'  : res.data.stayMoney;
						// this.sumMoney = res.data.sumMoney > 10000 ? (res.data.sumMoney / 10000).toFixed(1) + '万'  : res.data.sumMoney;
					}
				});
			},
			getUserInfoSumMoney(userId) {
				this.$Request.getT('/userMoney/sumMoney?userId=' + userId).then(res => {
					if (res.code === 0) {
						this.SumMoney = res.data ? res.data : 0;
					}
				});
			},
			getUserInfo(userId) {
				this.$Request.postT("/app/selectUserById?userId=" + userId).then(res => {
					if (res.code === 0) {
						this.member = res.data.member ? res.data.member : 0;
						this.endTime = res.data.endTime;
						this.sex = res.data.sex;
						this.$queue.setData("avatar", res.data.imageUrl ? res.data.imageUrl :
							'/static/img/logo.png');
						this.$queue.setData('member', res.data.member);
						this.$queue.setData("nickName", res.data.nickName ? res.data.nickName : res.data.phone);
						this.$queue.setData("mobile", res.data.phone);
						this.$queue.setData("invitationCode", res.data.invitationCode);
						this.$queue.setData("relation_id", res.data.relationId);
						this.$queue.setData("relation", res.data.invitationCode);
						this.$queue.setData("grade", res.data.grade);
						this.$queue.setData("isInvitation", res.data.isInvitation);
						this.$queue.setData("gender", parseInt(res.data.gender));
						this.$queue.setData("sex", res.data.sex);
						let campus = res.data.campus;
						if (campus && campus != null) {
							this.$queue.setData("campus", res.data.campus);
							this.$queue.setData("campusName", res.data.campusName);
						}
					} else {
						this.$queue.logout();
						uni.showModal({
							showCancel: false,
							title: '登录失败',
							content: res.msg,
						});

					}
					uni.hideLoading();
				});
			},
			goPageLoginS(url) {
				let token = this.$queue.getData('token');
				if (token) {
					console.log('是否有token')
					uni.switchTab({
						url
					})
				} else {
					this.goLogin();
				}
			},
			goPageLoginAndChannel(url) {
				let token = this.$queue.getData('token');
				this.$queue.removeItem('EditChannel');
				if (token) {
					let userId = this.$queue.getData('userId');
					this.$Request.getT('/channel/selectChannelByUserId?userId=' + userId).then(res => {
						if (res.code === 0) {
							if (res.data) {
								if (res.data.status === 1) { //审核中
									this.$queue.showToast('渠道申请已提交，正在审核中，请勿重复提交！');
								} else if (res.data.status === 2) { //通过
									uni.navigateTo({
										url
									})
								} else if (res.data.status === 3) { //通过
									this.$queue.showToast('渠道申请未通过，请修改后重新提交渠道申请！');
								}
							} else {
								this.$queue.showToast('您还不是渠道商，请提交渠道申请后再来试试吧！');
							}
						}
					});
				} else {
					this.goLogin();
				}
			},
			goPageLoginAndNoChannel(url) {
				let token = this.$queue.getData('token');
				this.$queue.removeItem('EditChannel');
				if (token) {
					let userId = this.$queue.getData('userId');
					this.$Request.getT('/channel/selectChannelByUserId?userId=' + userId).then(res => {
						if (res.code === 0) {
							if (!res.data) {
								uni.navigateTo({
									url
								})
							} else {
								if (res.data.status === 1) { //审核中
									this.$queue.showToast('渠道申请已提交，正在审核中，请勿重复提交！');
								} else if (res.data.status === 2) { //通过
									this.$queue.showToast('您已经是渠道商了！');
								} else if (res.data.status === 3) { //通过
									this.$queue.setData('EditChannel', res.data);
									uni.navigateTo({
										url
									})
								}
							}
						}
					});
				} else {
					this.goLogin();
				}
			},
			goPageLogin(url) {
				let token = this.$queue.getData('token');
				if (token) {
					console.log('是否有token')
					uni.navigateTo({
						url
					})
				} else {
					this.goLogin();
				}
			},
			checkLogin() {
				let token = this.$queue.getData('token');
				let userId = this.$queue.getData('userId');
				if (token) {
					this.getUserInfo(userId);
				} else {
					this.goLogin();
				}
			},
			goLogin() {
				this.$queue.setData('href', '/pages/my/index');
				uni.navigateTo({
					url: '/pages/public/login'
				});
			},
			//退出登录
			loginOut() {
				let that = this;
				uni.showModal({
					title: '退出提醒',
					content: '确定要退出登录么',
					success: e => {
						if (e.confirm) {
							that.$queue.logout();
							that.userId = '';
							that.avatar = '/static/img/logo.png';
							that.nickName = '';
							that.invitationCode = '';
							that.sumMoney = 0;
							that.money = 0;
							that.cashMoney = 0;
							that.oneUserCount = 0;
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		width: 100%;
		background: #F3F5F7;
	}

	.container {
		width: 100%;

		.header {
			width: 100%;
			background: #F3F5F7;

			.user-bj {
				width: 100%;
				height: 370upx;
				z-index: 5;
			}

			.user-box {
				width: 100%;
				height: 250upx;
				z-index: 15;
				padding: 150upx 30upx 0;
				display: flex;
				align-items: center;

				.user-info-box {
					flex: 1;
					height: 100%;
					display: flex;
					align-items: center;

					.avatar {
						width: 110upx;
						height: 110upx;
						border-radius: 50%;
						overflow: hidden;

						image {
							width: 100%;
							height: 100%;
							display: block;
						}
					}

					.noLogin {
						display: flex;
						display: flex;
						flex-direction: column;
						margin-left: 20upx;
						font-size: 40upx;
						font-weight: 800;
						color: #333333;
					}

					.user-info {
						display: flex;
						display: flex;
						flex-direction: column;
						margin-left: 20upx;

						.nick-wrap {
							display: flex;
							align-items: center;
							height: 45upx;

							.nick {
								font-size: 32rpx;
								font-family: PingFang SC Bold, PingFang SC Bold-Bold;
								font-weight: 700;
								color: #333333;


							}

							.nick_image {
								width: 38upx;
								height: 38upx;
								margin-left: 20upx;
							}

							.activation {
								width: 100upx;
								height: 38upx;
								line-height: 38upx;
								text-align: center;
								background: #FFFFFF;
								border-radius: 19upx;
								margin-left: 20upx;
								font-size: 24upx;
								font-weight: bold;
								color: #FF332F;
							}
						}

						.nohuiyuan {
							margin-top: 10rpx;
							width: 150rpx;
							height: 34rpx;
							opacity: 1;
							border: 3rpx solid #b28957;
							border-radius: 18rpx;
							font-size: 20rpx;
							font-family: PingFang SC Medium, PingFang SC Medium-Medium;
							font-weight: 500;
							text-align: center;
							color: #c9ab76;
							line-height: 34rpx;
						}

						.code {
							display: flex;
							align-items: center;
							height: 45upx;
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #999;
						}

					}


				}

				.info-icon {
					width: 46upx;
					height: 48upx;

					image {
						width: 100%;
						height: 100%;
						display: block;
					}
				}

			}

			.fxandfl_view {
				width: 95%;
				display: flex;
				margin: 25rpx 30rpx;

				.fx_view {
					width: 335rpx;
					height: 155rpx;
					opacity: 1;
					background: #ffffff;
					border-radius: 16rpx;
					padding: 25rpx 20rpx;

					.title {
						font-size: 32rpx;
						font-family: PingFang SC Bold, PingFang SC Bold-Bold;
						font-weight: 700;
						color: #333333;
					}

					.btn {
						margin-top: 20rpx;
						font-size: 24rpx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						color: #999999;
					}
				}
			}

			.huiyuan_view {
				width: 690rpx;
				height: 90rpx;
				opacity: 1;
				margin: 30rpx;

				.huiyuan_view_item {
					width: 690rpx;
					height: 90rpx;

					image {
						width: 690rpx;
						height: 90rpx;
						position: absolute;
						z-index: 1;
					}

					.kaitong {
						text-align: right;
						width: 85%;
						position: absolute;
						font-size: 24rpx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						color: #e3b97e;
						line-height: 90rpx;
						z-index: 1;
					}
				}
			}

			.jifen_view {
				width: 690rpx;
				opacity: 1;
				background: #ffffff;
				border-radius: 24rpx;
				padding: 30rpx;
				margin: 30rpx;

				.jifen_item {
					display: flex;
					width: 100%;

					.item_view {
						width: 25%;
						text-align: center;
						margin-top: 50rpx;

						.money {
							font-size: 38rpx;
							font-family: DIN Bold, DIN Bold-Bold;
							font-weight: 700;
							color: #ffc705;
						}

						.text {
							margin-top: 15rpx;
							font-size: 24rpx;
							font-family: PingFang SC Regular, PingFang SC Regular-Regular;
							font-weight: 400;
							color: #999999;
						}
					}

					.item_view_left {
						width: 25%;
						text-align: center;
						margin-top: 50rpx;
						padding-right: 20rpx;

						.money {
							font-size: 38rpx;
							font-family: DIN Bold, DIN Bold-Bold;
							font-weight: 700;
							color: #ffc705;
						}

						.text {
							margin-top: 15rpx;
							font-size: 24rpx;
							font-family: PingFang SC Regular, PingFang SC Regular-Regular;
							font-weight: 400;
							color: #999999;
						}
					}
				}

				.title {
					width: 50%;
					font-size: 32rpx;
					font-family: PingFang SC Bold, PingFang SC Bold-Bold;
					font-weight: 700;
					color: #333333;
				}

				.title_right {
					width: 50%;
					align-items: center;
					display: flex;
					justify-content: flex-end;

					image {
						width: 11rpx;
						height: 18rpx;
						margin-left: 10rpx;
					}

					.right_name {
						font-size: 24rpx;
						font-family: PingFang SC Medium, PingFang SC Medium-Medium;
						font-weight: 500;
						color: #999999;
					}
				}
			}

			.info-jifen {
				width: 92%;
				height: 360rpx;
				position: absolute;
				background: #FFD900;
				border-radius: 15rpx;
				z-index: 15;
				margin: 235upx 30upx 0;
				padding: 20upx;
				box-sizing: border-box;

				.wdjf {
					margin-top: 10rpx;
					font-size: 34rpx;
					font-weight: 400;
					color: #806C30;
				}

				.shouye_item {
					margin-top: 20rpx;
					display: flex;
					width: 100%;
					color: #333333;

					.shouye_item_text {
						color: #806C30;
						font-size: 24rpx;
					}

					.shouye_item_money {
						margin-top: 10rpx;
						font-size: 38rpx;
					}

					.shouye_item_left {
						width: 33%;
						text-align: left;
					}

					.shouye_item_center {
						width: 33%;
						text-align: center;
					}

					.shouye_item_right {
						width: 33%;
						text-align: right;
					}
				}



				.tuandui_item {
					margin-top: 20rpx;
					display: flex;
					width: 100%;
					color: #FFFFFF;
					border-top: 3rpx solid #ffff00;
					padding-top: 15rpx;

					.tuandui_item_left {
						width: 75%;
						color: #333333;
						padding-top: 5rpx;
					}
				}

				.yaoqing_btn {
					margin-left: 10rpx;
					background: #252323;
					border-radius: 50rpx;
					color: #FFFFFF;
					text-align: center;
					line-height: 50rpx;
					width: 150rpx;
					height: 50rpx;
					font-size: 30rpx;
					font-weight: 500;
				}

				.zsy_view {
					margin-top: 15rpx;
					display: flex;
					width: 100%;
				}

				.sumMoney_view {
					font-size: 50rpx;
					font-weight: 500;
					color: #333333;
					width: 75%;
				}

				.duihuan_btn {
					margin-left: 10rpx;
					background: #252323;
					border-radius: 50rpx;
					color: #FFFFFF;
					text-align: center;
					line-height: 60rpx;
					width: 150rpx;
					height: 60rpx;
					font-size: 30rpx;
					font-weight: 500;
				}
			}

		}

		.main {
			.integrals-box {
				margin-bottom: 50rpx;
				margin-top: 40upx;
				background-color: #FFF;
				padding: 10upx 34upx 10upx 40upx;


			}
		}

		.tui-order-text,
		.tui-tool-text {
			font-size: 26rpx;
			font-weight: 400;
			color: #666;
			padding-top: 16rpx;
		}

		.tui-tool-text {
			font-size: 24rpx;
		}

		.tui-order-list {
			width: 100%;
			height: fit-content;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.tui-order-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.tui-box {
			width: 100%;
			background: #fff;
			box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.3);
			border-radius: 10rpx;
			// overflow: hidden;
		}

		.tui-cell-header {
			width: 100%;
			height: 74rpx;
			padding: 0 26rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.tui-cell-title {
			font-size: 30rpx;
			line-height: 30rpx;
			font-weight: 600;
			color: #333;
		}

		.tui-tool-box {
			margin-top: 20rpx;
		}

		// 收藏夹
		.addTo {
			display: flex;
			flex-direction: column;
			color: #ffff;
			text-align: center;
		}

		.tui-flex-wrap {
			flex-wrap: wrap;
			height: 300upx;
			padding-bottom: 30rpx;
		}

		.tui-tool-item {
			width: 25%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding-top: 10rpx;
		}

		.tti {
			width: 20%;
		}

		.tui-tool-icon {
			width: 90rpx;
			height: 90rpx;
			display: block;
			padding: 4upx;
		}

		.tui-badge-icon {
			width: 66rpx;
			height: 30rpx;
			position: absolute;
			right: 0;
			transform: translateX(88%);
			top: -15rpx;
		}

		.integral {
			width: 100%;
			height: 92upx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left1 {
				display: flex;
				align-items: center;
				flex: 1;


				text {
					color: #333333;
					font-size: 38rpx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;

				}
			}

			.left {
				display: flex;
				align-items: center;
				flex: 1;

				image {
					width: 35rpx;
					height: 35rpx;

				}

				text {
					margin-left: 34rpx;
					color: #333333;
					font-size: 30rpx;
					font-family: PingFang SC Medium, PingFang SC Medium-Medium;
					font-weight: 500;

				}

				button {
					flex: 1;
					padding: 0;
					margin: 0;
					border: none;
					background: transparent;
					text-align: left;
				}

				button::after {
					border: none;
				}

				button::before {
					border: none;
				}

				.view-text {
					font-size: 28upx;
					color: #333333;
					margin-left: 20upx;
				}
			}

			.right {
				font-size: 28upx;
				color: #333333;
			}
		}

		.integral1 {
			height: 48rpx;

			.left {
				text {
					font-size: 40rpx;
				}
			}
		}
	}
</style>
