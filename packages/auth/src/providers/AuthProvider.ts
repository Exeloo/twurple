import type { AccessToken } from '../AccessToken';

/**
 * The type of token an auth provider can return - user tokens and app tokens are supported.
 */
export type AuthProviderTokenType = 'user' | 'app';

/**
 * Describes a class that manages and supplies access tokens.
 *
 * Ideally, it should be able to request a new access token via user input
 * when previously unauthorized scopes are requested.
 *
 * As a starting point, {@link StaticAuthProvider} takes an access token,
 * but can't do anything to upgrade it by itself. {@link RefreshingAuthProvider}
 * can make use of refresh tokens to refresh your tokens on expiry or failure.
 *
 * @neverExpand
 */
export interface AuthProvider {
	/**
	 * The client ID.
	 */
	clientId: string;

	/**
	 * The type of the tokens generated by the provider, i.e. whether this is a user or app token.
	 */
	tokenType: AuthProviderTokenType;

	/**
	 * The type of Authorization header to send. Defaults to "Bearer".
	 */
	authorizationType?: string;

	/**
	 * The scopes that are currently available using the access token.
	 */
	currentScopes: string[];

	/**
	 * Retrieves an access token from the provider.
	 *
	 * This should automatically request a new token when the current token
	 * is not authorized to use the requested scope(s).
	 *
	 * When implementing this, you should not do anything major when no
	 * scopes are requested - the cached token should be valid for that -
	 * unless you know exactly what you're doing.
	 *
	 * @param scopes The requested scope(s).
	 */
	getAccessToken: (scopes?: string[]) => Promise<AccessToken | null>;

	/**
	 * Requests that the provider fetches a new token from Twitch.
	 *
	 * This method is optional to implement. For some use cases,
	 * it might not be desirable to e.g. ask the user to log in
	 * again at just any time.
	 */
	refresh?: () => Promise<AccessToken | null>;
}
