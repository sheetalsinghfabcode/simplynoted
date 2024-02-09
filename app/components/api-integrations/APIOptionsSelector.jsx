import React from 'react';
import {ExposedAPIs} from '~/data/apiIntegrationData';
import {useAPIIntegrationContext} from '~/context/APIIntegrationContext';

const APIOptionsSelector = () => {
  const {selectedSection, handleSectionChange} = useAPIIntegrationContext();
  
  return (
    <div className="w-[20%]">
      <ol className="sidebar h-[500px]  border-1 border-solid border-gray-300  text-[14px] text-[#696969] leading-[3.5rem] font-bold py-[10px] pl-[10px] pr-[10px] mx-5p-[20px] sticky border-solid border-[#ddd]">
        <li
          className={`w-[43%] ${
            selectedSection === 'API ENDPOINTS' ? ' font-bold' : ''
          } `}
        >
          <button
            className={`text-${
              selectedSection === 'API ENDPOINTS' ? 'blue-700' : 'text-blue-700'
            }  cursor-pointer hover:text-blue-700`}
            onClick={handleSectionChange}
            value="API ENDPOINTS"
            type="button"
          >
            <span
              className={`text-${
                selectedSection === 'API ENDPOINTS'
                  ? 'blue-700'
                  : 'text-blue-700'
              }  cursor-pointer`}
            >
              1.
            </span>{' '}
            API ENDPOINTS
          </button>
        </li>

        <li
          className={`w-[58%]${
            selectedSection === 'AUTHENTICATION' ? ' font-bold' : ''
          } `}
        >
          <button
            className={`text-${
              selectedSection === 'AUTHENTICATION'
                ? 'blue-700'
                : 'text-blue-700'
            } cursor-pointer hover:text-blue-700`}
            value="AUTHENTICATION"
            type="button"
            onClick={handleSectionChange}
          >
            <span
              className={`text-${
                selectedSection === 'AUTHENTICATION'
                  ? 'blue-700'
                  : 'text-blue-700'
              }  cursor-pointer`}
            >
              2.
            </span>{' '}
            AUTHENTICATION
          </button>
        </li>

        <li
          className={`w-[42%]${selectedSection === 'USERS' ? 'font-bold' : ''}`}
        >
          <button
            className={`text-${
              selectedSection === 'USERS' ? 'blue-700' : 'text-blue-700'
            } cursor-pointer hover:text-blue-700`}
            value="USERS"
            onClick={handleSectionChange}
          >
            <span
              className={`text-${
                selectedSection === 'USERS' ? 'blue-700' : 'text-blue-700'
              }  cursor-pointer`}
            >
              3.
            </span>{' '}
            USERS
          </button>
        </li>

        <li
          className={`w-[42%]${
            selectedSection === 'PRODUCTS' ? ' font-bold' : ''
          }`}
        >
          <button
            className={`text-${
              selectedSection === 'PRODUCTS' ? 'blue-700' : 'text-blue-700'
            } cursor-pointer hover:text-blue-700`}
            value="PRODUCTS"
            type="button"
            onClick={handleSectionChange}
          >
            <span
              className={`text-${
                selectedSection === 'PRODUCTS' ? 'blue-700' : 'text-blue-700'
              }  cursor-pointer`}
            >
              4.
            </span>{' '}
            PRODUCTS
          </button>
        </li>

        <li
          className={`w-[42%]${
            selectedSection === 'ORDERS' ? ' font-bold' : ''
          } `}
        >
          <button
            className={`text-${
              selectedSection === 'ORDERS' ? 'blue-700' : 'text-blue-700'
            } cursor-pointer  hover:text-blue-700`}
            value="ORDERS"
            type="button"
            onClick={handleSectionChange}
          >
            <span
              className={`text-${
                selectedSection === 'ORDERS' ? 'blue-700' : 'text-blue-700'
              } cursor-pointer`}
            >
              5.
            </span>{' '}
            ORDERS
          </button>
        </li>
        <ol></ol>
        <li
          className={`w-[42%]${
            selectedSection === 'TEMPLATES' ? ' font-bold' : ''
          } `}
        >
          <button
            className={`text-${
              selectedSection === 'TEMPLATES' ? 'blue-700' : 'text-blue-700'
            } cursor-pointer  hover:text-blue-700`}
            value="TEMPLATES"
            type="button"
            onClick={handleSectionChange}
          >
            <span
              className={`text-${
                selectedSection === 'TEMPLATES' ? 'blue-700' : 'text-blue-700'
              }  cursor-pointer`}
            >
              6.
            </span>{' '}
            TEMPLATES
          </button>
        </li>

        <li
          className={`w-[42%]${
            selectedSection === 'ADDRESSES' ? ' font-bold' : ''
          }`}
        >
          <button
            className={`text-${
              selectedSection === 'ADDRESSES' ? 'blue-700' : 'text-blue-700'
            } cursor-pointer hover:text-blue-700`}
            value="ADDRESSES"
            type="button"
            onClick={handleSectionChange}
          >
            <span
              className={`text-${
                selectedSection === 'ADDRESSES' ? 'blue-700' : 'text-blue-700'
              } cursor-pointer`}
            >
              7.
            </span>{' '}
            ADDRESSES
          </button>
        </li>

        <li
          className={`w-[88%]${
            selectedSection === 'AVAILABLE HANDWRITING STYLES'
              ? ' font-bold'
              : ''
          }`}
        >
          <button
            className={`text-${
              selectedSection === 'AVAILABLE HANDWRITING STYLES'
                ? 'blue-700'
                : 'text-blue-700'
            } cursor-pointer hover:text-blue-700 `}
            value="AVAILABLE HANDWRITING STYLES"
            type="button"
            onClick={handleSectionChange}
          >
            <span
              className={`text-${
                selectedSection === 'AVAILABLE HANDWRITING STYLES'
                  ? 'blue-700'
                  : 'text-blue-700'
              }  cursor-pointer`}
            >
              8.
            </span>{' '}
            AVAILABLE HANDWRITING STYLES
          </button>
        </li>
      </ol>
    </div>
  );
};

export default APIOptionsSelector;
