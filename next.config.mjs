/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
import withPWA from 'next-pwa';


// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable:process.env.NODE_ENV === 'development'
})({
  reactStrictMode : true
});
