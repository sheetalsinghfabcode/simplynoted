import {json} from '@shopify/remix-oxygen';
import {useFetcher, useLoaderData, useLocation} from '@remix-run/react';
import {
  flattenConnection,
  Image,
  Pagination,
  getPaginationVariables,
} from '@shopify/hydrogen';

import {Grid, PageHeader, Section, Link, Button} from '~/components';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import {useEffect, useState} from 'react';

const BLOG_HANDLE = 'news';

export const headers = routeHeaders;

export const loader = async ({request, context: {storefront}}) => {
  const {language, country} = storefront.i18n;
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const cursor = searchParams.get('cursor') ?? undefined;
  const action = searchParams.get('action') === 'prev' ? true : false;
  // const variables = getPaginationVariables(request, {
  //   pageBy: 4,
  // });
  const {blog} = action
    ? await storefront.query(BLOGS_QUERY_PREV, {
        variables: {
          pageBy: PAGINATION_SIZE,
          cursor: cursor,
          blogHandle: BLOG_HANDLE,
          language,
        },
      })
    : await storefront.query(BLOGS_QUERY_NEXT, {
        variables: {
          pageBy: PAGINATION_SIZE,
          cursor: cursor,
          blogHandle: BLOG_HANDLE,
          language,
        },
      });
  if (!blog?.articles) {
    throw new Response('Not found', {status: 404});
  }

  const articles = flattenConnection(blog.articles).map((article) => {
    const {publishedAt} = article;
    return {
      ...article,
      publishedAt: new Intl.DateTimeFormat(`${language}-${country}`, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(publishedAt)),
    };
  });
  const pageInfo = blog.articles.pageInfo;
  const seo = seoPayload.blog({blog, url: request.url});

  return json({articles, seo, blog, pageInfo});
};

export default function Journals() {
  const {articles, blog, pageInfo} = useLoaderData();
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [startCursor, setStartCursor] = useState(null);
  const [journalArticles, setJournalArticles] = useState([]);
  const isLocation = useLocation();
  const fetcher = useFetcher();
  const onNextPage = () => {
    if (hasNextPage) {
      fetcher.load(`${isLocation.pathname}?cursor=${endCursor}&action=next`);
    }
  };
  const onPrevPage = () => {
    if (hasPreviousPage) {
      fetcher.load(`${isLocation.pathname}?cursor=${startCursor}&action=prev`);
    }
  };
  useEffect(() => {
    setEndCursor(pageInfo.endCursor);
    setHasNextPage(pageInfo.hasNextPage);
    setHasPreviousPage(pageInfo.hasPreviousPage);
    setStartCursor(pageInfo.startCursor);
    setJournalArticles(articles);
  }, []);
  useEffect(() => {
    if (!fetcher.data) return;
    setEndCursor(fetcher.data.pageInfo.endCursor);
    setHasNextPage(fetcher.data.pageInfo.hasNextPage);
    setHasPreviousPage(fetcher.data.pageInfo.hasPreviousPage);
    setStartCursor(fetcher.data.pageInfo.startCursor);
    setJournalArticles(fetcher.data.articles);
  }, [fetcher.data]);
  return (
    <>
      {/* <PageHeader heading={BLOG_HANDLE} /> */}
      <Section>
        {/* <Pagination connection={blog.articles}>
          {({nodes, isLoading, PreviousLink, NextLink}) => (
            <> */}
        {/* <div className="flex items-center justify-center mt-6">
                <PreviousLink className="inline-block rounded font-medium text-center py-3 px-6 border border-primary/10 bg-contrast text-primary w-full">
                  {isLoading ? 'Loading...' : 'Prev.....'}
                </PreviousLink></div> */}
        <Grid as="ol" layout="blog">
          {journalArticles.map((article, i) => (
            <ArticleCard
              blogHandle={BLOG_HANDLE.toLowerCase()}
              article={article}
              key={article.id}
              loading={getImageLoadingPriority(i, 2)}
            />
          ))}
        </Grid>
        <div className="flex items-center justify-center mt-6">
          <button variant="secondary" width="full" onClick={onPrevPage}>
            {'Prev.....'}
          </button>
          <button variant="secondary" width="full" onClick={onNextPage}>
            {'Next collections'}
          </button>
        </div>
        {/* </>
          )}
        </Pagination> */}
      </Section>
    </>
  );
}

function ArticleCard({blogHandle, article, loading}) {
  return (
    <li key={article.id}>
      <Link to={`/journal/${blogHandle}/${article.handle}`}>
        {article.image && (
          <div className="card-image aspect-[3/2]">
            <Image
              alt={article.image.altText || article.title}
              className="object-cover w-full"
              data={article.image}
              aspectRatio="3/2"
              loading={loading}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        )}
        <h2 className="mt-4 text-[green] font-medium">{article.title}</h2>
        <span className="block mt-1">{article.publishedAt}</span>
      </Link>
    </li>
  );
}

const BLOGS_QUERY_PREV = `#graphql
query Blog(
  $language: LanguageCode
  $blogHandle: String!
  $pageBy: Int!
  $cursor: String
) @inContext(language: $language) {
  blog(handle: $blogHandle) {
    title
    seo {
      title
      description
    }
    articles(last: $pageBy, before: $cursor) {
        nodes {
          ...Article
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
    }
  }
}

fragment Article on Article {
  author: authorV2 {
    name
  }
  handle
  id
  image {
    id
    altText
    url
    width
    height
  }
  publishedAt
  title
}
`;
const BLOGS_QUERY_NEXT = `#graphql
query Blog(
  $language: LanguageCode
  $blogHandle: String!
  $pageBy: Int!
  $cursor: String
) @inContext(language: $language) {
  blog(handle: $blogHandle) {
    title
    seo {
      title
      description
    }
    articles(first: $pageBy, after: $cursor) {
        nodes {
          ...Article
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
    }
  }
}

fragment Article on Article {
  author: authorV2 {
    name
  }
  handle
  id
  image {
    id
    altText
    url
    width
    height
  }
  publishedAt
  title
}
`;
