const roles = require("../utils/roles")

module.exports = function (...args) {
    return (req, res, next) => {
        const role = roles.getRole(req.user.role)
        const permission = Math.min(...args.map(arg => arg.permission))

        if (role.permission >= permission)
            return next()

        throw new Error("Нет доступа")
    }
}