module.exports = function(app) {
  require("../assignment/services/user.service.server.js")(app);
   require("../assignment/services/website.service.server.js")(app);
  // require("../assignment/services/page.service.server.js")(app);
  // require("../assignment/services/widget.service.server.js")(app);
};
