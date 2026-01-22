const userAuthRouter = require("./auth/auth.router");
// const userProfileRouter = require("../routes/auth/profile.router")

const userRouter = require("./user/user.controller")
const blogRouter = require("./blog/blog.route")
const informationRouter = require("./information/information.route")
const categoriesRouter = require("./category/categories.route")
const designRouter = require("./design/design.route")

module.exports = (app) => {
    const api = "/api/v1";
    app.use(api + "/auth", userAuthRouter);
    // app.use(api + "profile/", userProfileRouter);
    app.use(api + "/user", userRouter);
    app.use(api + "/blog", blogRouter);
    app.use(api + "/information", informationRouter);
    app.use(api + "/categories", categoriesRouter);
    app.use(api + "/designs", designRouter);
}
