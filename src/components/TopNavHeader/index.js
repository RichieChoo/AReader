import React, { PureComponent } from "react";
import Link from "umi/link";
import RightContent from "../GlobalHeader/RightContent";
import BaseMenu from "../SiderMenu/BaseMenu";
import styles from "./index.less";

export default class TopNavHeader extends PureComponent {
	state = {
		maxWidth: undefined,
	};

	static getDerivedStateFromProps(props) {
		const { contentWidth, primaryColor } = props;
		return {
			maxWidth:
				(contentWidth === "Fixed" ? 1200 : window.innerWidth) - 280 - 165 - 40,
			primaryColor,
		};
	}

	render() {
		const { theme, contentWidth, logo } = this.props;
		const { maxWidth, primaryColor } = this.state;
		return (
			<div
				className={`${styles.head} ${theme === "light" ? styles.light : ""}`}
			>
				<div
					ref={ref => {
						this.maim = ref;
					}}
					className={`${styles.main} ${
						contentWidth === "Fixed" ? styles.wide : ""
					}`}
				>
					<div className={styles.left}>
						<div className={styles.logo} key="logo" id="logo">
							<Link to="/">
								<h1 style={{ fontSize: "30px", fontWeight:700,fontStyle: "italic",color: primaryColor }}>
									AReader
								</h1>
							</Link>
						</div>
						<div
							style={{
								maxWidth,
							}}
						>
							<BaseMenu
								{...this.props}
								style={{ border: "none", height: 64 }}
							/>
						</div>
					</div>
					<RightContent {...this.props} />
				</div>
			</div>
		);
	}
}
