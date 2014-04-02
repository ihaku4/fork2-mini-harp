module.exports = makeJade;

function makeJade(root) {
    var jade = require("jade");
    var fs = require("fs");
    var serveStatic = require("serve-static");
//    var jadePath = "../../verify/assets/foo.jade"
    var jadePath = "verify/assets/foo.jade"
    var assetsPath = "verify/assets"
    return function(req, res, next) {
        console.log(req.url);
        if (req.url === "/foo.html") {
            debugger;
            fs.readFile(jadePath, function(err, data) {
               if (err) throw err;
               jade.render(data, function(err, html) {
                    if (err) next();
                    res.end(html);
                    console.log(data);
                    console.log(html);
               });
            });
        } else if (req.url === "/not-found.html") {
            res.statusCode = 404;
            res.end();
        } else if (req.url === "/bar.html") {
//            console.log("enter bar condition..");
//            serveStatic(assetsPath + req.url)(req, res, next);
//            console.log("finished /bar.html");
            debugger;
            fs.readFile(assetsPath + req.url, function(err, data) {
                if (err) throw err;
                res.end(data);
                console.log(data);
            });
        } else next();
    }
}
