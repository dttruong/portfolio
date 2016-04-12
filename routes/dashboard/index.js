module.exports = function(app) {
	app.get("/dashboard", function *() {
		yield this.render("dashboard/index", {layout: 'dashboard/_layout'});
	});
}