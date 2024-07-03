export interface LinkCreate {
    short_id: string,
    redirect_url: string,
    expiration_date: string,
    redirects_limit: number,
    redirects_left: number,
    passphrase_hash: string,
    banner_id: string
}

export interface LinkRead {
    short_id: string;
    redirect_url: string;
    expiration_date: string;
    redirects_limit: number;
    redirects_left: number;
    passphrase_hash: string;
    banner_id: string;
    owner_id: string;
}
export async function createLink(data: LinkCreate, token: string): Promise<LinkRead> {
    return new Promise((resolve) => {
        fetch(`${import.meta.env.VITE_API_HOST}/links/create`, {
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(
            (r) => {
                return r.json()
            }
        ).then((data: LinkRead) => {
            resolve(data);
        }).catch((e) => {
            console.log("link", e);
        })
    })
}
