import {set} from 'js-cookie';
import {useState} from 'react';

const apidocs = () => {
  const [selectedSection, setSelectedSection] = useState('Get Standard Cards');

  const handleSectionChange = (event) => {
    event.preventDefault();
    switch (event.target.value) {
      case 'API ENDPOINTS':
        setSelectedSection('API ENDPOINTS');
        break;
      case 'AUTHENTICATION':
        setSelectedSection('AUTHENTICATION');
        break;
      case 'Retrieve Auth Token':
        setSelectedSection('Retrieve Auth Token');
        break;
      case 'USERS':
        setSelectedSection('USERS');
        break;
      case 'Create A User':
        setSelectedSection('Create A User');
        break;
      case 'PRODUCTS':
        setSelectedSection('PRODUCTS');
        break;
      case 'Get Standard Cards':
        setSelectedSection('Get Standard Cards');
        break;
      case 'Get All Custom Cards':
        setSelectedSection('Get All Custom Cards');
        break;
      case 'Get Specific Custom Cards':
        setSelectedSection('Get Specific Custom Cards');
        break;
      case 'Create Custom Card':
        setSelectedSection('Create Custom Card');
        break;
      case 'Modify Custom Card':
        setSelectedSection('Modify Custom Card');
        break;
      case 'Delete Custom Cards':
        setSelectedSection('Delete Custom Cards');
        break;
      case 'ORDERS':
        setSelectedSection('ORDERS');
        break;
      case 'Create An Order':
        setSelectedSection('Create An Order');
        break;
      case 'Get Orders':
        setSelectedSection('Get Orders');
        break;
      case 'TEMPLATES':
        setSelectedSection('TEMPLATES');
        break;
      case 'Create A Message Template':
        setSelectedSection('Create A Message Template');
        break;
      case 'Retrieve All Message Templates':
        setSelectedSection('Retrieve All Message Templates');
        break;
      case 'Retrieve A Single Template':
        setSelectedSection('Retrieve A Single Template');
        break;
      case 'Update A Template':
        setSelectedSection('Update A Template');
        break;
      case 'ADDRESSES':
        setSelectedSection('ADDRESSES');
        break;
      case 'Create An Address':
        setSelectedSection('Create An Address');
        break;
      case 'Retrieve All Addresses':
        setSelectedSection('Retrieve All Addresses');
        break;
      case 'Retrieve A Single Address':
        setSelectedSection('Retrieve A Single Address');
        break;
      case 'Update A Address':
        setSelectedSection('Update A Address');
        break;
      case 'Delete A Single Address':
        setSelectedSection('Delete A Single Address');
        break;
      case 'AVAILABLE HANDWRITING STYLES':
        setSelectedSection('AVAILABLE HANDWRITING STYLES');
        break;
      case 'Examples':
        setSelectedSection('Examples');
        break;
    }
  };

  return (
    <div className="">
      <div className="p-[40px]">
        <h1 className="text-[50px] pb-[30px] font-karla text-center mt-[33px] font-extrabold leading-6">
          API Docs
          <div className="flex justify-center mt-[25px] h-[11px]">
            <img src="https://simplynoted.com/cdn/shop/files/menu-underline.png" />
          </div>
        </h1>
        <p className="text-[#001a5f] max-w-[40rem] font-bold mb-[28px] mt-[21px]  text-[20px] text-center mx-auto">
          By using this API you will have full access to the same range of
          features found in our apps and website.
        </p>
      </div>
      <div className="flex  md:gap-[20px] mt-5 mx-5">
        <div className="w-[30%]">
          <ol className="sidebar h-[500px] overflow-y-scroll border-1 border-solid border-gray-300 bg-white text-[10px] text-[#696969] leading-[1.5rem] font-bold py-[10px] pl-[10px] pr-[10px] mx-5p-[20px] sticky border border-solid border-[#ddd]">
            <li
              className={`${
                selectedSection === 'API ENDPOINTS'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button value="API ENDPOINTS" onClick={handleSectionChange}>
                <span className='text-blue-500'>1.</span>API ENDPOINTS
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'AUTHENTICATION'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button value="AUTHENTICATION" onClick={handleSectionChange}>
                <span className='text-blue-500'>2.</span>AUTHENTICATION
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'Retrieve Auth Token'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button value="Retrieve Auth Token" onClick={handleSectionChange}>
                <span className='text-blue-500'>2.1.</span>Retrieve Auth Token
              </button>
            </li>

            <li
              className={`${
                selectedSection === 'USERS' ? 'bg-slate-300 p-2 font-bold' 
                : ''
              }`}
            >
              <button value="USERS" onClick={handleSectionChange}>
                <span className='text-blue-500'>3.</span>USERS
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'Create A User'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button value="Create A User" onClick={handleSectionChange}>
               <span className='text-blue-500'>3.1.</span> Create A User
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'PRODUCTS'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="PRODUCTS"
                type="button"
                onClick={handleSectionChange}
              >
                <span className='text-blue-500'>4.</span>PRODUCTS
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'Get Standard Cards'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Get Standard Cards"
                type="button"
                onClick={handleSectionChange}
              >
               <span className='text-blue-500'>4.1.</span> Get Standard Cards
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'Get All Custom Cards'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Get All Custom Cards"
                type="button"
                onClick={handleSectionChange}
              >
              <span className='text-blue-500'>4.2.</span>  Get All Custom Cards
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'Get Specific Custom Cards'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Get Specific Custom Cards"
                type="button"
                onClick={handleSectionChange}
              >
               <span className='text-blue-500'>4.3.</span> Get Specific Custom Cards
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'Create Custom Card'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Create Custom Card"
                type="button"
                onClick={handleSectionChange}
              >
              <span className='text-blue-500'>4.4.</span>  Create Custom Card
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'Modify Custom Card'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Modify Custom Card"
                type="button"
                onClick={handleSectionChange}
              >
               <span className='text-blue-500'>4.5.</span> Modify Custom Card
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'Delete Custom Cards'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Delete Custom Cards"
                type="button"
                onClick={handleSectionChange}
              >
               <span className='text-blue-500'>4.6.</span> Delete Custom Cards
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'ORDERS' ? 'bg-slate-300 p-2 font-bold' : ''
              }`}
            >
              <button
                value="ORDERS"
                type="button"
                onClick={handleSectionChange}
              >
               <span className='text-blue-500'>5.</span> ORDERS
              </button>
            </li>
            <ol>
              <li
                className={`${
                  selectedSection === 'Create An Order'
                    ? 'bg-slate-300 p-2 font-bold'
                    : ''
                }`}
              >
                <button
                  value="Create An Order"
                  type="button"
                  onClick={handleSectionChange}
                >
                 <span className='text-blue-500'>5.1</span> Create An Order
                </button>
              </li>
              <li
                className={`${
                  selectedSection === 'Get Orders'
                    ? 'bg-slate-300 p-2 font-bold'
                    : ''
                }`}
              >
                <button
                  value="Get Orders"
                  type="button"
                  onClick={handleSectionChange}
                >
                 <span className='text-blue-500'>5.2.</span> Get Orders
                </button>
              </li>
            </ol>
            <li
              className={`${
                selectedSection === 'TEMPLATES'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="TEMPLATES"
                type="button"
                onClick={handleSectionChange}
              >
                {' '}
              <span className='text-blue-500'>6.</span>  TEMPLATES
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'Create A Message Template'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Create A Message Template"
                type="button"
                onClick={handleSectionChange}
              >
                <span className='text-blue-500'>6.1.</span>Create A Message Template
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'Retrieve All Message Templates'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Retrieve All Message Templates"
                type="button"
                onClick={handleSectionChange}
              >
              <span className='text-blue-500'>6.2.</span>  Retrieve All Message Templates
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'Retrieve A Single Template'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Retrieve A Single Template"
                type="button"
                onClick={handleSectionChange}
              >
               <span className='text-blue-500'>6.3.</span> Retrieve A Single Template
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'Update A Template'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Update A Template"
                type="button"
                onClick={handleSectionChange}
              >
               <span className='text-blue-500'>6.4.</span> Update A Template
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'ADDRESSES'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="ADDRESSES"
                type="button"
                onClick={handleSectionChange}
              >
               <span className='text-blue-500'>7.</span> ADDRESSES
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'Create An Address'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Create An Address"
                type="button"
                onClick={handleSectionChange}
              >
               <span className='text-blue-500'>7.1.</span> Create An Address
              </button>
            </li>

            <li
              className={`${
                selectedSection === 'Retrieve All Addresses'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Retrieve All Addresses"
                type="button"
                onClick={handleSectionChange}
              >
               <span className='text-blue-500'>7.2.</span> Retrieve All Addresses
              </button>
            </li>

            <li
              className={`${
                selectedSection === 'Retrieve A Single Address'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Retrieve A Single Address"
                type="button"
                onClick={handleSectionChange}
              >
               <span className='text-blue-500'>7.3</span> Retrieve A Single Address
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'Update A Address'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Update A Address"
                type="button"
                onClick={handleSectionChange}
              >
              <span className='text-blue-500'>7.4.</span>  Update A Address
              </button>
            </li>

            <li
              className={`${
                selectedSection === 'Delete A Single Address'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Delete A Single Address"
                type="button"
                onClick={handleSectionChange}
              >
              <span className='text-blue-500'>7.5.</span>  Delete A Single Address
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'AVAILABLE HANDWRITING STYLES'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="AVAILABLE HANDWRITING STYLES"
                type="button"
                onClick={handleSectionChange}
              >
                <span className='text-blue-500'>8.</span>AVAILABLE HANDWRITING STYLES
              </button>
            </li>
            <li
              className={`${
                selectedSection === 'Examples'
                  ? 'bg-slate-300 p-2 font-bold'
                  : ''
              }`}
            >
              <button
                value="Examples"
                onClick={handleSectionChange}
                type="button"
              >
               <span className='text-blue-500'>8.1.</span> Examples
              </button>
            </li>
          </ol>
        </div>
        <div className=" sidebar h-[500px] overflow-y-scroll border-1 border-solid w-[70%] p-[12px]">
          {selectedSection === 'API ENDPOINTS' && (
            <div>
              <h2 className="text-[#001a5f] font-karla text-lg font-bold ml-2">
               <span className='text-blue-500'></span> 1.API ENDPOINTS
              </h2>
              <div className="text-sm">
                <p className=" mb-[7px] ml-[8px] font-thin mt-[23px]">
                  The production API can be found at:
                  <a href="https://simplynoted.com/pages/api-automation">
                    https://api.simplynoted.com/api
                  </a>
                </p>
                <p className=" ml-[8px] font-thin mt-[20px] mb-[7px]">
                  The test API can be found at
                  <a href="https://testapi.simplynoted.com/api ">
                    <span className="text-red">
                      https://testapi.simplynoted.com/api
                    </span>
                  </a>
                </p>
                <p className=" mt-[19px] font-thin ml-[8px]">
                  All endpoints listed in this documentation refer to those base
                  URLs and build off them. For example, the orders endpoint
                  "/orders" can be found at the endpoint:
                  <a href="https://api.simplynoted.com/api/orders">
                    https://api.simplynoted.com/api/orders
                  </a>
                </p>
              </div>
            </div>
          )}
          {selectedSection === 'AUTHENTICATION' && (
            <div>
              <h2 className="text-[#001a5f] font-karla text-lg  font-bold ml-2">
               <span className='text-blue-500'>2.</span> AUTHENTICATION
              </h2>
            </div>
          )}
          {selectedSection === 'Retrieve Auth Token' && (
            <div>
              <h2 className="text-[#001a5f] font-karla text-lg  font-bold ml-2">
               <span className='text-blue-500'>2.1.</span> Retrieve Auth Token
              </h2>
              <p className="mt-12px text-sm font-thin m-[8px]">
                <span className="font-bold"> Description:</span> Simply Noted
                uses API keys as bearer tokens to allow access to the API. You
                can get your API key from <br />  page under "Account Details".
                Simply Noted expects for the API key to be included in all API
                requests to the server in a header that looks like the
                following: Authorization: Bear
              </p>
            </div>
          )}
          {selectedSection === 'USERS' && (
            <div>
              <h2 className="text-[#001a5f] font-karla text-lg  font-bold ml-2">
               <span className='text-blue-500'>3.</span> USERS
              </h2>
              ``{' '}
            </div>
          )}
          {selectedSection === 'Create A User' && (
            <div>
              <h2 className="text-[#001a5f] font-karla text-lg  font-bold ml-2">
               <span className='text-blue-500'>3.1.</span> Create A User
              </h2>
              <p className="ml-[8px] text-sm font-thin">
                <span className="font-bold">Description:</span> Users are
                created through the Simply Noted website.
                <br /> To create an account go to
                <span className="text-blue">
                  {' '}
                  https://simplynoted.com/account/register.
                </span>
              </p>
            </div>
          )}
          {selectedSection === 'PRODUCTS' && (
            <div>
              <h2 className="text-[#001a5f] font-karla text-lg  font-bold ml-2">
                <span className='text-blue-500'>4.</span> PRODUCTS
              </h2>
            </div>
          )}
          {selectedSection === 'Get Standard Cards' && (
            <div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-lg  font-bold ml-2">
                 <span className='text-blue-500'> 4.1.</span> Get Standard Cards
                </h2>
                <p className="mt-[7px] ml-[8px] text-sm font-thin">
                  <span className="font-bold ">Description:</span>This endpoint
                  gets all standard cards and returns the id, title, and image
                  URL.
                </p>
                <p className="mt-[7px] ml-[8px] text-sm font-thin">
                  <span className="font-bold">Endpoint:</span> /products
                </p>
                <p className="mt-[7px] ml-[8px] text-sm font-thin">
                  <span className="font-bold">Method:</span> GET
                </p>
              </div>
              <h2 className="text-[#001a5f] font-karla text-sm mt-[61px] font-bold ml-2">
                Headers
              </h2>
              <table class="w-2/4	 text-sm text-thin table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">Content-Type</td>
                    <td class="border p-4">application/json</td>
                    <td class="border p-4">$Yes</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Authorization</td>
                    <td class="border p-4">Bearer TOKEN_HERE</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h3 className="mt-[19px]">
                  <b>Returns on success:</b>
                </h3>
                <pre className="leading-6	 text-xs bg-gray-200 p-[22px] overflow-hidden">
                  &#123;
                  <br />
                  "result" [<br />
                  &#123;
                  <br />
                  "id": '4392451768425',
                  <br />
                  "title": "Cactus Thank you",
                  <br />
                  "image":
                  "https://cdn.shopify.com/s/files/1/0275/6457/2777/products/Cactus-Thank-You.jpg?v=1574659292"
                  <br />
                  &#125;,
                  <br />
                  &#123;
                  <br />
                  "id": '4392452522089',
                  <br />
                  "title": "Cactus Thanks So Much",
                  <br />
                  "image":
                  "https://cdn.shopify.com/s/files/1/0275/6457/2777/products/Cactus-Thanks-So-Much.jpg?v=1574659363"
                  <br />
                  &#125;,
                  <br />
                  &#123;
                  <br />
                  "id": '4442013139049',
                  <br />
                  "title": "Dark Red Holiday Card",
                  <br />
                  "image":
                  "https://cdn.shopify.com/s/files/1/0275/6457/2777/products/Red.HolidayCard.jpg?v=1576524937"
                  <br />
                  &#125; ],
                  <br />
                  "errors": []
                  <br />
                  &#125;
                </pre>
              </div>
            </div>
          )}
          {selectedSection === 'Get All Custom Cards' && (
            <div>
              <h2 className="text-[#001a5f] font-karla text-lg  font-bold ml-2">
                <span className='text-blue-500'>4.2.</span> Get All Custom Cards
              </h2>
              <div className="leading-[1.25rem] text-sm font-thin">
                <p className="ml-[8px]">Endpoint: /customProducts</p>
                <p className="ml-[8px]">
                  Get-https://api.simplynoted.com/api/customProducts?offset=0
                </p>
                <p className="ml-[8px]">
                  This endpoint will retrieve a list of custom cards, returning
                  up to 200 cards for each call.
                </p>
              </div>
            </div>
          )}
          {selectedSection === 'Get Specific Custom Cards' && (
            <div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-lg  font-bold ml-2">
                  <span className='text-blue-500'>4.3.</span>Get Specific Custom Cards
                </h2>
              </div>
              <div className="leading-[1.25rem] text-sm ml-[9px] font-thin">
                <p>
                  This procedure returns details on one or more custom cards.
                </p>
                <p>
                  Example:
                  /customProducts?productIds=7036997894249,7036977578089,7036976889961
                </p>
                <p>
                  Where the IDs are existing custom card IDs separated by
                  commas.
                </p>
              </div>
            </div>
          )}
          {selectedSection === 'Create Custom Card' && (
            <div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-lg  font-bold ml-2">
                 <span className='text-blue-500'>4.4.</span> Create Custom Card
                </h2>
                <div className="leading-[1.25rem] ml-[9px] text-sm font-thin">
                  <p>
                    <b>Note:</b>The old endpoint, /createcustomcard, and its
                    associated endpoint, /uploadPDF, have been replaced with a
                    single new endpoint: /createcard. The old endpoints will
                    remain usable until November 1, 2023, at which point they
                    will be retired. We strongly recommend you switch to the new
                    endpoint, /createcard. As well, we have released a new
                    endpoint /modifycard, which will allow you to call an
                    existing flat custom card,
                  </p>
                  <p className="mt-[20px]">
                    <b>Description:</b> This endpoint creates a new Custom Card
                    and returns card details.
                  </p>
                  <p>
                    <b>Endpoint:</b> /createCard
                  </p>
                  <p>
                    <b>Method:</b> POST
                  </p>
                </div>
              </div>
              <h2 className="text-[#001a5f] font-karla  mt-[61px] font-bold ml-2">
                Headers
              </h2>
              <table class="w-2/4 text-sm	 table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">Content-Type</td>
                    <td class="border p-4">application/json</td>
                    <td class="border p-4">$Yes</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Authorization</td>
                    <td class="border p-4">Bearer TOKEN_HERE</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2>Body:</h2>
              </div>
              <table class="min-w-full text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">Content-Type</td>
                    <td class="border p-4">application/json</td>
                    <td class="border p-4"></td>
                    <td class="border p-4">$Yes</td>
                  </tr>
                  <tr>
                    <td class="border p-4">cardName</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4"> "Happy Birthday"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">cardType</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4"> “flat5x7” / “folded5x7”</td>
                  </tr>
                  <tr>
                    <td class="border p-4">frontImage</td>
                    <td class="border p-4">File</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">.</td>
                  </tr>
                  <tr>
                    <td class="border p-4">isHeaderIncluded</td>
                    <td class="border p-4"> Boolean</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">True</td>
                  </tr>
                  <tr>
                    <td class="border p-4">isFooterIncluded</td>
                    <td class="border p-4"> Boolean</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">True</td>
                  </tr>
                  <tr>
                    <td class="border p-4">header</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4"> sImage": true</td>
                  </tr>
                  <tr>
                    <td class="border p-4">footer</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">
                      "data": "Yours Sincerely","textAlign":
                      "left","justifyContent": "center","flexDirection":
                      "column","fontType": "Courier New","fontSize":
                      30,"fontColor": "rgb(255, 0, 0)","zoom": "1","isImage":
                      false
                    </td>
                  </tr>
                  <tr>
                    <td class="border p-4">headerImage</td>
                    <td class="border p-4">File</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4"></td>
                  </tr>
                  <tr>
                    <td class="border p-4">footerImage</td>
                    <td class="border p-4">File</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4"></td>
                  </tr>
                  <tr>
                    <td class="border p-4">backImage</td>
                    <td class="border p-4">File</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">.</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2 className="text-[#001a5f] font-karla  mt-[13px] font-bold ml-2">
                  Return on Success:
                </h2>
              </div>
              <pre className="leading-6 text-xs	 bg-gray-200 p-[22px] overflow-hidden">
                &#123; <br />
                "result": &#123;
                <br />
                "product":
                <br />
                "id": 7046027575401, <br />
                "title": "Testing Cards", <br />
                "body_html": null, <br />
                "vendor": "SimplyNoted", <br />
                "product_type": "customisable card", <br />
                "created_at": "2023-09-13T06:22:28-07:00", <br />
                "handle": "testing-cards", <br />
                "updated_at": "2023-09-13T06:22:29-07:00", <br />
                "published_at": "2023-09-13T06:22:28-07:00", <br />
                "template_suffix": null, <br />
                "published_scope": "web", <br />
                "tags": "customise_card", <br />
                "status": "active", <br />
                "admin_graphql_api_id": "gid://shopify/Product/7046027575401”,{' '}
                <br />
                "images": [ <br />
                &#123; "id": 30856642232425, <br />
                "product_id": 7046027575401,
                <br />
                "position": 1, <br />
                "created_at": "2023-09-13T06:22:28-07:00", <br />
                "updated_at": "2023-09-13T06:22:28-07:00", <br />
                "alt": "front_img", <br />
                "width": 495,
                <br />
                "height": 350,
                <br />
                "src":
                "https://cdn.shopify.com/s/files/1/0275/6457/2777/products/1694611344453.jpg?v=1694611348",
                <br />
                "variant_ids": [], <br />
                "admin_graphql_api_id":
                "gid://shopify/ProductImage/30856642232425" <br />
                &#125; ], <br />
                "image": &#123; <br />
                "id": 30856642232425,
                <br />
                "product_id": 7046027575401, <br />
                "position": 1, <br />
                "created_at": "2023-09-13T06:22:28-07:00", <br />
                "updated_at": "2023-09-13T06:22:28-07:00", <br />
                "alt": "front_img", <br />
                "width": 495, <br />
                "height": 350, <br />
                "src":
                "https://cdn.shopify.com/s/files/1/0275/6457/2777/products/1694611344453.jpg?v=1694611348",{' '}
                <br />
                "variant_ids": [], "admin_graphql_api_id":
                "gid://shopify/ProductImage/30856642232425" <br />
                &#125;
                <br /> &#125;
                <br /> &#125;
                <br />
                "errors": [] <br />
                &#125;
              </pre>

              <div className="mt-[7px]">
                <h2 className="text-[#001a5f] font-karla  mt-[13px] font-bold ml-2">
                  Error:
                </h2>
              </div>
              <div>
                <table class="min-w-full text-xs table-auto">
                  <thead>
                    <tr>
                      <td class="border p-4">Status</td>
                      <td class="border p-4">Errors</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border p-4">400</td>
                      <td class="border p-4">
                        cardType, cardName & frontImage are required fields
                      </td>
                    </tr>
                    <tr>
                      <td class="border p-4">400</td>
                      <td class="border p-4">
                        headerImage is required when header has isImage true
                      </td>
                    </tr>
                    <tr>
                      <td class="border p-4">400</td>
                      <td class="border p-4">
                        footerImage is required when footer has isImage true
                      </td>
                    </tr>
                    <tr>
                      <td class="border p-4">400</td>
                      <td class="border p-4">
                        For flat cardType, isHeaderIncluded, isFooterIncluded,
                        header, and footer are required fields
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {selectedSection === 'Modify Custom Card' && (
            <div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-lg font-bold ml-2">
                  <span className='text-blue-500'>4.5.</span> Modify Custom Card
                </h2>
                <div className="leading-[1.5rem]  ml-[9px] text-sm">
                  <p>
                    <b>Description:</b> This endpoint creates and saves a new
                    modified Custom Card and returns card details.
                  </p>
                  <p>
                    <b>Endpoint:</b> /modifyCard
                  </p>
                  <p>
                    <b>Method:</b> POST
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-lg mt-[13px] font-bold ml-2">
                  Headers:
                </h2>
              </div>
              <div>
                <table className="w-2/4 text-sm table-auto">
                  <thead>
                    <tr>
                      <td className="border p-4">Name</td>
                      <td className="border p-4">Value</td>
                      <td className="border p-4">Required?</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-4">Content-Type</td>
                      <td className="border p-4">application/json</td>
                      <td className="border p-4">Yes</td>
                    </tr>
                    <tr>
                      <td class="border p-4">Authorization</td>
                      <td className="border p-4">Bearer TOKEN_HERE</td>
                      <td class="border p-4">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla  text-lg mt-[13px] font-bold ml-2">
                  Body:
                </h2>
              </div>
              <table class="min-w-full text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Key</td>
                    <td class="border p-4">Type/Values</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">CoriginalCustomCardID</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4"> Yes</td>
                    <td class="border p-4">7046020595817</td>
                  </tr>
                  <tr>
                    <td class="border p-4">cardName</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4"> "Happy Birthday Modified 1a"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">sHeaderIncluded</td>
                    <td class="border p-4"> Boolean</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4"> True</td>
                  </tr>
                  <tr>
                    <td class="border p-4">isFooterIncluded</td>
                    <td class="border p-4">Boolean</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">true</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Header</td>
                    <td class="border p-4"> String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"isImage": true</td>
                  </tr>
                  <tr>
                    <td class="border p-4">footer</td>
                    <td class="border p-4"> String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">
                      "data": "Yours Sincerely","textAlign":
                      "left","justifyContent": "center","flexDirection":
                      "column","fontType": "Courier New","fontSize":
                      30,"fontColor": "rgb(255, 0, 0)","zoom": "1","isImage":
                      false
                    </td>
                  </tr>
                  <tr>
                    <td class="border p-4">headerImage</td>
                    <td class="border p-4">File</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4"></td>
                  </tr>
                  <tr>
                    <td class="border p-4">footerImage</td>
                    <td class="border p-4">File</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4"></td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2 className="text-[#001a5f] font-karla text-lg  mt-[13px] font-bold ml-2">
                  Returns on success:
                </h2>
              </div>
              <pre className="leading-6	 text-xs p-[22px] bg-gray-200  mt-7px">
                &#123;
                <br />
                "result": &#123;
                <br />
                "product": &#123; <br />
                "id": 70460275754
                <br />
                "title": "Testing Cards", <br />
                "body_html": null, <br />
                "vendor": "SimplyNoted", <br />
                "product_type": "customisable card", <br />
                "created_at": "2023-09-13T06:22:28-07:00", <br />
                "handle": "testing-cards", <br />
                "updated_at": "2023-09-13T06:22:29-07:00", <br />
                "published_at": "2023-09-13T06:22:28-07:00", <br />
                "template_suffix": null, <br />
                "published_scope": "web", <br />
                "tags": "customise_card", <br />
                "status": "active", <br />
                "admin_graphql_api_id": "gid://shopify/Product/7046027575401",{' '}
                <br />
                "variants": &#123;
                <br />
                &#123;
                <br />
                "id": 40730910490729, <br />
                "product_id": 7046027575401, <br />
                "title": "2 - 500", <br />
                "price": "4.35", <br />
                "sku": "", <br />
                "position": 1, <br />
                "inventory_policy": "deny", <br />
                "compare_at_price": null, <br />
                "fulfillment_service": "manual", <br />
                "inventory_management": null, <br />
                "option1": "2 - 500", <br />
                "option2": null, <br />
                "option3": null, <br />
                "created_at": "2023-09-13T06:22:28-07:00", <br />
                "updated_at": "2023-09-13T06:22:28-07:00", <br />
                "taxable": true, <br />
                "barcode": null, <br />
                "grams": 0, <br />
                "image_id": null, <br />
                "weight": 0, <br />
                "weight_unit": "lb", <br />
                "inventory_item_id": 42829245382761, <br />
                "inventory_quantity": 0, <br />
                "old_inventory_quantity": 0, <br />
                "requires_shipping": true, <br />
                "admin_graphql_api_id":
                "gid://shopify/ProductVariant/40730910490729" <br />
                &#125; <br />
                &#123;
                <br />
                "id": 40730910523497, <br />
                "product_id": 7046027575401, <br />
                "created_at": "2023-09-13T06:22:28-07:00", <br />
                "updated_at": "2023-09-13T06:22:28-07:00", <br />
                "inventory_item_id": 42829245415529, <br />
                "admin_graphql_api_id":
                "gid://shopify/ProductVariant/40730910523497" <br />
                &#125; "errors": []
                <br />
                &#125;
                <br />
                &#125;
              </pre>
              <div>
                <div>
                  <h2 className="text-[#001a5f] font-karla text-lg  mt-[13px] font-bold ml-2">
                    Example
                  </h2>
                </div>
                <pre className="leading-6	text-xs bg-gray-200 p-[22px] overflow-hidden">
                  &#123;
                  <br />
                  "cardName": "Happy Birthday",
                  <br /> "cardType": "flat5x7",
                  <br />
                  "frontImage": ,<br /> "isHeaderIncluded": true,
                  <br /> "isFooterIncluded": true,
                  <br /> "header": &#123;
                  <br /> "isImage": true
                  <br /> &#125; <br />
                  "footer": &#123;
                  <br />
                  "data": "Yours Sincerely", <br />
                  "textAlign": "left", <br />
                  "justifyContent": "center", <br />
                  "flexDirection": "column", <br />
                  "fontType": "Trebuchet MS", <br />
                  "fontSize": 20, <br />
                  "fontColor": "rgb(0, 0, 255)", <br />
                  "zoom": "1", <br />
                  "isImage": false <br />
                  &#125; <br />
                  "headerImage": , <br />
                  "footerImage": , <br />
                  "backImage": , <br />
                  &#125;
                  <br />
                </pre>
              </div>
            </div>
          )}
          {selectedSection === 'Delete Custom Cards' && (
            <div>
              <div>
                <h2 className="text-[#001a5f]  font-karla text-lg  font-bold ml-2">
                  <spna>4.6.</spna>Delete Custom Cards
                </h2>
                <div className="leading-[1.5rem] text-sm mt-[12px]">
                  <p className="ml-[9px]">
                    DELETE -
                    /delete-custom-card?productId=7072904347753,7073022279785,123456789000
                  </p>
                  <p className="ml-[9px]">
                    This endpoint can be used to delete one or more custom cards
                    belonging to the user.
                  </p>
                </div>
              </div>
              <table class="min-w-full mt-[5px] text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Method</td>
                    <td class="border p-4">URL</td>
                    <td class="border p-4">Parameters</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">DELETE</td>
                    <td class="border p-4">
                      /delete-custom-card?productId=7072904347753,7073022279785,123456789000
                    </td>
                    <td class="border p-4">productId - productId contains</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2 className="text-[#001a5f] font-karla text-lg  mt-[13px] font-bold ml-2">
                  Response Sample
                </h2>
              </div>
              <pre className="leading-6	 text-sm  p-[22px] bg-gray-200  mt-7px">
                &#123;
                <br />
                "result": <br />
                "successfulDeletions": [ <br />
                "7072904347753", <br />
                "7073022279785" <br />
                ], <br />
                "failedDeletions": [ <br />
                123456789000 <br />
                ] <br />
                "errors": [] <br />
                &#125;
              </pre>
            </div>
          )}
          {selectedSection === 'ORDERS' && (
            <div>
              <h2 className="text-[#001a5f] font-karla text-lg font-bold ml-2">
              <span className='text-blue-500'>5.</span> ORDERS
              </h2>
            </div>
          )}
          {selectedSection === 'Create An Order' && (
            <div>
              <div>
                <h2 className="text-[#001a5f]  font-karla text-lg  font-bold ml-2">
                  <span className='text-blue-500'>5.1.</span> Create An Order
                </h2>
                <div className="leading-[1.5rem] text-sm ml-[9px]">
                  <p>
                    <b>Description:</b> This endpoint creates and saves a new
                    modified Custom Card and returns card details.
                  </p>
                  <p>
                    <b>Endpoint:</b> /orders
                  </p>
                  <p>
                    <b>Method:</b> POST
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-lg  mt-[13px] font-bold ml-2">
                  Headers:
                </h2>
              </div>
              <table class="w-2/4 text-sm	 table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">Content-Type</td>
                    <td class="border p-4">application/json</td>
                    <td class="border p-4">$Yes</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Authorization</td>
                    <td class="border p-4">Bearer TOKEN_HERE</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2 className="text-[#001a5f] font-karla text-lg mt-[13px] font-bold ml-2">
                  Body:
                </h2>
              </div>
              <table class="min-w-full text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">productId</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">$Yes</td>
                    <td class="border p-4">"4392452522089"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">giftVariantId</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">
                      "39532031672425" (Note: See below for more)
                    </td>
                  </tr>
                  <tr>
                    <td class="border p-4">Authorization</td>
                    <td class="border p-4">Bearer TOKEN_HERE</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4"> "john@simplynoted.com"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">handwritingStyle </td>
                    <td class="border p-4"> String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4"> "Tarzan"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">customMessage</td>
                    <td class="border p-4"> String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">
                      "This is my custom message.Use a hard return for a new
                      line."
                    </td>
                  </tr>
                  <tr>
                    <td class="border p-4">signoff</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4"> No</td>
                    <td class="border p-4"> "Yours Sincerely,David"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">AshippingDate</td>
                    <td class="border p-4"> String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"01/01/2020"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">returnAddressId</td>
                    <td class="border p-4"> String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4"> "ID_OF_RETURN_ADDRESS"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">returnAddress</td>
                    <td class="border p-4"> Object Return Object</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">See Below</td>
                  </tr>
                  <tr>
                    <td class="border p-4">recipientData</td>
                    <td class="border p-4"> Array Recipient Object</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">See Below</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2 className="text-[#001a5f] font-karla text-lg mt-[13px] font-bold ml-2">
                  Recipient Object:
                </h2>
              </div>
              <table class="min-w-full text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Key</td>
                    <td class="border p-4">Type</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">FirstName</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">$Yes</td>
                    <td class="border p-4">"John"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">LastName</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4"> Yes</td>
                    <td class="border p-4">"Appleseed"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Email</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"john@simplynoted.com"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Phone</td>
                    <td class="border p-4"> String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4"> "+15555551234"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Address</td>
                    <td class="border p-4"> String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">
                      "This is my custom message.Use a hard return for a new
                      line."
                    </td>
                  </tr>
                  <tr>
                    <td class="border p-4">Address 2</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4"> No</td>
                    <td class="border p-4">"Suite 100"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">City</td>
                    <td class="border p-4"> String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Metropolis"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">State</td>
                    <td class="border p-4"> String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Smallville"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Country</td>
                    <td class="border p-4"> String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"USA"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Zip</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"12345"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Company</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"ACME, Inc."</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Custom 1</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"My custom value"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Custom 2 </td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"Another Ccustom value"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Custom 3</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"And A third"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {selectedSection === 'Get Orders' && (
            <div>
              <h2 className="text-[#001a5f]  font-karla text-lg  font-bold ml-2">
                <span className="text-blue-500">5.2.</span> Get Orders
              </h2>
              <p className="mt-[21px]  ml-[9px] text-sm">
                <b>Description:</b> This endpoint gets all orders in the
                account.
              </p>
              <p className="mt-[7px] ml-[9px] text-sm">
                <b>Endpoint:</b>{' '}
                /orders/customer/?offset=0&status=any&fulfillment_status=shipped
              </p>
              <p className="mt-[7px] ml-[9px] text-sm">
                <b>Method:</b> GET
              </p>
              <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                Headers:
              </h2>
              <table class="w-2/4 text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">Content-Type</td>
                    <td class="border p-4">application/json</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Authorization</td>
                    <td class="border p-4">Bearer TOKEN_HERE</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                </tbody>
              </table>
              <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                Body:
              </h2>
              <table class="min-w-full text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Key</td>
                    <td class="border p-4">Type</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">productId</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"4392452522089"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">giftVariantId</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">
                      "39532031672425" (Note: See below for more)
                    </td>
                  </tr>
                  <tr>
                    <td class="border p-4">handwritingStyle</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Tarzan"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">customMessage </td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">
                      "This is my custom message. Use a hard return for a new
                      line."
                    </td>
                  </tr>
                  <tr>
                    <td class="border p-4">signoff</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"Yours Sincerely, David"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">giftVariantId</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">
                      "39532031672425" (Note: See below for more)
                    </td>
                  </tr>
                  <tr>
                    <td class="border p-4">shippingDate</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"01/01/2020"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">returnAddressId </td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"ID_OF_RETURN_ADDRESS"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">returnAddress</td>
                    <td class="border p-4">Object Return Object</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4"> See Below</td>
                  </tr>
                  <tr>
                    <td class="border p-4">recipientData </td>
                    <td class="border p-4">Array Recipient Object</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4"> See Below</td>
                  </tr>
                </tbody>
              </table>
              <h2 className="text-[#001a5f]  font-karla text-lg mt-[23px] font-bold ml-2">
                Returns on success:
              </h2>
              <pre className="text-xs p-[22px] leading-6 bg-gray-200 text-sm  mt-7px overflow-hidden">
                &#123;
                <br />
                "result": &#123;
                <br />
                "orders": [ <br />
                &#123; "id": 5465230180457, <br />
                "admin_graphql_api_id": "gid://shopify/Order/5465230180457",{' '}
                <br />
                "app_id": 3648771, <br />
                "browser_ip": "127.0.0.1", <br />
                "nextOffset": 200, <br />
                "moreOrders": true <br />
                IF moreOrders is true, then call the API again with the
                nextOffset value <br />
                IF moreOrders is false, there are no further orders to fetch.{' '}
                <br />
                Returns on success: <br />
                "result":
                <br />
                &#125; <br />
                "orders": [ <br />
                &#123;
                <br />
                "id": 5465230180457, <br />
                "admin_graphql_api_id": "gid://shopify/Order/5465230180457",{' '}
                <br />
                "app_id": 3648771, <br />
                "browser_ip": "127.0.0.1", <br />
                "buyer_accepts_marketing": true, <br />
                "cancel_reason": "other", <br />
                "cancelled_at": "2023-09-25T22:00:48-07:00", <br />
                "cart_token": null, <br />
                "checkout_id": 29872277979241, <br />
                "checkout_token": "db80c9ab5c816b51384d10177724dca7", <br />
                "client_details": &#123; <br />
                "accept_language": null,
                <br />
                "browser_height": null, <br />
                "browser_ip": "127.0.0.1", <br />
                "browser_width": null, <br />
                "session_hash": null, <br />
                "user_agent": null <br />
                &#125; <br />
                "closed_at": null, &#123;
                <br />
                "confirmed": true, <br />
                "contact_email": "fabprojectmanager@gmail.com", <br />
                "created_at": "2023-09-25T21:39:16-07:00", <br />
                "currency": "USD", <br />
                "current_subtotal_price": "12.95", <br />
                "current_subtotal_price_set":
                <br />
                &#125;
                <br />
                &#123;
                <br />
                "shop_money":
                <br /> &#125; <br />
                &#123;
                <br />
                "amount": "12.95", <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                &#123; <br />
                "presentment_money": &#123; <br />
                "amount": "12.95", <br />
                "currency_code": "USD" <br />
                &#123; &#125; "current_total_discounts": "4.75", <br />
                "current_total_discounts_set" <br />
                &#125; <br />
                "shop_money": &#123; <br />
                "amount": "4.75", <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                "presentment_money": &#123;
                <br />
                "amount": "4.75", <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                &#123;
                <br />
                "current_total_duties_set": null, <br />
                "current_total_price": "12.95", <br />
                "current_total_price_set":
                <br />
                &#125; <br />
                "shop_money": &#123; <br />
                "amount": "12.95", <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                "presentment_money": &#123; <br />
                "amount": "12.95", <br />
                "currency_code": "USD" <br />
                &#125; <br />
                &#123; <br />
                "current_total_tax": "0.00", <br />
                "current_total_tax_set":
                <br />
                &#125; <br />
                "shop_money": &#123;
                <br />
                "amount": "0.00", <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                "presentment_money": &#123;
                <br />
                "amount": "0.00", <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                &#123;
                <br />
                "customer_locale": "en-US", <br />
                "device_id": null, <br />
                "discount_codes": [], <br />
                "email": "fabprojectmanager@gmail.com", <br />
                "estimated_taxes": false, <br />
                "financial_status": "pending", <br />
                "fulfillment_status": "restocked", <br />
                "gateway": "manual", <br />
                "landing_site": null, <br />
                "landing_site_ref": null, <br />
                "location_id": 34513649769, <br />
                "merchant_of_record_app_id": null, <br />
                "name": "#31323", <br />
                "note": null, <br />
                "note_attributes": [], <br />
                "number": 30323, <br />
                "order_number": 31323,
                <br />
                "order_status_url":
                "https://simplynoted.com/27564572777/orders/305b8acc44d846ef3fb89e38d53a7644/authenticate?key=feae732fdbe3984a06bff362dff8b89e",
                <br />
                "original_total_duties_set": null, <br />
                "payment_gateway_names": [ <br />
                "manual" <br />
                ], <br />
                "phone": null, <br />
                "presentment_currency": "USD", <br />
                "processed_at": "2023-09-25T21:39:15-07:00", <br />
                "processing_method": "manual", <br />
                "reference": "c899c33646d351c09ccd4a1f9befad79", <br />
                "referring_site": null,
                <br />
                "source_identifier": "c899c33646d351c09ccd4a1f9befad79", <br />
                "source_name": "3648771", <br />
                "source_url": null, <br />
                "subtotal_price": "12.95", <br />
                "subtotal_price_set":
                <br />
                &#125;
                <br />
                "shop_money": &#123;
                <br />
                "amount": "12.95", <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                "presentment_money":&#123; <br />
                "amount": "12.95", <br />
                "currency_code": "USD" <br />
                &#125; <br />
                &#123; <br />
                "tags": "", <br />
                "tax_lines": [], <br />
                "taxes_included": false, <br />
                "test": false, <br />
                "token": "305b8acc44d846ef3fb89e38d53a7644", <br />
                "total_discounts": "4.75", <br />
                "total_discounts_set":
                <br />
                &#125; <br />
                "shop_money": &#123; <br />
                "amount": "4.75", <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                "presentment_money": &#123; <br />
                "amount": "4.75", <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                &#123;
                <br />
                "total_line_items_price": "17.70", <br />
                "total_line_items_price_set":&#125;
                <br />
                "shop_money": &#123;
                <br />
                "amount": "17.70", <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                "presentment_money": &#123; <br />
                "amount": "17.70", <br />
                "currency_code": "USD" <br />
                &#125; <br />
                &#123;
                <br />
                "total_outstanding": "12.95", <br />
                "total_price": "12.95", <br />
                "total_price_set": &<br />
                "shop_money":
                <br />
                "amount": "12.95", <br />
                "currency_code": "USD
                <br />
                &#125;
                <br />
                &#123;
                <br />
                "presentment_money": &#123; <br />
                "amount": "12.95", <br />
                "currency_code": "USD" <br />
                &#125; <br />
                &#123; <br />
                "total_shipping_price_set": &#123; <br />
                "shop_money": &#123; <br />
                "amount": "0.00", <br />
                "currency_code": "USD" <br />
                &#125; <br />
                "presentment_money": &#123; <br />
                "amount": "0.00", <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                &#123; <br />
                "total_tax": "0.00", <br />
                "total_tax_set": <br />
                "shop_money": <br />
                "amount": "0.00", <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                "presentment_money" &#123; <br />
                "amount": "0.00", <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                &#123;
                <br />
                "total_tip_received": "0.00", <br />
                "total_weight": 0, <br />
                "updated_at": "2023-09-25T22:00:48-07:00", <br />
                "user_id": null, <br />
                "customer":
                <br />
                &#125; <br />
                &#123;
                <br />
                "id": 6232622891113, <br />
                "email": "fabprojectmanager@gmail.com", <br />
                "accepts_marketing": true, <br />
                "created_at": "2023-04-16T01:45:26-07:00", <br />
                "updated_at": "2023-09-26T05:29:21-07:00", <br />
                "first_name": "Pradeep", <br />
                "last_name": "singh", <br />
                "state": "enabled", <br />
                "note": "", <br />
                "verified_email": false, <br />
                "multipass_identifier": null, <br />
                "tax_exempt": false, <br />
                "phone": null, <br />
                "email_marketing_consent":
                <br />
                &#125;
                <br />
                &#123;
                <br />
                "state": "subscribed", <br />
                "opt_in_level": "single_opt_in", <br />
                "consent_updated_at": "2023-04-16T01:45:27-07:00" <br />
                &#125;
                <br />
                &#123;
                <br />
                "sms_marketing_consent": null, <br />
                "tags": "packageper_40, package_250, subscribe_team", <br />
                "currency": "USD", <br />
                "accepts_marketing_updated_at": "2023-04-16T01:45:27-07:00",
                <br />
                "marketing_opt_in_level": "single_opt_in", <br />
                "tax_exemptions": [], <br />
                "admin_graphql_api_id": "gid://shopify/Customer/6232622891113",{' '}
                <br />
                "default_address": &#123; <br />
                "id": 8262169165929,
                <br />
                "customer_id": 6232622891113, <br />
                "first_name": "Hiteshi", <br />
                "last_name": "Sharma",
                <br />
                "company": null, <br />
                "address1": "ewfefwf", <br />
                "address2": null, <br />
                "city": "wwwwew",
                <br />
                "province": "Florida",
                <br />
                "country": "United States", <br />
                "zip": "32030", <br />
                "phone": null, <br />
                "name": "Hiteshi Sharma", <br />
                "province_code": "FL",
                <br />
                "country_code": "US", <br />
                "country_name": "United States", <br />
                "default": true <br />
                &#125;
                <br />
                &#123;
                <br />
                "discount_applications": [ <br />
                "target_type": "line_item", <br />
                "type": "manual",
                <br />
                "value": "3.25",
                <br />
                "value_type": "fixed_amount",
                <br />
                "allocation_method": "each",
                <br />
                "target_selection": "explicit",
                <br />
                "title": "Free",
                <br />
                "description": "Custom discount"
                <br />
                &#125;
                <br />
                &#123;
                <br />
                "target_type": "line_item",
                <br />
                "type": "manual", <br />
                "value": "3.25", <br />
                "value_type": "fixed_amount", <br />
                "allocation_method": "each",
                <br />
                "target_selection": "explicit", <br />
                "title": "Free", <br />
                "description": "Custom discount" <br />
                ],
                <br />
                &#125; "fulfillments": [], <br />
                "line_items": [ <br />
                &#123; "id": 13453403390057,
                <br />
                "admin_graphql_api_id": "gid://shopify/LineItem/13453403390057",
                <br />
                "fulfillable_quantity": 1,
                <br />
                "fulfillment_service": "manual", <br />
                "fulfillment_status": "restocked", <br />
                "gift_card": false,
                <br />
                "grams": 0,
                <br />
                "name": "Hello! - 1 -99", <br />
                "price": "3.25", <br />
                "price_set":
                <br />
                &#125;
                <br />
                "shop_money": &#123;
                <br />
                "amount": "3.25", <br />
                "currency_code": "USD" <br />
                &#123;
                <br />
                "presentment_money":
                <br />
                "amount": "3.25", <br />
                "currency_code": "USD" <br />
                &#123;
                <br />
                "product_exists": true, <br />
                "product_id": 4372540522601, <br />
                "properties": [ <br />
                &#125; <br />
                "name": "custom_message", <br />
                "value": "644d0a0c30f2731dc68f7ec0" <br />
                &#125; <br />
                &#123; <br />
                "name": "font_selection", <br />
                "value": "Tarzan" <br />
                &#125;
                <br />
                &#123;
                <br />
                "name": "recipient_upload", <br />
                "value":
                "https://simply-noted-recipients.s3.amazonaws.com/643bb5a900870f1f2478dc69_1695703154110.csv"{' '}
                <br />
                &#123;
                <br />
                "name": "sender_fullName", <br />
                "value": "John Doe"
                <br />
                &#125;
                <br />
                &#123;
                <br />
                "name": "sender_address1", <br />
                "value": "123 Main St" <br />
                &#125; <br />
                &#123; <br />
                "name": "sender_address2", <br />
                "value": "Apt 101" <br />
                &#125;
                <br />
                &#123;
                <br />
                "name": "sender_city",
                <br />
                "value": "New York" <br />
                &#125;
                <br /> &#123;
                <br />
                "name": "sender_state",
                <br />
                "value": "NY" <br />
                &#125;
                <br />
                &#123;
                <br />
                "name": "sender_zip",
                <br />
                "value": "10001" <br />
                &#125;
                <br />
                &#123;
                <br />
                "name": "sender_country",
                <br />
                "value": "USA" <br />
                &#125;
                <br />
                &#123;
                <br />
                "name": "recipient_fullName", <br />
                "value": "Er. Toshita" <br />
                &#125;
                <br />
                &#123;
                <br />
                "name": "recipient_businessName", <br />
                "value": "test" <br />
                &#125;
                <br />
                &#123;
                <br />
                "name": "recipient_address1", <br />
                "value": "test" <br />
                &#125; <br />
                &#123;
                <br />
                "name": "recipient_address2", <br />
                "value": "test" <br />
                &#125;
                <br />
                &#123;
                <br />
                "name": "recipient_city", <br />
                "value": "test" <br />
                &#125;
                <br />
                &#123; <br />
                "name": "recipient_state", <br />
                "value": "J&K" <br />
                &#125; <br />
                &#123;
                <br />
                "name": "recipient_zip", <br />
                "value": "111111" <br />
                &#125;
                <br />
                &#123;
                <br />
                "name": "recipient_country", <br />
                "value": "India" <br />
                &#125; <br />
                &#123;
                <br />
                "name": "custom_pdf", <br />
                "value": "Not Applicable" <br />
                &#125; <br />
                &#123;
                <br />
                "quantity": 1, "requires_shipping": false, "sku": null,
                "taxable": false, "title": "Hello!", "total_discount": "3.25",
                "total_discount_set": &#125;
                <br />
                &#123;
                <br />
                "shop_money": "amount": "3.25", "currency_code": "USD" &#125;{' '}
                <br />
                &#123;
                <br />
                "presentment_money": "amount": "3.25", "currency_code": "USD"
                <br />
                &#125; &#123;
                <br />
                "variant_id": 40699956887657, "variant_inventory_management":
                null, "variant_title": "1 -99", "vendor": "SimplyNoted",
                "tax_lines": [], "duties": [], "discount_allocations": &#125;
                <br />
                [<br />
                &#123;
                <br />
                "amount": "3.25", "amount_set": &#125;
                <br />
                &#123;
                <br />
                "shop_money":
                <br />
                &#123;
                <br />
                "amount": "3.25", "currency_code": "USD" <br />
                &#125;
                <br />
                &#123;
                <br />
                "presentment_money":
                <br />
                &#123;
                <br />
                "amount": "3.25", "currency_code": "USD"
                <br />
                &#125;
                <br />
                &#123;
                <br />
                "discount_application_index": 0 &#125;
                <br />
                ] <br />
                &#123;
                <br />
                "id": 13453403422825, <br />
                "admin_graphql_api_id": "gid://shopify/LineItem/13453403422825",{' '}
                <br />
                "fulfillable_quantity": 1, <br />
                "fulfillment_service": "manual", <br />
                "fulfillment_status": "restocked", <br />
                "gift_card": false, <br />
                "grams": 0, <br />
                "name": "Postage - Non-US", <br />
                "price": "1.50", <br />
                "price_set":
                <br />
                &#123; <br />
                "shop_money":
                <br /> &#125; <br />
                "amount": "1.50", <br />
                "currency_code": "USD" <br />
                &#123;
                <br />
                "presentment_money": &#123;
                <br />
                "amount": "1.50", <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                &#125;
                <br />
                &#123;
                <br />
                "product_exists": true, <br />
                "product_id": 7032044912745, <br />
                "properties": [], <br />
                "quantity": 1, <br />
                "requires_shipping": true, <br />
                "sku": "", <br />
                "taxable": true, <br />
                "title": "Postage", <br />
                "total_discount": "1.50", <br />
                "total_discount_set":
                <br />
                &125;
                <br />
                "shop_money":&123;
                <br />
                "amount": "1.50",
                <br />
                "currency_code": "USD" <br />
                &125;
                <br />
                "presentment_money":&123;
                <br />
                "amount": "1.50", <br />
                "currency_code": "USD" <br />
                &125;
                <br />
                &123;
                <br />
                "variant_id": 40677547802729, <br />
                "variant_inventory_management": null, <br />
                "variant_title": "Non-US", <br />
                "vendor": "simply-noted", <br />
                "tax_lines": [], <br />
                "duties": [], <br />
                "discount_allocations": [ <br />
                &125;
                <br />
                &123;
                <br />
                "amount": "1.50", <br />
                "amount_set": &#123;
                <br />
                "shop_money":&#125; <br />
                &123;
                <br />
                "amount": "1.50",
                <br />
                "currency_code": "USD" v<br />
                &3125;
                <br />
                "presentment_money":&#123;
                <br />
                "amount": "1.50",
                <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                &#123; "discount_application_index": 1 <br />
                &#125; ] <br />
                &#123; <br />
                "id": 13453403455593, <br />
                "admin_graphql_api_id": "gid://shopify/LineItem/13453403455593",{' '}
                <br />
                "fulfillable_quantity": 1, <br />
                "fulfillment_service": "manual", <br />
                "fulfillment_status": "restocked", <br />
                "gift_card": false, <br />
                "grams": 0, <br />
                "name": "Amazon Gift Card - $10 for $12.95", <br />
                "price": "12.95", <br />
                "price_set": &#123;
                <br />
                "shop_money":&#123;
                <br />
                "amount": "12.95", <br />
                "currency_code": "USD"
                <br />
                &#125;
                <br />
                "presentment_money":
                <br />
                &#123;
                <br />
                "amount": "12.95", <br />
                "currency_code": "USD" <br />
                &#125;
                <br />
                &#123; "product_exists": true, <br />
                "product_id": 6661817729129, <br />
                "properties": [ <br />
                &#125;
                <br />
              </pre>
            </div>
          )}
          {selectedSection === 'TEMPLATES' && (
            <div>
              <h2 className="text-[#001a5f] font-karla text-lg  font-bold ml-2">
                <span className="text-blue-500">6.</span> TEMPLATES
              </h2>
            </div>
          )}
          {selectedSection === 'Create A Message Template' && (
            <div>
              <div>
                <h2 className="text-[#001a5f]  font-karla text-lg  font-bold ml-2">
                  <span className="text-blue-500"> 6.1.</span>Create A Message
                  Template
                </h2>
                <div className="leading-[1.5rem] mt-[21px] ml-[9px]">
                  <p className="text-xs">
                    <b>Description:</b> This endpoint creates a Template. If any
                    required properties are missing an error will be returned.
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Endpoint:</b> /templates
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Method:</b>POST
                  </p>
                </div>
              </div>
              <h2 className="font-karla  text-lg mt-[13px] font-bold ml-2">
                Headers:
              </h2>
              <table class="w-2/4  text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">Content-Type</td>
                    <td class="border p-4">application/json </td>
                    <td class="border p-4">Yes</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Authorization</td>
                    <td class="border p-4">Bearer TOKEN_HERE</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                  Body:
                </h2>
                <table class="w-2/4  text-sm table-auto">
                  <thead>
                    <tr>
                      <td class="border p-4">Key</td>
                      <td class="border p-4">Type</td>
                      <td class="border p-4">Required?</td>
                      <td class="border p-4">Example</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border p-4">productId</td>
                      <td class="border p-4">String</td>
                      <td class="border p-4">Yes</td>
                      <td class="border p-4">"4392452522089"</td>
                    </tr>
                    <tr>
                      <td class="border p-4">handwritingStyle </td>
                      <td class="border p-4">String</td>
                      <td class="border p-4">Yes</td>
                      <td class="border p-4">"Tarzan"</td>
                    </tr>
                    <tr>
                      <td class="border p-4">customMessage </td>
                      <td class="border p-4">String</td>
                      <td class="border p-4">Yes</td>
                      <td class="border p-4">"This is my custom message"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                  Returns on success:
                </h2>
                <pre className="text-sm leading-6	 bg-gray-200 p-[22px] overflow-hidden">
                  &#123;
                  <br />
                  "result": &#123;
                  <br />
                  "_id": "5e1b61a80d9234514cb1e983a",
                  <br />
                  "productId": "4460979552361",
                  <br />
                  "handwritingStyle": "Tarzan",
                  <br />
                  "customMessage": "This is my custom message",
                  <br />
                  "ownerId": "5e1a6f1d63458234017a962a3",
                  <br />
                  "updated": "2020-01-01T00:00:00.000Z",
                  <br />
                  "created": "2020-01-01T00:00:00.000Z",
                  <br />
                  "__v": 0<br />
                  &#125;
                  <br />
                  "errors": []
                  <br />
                  &#125v;
                </pre>
              </div>
              <div>
                <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                  Example:
                </h2>
                <pre className="text-sm leading-6	  bg-gray-200 p-[22px] overflow-hidden">
                  &#123; <br />"productId": "4460979552361",
                  <br /> "handwritingStyle": "Tarzan",
                  <br /> "customMessage": "This is my custom message"
                  <br />
                  &#125v;
                </pre>
              </div>
            </div>
          )}
          {selectedSection === 'Retrieve All Message Templates' && (
            <div>
              <div>
                <h2 className="text-[#001a5f] font-karla text-lg  font-bold ml-2">
                  <span className="text-blue-500">6.2.</span>Retrieve All
                  Message Templates
                </h2>
                <div className="leading-[1.5rem] mt-[21px] ml-[9px]">
                  <p className="text-xs">
                    <b>Description:</b> This endpoint gets all Message
                    Templates.
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Endpoint:</b> /templates
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Method:</b> GET
                  </p>
                </div>

                <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                  Headers:
                </h2>
                <table class="w-2/4  text-sm table-auto">
                  <thead>
                    <tr>
                      <td class="border p-4">Name</td>
                      <td class="border p-4">Value</td>
                      <td class="border p-4">Required?</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border p-4">Content-Type</td>
                      <td class="border p-4">application/json </td>
                      <td class="border p-4">Yes</td>
                    </tr>
                    <tr>
                      <td class="border p-4">Authorization</td>
                      <td class="border p-4">Bearer TOKEN_HERE </td>
                      <td class="border p-4">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                  Returns on success:
                </h2>
                <pre className="text-xs leading-6	 text-sm bg-gray-200 p-[22px] overflow-hidden">
                  &#123;
                  <br />
                  "result": [<br />
                  &#123;
                  <br />
                  "_id": "5e1b5123fe1a7f10021c2b04",
                  <br />
                  "productId": "4460979552361",
                  <br />
                  "handwritingStyle": "Tarzan",
                  <br />
                  "customMessage": "This is my custom message",
                  <br />
                  "ownerId": "5e1a6f1d616d871237a962a3",
                  <br />
                  "updated": "2020-01-12T18:00:25.020Z",
                  <br />
                  "created": "2020-01-12T18:00:25.020Z",
                  <br />
                  "__v": 0<br />
                  &#125;
                  <br />
                  &#123;
                  <br />
                  "_id": "5e1b61a80d92f711231e983a",
                  <br />
                  "productId": "4460979552361",
                  <br />
                  "handwritingStyle": "Tarzan",
                  <br />
                  "customMessage": "This is my custom message 2",
                  <br />
                  "ownerId": "5e1a6f1d616d871237a962a3",
                  <br />
                  "updated": "2020-01-12T18:12:56.945Z",
                  <br />
                  "created": "2020-01-12T18:12:56.945Z",
                  <br />
                  "__v": 0<br />
                  &#125;
                  <br />
                  ], "errors": []
                  <br />
                  &#125;
                  <br />
                </pre>
              </div>
            </div>
          )}
          {selectedSection === 'Retrieve A Single Template' && (
            <div>
              <div>
                <h2 className="text-[#001a5f]  font-karla text-lg  font-bold ml-2">
                  <span className="text-blue-500"> 6.3.</span> Retrieve A Single
                  Template
                </h2>
                <div className="leading-[1.5rem] mt-[21px] ml-[9px]">
                  <p className="text-xs">
                    <b>Description:</b> This endpoint gets a single Template.
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Endpoint:</b>/templates/:templateId
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Method:</b>GET
                  </p>
                </div>
              </div>
              <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                Headers:
              </h2>
              <table class="w-2/4 text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">Content-Type</td>
                    <td class="border p-4">application/json</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Authorization</td>
                    <td class="border p-4">Bearer TOKEN_HERE</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                </tbody>
              </table>
              <h2 className="font-karla  mt-[13px] font-bold ml-2">
                URL Parameters:
              </h2>
              <table class="w-2/4 text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Parameter</td>
                    <td class="border p-4">Type</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">templateId</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"5e1b5123fe1a7f10021c2b04"</td>
                  </tr>
                </tbody>
              </table>
              <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                Returns on success:
              </h2>
              <pre className="text-sm leading-6	 bg-gray-200 p-[22px] overflow-hidden">
                &#123;
                <br />
                "result": &#123;
                <br />
                "_id": "5e1b5123fe1a7f10021c2b04",
                <br />
                "productId": "4460979552361",
                <br />
                "handwritingStyle": "Tarzan",
                <br />
                "customMessage": "This is my custom message",
                <br />
                "ownerId": "5e1a6f1d616d871237a962a3",
                <br />
                "updated": "2020-01-12T18:00:25.020Z",
                <br />
                "created": "2020-01-12T18:00:25.020Z",
                <br />
                "__v": 0<br />
                &#125;
              </pre>
            </div>
          )}
          {selectedSection === 'Update A Template' && (
            <div>
              <div>
                <h2 className="text-[#001a5f] text-lg  font-karla text-lg  font-bold ml-2">
                  <span className="text-blue-500"> 6.4.</span> Update A Template
                </h2>
                <div className="leading-[1.5rem] text-sm mt-[21px] ml-[9px]">
                  <p className="text-xs">
                    <b>Description:</b> This endpoint updates a Template. If any
                    required properties are missing an error will be returned
                  </p>
                  <p className="text-sm mt-[8px]">
                    <b>Endpoint:</b>/templates/:templateId
                  </p>
                  <p className="text-sm mt-[8px]">
                    <b>Method:</b>PUT
                  </p>
                </div>
              </div>
              <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                Headers:
              </h2>
              <table class="w-2/4 text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">Content-Type </td>
                    <td class="border p-4">application/json </td>
                    <td class="border p-4">Yes</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Authorization</td>
                    <td class="border p-4">Bearer TOKEN_HERE</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                </tbody>
              </table>
              <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                URL Parameters:
              </h2>
              <table class="w-2/4 text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Parameter</td>
                    <td class="border p-4">Type</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">templateId</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"5e1b5123fe1a7f10021c2b04"</td>
                  </tr>
                </tbody>
              </table>
              <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                Body:
              </h2>
              <table class="w-2/4 text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Key</td>
                    <td class="border p-4">Type</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">productId</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"4392452522089"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">handwritingStyle</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Stitch"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">customMessage</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"This is my custom message"</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                  Returns on success:
                </h2>
                <pre className="text-sm leading-6	 bg-gray-200 p-[22px] overflow-hidden">
                  &#123;
                  <br />
                  "result":&#123;
                  <br />
                  "productId": "4392452522089",
                  <br />
                  "handwritingStyle": "Stitch",
                  <br />
                  "customMessage": "This is my custom message"
                  <br />
                  &#125;
                  <br />
                  "errors": []
                  <br />
                  &#125;
                </pre>
              </div>
              <div>
                <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                  Example:
                </h2>
                <pre className="text-sm leading-6	 bg-gray-200 p-[22px] overflow-hidden">
                  &#123; "productId": "4392452522089",
                  <br /> "handwritingStyle": "Stitch",
                  <br /> "customMessage": "This is my custom message"
                  <br /> &#125;
                </pre>
              </div>
            </div>
          )}
          {selectedSection === 'ADDRESSES' && (
            <div>
              <h2 className="text-[#001a5f]  font-karla text-lg  font-bold ml-2">
                <span className="text-blue-500">7.</span>ADDRESSES
              </h2>
            </div>
          )}
          {selectedSection === 'Create An Address' && (
            <div>
              <div>
                <h2 className="text-[#001a5f]  font-karla text-lg font-bold ml-2">
                  <span className="text-blue-500">7.1.</span>Create An Address
                </h2>
                <div className="leading-[1.5rem] mt-[21px] ml-[9px]">
                  <p className="text-xs">
                    <b>Description:</b>This endpoint creates an Address. If any
                    required properties are missing an error will be returned.
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Endpoint:</b>/addresses
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Method:</b>POST
                  </p>
                </div>
              </div>
              <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                Example:
              </h2>
              <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                Headers:
              </h2>
              <table class="w-2/4 text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">Content-Type </td>
                    <td class="border p-4">application/json </td>
                    <td class="border p-4">Yes</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Authorization</td>
                    <td class="border p-4">Bearer TOKEN_HERE</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                </tbody>
              </table>
              <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                Headers:
              </h2>
              <table class="w-2/4 text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Key</td>
                    <td class="border p-4">Type</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">firstName</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Johnny"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">lastName</td>
                    <td class="border p-4">String </td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Appleseed"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Authorization</td>
                    <td class="border p-4">Bearer TOKEN_HERE</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Appleseed"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">businessName</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"ACME Inc"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">address1</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"123 S Maple Street"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">address2 </td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4"> "Unit 123"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">city</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Metropolis"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">state</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Texas"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">zip</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"12345"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">country</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"United States"</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                  Returns on success:
                </h2>
                <pre className="text-sm leading-6	 bg-gray-200 p-[22px] overflow-hidden">
                  &#123;
                  <br />
                  "result": &#123;
                  <br />
                  "_id": "5ea1101e9680607558e3ff77",
                  <br />
                  "firstName": "Johnny",
                  <br />
                  "lastName": "Appleseed",
                  <br />
                  "businessName": "ACME Inc",
                  <br />
                  "address1": "123 S Maple Street",
                  <br />
                  "address2": "Unit 123",
                  <br />
                  "city": "Metropolis",
                  <br />
                  "state": "Texas",
                  <br />
                  "zip": "12345",
                  <br />
                  "country": "United States",
                  <br />
                  "type": "return"
                  <br />
                  &#125;<br />
                  &#125;
                </pre>
              </div>
              <div>
                <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                  Example:
                </h2>
                <pre className="text-sm leading-6	  bg-gray-200 p-[22px] overflow-hidden">
                  &#123; "firstName": "Johnny",
                  <br />
                  "lastName": "Appleseed",
                  <br />
                  "businessName": "ACME Inc",
                  <br />
                  "address1": "123 S Maple Street",
                  <br />
                  "address2": "Unit 123",
                  <br />
                  "city": "Metropolis",
                  <br />
                  "state": "Texas",
                  <br />
                  "zip": "12345",
                  <br />
                  "country": "United States",
                  <br />
                  "type": "return"
                  <br />
                  &#125;
                </pre>
              </div>
            </div>
          )}
          {selectedSection === 'Retrieve All Addresses' && (
            <div>
              <div>
                <h2 className="text-[#001a5f]  font-karla text-lg  font-bold ml-2">
                  <span className="text-blue-500">7.2.</span> Retrieve All
                  Addresses
                </h2>
                <div className="leading-[1.5rem] text-xs mt-[21px] ml-[9px]">
                  <p className="text-xs">
                    <b>Description:</b>This endpoint gets all Addresses.
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Endpoint:</b>/addresses
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Method:</b>GET
                  </p>
                </div>
                <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                  Example:
                </h2>
                <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                  Headers:
                </h2>
                <table class="w-2/4 text-sm table-auto">
                  <thead>
                    <tr>
                      <td class="border p-4">Name</td>
                      <td class="border p-4">Value</td>
                      <td class="border p-4">Required?</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border p-4">Content-Type </td>
                      <td class="border p-4">application/json</td>
                      <td class="border p-4">Yes</td>
                    </tr>
                    <tr>
                      <td class="border p-4">Authorization</td>
                      <td class="border p-4">Bearer TOKEN_HERE</td>
                      <td class="border p-4">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                Example:
              </h2>
              <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                URL Parameters:
              </h2>
              <table class="w-2/4 text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Parameter</td>
                    <td class="border p-4">Type</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">type</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">"return" OR "recipient"</td>
                    <td class="border p-4">No</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                  Returns on success:
                </h2>
                <pre className="text-sm leading-6	 bg-gray-200 p-[22px] overflow-hidden">
                  &#123;
                  <br />
                  "result": [<br />
                  &#123;
                  <br />
                  "_id": "5ea1101e9680607558e3ff77",
                  <br />
                  "firstName": "Johnny",
                  <br />
                  "lastName": "Appleseed",
                  <br />
                  "businessName": "ACME Inc",
                  <br />
                  "address1": "123 S Maple Street",
                  <br />
                  "address2": "Unit 123",
                  <br />
                  "city": "Metropolis",
                  <br />
                  "state": "Texas",
                  <br />
                  "zip": "12345",
                  <br />
                  "country": "United States",
                  <br />
                  "type": "return"
                  <br />
                  &#125; ],
                  <br />
                  "errors":
                  <br />
                  &#125;
                </pre>
              </div>
            </div>
          )}
          {selectedSection === 'Retrieve A Single Address' && (
            <div>
              <div>
                <h2 className="text-[#001a5f]  font-karla text-lg  font-bold ml-2">
                  <span className="text-blue-500"> 7.3. </span>Retrieve A Single
                  Address
                </h2>
                <div className="leading-[1.5rem] mt-[21px] ml-[9px]">
                  <p className="text-xs">
                    <b>Description:</b> This endpoint gets a single Template.
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Endpoint:</b>/templates/:templateId
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Method:</b>GET
                  </p>
                </div>
              </div>
              <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                Headers:
              </h2>
              <table class="w-2/4 text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">Content-Type</td>
                    <td class="border p-4">application/json</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                  <tr>
                    <td class="border p-4">Authorization</td>
                    <td class="border p-4">Bearer TOKEN_HERE</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                </tbody>
              </table>
              <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                URL Parameters:
              </h2>
              <table class="w-2/4 text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Parameter</td>
                    <td class="border p-4">Type</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">addressId</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"5ea1101e9680607558e3ff77"</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                  Returns on success:
                </h2>
                <pre className="text-sm leading-6	 bg-gray-200 p-[22px] overflow-hidden">
                  &#123;
                  <br />
                  "result": &#123;
                  <br />
                  "_id": "5ea1101e9680607558e3ff77",
                  <br />
                  "firstName": "Johnny",
                  <br />
                  "lastName": "Appleseed",
                  <br />
                  "businessName": "ACME Inc",
                  <br />
                  "address1": "123 S Maple Street",
                  <br />
                  "address2": "Unit 123",
                  <br />
                  "city": "Metropolis",
                  <br />
                  "state": "Texas",
                  <br />
                  "zip": "12345",
                  <br />
                  "country": "United States",
                  <br />
                  "type": "return"
                  <br />
                  &#125;
                  <br />
                  "errors": []
                  <br />
                  &#125;
                </pre>
              </div>
            </div>
          )}
          {selectedSection === 'Update A Address' && (
            <div>
              {' '}
              <div>
                <h2 className="text-[#001a5f]  font-karla text-lg  font-bold ml-2">
                  <span className="text-blue-500">7.4. </span>Update An Address
                </h2>
                <div className="leading-[1.5rem] mt-[21px] ml-[9px]">
                  <p className="text-xs">
                    <b>Description:</b> This endpoint updates an address. If any
                    required properties are missing an error will be returned.
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Endpoint:</b>/addresses/:addressId
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Method:</b>PUT
                  </p>
                </div>
                <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                  Headers:
                </h2>
                <table class="w-2/4 text-sm table-auto">
                  <thead>
                    <tr>
                      <td class="border p-4">Name</td>
                      <td class="border p-4">Value</td>
                      <td class="border p-4">Required?</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border p-4">Content-Type </td>
                      <td class="border p-4">application/json </td>
                      <td class="border p-4">Yes</td>
                    </tr>
                    <tr>
                      <td class="border p-4">Authorization</td>
                      <td class="border p-4">Bearer TOKEN_HERE</td>
                      <td class="border p-4">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                URL Parameters:
              </h2>
              <table class="w-2/4 text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Parameter</td>
                    <td class="border p-4">Type</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">addressId</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"5ea1101e9680607558e3ff77"</td>
                  </tr>
                </tbody>
              </table>
              <h2 className="font-karla  mt-[13px] font-bold ml-2">Body:</h2>
              <table class="w-2/4 text-xs table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Key</td>
                    <td class="border p-4">Type</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">firstName</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Johnny"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">lastName</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Appleseed"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">businessName </td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">No</td>
                    <td class="border p-4">"ACME Inc"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">addressId</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"123 S Maple Street"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">addressId</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Unit 123"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">city</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Metropolis"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">state</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"Texas"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">zip</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"12345"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">country</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"United States"</td>
                  </tr>
                  <tr>
                    <td class="border p-4">type</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4"> "recipient" OR "return"</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                  Returns on success:
                </h2>
                <pre className="text-sm leading-6	 bg-gray-200 p-[22px] overflow-hidden">
                  &#123; <br />"result":<br /> &#123;
                  <br />
                  "_id": "5ea1101e9680607558e3ff77",
                  <br />
                  "firstName": "Johnny",
                  <br />
                  "lastName": "Appleseed",
                  <br />
                  "businessName": "ACME Inc",
                  <br />
                  "address1": "123 S Maple Street",
                  <br />
                  "address2": "Unit 123",
                  <br />
                  "city": "Metropolis",
                  <br />
                  "state": "Texas",
                  <br />
                  "zip": "12345",
                  <br />
                  "country": "United States",
                  <br />
                  "type": "return"
                  <br />
                  &#125;<br /> "errors": <br/>[]
                  <br />
                  &#125;
                </pre>
              </div>
              <div>
                <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                  Example:
                </h2>
                <pre className="text-sm leading-6	 bg-gray-200 p-[22px] overflow-hidden">
                  &#123; <br />"firstName":<br /> "Johnny",
                  <br />
                  "lastName": "Appleseed",
                  <br />
                  "businessName": "ACME Inc",
                  <br />
                  "address1": "123 S Maple Street",
                  <br />
                  "address2": "Unit 123",
                  <br />
                  "city": "Metropolis",
                  <br />
                  "state": "Texas",
                  <br />
                  "zip": "12345",
                  <br />
                  "country": "United States",
                  <br />
                  "type": "return"
                  <br />
                  &#125;
                </pre>
              </div>
            </div>
          )}
          {selectedSection === 'Delete A Single Address' && (
            <div>
              <div>
                <h2 className="text-[#001a5f]   font-karla text-lg  font-bold ml-2">
                  <span className="text-blue-500">7.5.</span> Delete A Single
                  Address
                </h2>
                <div className="leading-[1.5rem] mt-[21px] ml-[9px]">
                  <p className="text-xs">
                    <b>Description:</b> This endpoint gets a single Template.
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Endpoint:</b>/addresses/:addressId
                  </p>
                  <p className="text-xs mt-[8px]">
                    <b>Method:</b>DELETE
                  </p>
                </div>
              </div>
              <h2 className="font-karla  mt-[13px] font-bold ml-2">Headers:</h2>
              <table class="w-2/4 text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Name</td>
                    <td class="border p-4">Value</td>
                    <td class="border p-4">Required?</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">Content-Type</td>
                    <td class="border p-4">application/json</td>
                    <td class="border p-4">Yes</td>
                  </tr>
                </tbody>
              </table>
              <h2 className="font-karla text-lg mt-[13px] font-bold ml-2">
                URL Parameters:
              </h2>
              <table class="w-2/4 text-sm table-auto">
                <thead>
                  <tr>
                    <td class="border p-4">Parameter</td>
                    <td class="border p-4">Type</td>
                    <td class="border p-4">Required?</td>
                    <td class="border p-4">Example</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border p-4">addressId</td>
                    <td class="border p-4">String</td>
                    <td class="border p-4">Yes</td>
                    <td class="border p-4">"5ea1101e9680607558e3ff77"</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h2 className="font-karla text-lg  mt-[13px] font-bold ml-2">
                  Returns on success:
                </h2>
                <pre className="text-sm leading-6	  bg-gray-200 p-[22px] overflow-hidden">
                  &#123;
                  <br />
                  "result": &#123;
                  <br />
                  "deletedCount": 1<br />
                  &#125;
                  <br />
                  "errors": []
                  <br />
                  &#125;
                </pre>
              </div>
            </div>
          )}
          {selectedSection === 'AVAILABLE HANDWRITING STYLES' && (
            <div>
              <h3 className="">
                <span className="font-italic text-lg text-blue-500">8</span>{' '}
                AVAILABLE HANDWRITING STYLES
              </h3>
            </div>
          )}
          {selectedSection === 'Examples' && (
            <div class="">
              <h3 className="text-lg">
                <span className="font-italic text-blue-500">8.1.</span> Examples
              </h3>
              <p className="mt-[7px] font-thin">
                <strong>Description:</strong> Below you can preview the
                available handwriting styles that can be leveraged by the API.
              </p>
              <p className="mt-[7px]">
                <strong>Tarzan:</strong>
              </p>
              <p className="Tarzan text-[77px] font-tarzan">
                The quick brown fox jumps over the lazy dog
              </p>
              <p>
                <strong>Stitch:</strong>
              </p>
              <p className="Stitch  text-[67px] font-stitch">
                The quick brown fox jumps over the lazy dog
              </p>
              <p>
                <strong>Pinocchio:</strong>
              </p>
              <p className="Pinocchio text-[28px] font-pinocchio">
                The quick brown fox jumps over the lazy dog
              </p>
              <p>
                <strong>Simba:</strong>
              </p>
              <p className="Simba text-[76px] font-simba">
                The quick brown fox jumps over the lazy dog
              </p>
              <p>
                <strong>Roo:</strong>
              </p>
              <p className="Roo text-[37px] font-roo">
                The quick brown fox jumps over the lazy dog
              </p>
              <p>
                <strong>Nemo:</strong>
              </p>
              <p className="Nemo text-[41px] font-nemo">
                The quick brown fox jumps over the lazy dog
              </p>
              <p>
                <strong>Lumiere:</strong>
              </p>
              <p className="Lumiere text-[84px] font-lumiere">
                The quick brown fox jumps over the lazy dog
              </p>
              <p>
                <strong>Kaa:</strong>
              </p>
              <p className="Kaa text-[44px] font-kaa">
                The quick brown fox jumps over the lazy dog
              </p>
              <p>
                <strong>Dumbo:</strong>
              </p>
              <p className="Dumbo text-[80px] font-dumbo">
                The quick brown fox jumps over the lazy dog
              </p>
              <p>
                <strong>Bolt:</strong>
              </p>
              <p className="Bolt  text-[41px] font-bolt">
                The quick brown fox jumps over the lazy dog
              </p>
              <p>
                <strong>Belle:</strong>
              </p>
              <p className="Belle text-[110px] font-belle">
                The quick brown fox jumps over the lazy dog
              </p>
              <p>
                <strong>Cinderella:</strong>
              </p>
              <p className="Cinderella text-[82px] font-cinderella">
                The quick brown fox jumps over the lazy dog
              </p>
              <p>
                <strong>Hercules:</strong>
              </p>
              <p className="Hercules text-[100px] font-hercules">
                The quick brown fox jumps over the lazy dog
              </p>
              <p>
                <strong>Merlin:</strong>
              </p>
              <p className="Merlin text-[51px] font-merlin">
                The quick brown fox jumps over the lazy dog
              </p>
              <p>
                <strong>Rapunzel:</strong>
              </p>
              <p className="Rapunzel text-[80px] font-rapunzel">
                The quick brown fox jumps over the lazy dog
              </p>
              <p>
                <strong>Scar:</strong>
              </p>
              <p className="Scar text-[65px] font-scar">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default apidocs;
