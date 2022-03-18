
function adminRole(req, res, next) {
    if (!req.user.isAdmin) return res.status(403).json({ response: `⚠️ 404 Forbidden  You don't have permission to access the requested document!` });
    next();
}

export const admin = adminRole;