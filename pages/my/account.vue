<template>
	<view class="container">
		<view class="list-cell b-b" @click="navTo('/pages/member/zhifubao')" hover-class="cell-hover"
			:hover-stay-time="50">
			<text class="cell-tit">支付宝账号</text>
			<text class="right cuIcon-right"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/member/mimi')" hover-class="cell-hover"
			:hover-stay-time="50">
			<text class="cell-tit">隐私政策</text>
			<text class="right cuIcon-right"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/member/xieyi')" hover-class="cell-hover"
			:hover-stay-time="50">
			<text class="cell-tit">用户协议</text>
			<text class="right cuIcon-right"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/member/feedback')" hover-class="cell-hover"
			:hover-stay-time="50">
			<text class="cell-tit">意见反馈</text>
			<text class="right cuIcon-right"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		onShow() {

		},
		methods: {
			navTo(url) {
				let token = this.$queue.getData("token");
				if (token) {
					uni.navigateTo({
						url: url
					});
				} else {
					uni.navigateTo({
						url: '/pages/public/login'
					});
				}
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}

	.right-txt {
		display: flex;
		align-items: center;
	}

	.list-cell {
		display: flex;
		align-items: baseline;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;

		&.log-out-btn {
			margin-top: 40upx;

			.cell-tit {
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}

		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 32upx;
		}

		&.m-t {
			margin-top: 18upx;
		}

		.cell-more {
			align-self: baseline;
			font-size: $font-lg;
			color: $font-color-light;
			margin-left: 12upx;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right: 12upx;
		}

		.cell-tip {
			font-size: $font-base;
			color: $font-color-light;
		}

		switch {
			transform: translateX(8px) scale(.84);
		}
	}
</style>
