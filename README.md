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
