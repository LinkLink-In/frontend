import { initClient } from '@ts-rest/core';
import { contract } from './contracts';

export const client = initClient(contract, {
	baseUrl: import.meta.env.VITE_API_HOST
});
