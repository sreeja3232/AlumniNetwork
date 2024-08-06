const adminAuth = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).send({ error: 'Access denied. Requires admin privileges.' });
    }
    next();
};

module.exports = adminAuth;
