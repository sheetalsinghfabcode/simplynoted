import {useFetcher, useLoaderData, useLocation} from '@remix-run/react';
import {defer} from '@remix-run/server-runtime';
import {useState, useEffect} from 'react';
import {useNavigate} from '@remix-run/react';
import CircularLoader from '~/components/CircularLoder';
import DynamicTitle from '~/components/Title';
import {Link} from '~/components';
import {
  Image,
  Pagination,
  flattenConnection,
  getPaginationVariables,
} from '@shopify/hydrogen';
import {seoPayload} from '~/lib/seo.server';
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
  const [activeButton, setActiveButton] = useState('articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [loader, setLoader] = useState(false);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const filteredArticles =
    journalArticles &&
    journalArticles.filter((article) =>
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
 
  return (
    <div className="global-max-width-handler">
      <div className="px-5">
        <DynamicTitle
          title="Simply Noted 101"
          className={'mt-[20px] md:text-[45px] small:text-[38px] text-[32px]'}
        />

        <div className="blog-page-button sm:flex flex gap-[13px] justify-center mt-[32px]">
          <button
            className={`border border-[#508ee3] w-[205px] py-[15px] bg-[#508ee3] text-white`}
            type="button"
            onClick={() => {
              handleButtonClick('articles');
              navigate('/blogs/news');
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
              navigate('/blogs/Video');
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
            className="md:flex gap-4 flex-wrap justify-center mb-[17px] items-start mt-[40px]"
            style={{maxWidth: '100%'}}
          >
            {loader ? (
              <CircularLoader color="#ef6e6e" />
            ) : (
              <>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <Link
                      to={`/blogs/news/${article.handle}`}
                      key={article.id}
                      className="flex flex-col bg-white shadow-lg mb-[2px] text-black hover:text-black"
                      style={{maxWidth: '363px'}}
                    >
                      <div className="flex-1 md:mt-[2px] mt-[3px]">
                        <img
                          
                          src={article.image.url}
                          className="h-[250px] w-[100%]"
                          alt={article.title}
                        />
                      </div>
                      <div className="p-[30px] ">
                        <div className="mt-2 flex-1 text  -black text-[22px] font-bold leading-[30px] hover:text-[#2267d8] line-clamp-2">
                          {article.title}
                        </div>
                        <div
                          className="collection-descrition text-[18px] leading-[30px] line-clamp-5"
                          dangerouslySetInnerHTML={{
                            __html: article.seo.description,
                          }}
                        />
                        <p className="text-[18px] mt-[16px] text-[#ef6e6e] font-bold underline">
                          <span
                            className="hover:text-[#ef6e6e]"
                            // to={`/blogs/news/${article.handle}`}
                            val={'News'}
                          >
                            Click here to read full article
                          </span>
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="font-bold text-2xl font-cursive text-[#001a5f]">
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
    articles(first: $pageBy, after: $cursor,reverse: true) {
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
