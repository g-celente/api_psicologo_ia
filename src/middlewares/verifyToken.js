import jwt from "jsonwebtoken";
import { prisma } from "../models/prisma.js";

async function verifyJwt(req, res, next) {

    const token = req.headers["token-auth"]

    if (!token) {
        return res.status(401).json({ "error": "permissão negada, token não fornecido"})
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ "error": "permissão negada ", "error": err})
        }

        req.userId = decoded.userId;
        next()
    })
     
}

export default verifyJwt;