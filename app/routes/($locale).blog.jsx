import {useLoaderData} from '@remix-run/react';
import {defer} from '@remix-run/server-runtime';
import {useState, useEffect} from 'react';
import {useNavigate} from '@remix-run/react';
import CircularLoader from '~/components/CircularLoder';
import DynamicTitle from '~/components/Title';

export async function loader({context}) {
  const blog = await context.storefront.query(BlogData, {
    variants: {},
  });

  return defer({
    blog,
  });
}

export default function blog() {
  const {blog} = useLoaderData();
  const [activeButton, setActiveButton] = useState('articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [loader, setLoader] = useState(false);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = blog.blog.articles.edges.filter((article) =>
    article.node.title.toLowerCase().includes(searchQuery.toLowerCase()),
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
  console.log(
    'blog',
    blog.blog.articles.edges.map((index) => index.node.title),
  );

  console.log('endIndex', endIndex);
  console.log('startIndex', startIndex);
  console.log('currentPage', currentPage);

  return (
    <div className="px-5">
     <DynamicTitle dynamicButton title="Simply Noted 101" className={'mt-[20px] md:text-[45px] text-[38px]'} />

      <div className="blog-page-button sm:flex flex gap-[13px] justify-center mt-[32px]">
        <button
          className={`border border-black p-[8px] pl-[51px] w-[205px] pr-[49px] bg-red-500 text-white`}
          type="button"
          onClick={() => {
            handleButtonClick('articles');
            navigate('/blog');
          }}
        >
          Articles
        </button>
        <button
          className={`border border-black p-[8px] pl-[51px] w-[205px] pr-[49px] ${
            activeButton === 'tutorials' ? 'bg-red-500 text-white' : ''
          }`}
          type="button"
          onClick={() => {
            handleButtonClick('tutorials');
            navigate('/tutorials');
          }}
        >
          Tutorials
        </button>
      </div>

      <div className="flex justify-center">
        <input
          className="sm:min-w-[453px] sm:h-[57px] min-w-[80%]  h-100%  md:mt-[40px] mt-[33px]"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
      </div>
      <div className="flex justify-center gap-1">
        <div
          className="flex gap-4 flex-wrap justify-center items-start mb-[-40px] mt-[40px]"
          style={{maxWidth: '793px'}}
        >
          {loader ? (
            <CircularLoader color="#ef6e6e" />
          ) : (
            <>
              {paginatedArticles.length > 0 ? (
                paginatedArticles.map((article) => (
                  <div
                    key={article.node.id}
                    className="flex flex-col  bg-white text-black"
                    style={{maxWidth: '363px'}}
                  >
                    <div className="flex-1">
                      <img
                        src={article.node.image.url}
                        className="h-full object-cover"
                        alt={article.node.title}
                      />
                    </div>
                    <div className="mt-2 flex-1 p-3 text-black text-2xl font-bold">
                      {article.node.title}
                    </div>
                  </div>
                ))
              ) : (
                <div className="font-medium text-2xl font-cursive text-blue">
                  No Blog Found
                </div>
              )}

              <div className="flex justify-center gap-12 mt-4">
                <button
                  className={`bg-blue-500 text-white w-[123px]  p-2 ${
                    currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  onClick={handlePrevMore}
                  disabled={currentPage === 1}
                >
                  Prev.
                </button>
                <button
                  className={`bg-blue-500 text-white w-[123px]  p-2 ${
                    endIndex === 42 ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  disabled={endIndex === 42}
                  onClick={handleLoadMore}
                >
                  Next.
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const BlogData = `#graphql
  query
  {
    blog(handle: "news") {
      id
      title
  
      articles(first: 42) {
        edges {
          node {
            id
            image{
            url
                }
            title
            contentHtml
            publishedAt
          }
        }
      }
    }
  }`;
