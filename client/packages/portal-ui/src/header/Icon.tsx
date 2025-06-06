import styled from 'styled-components';

const Wrapper = styled.span`
	> svg {
		width: 35px;
	}
`;
export function PortalIcon({ icon }: { icon?: string }) {
	if (!icon) {
		return (
			<Wrapper>
				<svg width="50" height="35" viewBox="0 0 50 35" fill="none">
					<defs>
						<linearGradient
							id="paint3_linear"
							x2="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="matrix(-13.5478 9.01983 -12.9578 -13.5478 18.0677 6.77391)"
						>
							<stop offset="0.508287" stopColor="#DC002E"></stop>
							<stop offset="0.508387" stopColor="#FF1243"></stop>
						</linearGradient>
						<linearGradient
							id="paint4_linear"
							x2="1"
							gradientUnits="userSpaceOnUse"
							gradientTransform="matrix(-13.5478 9.01983 -12.9578 -13.5478 18.0677 6.77391)"
						>
							<stop offset="0.508287" stopColor="#DC002E"></stop>
							<stop offset="0.508387" stopColor="#FF1243"></stop>
						</linearGradient>
					</defs>
					<path
						d="M0 2V23.1776L7.05405 16.1235V7.05405H16.1235L23.1776 0H2C0.895431 0 0 0.89543 0 2Z"
						transform="translate(50 17.5) scale(0.92727 1.06779) rotate(135)"
						fill="url(#paint4_linear)"
					></path>
					<path
						d="M0 2V23.1776L7.05405 16.1235V7.05405H16.1235L23.1776 0H2C0.895431 0 0 0.89543 0 2Z"
						transform="translate(0 17.5) scale(0.92727 1.06779) rotate(-45)"
						fill="url(#paint3_linear)"
					></path>
					<path
						d="M9.61965 36.6972L2.60087 29.6784L1.96135 22.3809L8.42623 22.9069L9.61965 36.6972Z"
						transform="translate(33.8887 34.9863) scale(0.92727 -1.06779) rotate(45)"
						fill="#990025"
					></path>
					<path
						d="M7.05434 7.05434L0 0L1.21096 13.8183L7.68846 14.3818L7.05434 7.05434Z"
						transform="translate(33.8887 34.9863) scale(0.92727 -1.06779) rotate(45)"
						fill="#990025"
					></path>
					<path
						d="M0 0L2.49398 29.5715L9.61965 36.6972L7.01878 7.01878L0 0Z"
						transform="translate(33.8887 0.015625) scale(0.92727 1.06779) rotate(45)"
						fill="#FF1243"
					></path>
				</svg>
			</Wrapper>
		);
	}
	return <Wrapper dangerouslySetInnerHTML={{ __html: icon }} />;
}
