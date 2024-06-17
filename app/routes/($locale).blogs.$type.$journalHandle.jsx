import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {Image, flattenConnection} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

import {PageHeader, Section} from '~/components';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import DynamicTitle from '~/components/Title';
import styles from '../styles/custom-font.css';
import blog from './($locale).blogs.news';

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

  const blogTitle = blog.title

  return json({article, seo, journalhandle, type,blogTitle});
}

export default function Article() {
  const {article,blogTitle, formattedDate} = useLoaderData();
  const {title, image, contentHtml, author} = article;
  
  return (
    <>
     
      <div className="mt-[70px]">
        <DynamicTitle
          tag={blogTitle === 'Blog' ? 'h2' : 'h1'} // This will render the title inside an h2 tag
          title={title}
          className={'!text-[30px] '}
        />

        <div>
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
