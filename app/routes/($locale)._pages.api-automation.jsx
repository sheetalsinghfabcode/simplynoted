import {useState} from 'react';
import {APIIntegrationProvider} from '~/context/APIIntegrationContext';

import {
  APIHeader,
  APIOptionsSelector,
  SelectedAPIDetails,
} from '~/components/api-integrations';
import {defer} from '@remix-run/server-runtime';
import { seoPayload } from '~/lib/seo.server';
export async function loader({request,context}){
  const {page} = await context.storefront.query(API_GRAPH_QL, {
    variants: {},
  });
  const seo = seoPayload.page({page, url: request.url});
  return defer({
    seo,
    page,
  });
}

const APIIntegration = () => {
  return (
    <APIIntegrationProvider>
      <APIHeader />
      <div className="md:gap-[20px]  mx-5 bg-white md:p-[50px] p-[0]  rounded-3xl">
        <APIOptionsSelector />
        <SelectedAPIDetails />
      </div>
    </APIIntegrationProvider>
  );
};

export default APIIntegration;
const API_GRAPH_QL = `#graphql
  query
  {
    page(id:"gid://shopify/Page/47245295721"){
    title
    seo{
      title
      description
    }
  }
}`