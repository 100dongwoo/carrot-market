import Layout from '@components/layout';
import { readdirSync } from 'fs';
import matter from 'gray-matter';
import { GetStaticProps, NextPage } from 'next';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse/lib';
import { unified } from 'unified';

const Post: NextPage<{ post: string; data: any }> = ({ post, data }) => {
    return (
        <Layout title={data?.title} seoTitle={data?.title}>
            <div
                dangerouslySetInnerHTML={{ __html: post }}
                className='blog-post-content'
            />
        </Layout>
    );
};

export function getStaticPaths() {
    // const files = readdirSync('./posts').map((file) => {
    //     const [name, extension] = file.split('.');
    //     return { params: { slug: name } };
    // });

    // return { paths: files, fallback: false };
    return { paths: [], fallback: 'blocking' };
}
export const getStaticProps: GetStaticProps = async (ctx) => {
    const { data, content } = matter.read(`./posts/${ctx.params?.slug}.md`);

    const { value } = await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(content);

    return {
        props: {
            data,
            post: value,
        },
    };
};

export default Post;
