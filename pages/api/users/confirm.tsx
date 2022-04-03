import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import { withIronSessionApiRoute } from 'iron-session/next';

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { token } = req.body;
    const exists = await client.token.findUnique({
        where: { payload: token },
        include: { user: true },
    });
    if (!exists) {
        res.status(404).end();
    }
    req.session.user = { userid: exists?.userId };
    await req.session.save();
    res.status(200).end();
}

export default withIronSessionApiRoute(withHandler('POST', handler), {
    cookieName: 'carrotsession',
    password:
        'asdfadsfadsfadsf,adsfkmadslfjadsfkljaskfkl;asjfklaskjfkl;asjfl;kazfjadklsfjaskl;fjadsklfjadsklfjadsklfjaskl;j',
});
