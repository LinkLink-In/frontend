function getBrowserInfo(userAgent: string): string {
	const browserMap = [
		{ name: 'Firefox', keywords: ['Firefox'] },
		{ name: 'Opera', keywords: ['Opera', 'OPR'] },
		{ name: 'Internet Explorer', keywords: ['Trident'] },
		{ name: 'Edge', keywords: ['Edge'] },
		{ name: 'Chrome', keywords: ['Chrome'] },
		{ name: 'Safari', keywords: ['Safari'] }
	];

	for (const { name, keywords } of browserMap) {
		if (keywords.some((keyword) => userAgent.includes(keyword))) {
			return name;
		}
	}
	return 'Unknown';
}

async function getIpAddress(): Promise<string | null> {
	try {
		const response = await fetch('https://api.ipify.org?format=json');
		const data = await response.json();
		return data.ip;
	} catch (error) {
		console.log('Error fetching IP address:', error);
		return null;
	}
}

export async function sendRedirectData(link_id: string) {
	const current_ip = await getIpAddress();
	const browser_name = getBrowserInfo(navigator.userAgent);

	// const newRedirect: RedirectCreate = {
	//     link_id: data.link_id,
	//     ip: current_ip,
	//     user_agent: navigator.userAgent,
	//     referrer: document.referrer,
	//     browser: browser_name,
	//     platform: navigator.platform,
	//     language: navigator.language
	// };
	//
	// await createRedirect(newRedirect);
	return;
}
