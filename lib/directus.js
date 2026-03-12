import { createDirectus, rest, authentication } from '@directus/sdk';
const BACKEND_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://directus.2do-dev25.de/";

// In the browser, use the proxy to avoid CORS issues
// createDirectus requires a valid URL, so we must provide a base in the browser
const API_URL = typeof window !== 'undefined' 
    ? (window.location.origin + '/directus-api') 
    : BACKEND_URL;

const client = createDirectus(API_URL)
    .with(authentication("json"))
    .with(rest())
export default client;
