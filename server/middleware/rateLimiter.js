import rateLimit from "express-rate-limit";

export const commentRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // limit each IP to 3 requests per minute
  message: { success: false, message: "Too many comments, please slow down." },
  standardHeaders: true, // return rate limit info in headers
  legacyHeaders: false,
});
