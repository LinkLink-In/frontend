export interface BearerResponse extends Response {
    access_token: string;
    token_type: string;
    detail?: string;
}
export interface UserRead extends Response {
    id: string;
    email: string;
    is_active?: boolean;
    is_superuser?: boolean;
    is_verified?: boolean;
    name: string;
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

export async function userRegister(name: string, email: string, password: string): Promise<UserRead> {
    return new Promise((resolve) => {
        fetch(`${import.meta.env.VITE_API_HOST}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ email, password, name })
        }).then(
            (r) => r.json()
        ).then((data: UserRead) => {
            resolve(data);
        })
    })
}