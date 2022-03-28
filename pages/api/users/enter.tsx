import twilio from 'twilio';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import client from '@libs/server/client';
import mail from '@sendgrid/mail';

mail.setApiKey(process.env.SENDGRID_API_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    // + => string to int로 변경
    // const user = await client.user.upsert({
    //     //upsert 수정 or 생성시 사용
    //     where: {
    //         ...payload,
    //     },
    //     create: {
    //         name: 'Anonymous',
    //         ...payload,
    //     },
    //     update: {},
    // });

    const { phone, email } = req.body;
    const user = phone ? { phone: +phone } : email ? { email } : null;
    if (!user) {
        return res.status(400).json({ ok: false });
    }
    const payload = Math.floor(100000 + Math.random() * 900000) + '';
    const token = await client.token.create({
        data: {
            payload,
            user: {
                connectOrCreate: {
                    where: {
                        ...user,
                    },
                    create: {
                        name: 'Anonymous',
                        ...user,
                    },
                },
            },
        },
    });
    if (phone) {
        // const message = await twilioClient.messages.create({
        //     messagingServiceSid: process.env.TWILIO_MSID,
        //     to: process.env.MY_PHONE!,
        //     body: `Your login token is ${payload}.`,
        // });
        // console.log(message);
    } else if (email) {
        // const email = await mail.send({
        //     from: 'qorehddn123@naver.com',
        //     to: 'qorehddn123@naver.com', //원래는 바디 데터
        //     subject: 'Your carrot market verification email',
        //     text: `your tkoen is ${payload}`,
        //     html: `<strong>your token is ${payload}</strong>`,
        // });
        // console.log(email);
    }
    return res.json({
        ok: true,
    });
}

export default withHandler('POST', handler);
