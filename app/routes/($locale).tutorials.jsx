import {useLoaderData} from '@remix-run/react';
import {defer} from '@remix-run/server-runtime';
import {useEffect, useState} from 'react';
import {useNavigate} from '@remix-run/react';
import CircularLoader from '~/components/CircularLoder';
import DynamicTitle from '~/components/Title';

export async function loader({context}) {
  const blog = await context.storefront.query(tutorialsData, {
    variants: {},
  });

  return defer({
    blog,
  });
}

export default function tutorials() {
  const {blog} = useLoaderData();
  const [activeButton, setActiveButton] = useState('articles');
  const [loader, setLoader] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const filteredArticles = blog.blog.articles.edges.filter((article) =>
    article.node.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    if (filteredArticles && filteredArticles.length > 0) {
      setLoader(false);
    }
  }, []);

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  console.log(
    'blog',
    blog.blog.articles.edges.map((index) => index.node.title),
  );

  return (
    <div>
      <div className="px-5">
      <DynamicTitle dynamicButton title="Simply Noted 101" className={'mt-[20px] md:text-[45px] text-[38px]'} />
        <div className="blog-page-button sm:flex flex gap-[13px] justify-center mt-[32px]">
          <button
            className={`border border-black p-[8px] pl-[51px] w-[205px] pr-[49px]`}
            type="button"
            onClick={() => {
              handleButtonClick('articles');
              navigate('/blog');
            }}
          >
            Articles
          </button>
          <button
            className={`border border-black p-[8px] pl-[51px] w-[205px] pr-[49px] bg-red-500 text-white`}
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
            className="sm:min-w-[453px] sm:h-[57px] min-w-[80%]  h-100%  mt-[40px]"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
        </div>
        <div className="flex justify-center gap-1">
          <div
            className="flex gap-4 flex-wrap justify-center mb-[-40px] items-start mt-[40px]"
            style={{maxWidth: '793px'}}
          >
            {loader ? (
              <CircularLoader color="#ef6e6e" />
            ) : (
              <>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
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
                  <div className="font-medium text-2xl  text-blue">
                    <h1 className="font-cursive"> No Blog Toturials Found</h1>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const tutorialsData = `#graphql
  query
  {
    blog(handle: "video") {
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
