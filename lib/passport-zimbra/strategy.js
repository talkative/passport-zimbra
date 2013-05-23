/**
 * Module dependencies.
 */
var util = require('util')
  , OAuthStrategy = require('passport-oauth').OAuthStrategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * The Zimbra authentication strategy authenticates requests by delegating to
 * Zimbra using the OAuth 1.0 protocol.
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  console.log("fb strat");
  console.log(options);
  options = options || {};
  options.userAuthorizationURL = options.userAuthorizationURL || (options.baseURL + '/service/extension/oauth/authorization');
  options.requestTokenURL = options.requestTokenURL || (options.baseURL + '/service/extension/oauth/req_token');
  options.accessTokenURL = options.accessTokenURL || (options.baseURL + '/service/extension/oauth/access_token');
  options.scopeSeparator = options.scopeSeparator || ',';
  
  OAuthStrategy.call(this, options, verify);
  this.name = 'zimbra';
  this.baseURL = options.baseURL;
}

/**
 * Inherit from `OAuthStrategy`.
 */
util.inherits(Strategy, OAuthStrategy);

/**
 * Return extra Zimbra-specific parameters to be included in the authorization
 * request.
 *
 * Options:
 *  - `display`  Display mode to render dialog, { `page`, `popup`, `touch` }.
 *
 * @param {Object} options
 * @return {Object}
 * @api protected
 */
Strategy.prototype.authorizationParams = function (options) {
  return {};
  var params = {},
      display = options.display;

  if (display) {
    params['display'] = display;
  }

  return params;
};

/**
 * Retrieve user profile from Zimbra.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `zimbra`
 *   - `id`               the user's zimbra ID
 *   - `username`         the user's Zimbra username
 *   - `displayName`      the user's full name
 *   - `name.familyName`  the user's last name
 *   - `name.givenName`   the user's first name
 *   - `name.middleName`  the user's middle name
 *   - `gender`           the user's gender: `male` or `female`
 *   - `profileUrl`       the URL of the profile for the user on Zimbra
 *   - `emails`           the proxied or contact email address granted by the user
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(token, tokenSecret, params, done) {
  console.log("zimbra strategy userProfile");
  console.log(token);
  console.log(tokenSecret);
  console.log(params);
 
  this._oauth.get(
    this.baseURL+'/home/~/inbox',
    token, //test user token
    tokenSecret, //test user secret            
    function (e, data, res){
      if (e) console.error(e);        
      console.log(require('util').inspect(data));
      done("d");      
  });    
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
