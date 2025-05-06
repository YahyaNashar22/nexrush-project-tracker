import jwt from 'jsonwebtoken';

export const createAccessToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
        },
        process.env.SECRET_TOKEN,
        { expiresIn: '15m' }
    )
}

export const createRefreshToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

        return { success: true, payload: decoded };
    } catch (error) {
        return { success: false, error: error.message };
    }
}