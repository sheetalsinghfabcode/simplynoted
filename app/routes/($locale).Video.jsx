import {useLoaderData} from '@remix-run/react';
import {defer} from '@remix-run/server-runtime';
import {useEffect, useState} from 'react';
import {useNavigate} from '@remix-run/react';
import CircularLoader from '~/components/CircularLoder';
import DynamicTitle from '~/components/Title';
import {Link} from '~/components';
import { seoPayload } from '~/lib/seo.server';

export async function loader({request,context}) {
  const blog = await context.storefront.query(tutorialsData, {
    variants: {},
  });
 
  const seo = seoPayload.Video({blog, url: request.url});

  return defer({
    seo,
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

  return (
    <div className='global-max-width-handler'>
      <div className="px-5">
        <DynamicTitle
          // dynamicButton
          title="Simply Noted 101"
          className={'mt-[20px] md:text-[45px] small:text-[38px] text-[32px]'}
        />
        <div className="blog-page-button sm:flex flex gap-[13px] justify-center mt-[32px]">
          <button
            className={`border border-[#508ee3] w-[205px] py-[15px] bg-white text-black`}
            type="button"
            onClick={() => {
              handleButtonClick('articles');
              navigate('/news');
            }}
          >
            Articles
          </button>
          <button
            className={`border border-[#508ee3] w-[205px] py-[15px] bg-[#508ee3] text-white`}
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
            className="sm:min-w-[453px] sm:h-[57px] min-w-[80%]  h-100%  mt-[40px] border border-[#508ee3] rounded-[10px]"
            type="text"
            placeholder="Search....."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></input>
        </div>
        <div className="flex justify-center gap-1">
          <div
            className="flex gap-4 flex-wrap justify-center mb-[17px] items-start mt-[40px]"
            style={{maxWidth: '793px'}}
          >
            {loader ? (
              <CircularLoader color="#ef6e6e" />
            ) : (
              <>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <Link
                    to={`/journal/video/${article.node.handle}`}
                      key={article.node.id}
                      className="flex flex-col  bg-white text-black hover:text-black shadow-lg"
                      style={{maxWidth: '363px'}}
                    >
                      <div className="flex-1">
                        <img
                          src={article.node.image.url}
                          className="h-full object-cover"
                          alt={article.node.title}
                        />
                      </div>
                      <div className="p-[30px]">
                        <div className="mt-2 flex-1 text-black text-[22px] font-bold leading-[30px] hover:text-[#2267d8]">
                          {article.node.title}
                        </div>
                        <div
                          className="collection-descrition text-[18px] leading-[30px]"
                          dangerouslySetInnerHTML={{
                            __html: article.node.seo.description,
                          }}
                        />
                        <p className="text-[18px] mt-[16px] text-[#ef6e6e] font-bold underline">
                          <span
                            className="hover:text-[#ef6e6e]"
                            // to={`/journal/video/${article.node.handle}`}
                          >
                            Click here to read full article
                          </span>
                        </p>
                      </div>
                    </Link>
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
      seo {
        title
        description
      }
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
            handle
            seo{
              title
              description
            }
          }
        }
      }
    }
  }`;
