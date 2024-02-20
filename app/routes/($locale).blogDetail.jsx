import React, {useEffect, useState} from 'react';
import {defer} from '@remix-run/server-runtime';
import {useLoaderData} from '@remix-run/react';

export async function loader({context}) {
  const blogDetail = await context.storefront.query(BlogDataDetail, {
    variants: {},
  });

  return defer({
    blogDetail,
  });
}

const BlogDetail = ({filteredArticles}) => {
  const {BlogDetail} = useLoaderData();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (filteredArticles.articles.edges.length > 0) {
      setLoader(false);
    }
  }, [filteredArticles.articles.edges]);

  return (
    <div>
      {loader && <p>Loading...</p>}
      {!loader && filteredArticles.articles.edges.length > 0 ? (
        filteredArticles.articles.edges.map((article) => (
          <div key={article.node.id}>
            {/* Render your article content here */}
            <h2>{article.node.title}</h2>
            <img src={article.node.image.url} alt={article.node.title} />
            <div dangerouslySetInnerHTML={{__html: article.node.contentHtml}} />
          </div>
        ))
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

const BlogDataDetail = `#graphql
  query {
    blogDetail(handle: "news") {
      id
      title
      articles(first: 42) {
        edges {
          node {
            id
            image {
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

export default BlogDetail;
