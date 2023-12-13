import { createDirectus, rest, authentication} from '@directus/sdk';

const directus = createDirectus('http://localhost:8055').with(authentication("cookie", {credentials: "include", autoRefresh: true})).with(rest());

export default directus;