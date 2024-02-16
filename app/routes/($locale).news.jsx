import {useFetcher, useLoaderData, useLocation} from '@remix-run/react';
import {defer} from '@remix-run/server-runtime';
import {useState, useEffect} from 'react';
import {useNavigate} from '@remix-run/react';
import CircularLoader from '~/components/CircularLoder';
import DynamicTitle from '~/components/Title';
import {Link} from '~/components';
import {Image, Pagination, flattenConnection, getPaginationVariables} from '@shopify/hydrogen';
import { seoPayload } from '~/lib/seo.server';
import {json} from '@shopify/remix-oxygen';

const PAGINATION_SIZE = 6;
const BLOG_HANDLE = 'news';

export async function loader({request, context: {storefront}}) {
  const {language, country} = storefront.i18n;
  // const variables = getPaginationVariables(request, {pageBy: PAGINATION_SIZE});
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const cursor = searchParams.get('cursor') ?? undefined;
  const action = searchParams.get('action') === 'prev' ? true : false;
  // console.log(variables, '++++++++++');
  const {blog} =  action
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
console.log('blog@@@@', blog);

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
}

export default function blog() {
  const {articles, blog, pageInfo} = useLoaderData();
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [startCursor, setStartCursor] = useState(null);
  const [journalArticles, setJournalArticles] = useState(articles);
  const isLocation = useLocation();
  const fetcher = useFetcher();
  const onNextPage = () => {
    if (hasNextPage) {
      fetcher.load(`${isLocation.pathname}?cursor=${endCursor}&action=next`);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

    }

  };
  const onPrevPage = () => {
    if (hasPreviousPage) {
      fetcher.load(`${isLocation.pathname}?cursor=${startCursor}&action=prev`);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});

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
  console.log(blog, 'blog');
  const [activeButton, setActiveButton] = useState('articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [loader, setLoader] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
console.log(journalArticles,'+++++++++++++');
  const filteredArticles = journalArticles && journalArticles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  useEffect(() => {
    setLoader(true);
    if (filteredArticles && filteredArticles.length > 0) {
      setLoader(false);
    }
  }, []);

  useEffect(() => {}, [currentPage, filteredArticles]);

  const navigate = useNavigate();

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage((nextPage) => nextPage + 1);
  };
  const handlePrevMore = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleShowData = (articleId) => {
    setSelectedArticleId(articleId);
  };

  return (
    <div className='global-max-width-handler'>
      <div className="px-5">
        <DynamicTitle
          // dynamicButton
          title="Simply Noted 101"
          className={'mt-[20px] md:text-[45px] text-[38px]'}
        />

        <div className="blog-page-button sm:flex flex gap-[13px] justify-center mt-[32px]">
          <button
            className={`border border-[#508ee3] w-[205px] py-[15px] bg-[#508ee3] text-white`}
            type="button"
            onClick={() => {
              handleButtonClick('articles');
              navigate('/news');
            }}
          >
            Articles
          </button>
          <button
            className={`border border-[#508ee3] py-[15px] w-[205px] bg-white ${
              activeButton === 'tutorials' ? 'bg-[#508ee3] text-white' : ''
            }`}
            type="button"
            onClick={() => {
              handleButtonClick('tutorials');
              navigate('/Video');
            }}
          >
            Tutorials
          </button>
        </div>

        <div className="flex justify-center">
          <input
            className="sm:min-w-[453px] sm:h-[57px] min-w-[80%]  h-100%  md:mt-[40px] mt-[33px] border border-[#508ee3] rounded-[10px]"
            type="text"
            placeholder="Search....."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
        </div>
        <div className="flex justify-center gap-1">
          <div
            className="md:flex gap-4 flex-wrap justify-center items-start mb-[-40px] mt-[40px]"
            style={{maxWidth: '793px'}}
          >
            {loader ? (
              <CircularLoader color="#ef6e6e" />
            ) : (
              <>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <Link
                      to={`/journal/news/${article.handle}`}
                      key={article.id}
                      className="flex flex-col bg-white shadow-lg text-black hover:text-black"
                      style={{maxWidth: '363px'}}
                    >
                      <div className="flex-1">
                        <img
                          onClick={() => handleShowData(article.node.id)}
                          src={article.image.url}
                          className="h-full object-cover"
                          alt={article.title}
                        />
                      </div>
                      <div className="p-[30px]">
                        <div className="mt-2 flex-1 text-black text-[22px] font-bold leading-[30px] hover:text-[#2267d8]">
                          {article.title}
                        </div>
                        <div
                          className="collection-descrition text-[18px] leading-[30px]"
                          dangerouslySetInnerHTML={{
                            __html: article.seo.description,
                          }}
                        />
                        <p className="text-[18px] mt-[16px] text-[#ef6e6e] font-bold underline">
                          <Link
                            className="hover:text-[#ef6e6e]"
                            to={`/journal/news/${article.handle}`}
                            val={'News'}
                          >
                            Click here to read full article
                          </Link>
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="font-medium text-2xl font-cursive text-blue">
                    No Blog Found
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-12 mt-[5rem]">
          <button
            className={`bg-[#001a5f] text-white w-[123px]  p-2 ${
              hasPreviousPage == false ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={onPrevPage}
            disabled={hasPreviousPage == false}
          >
            Prev.
          </button>
          <button
            className={`bg-[#001a5f] text-white w-[123px]  p-2 ${
              hasNextPage == false ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={hasNextPage == false}
            onClick={onNextPage}
          >
            Next.
          </button>
        </div>
      </div>
    </div>
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
  seo{
    description
  }
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
  seo{
    description
  }
}
`;