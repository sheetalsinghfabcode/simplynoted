import {useLoaderData} from '@remix-run/react';
import {defer} from '@remix-run/server-runtime';
import {useState} from 'react';
import {useNavigate} from '@remix-run/react';

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

  const navigate = useNavigate();
  
  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };

  console.log(
    'blog',
    blog.blog.articles.edges.map((index) => index.node.title),
  );

  return (
    <div>
      <div className="">
        <div className="flex justify-center text-[59px] mt-[39px] text-blue-800 font-bold">
          Simply Noted 101
        </div>

        <div className="flex justify-center">
          <img
            className="mt-[21px]"
            src="https://simplynoted.com/cdn/shop/files/underline-2-img.png"
          />
        </div>
        <div className="blog-page-button flex gap-10 justify-center mt-[32px]">
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
            className="min-w-[453px] h-[57px] mt-[40px]"
            type="text"
            placeholder="Search"
          ></input>
        </div>
        <div className="flex justify-center gap-1">
          <div
            className="flex gap-4 flex-wrap justify-center items-start mt-[100px]"
            style={{maxWidth: '793px'}}
          >
            {blog.blog.articles.edges.map((index) => (
              <div
                className="flex flex-col mr-4 bg-white text-black"
                style={{maxWidth: '363px'}}
              >
                <div className="flex-1">
                  <img
                    src={index.node.image.url}
                    className="h-full object-cover"
                  />
                </div>
                <div className="text-[16px] mt-2 flex-1 p-3">
                  {index.node.title}
                </div>
              </div>
            ))}
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
