interface BannerCreate {
	title: string;
	description: string;
}

export interface BannerRead {
	title: string;
	description: string;
	id: string;
	owner_id: string;
}
export async function createBanner(data: BannerCreate, token: string): Promise<BannerRead> {
	return new Promise((resolve) => {
		fetch(`${import.meta.env.VITE_API_HOST}/banners/create`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((r) => {
				return r.json();
			})
			.then((data: BannerRead) => {
				resolve(data);
			})
			.catch((e) => {
				console.log('banner', e);
			});
	});
}
