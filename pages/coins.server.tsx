import { Suspense } from 'react';

let finished = false;

const cache: any = {};
function fetchData(url: string) {
    if (!cache[url]) {
        throw Promise.all([
            fetch(url)
                .then((r) => r.json())
                .then((json) => {
                    cache[url] = json;
                }),
            new Promise((resolve) =>
                setTimeout(resolve, Math.random() * 10050)
            ),
        ]);
    }
    return cache[url];
}
function List() {
    const coins = fetchData('https://api.coinpaprika.com/v1/coins');
    return (
        <div>
            <h4>List is done</h4>
            <ul>
                {coins.slice(0, 30).map((coin: any) => (
                    <li key={coin.id}>
                        <Suspense fallback={`Coin ${coin.name} is loading`}>
                            <Coin {...coin} />
                        </Suspense>
                    </li>
                ))}
            </ul>
        </div>
    );
}
function Coin({ id, name, symbol }: any) {
    const { quotes } = fetchData(
        `https://api.coinpaprika.com/v1/tickers/${id}`
    );
    return (
        <span>
            {name} / {symbol}: ${quotes?.USD?.price}
        </span>
    );
}

export default function Coins() {
    return (
        <div>
            <h1>Welcome to RSC</h1>
            <Suspense fallback='Rendering in the server...'>
                <List />
            </Suspense>
        </div>
    );
}
