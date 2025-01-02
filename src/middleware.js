// middleware.js
import { NextResponse } from 'next/server';



export default function middleware(req) {
    const cookieStore = req.cookies;
    const token = cookieStore.get('token');
    const path = req.nextUrl.pathname;
    // const from = req.nextUrl.pathname;

    const publicPaths = ['/login', '/signup', '/', '/product', '/contact', '/payment/instructions'];
    const authPaths = ['/login', '/signup'];
    const isCheckoutWithId = /^\/checkout\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(path);


    if (isCheckoutWithId) {
        return NextResponse.next();
    }
    if (publicPaths.includes(path) || path.includes('/checkout/')) {
        if (authPaths.includes(path) && token) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }
        return NextResponse.next();
    }

    if (!token && !path.includes('/checkout/')){
        return NextResponse.redirect(
            // new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
            new URL(`/login`, req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public|instructions|payment|checkout).*)'
    ],
};
