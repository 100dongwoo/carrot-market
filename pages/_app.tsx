import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig
            value={{
                fetcher: (url: string) =>
                    fetch(url).then((response) => response.json()),
            }}
        >
            <div className='w-full max-w-xl mx-auto'>
                <Component {...pageProps} />
            </div>
            <Script
                // async
                // defer
                // crossorigin='anonymous'
                src='https://connect.facebook.net/en_US/sdk.js'
                onLoad={() => {
                    window.fbAsyncInit = function () {
                        FB.init({
                            appId: 'your-app-id',
                            autoLogAppEvents: true,
                            xfbml: true,
                            version: 'v13.0',
                        });
                    };
                }} //스크립트 호출 된 후 실행되는 함수
            />
        </SWRConfig>
    );
}

export default MyApp;
