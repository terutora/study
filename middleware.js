// middleware.js
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // 公開ルートの設定
  publicRoutes: ["/", "/auth/signin", "/auth/signup", "/api/webhook/clerk"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
