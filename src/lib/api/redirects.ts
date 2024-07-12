export interface RedirectCreate {
  link_id: string,
  ip: string,
  user_agent: string,
  referrer: string,
  browser: string,
  platform: string,
  language: string
}

export async function createRedirect(data: RedirectCreate) {
    return new Promise((resolve) => {
        fetch(`${import.meta.env.VITE_API_HOST}/redirects/create`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            return res;
        }).catch((e) => {
            console.log(e);
            console.log("Error while creating redirect:", e);
        })
    })
}
