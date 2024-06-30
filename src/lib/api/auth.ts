export interface BearerResponse extends Response {
    access_token: string;
    token_type: string;
    detail?: string;
}
export async function userLogin(email: string, password: string): Promise<BearerResponse> {
    return new Promise((resolve) => {
        fetch(`${import.meta.env.VITE_API_HOST}/auth/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ "username": email, password })
        }).then(
            (r) => r.json()
        ).then((data: BearerResponse) => {
            resolve(data);
        })
    })
}