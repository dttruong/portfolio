module.exports = function(app) {
	app.get("/", function *() {
		yield this.render("main/index", {layout: 'main/_layout'});
	});
	app.get("/about", function *() {
		yield this.render("main/about", {layout: 'main/_layout'});
	});
	app.get("/blog", function *() {
		yield this.render("main/blog", {layout: 'main/_layout'});
	});	
	app.get("/streams", function *() {
		yield this.render("main/streams", {layout: 'main/_layout'});
	});	
	app.get("/photos", function *() {
		yield this.render("main/photos", {layout: 'main/_layout'});
	});	
	app.get("/sports", function *() {
		yield this.render("main/sports", {layout: 'main/_layout'});
	});		
}