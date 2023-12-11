import { createDirectus, rest, authentication} from '@directus/sdk';

const directus = createDirectus(process.env.BACKEND_URL as string).with(authentication("cookie", {credentials: "include", autoRefresh: true})).with(rest());

export default directus;