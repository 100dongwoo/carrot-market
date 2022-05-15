# Carrot Market

## Tailwind

-   yarn add -D tailwindcss postcss autoprefixer
-   npx tailwindcss init -p

## PlanetScale

-   pscale auth login
-   pscale database create carrot-market --region ap-northeast
-   pscale connect carrot-market
-   npx prisma db push
-   npx prisma studio (관리자 페이지)
-   npx prisma generate
-   npx prisma db seed (package.json 및 seed 파일 참조)

## SWR mutate({첫번째 인자},두번째인자)

-   첫번쨰 인자는 : 유저에게 화면 ui 변경 사항을 보여주기위한 부분
-   두번째 인자 : 변경 일어난후 api에서 데이터를 다시 호출하기 구분

-   해당화면에서 얻은 데이터만 변경하기위해서는 boundMutate
-   다른화면 데이터 변경을 위해서는 unboundMutate

### NextJS Scripts

-   Script 컴포넌트를 제공
-
-   props (스크립트를 언제 받아올건지 정할 수있음)

```
#### strategy
- beforInteractive : 페이지를 다 불러와서 상호작용 전에 스크립트 불러옴
- afterInteractive (default) : 페이지를 다불러 온후 스크립트 불러옴
- lazyOnLoad       : 스크립트를 불러오는게 우선순위가아님 모든 데이터를 다 가져온 후 불러옴
```

### serverSide

```
#### getServerSideProps
- 캐시등을 사용하지못함

#### getStaticPaths
- 페이지들이 빌드타임에  만들어져야하는지 체크하는 역할을 한다
```

    return {
        paths: [],
        fallback: 'blocking',
               // 처음에 전부다 build파일을 만드는게 아니라 첫유저가 들어왔을시 해당부분만 만든다 방문시에만 만든다

        fallback: false  //프로젝트 빌드탕미에서 필요한것들은 미리만듬 페이지가 존재하지않으면 404페이지로 가게함 그이후로는  추가로 만들지않음

        fallback: True //request 타임에 페이지 생성, 페이지가 생성하는동안 데이터를 보여준다 (html파일이없으면 생성 )

        true , "blocking" 차이는 유저가 페이지를 최초 만들어지는 동안 볼수있냐 없냐  차이
    };

```

#### getStaticProps
- 1번만 실행 export 된후 일반 htmlfh 될 때 실행
- html을 생성할수있도록 해준다
- 최초로 한번만 실행됨
#### Incremental Static Regeneration

```

### ISR ( Incremental Static Regeneration )

```
export async function getStaticProps() {
    // ISR   Incremental Static Regeneration
    const posts = await client.post.findMany({ include: { user: true } });
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts)),
        },
        revalidate: 10, //최신데이터를 담당하는 윈도우
        // 백그라운드에서 해당 페이지 빌드해줌 html을 불러옴
    };
}

```

### ODR ( On - demand Revalidation ) 사용자의 요청 재검증 next 12.1 부터 가능

-   getStaticProps를 api 핸들러 작동

```
  // ODR  해당 페이지를 강제로 revalidate 해줌 (getStaticProps에 있는 ODR을 사용시 revalidate를 지운다)
        await res.unstable_revalidate('/community');  //수동으로 한다고 생각하면된다
```

## React 18

#### React server components

-   자바스크립트를 로드 할 필요가없다
-   next.config.js 수정

```
module.exports = {
  experimental: {
    runtime: 'nodejs',
    serverComponents: true,
  },
}
```

## 공부내용

-   previewImage 방법

```input을통한 이미지를 가져오는법
    const file = avartar[0];
    console.log(URL.createObjectURL(file));

```

-   Dynamic Imports

1. import는 유저가 다운로드해야하는 자바스크립트 코드이다 (문제점)
2. Dynamic Imports 사용시에만 다운받는다

```
    const Bs=dynamic(()=>import("../../test"))

```
