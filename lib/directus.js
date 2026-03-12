import { createDirectus, rest, authentication } from '@directus/sdk';
const BACKEND_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "https://directus.2do-dev25.de/";
const client = createDirectus(BACKEND_URL)
    .with(authentication("json"))
    .with(rest())
export default client;
