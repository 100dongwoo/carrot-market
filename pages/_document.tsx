import Document, { Head, Html, Main, NextScript } from 'next/document';

export default function MyDocument() {
    return (
        <Html lang='ko'>
            <Head>
                {/* 구글폰트를사용한 최적화 */}
                {/* 유저가 다운해야할 파일을 대신한다 nextjs가 다운 받아주기때문 */}
                <link
                    href='https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'
                    rel='stylesheet'
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
