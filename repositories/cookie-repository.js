var crypto = require('crypto');

// cookie middleware to ensure a cookie is set and not expired
// exports.setCookieIfUndefined = function *(webContext) {
// 	var cookieSid = this.cookies.get('sid');
// 	if(cookieSid === undefined) 
// 		yield this.exports.setNewCookie(webContext);
// }

exports.setNewCookie = function *(webContext) {
	var newSessionId = crypto.randomBytes(64).toString('hex');
	
	console.log('SETTING NEW COOKIE');
	
	webContext.cookies.set('sid', newSessionId, {
		signed: true,
		expires: getExpirationDate(1)
	});
	
	return newSessionId;
};

var getExpirationDate = function(daysTilExpiration) {
	var d = new Date();
	return new Date(d.getTime() + (daysTilExpiration*24*60*60*1000));	
};