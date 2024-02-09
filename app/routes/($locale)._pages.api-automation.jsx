import {useState} from 'react';
import {APIIntegrationProvider} from '~/context/APIIntegrationContext';

import {
  APIHeader,
  APIOptionsSelector,
  SelectedAPIDetails,
} from '~/components/api-integrations';

const APIIntegration = () => {
  return (
    <APIIntegrationProvider>
      <APIHeader />
      <div className="flex  md:gap-[20px] mt-[70px] mx-5 bg-white p-[50px] rounded-3xl">
        <APIOptionsSelector />
        <SelectedAPIDetails />
      </div>
    </APIIntegrationProvider>
  );
};

export default APIIntegration;
