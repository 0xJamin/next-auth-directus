import { createDirectus, rest, authentication, readMe } from '@directus/sdk';

const directus = createDirectus('http://localhost:8055/').with(authentication("cookie", {credentials: "include", autoRefresh: true})).with(rest());

export default directus;