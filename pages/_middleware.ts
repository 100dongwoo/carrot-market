import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    if (req.ua?.isBot) {
        return new Response('제발 봇이 아니었으면 좋겠네요 ><; ', {
            status: 403,
        });
    }
    if (!req.url.includes('/api')) {
        if (!req.url.includes('/enter') && !req.cookies.carrotsession) {
            return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
        }
    }
    // console.log(req.geo?.city);
    // 배포시에만 작동한다

    // return NextResponse.json({ ok: true });
}
