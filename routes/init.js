module.exports = function(app) {
	require('./main/_routes.js')(app);
	require('./api/_routes.js')(app);
	require('./dashboard/_routes.js')(app);
}