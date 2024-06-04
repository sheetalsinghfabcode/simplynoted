import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {Image, flattenConnection} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

import {PageHeader, Section} from '~/components';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import DynamicTitle from '~/components/Title';
import styles from '../styles/custom-font.css';

const BLOG_HANDLE = 'journal';

export const headers = routeHeaders;

export const links = () => {
  return [{rel: 'stylesheet', href: styles}];
};

export async function loader({request, params, context}) {
  const {language, country} = context.storefront.i18n;
  const journalhandle = params.journalHandle;
  const type = params.type;
  invariant(journalhandle, 'Missing journal handle');

  const {blog} = await context.storefront.query(BlogData, {
    variables: {
      blogHandle: type,
      handle: journalhandle,
    },
  });
  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }
  // const articles = flattenConnection(blog.articles).map((article) => {
  //   const {publishedAt} = article;
  //   return {
  //     ...article,
  //     publishedAt: new Intl.DateTimeFormat(`${language}-${country}`, {
  //       year: 'numeric',
  //       month: 'long',
  //       day: 'numeric',
  //     }).format(new Date(publishedAt)),
  //   };
  // });

  const article = blog.articleByHandle;
  // const formattedDate = new Intl.DateTimeFormat(`${language}-${country}`, {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // }).format(new Date(article?.publishedAt));

  const seo = seoPayload.article({article, url: request.url});

  return json({article, seo, journalhandle, type});
}

export default function Article() {
  const {article, formattedDate} = useLoaderData();
  const {title, image, contentHtml, author} = article;


  return (
    <>
      {/* <PageHeader heading={title} /> */}
      {/* <PageHeader heading={title} variant="blogPost">
        <span>
          {formattedDate} &middot; {author?.name}
        </span>
      </PageHeader> */}
      <div className="mt-[70px]">
        <DynamicTitle
          title={title}
          className={'!text-[30px] '}
        />

        <div>
          {/* {image && (
            <Image
              data={image}
              className="w-full mx-auto  md:mt-16 max-w-7xl"
              sizes="90vw"
              loading="eager"
            />
          )} */}
          {contentHtml && (
            <div
              dangerouslySetInnerHTML={{__html: contentHtml && contentHtml}}
              className="my-[2rem] article"
            />
          )}
        </div>
      </div>
    </>
  );
}

const BlogData = `#graphql
  query
  CollectionDetails(
    $handle: String!
    $blogHandle: String!
  )
  {
    blog(handle: $blogHandle) {
      id
      title
      articleByHandle(handle: $handle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }`;

