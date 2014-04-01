module.exports = makeJade;

function makeJade(root) {
    var jade = require("jade");
    var fs = require("fs");
//    var jadePath = "../../verify/assets/foo.jade"
    var jadePath = "verify/assets/foo.jade"
    return function(req, res, next) {
        if (req.url === "/foo.html") {
            fs.readFile(jadePath, function(err, data) {
               if (err) throw err;
               jade.render(data, function(err, html) {
                    if (err) next();
                    res.end(html);
               });
            });
        } else if (req.url === "/not-found.html") {
            res.statusCode = 404;
            res.end();
        } else next();
    }
}
