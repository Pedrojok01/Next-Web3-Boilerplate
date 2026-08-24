/**
 * Stub for the optional `@x402/*` packages that `@coinbase/cdp-sdk` lazily
 * imports (x402 payment flows). They are not declared as dependencies upstream,
 * so the bundler cannot resolve them and the build fails.
 *
 * CommonJS + Proxy so that any named export the SDK asks for resolves to
 * `undefined` instead of failing a static export check. This dApp only uses
 * wallet connection, never CDP payments, so that code path is never reached.
 * See `turbopack.resolveAlias` in next.config.ts.
 */
module.exports = new Proxy({}, { get: () => undefined });
