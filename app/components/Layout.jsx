import {
  useParams,
  Form,
  Await,
  useMatches,
  useNavigate,
  useLocation,
} from '@remix-run/react';
import { useState, useRef, Suspense, useEffect, useMemo } from 'react';
import { useWindowScroll } from 'react-use';
import { Disclosure } from '@headlessui/react';
import { CartForm } from '@shopify/hydrogen';
import footerlogo from '../../assets/Image/logo-footer.webp';
import linkdin from '../../assets/Image/Linkdin.svg';
import fb from '../../assets/Image/fb.png';
import twitter from '../../assets/Image/twitter.png';
import DynamicButton from './DynamicButton';
import top from '../../assets/Image/upward-arrow.png';
import Swipers from './home/Swipers';
import Card from '~/components/home/Card';
import arrow_rights from '../../assets/Image/arrow-right-faq.png';
import arrow_down from '../../assets/Image/arrow-down.png';
import nav_logo from '../../assets/Image/simply-noted-navlogo.avif';
import { IoIosArrowDown } from 'react-icons/io';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { AnimatePresence, motion } from 'framer-motion';

import {
  Drawer,
  useDrawer,
  Text,
  Input,
  IconLogin,
  IconAccount,
  IconBag,
  IconSearch,
  Heading,
  IconMenu,
  IconCaret,
  Section,
  CountrySelector,
  Cart,
  CartLoading,
  Link,
} from '~/components';
import { useIsHomePath } from '~/lib/utils';
import { useIsHydrated } from '~/hooks/useIsHydrated';
import { useCartFetchers } from '~/hooks/useCartFetchers';
import LoginModal from './modal/LoginModal';
import { useStateContext } from '../context/StateContext';
import CircularLoader from './CircularLoder';
import Breadcrumbs from './Breadcrumbs';
import CartItems from './CartItems';
import { FaArrowLeft } from 'react-icons/fa';

export function Layout({ children, layout, isLoggedIn }) {
  const { headerMenu, footerMenu } = layout;

  let storedCustomerId;
  useEffect(() => {
    storedCustomerId = localStorage.getItem('customerId');
  }, []);


  return (
    <>
      <CartItems id={storedCustomerId} />
      <div className="flex flex-col  w-full">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        {headerMenu && <Header isLoggedIn={isLoggedIn} title={layout.shop.name} menu={headerMenu} />}
        <main role="main" id="mainContent" className="flex-grow">
          {children}
        </main>
      </div>
      <Swipers />
      <Card />
      {footerMenu && <Footer menu={footerMenu} />}
    </>
  );
}

function Header({ title, menu, isLoggedIn }) {
  const isHome = useIsHomePath();

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);

  const pathname = useLocation();

  useEffect(() => {
    let aa = localStorage.getItem('cartCount');
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  useEffect(() => {
    localStorage.removeItem('previousPage');
  }, []);

  const {
    productshow,
    accountTabName,
    walletPlan,
    isCardTypeSelectionPage,
    walletPurchase,
    walletPayment,
  } = useStateContext();

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader
        isHome={isHome}
        isLoggedIn={isLoggedIn}
        title={
          <div>
            <img src={nav_logo} />
          </div>
        }
        menu={menu}
        openCart={openCart}
      />

      <MobileHeader
        isHome={isHome}
        isLoggedIn={isLoggedIn}
        title={
          <div style={{ minWidth: '140px' }}>
            <img
              className="max-w-full"
              src={nav_logo}
              style={{ margin: '13px 20px 0 0px' }}
            />
          </div>
        }
        openCart={openCart}
        openMenu={openMenu}
      />
      <div className="max-w-full md:px-[40px] px-[20px] w-full  sm:pt-[5px]  pt-[25px]">
        {pathname.pathname !== '/' &&
          pathname.pathname !== '/cart' &&
          pathname.pathname !== '/account/recover' &&
          pathname.pathname !== '/account/login' &&
          pathname.pathname !== '/account/register' && (
            <Breadcrumbs
              additionalBreadcrumbs={
                !productshow
                  ? ['Select Address']
                  : pathname.pathname.includes('/account')
                    ? [accountTabName]
                    : !isCardTypeSelectionPage &&
                      pathname.pathname === '/customise-your-card'
                      ? ['Create Custom Card']
                      : walletPlan
                        ? ['Wallet Table']
                        : null
              }
            />
          )}
      </div>
    </>
  );
}

function CartDrawer({ isOpen, onClose }) {
  const [root] = useMatches();

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={root.data?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({ isOpen, onClose, menu }) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({ menu, onClose }) {
  const {
    customerId,
    setCustomerId,
    setActiveTab,
    setAccountTabName,
    setIsAccountLoader,
  } = useStateContext();
  const navigate = useNavigate();
  const pathname = useLocation();
  const [show, setShow] = useState(false);
  const [left, setLeft] = useState(false);
  const [showSendCard, setShowSendCard] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showPricingLeft, setShowPricingLeft] = useState(false);
  const [showLearn, setShowLearn] = useState(false);
  const [showLearnLeft, setShowLearnLeft] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showAboutLeft, setShowAboutLeft] = useState(false);
  const [showSendCardLeft, setShowSendCardLeft] = useState(false);
  
  useEffect(() => {
    setCustomerId(localStorage.getItem('customerId'));
  }, []);

  
  const handleChangeAbout = () => {
    setShowAbout(!showAbout);    
    setTimeout(() => {
      setShowAboutLeft(true)
    }, 150)
  };
  const handleChangeLearn = () => {
    setShowLearn(!showLearn);
    setTimeout(() => {
      setShowLearnLeft(true)
    }, 150)

  };

  const handleChangePricing = () => {
    setShowPricing(!showPricing);
    setTimeout(() => {
      setShowPricingLeft(true)
    }, 150)

  };

  const handleChangeSendCard = () => {
    setShowSendCard(!showSendCard);
    setTimeout(() => {
      setShowSendCardLeft(true)
    }, 150)
    
  };

  const handleChange = () => {
    setShow(!show);
    setTimeout(() => {
      setLeft(true)
    }, 150)
  };
  const closeInti = () => {
    setLeft(false)
    setShowPricingLeft(false)
    setShowLearnLeft(false)    
    setShowAboutLeft(false)
    setShowSendCardLeft(false)
    setTimeout(() => {
      setShow(false);
      setShowSendCard(false)
      setShowPricing(false)
      setShowLearn(false)
      setShowAbout(false)
    }, 150)
  }
  // const handleCreateCardClick = () => {
  //   setLoginModal(true);
  // };

  return (
    <div className="">
      <nav className="grid pb-6 sm:pb-8 pt-[0px]">
        {/* Top level menu items */}
        {(menu?.items || []).map((item) => (
          <span key={item.id} className="border-b border-[#dbdbdb] p-[10px] px-[21px] sm:px-[28px]">
            <Link
              to={item.to === ('/pages/business' || '/about-us') && item.to}
              target={item.target}
              onClick={
                item.to === ('/pages/business' || '/about-us') && onClose
              }
            // className={({isActive}) =>
            //   isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
            // }
            >
              <Text as="span" size="copy">
                {item.title === 'Business' ? (
                  <Link to="/business-page">
                    <div className="" style={{ fontWeight: 'bold', fontSize: '16px' }}>Business</div>
                  </Link>
                ) : null}
                {/* {item.title === ''} */}
                {item.title === 'Order' ? (
                  <>
                    <div className="">
                      <div
                        className="flex justify-between items-center"
                        onClick={handleChangeSendCard}
                        style={{ fontWeight: showSendCard ? 'bold' : 'bold', fontSize: '16px' }}
                      >
                        Order
                        <img className="h-[12px]" src={arrow_rights} alt="" />
                      </div>
                      {showSendCard && (
                            <div className={` ${showSendCardLeft ? 'left-0 ' : 'left-[-100%] '} fixed w-full inset-y-0 max-w-[448px] h-full top-0 bg-white transtion-all duration-150`}>
                            <div onClick={() => closeInti()} className='sticky top-[px] bg-[#f2f2f2] flex items-center px-6 h-nav sm:px-8 md:px-12 border-b border-[#dbdbdb] justify-between'>
                              <FaArrowLeft /> <span className='whitespace-pre-wrap max-w-prose font-bold text-lead'>Order </span>
    
                            </div>
                          <ul
                            onClick={onClose}
                            className="text-thin ml-[0px] flex flex-col"
                            style={{ color: 'black' }}
                          >  <li className=' whitespace-normal border-b border-[#dbdbdb]'>
                              <Link to="/collections/best-sellers" className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                                Cards
                              </Link></li>
                            <li className=' whitespace-normal border-b border-[#dbdbdb]'>
                              <Link
                                to="/customise-your-card"
                                // onClick={handleCreateCardClick}
                                className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]"
                              >
                                Create a Card
                              </Link></li>
                            {/* {loginModal && (
                              <>
                                <LoginModal
                                  title={' Create a Card'}
                                  show={loginModal}
                                  setLoginModal={setLoginModal}
                                  onCancel={() => setLoginModal(false)}
                                  confirmText="Login"
                                  cancelText="Register"
                                  cross={true}
                                />
                              </>
                            )} */} <li className=' whitespace-normal border-b border-[#dbdbdb]'>
                              <Link to="/collections/birthday" className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                                Birthday Automation
                              </Link></li>
                            <li className=' whitespace-normal border-b border-[#dbdbdb]'>
                              <Link to="/gift-cards " className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                                Gift Cards
                              </Link> </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                ) : null}

                {item.title === 'Integrations' ? (
                  // <div className="">
                  //   <div
                  //     className="flex justify-between items-center"
                  //     onClick={handleChange}
                  //     style={{fontWeight: show ? 'bold' : 'normal'}}
                  //   >
                  //     Integrations
                  //     {show ? (
                  //       <img className="h-[12px]" src={arrow_down} alt="" />
                  //     ) : (
                  //       <img className="h-[12px]" src={arrow_rights} alt="" />
                  //     )}
                  //   </div>
                  //   {show && (
                  //     <div>
                  //       <ul
                  //         onClick={onClose}
                  //         className="integration-color ml-[8px]"
                  //         style={{color: 'black'}}
                  //       >
                  //         <Link to="/zapier-integration">
                  //           <li
                  //             className={`mt-[-21px] ${
                  //               show === 'Zapier' ? 'selected' : 'green'
                  //             }}`}
                  //           >
                  //             Zapier
                  //           </li>
                  //         </Link>
                  //         <Link to="/shopify-integration">
                  //           <li className="mt-[-21px]">Shopify</li>
                  //         </Link>
                  //         <Link to="/salesforce">
                  //           <li className="mt-[-21px]">Salesforce</li>
                  //         </Link>
                  //         <Link to="/api-automation ">
                  //           <li className="mt-[-21px]">API</li>
                  //         </Link>
                  //       </ul>
                  //     </div>
                  //   )}
                  // </div>
                  <div className="">
                    <div
                      className="flex justify-between items-center"
                      onClick={handleChange}
                      style={{ fontWeight: show ? 'bold' : 'bold', fontSize: '16px' }}
                    >
                      Integrations
                      <img className="h-[12px]" src={arrow_rights} alt="" />
                    </div>
                    {show && (
                      <div className={` ${left ? 'left-0 ' : 'left-[-100%] '} fixed w-full inset-y-0 max-w-[448px] h-full top-0 bg-white transtion-all duration-150`}>
                        <div onClick={() => closeInti()} className='sticky top-[px] bg-[#f2f2f2] flex items-center px-6 h-nav sm:px-8 md:px-12 border-b border-[#dbdbdb] justify-between'>
                          <FaArrowLeft /> <span className='whitespace-pre-wrap max-w-prose font-bold text-lead'>Integrations </span>

                        </div>
                        <ul
                          onClick={onClose}
                          className="text-thin w-full  ml-[0px] flex flex-col"
                          style={{ color: 'black' }}
                        >
                          {/* <Link to="/price">
                          <li>Credit Packages</li>
                        </Link> */}
                          <li className=' whitespace-normal border-b border-[#dbdbdb]'>
                            <Link to="/zapier-integration" className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                              Zapier
                            </Link>
                          </li>
                          <li className=' whitespace-normal border-b border-[#dbdbdb] '>
                            <Link to="/shopify-integration " className="font-semibold text-[16px] block p-[10px] px-[21px] sm:px-[28px]">
                              Shopify
                            </Link>
                          </li>
                          <li className=' whitespace-normal border-b border-[#dbdbdb]'>
                            <Link to="/salesforce" className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                              Salesforce
                            </Link>
                          </li>
                          <li className=' whitespace-normal border-b border-[#dbdbdb]'>
                            <Link to="/api-automation" className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                              Api
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null}
                {item.title === 'Pricing' ? (
                  <div className="">
                    <div
                      className="flex justify-between items-center"
                      onClick={handleChangePricing}
                      style={{ fontWeight: showPricing ? 'bold' : 'bold', fontSize: '16px' }}
                    >
                      Pricing
                      <img className="h-[12px]" src={arrow_rights} alt="" />
                    </div>
                    {showPricing && (
                      <div className={` ${showPricingLeft ? 'left-0 ' : 'left-[-100%] '} fixed w-full inset-y-0 max-w-[448px] h-full top-0 bg-white transtion-all duration-150`}>
                        <div onClick={() => closeInti()} className='sticky top-[px] bg-[#f2f2f2] flex items-center px-6 h-nav sm:px-8 md:px-12 border-b border-[#dbdbdb] justify-between'>
                          <FaArrowLeft /> <span className='whitespace-pre-wrap max-w-prose font-bold text-lead'>Pricing </span>

                        </div>
                        <ul
                          onClick={onClose}
                          className="text-thin ml-[0px] flex flex-col"
                          style={{ color: 'black' }}
                        >
                          {/* <Link to="/price">
                            <li>Credit Packages</li>
                          </Link> */}
                          <li className=' whitespace-normal border-b border-[#dbdbdb]'>
                            <Link to="#" className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.location.href =
                                    'https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb';
                                  return false;
                                }}
                              >
                                Get a Custom Quote
                              </button>
                            </Link></li>
                          <li className=' whitespace-normal border-b border-[#dbdbdb]'>
                            <Link to="/simply-noted-plans" className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                              Plans and Packages
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null}
                {item.title === 'Learn' ? (
                  <div className="">
                    <div
                      className="flex justify-between items-center"
                      onClick={handleChangeLearn}
                      style={{ fontWeight: showLearn ? 'bold' : 'bold', fontSize: '16px' }}
                    >
                      Learn
                      <img className="h-[12px]" src={arrow_rights} alt="" />
                    </div>
                    {showLearn && (
                      <div className={` ${showLearnLeft ? 'left-0 ' : 'left-[-100%] '} fixed w-full inset-y-0 max-w-[448px] h-full top-0 bg-white transtion-all duration-150`}>
                        <div onClick={() => closeInti()} className='sticky top-[px] bg-[#f2f2f2] flex items-center px-6 h-nav sm:px-8 md:px-12 border-b border-[#dbdbdb] justify-between'>
                          <FaArrowLeft /> <span className='whitespace-pre-wrap max-w-prose font-bold text-lead'>Learn </span>

                        </div>
                        <ul
                          onClick={onClose}
                          className="text-thin ml-[0px]"
                          style={{ color: 'black' }}
                        >
                          <li className=' whitespace-normal border-b border-[#dbdbdb]' onClick={onClose}>
                            <Link to="/blog" className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                              Blog.
                            </Link></li>
                          <li className=' whitespace-normal border-b border-[#dbdbdb]' onClick={onClose}>
                            <Link to="/tutorials" className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                              Tutorials
                            </Link>
                          </li><li className=' whitespace-normal border-b border-[#dbdbdb]'>
                            <a className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]" target='_blank' href="https://www.youtube.com/@simplynoted">
                              Videos
                            </a></li> 
                            <li className=' whitespace-normal border-b border-[#dbdbdb]'>
                            <Link to="/faq" className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                              F.A.Q.
                            </Link></li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null}
                {item.title === 'About' ? (
                  <div className="">
                    <div
                      className="flex justify-between items-center"
                      onClick={handleChangeAbout}
                      style={{ fontWeight: showAbout ? 'bold' : 'bold', fontSize: '16px' }}
                    >
                      About
                      <img className="h-[12px]" src={arrow_rights} alt="" />
                    </div>
                    {showAbout && (
           <div className={` ${showAboutLeft ? 'left-0 ' : 'left-[-100%] '} fixed w-full inset-y-0 max-w-[448px] h-full top-0 bg-white transtion-all duration-150`}>
           <div onClick={() => closeInti()} className='sticky top-[px] bg-[#f2f2f2] flex items-center px-6 h-nav sm:px-8 md:px-12 border-b border-[#dbdbdb] justify-between'>
             <FaArrowLeft /> <span className='whitespace-pre-wrap max-w-prose font-bold text-lead'>About </span>
       
           </div>
                        <ul
                          onClick={onClose}
                          className="text-thin ml-[0px]"
                          style={{ color: 'black' }}
                        >
                          {/* <Link to="/price">
                          <li>Credit Packages</li>
                        </Link> */}
                          <li className=' whitespace-normal border-b border-[#dbdbdb]'>
                            <Link to="/pages/about-us" className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                              About Us
                            </Link></li><li className=' whitespace-normal border-b border-[#dbdbdb]'>
                            <Link to="/Video" className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                              Tutorials
                            </Link></li>
                          <li className=' whitespace-normal border-b border-[#dbdbdb]'>  
                          <Link to="#" className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                window.location.href =
                                  'https://www.youtube.com/@simplynoted';
                                return false;
                              }}
                            >
                              Video
                            </button>
                          </Link></li>
                          <li className=' whitespace-normal border-b border-[#dbdbdb]'>  
                            <Link to="/news" className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                            Blog
                          </Link></li>
                          <li className=' whitespace-normal border-b border-[#dbdbdb]'> 
                           <Link to="/pages/faq" className="font-semibold text-[16px] block px-[21px] p-[10px] sm:px-[28px]">
                            F.A.Q
                          </Link></li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null}
              </Text>

            </Link>
          </span>
        ))}
        <button className='flex p-[10px] px-[21px] sm:px-[28px] border-b border-[#dbdbdb]' onClick={() => {
          setActiveTab(0);
          setAccountTabName('General');
          if (customerId && pathname.pathname !== '/account') {
            setIsAccountLoader(true);
            navigate('/account');

          } else if (!customerId) {
            navigate('account/login');
          }
          onClose()
        }} >
          <div className="text-[16px]" style={{ fontWeight: 'bold' }}>{customerId ? "Account" : "Login"}</div>
        </button>
      </nav>
    </div>
  );
}
function MobileHeader({ title, isHome, openCart, openMenu }) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);

  const stateContext = useStateContext() || {
    cartCountVal: 0,
    setCartCountVal: () => { },
  };

  const { cartCountVal } = stateContext;
  const params = useParams();

  return (
    <header
      role="banner"
      style={{
        paddingTop: '30px',
      }}
      className={`${isHome ? '' : ''
        } global-max-width-handler pb-[40px] sm:pb-[30px] flex lg:hidden items-center h-nav relative z-20 backdrop-blur-lg top-0 justify-between w-full bg-white leading-none gap-4`}
    >
      <div className="flex items-center justify-start h-full w-full gap-4 ">
        <Link
          className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-start flex-grow w-full h-full"
          to="/"
        >
          <Heading
            className="font-bold text-center leading-none"
            as={isHome ? 'h1' : 'h2'}
          >
            {title}
          </Heading>
        </Link>
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="items-center gap-2 sm:flex"
        >
          {/* <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8"
          >
            {/* <IconSearch /> */}
          {/* </button> */}
          {/* <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          /> */}
        </Form>
      </div>
      <Link
        className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
        to="/"
      >
        {/* <Heading
          className="font-bold text-center leading-none"
          as={isHome ? 'h1' : 'h2'}
        >
          {title}
        </Heading> */}
      </Link>

      <div className="flex items-center justify-end w-full gap-4">
        {/* <AccountLink className="relative flex items-center justify-center w-8 h-8" /> */}
        {/* <CartCount isHome={isHome} openCart={openCart} /> */}
        <div className="tooltip mb-2" style={{ transition: 'all 700ms' }}>
          {cartCountVal && cartCountVal !== undefined ? (
            <>
              <Link to="/cart">
                <div
                  className="bg-[#1b5299] w-[20px] h-[20px] rounded-[20px] flex justify-center items-center text-xs"
                  style={{ marginLeft: '22px', marginBottom: '16px' }}
                >
                  <span className="text-[white]">
                    {cartCountVal ? cartCountVal : ''}
                  </span>
                </div>
                <HiOutlineShoppingBag className="navbar-cart-icon" />
              </Link>
            </>
          ) : (
            <Link to="/cart">
              {/* This div is just for aligning the cart icon */}
              <div
                className="w-[20px] h-[20px] rounded-[20px] flex justify-center items-center text-xs"
                style={{ marginLeft: '22px', marginBottom: '16px' }}
              ></div>
              <HiOutlineShoppingBag className="navbar-cart-icon" />
            </Link>
          )}
        </div>
      </div>
      <button
        onClick={openMenu}
        className="relative flex color-white bg-ef6e6e items-center justify-center"
      >
        <IconMenu />
      </button>
    </header>
  );
}

function DesktopHeader({ isHome, menu, isLoggedIn }) {
  const [isInitialRender, setIsInitialRender] = useState(true);

  const stateContext = useStateContext() || {
    cartCountVal: 0,
    setCartCountVal: () => { },
  };

  const {
    cartCountVal,
    setCartCountVal,
    customerId,
    setActiveTab,
    setAccountTabName,
    isAccountLoader,
    setIsAccountLoader,
    loginModal,
    setWalletPlan,
    setWalletPayment,
    setWalletPurchase,
    setLoginModal,
    checkLogin,
    setCheckLogin
  } = stateContext;

  const navigate = useNavigate();
  const pathname = useLocation();

  useEffect(() => {
    setIsInitialRender(false);
    let calculatedCartCount = localStorage.getItem('mydata')
      ? JSON.parse(localStorage.getItem('mydata'))
      : [];
    localStorage.setItem(
      'cartCount',
      JSON.stringify(calculatedCartCount.length),
    );
    let totalCartCount = localStorage.getItem('cartCount')
      ? JSON.parse(localStorage.getItem('cartCount'))
      : 0;
    setCartCountVal(totalCartCount);
  }, []);



  const { y } = useWindowScroll();


  return (
    <>
      <header
        role="banner"
        className={`h-[72px] ${isHome
          ? '  text-contrast !relative dark:text-primary shadow-darkHeader '
          : 'text-primary'
          } ${!isHome && y > 50 ? 'shadow-lightHeader' : ''
          } hidden max-w-full px-[40px] pt-4 h-nav lg:mb-[10px] lg:flex items-center z-20 lg-text-white bg-transparent transition duration-300 backdrop-blur-lg top-0 justify-between w-full leading-none font-roboto font-semibold text-base`}
      >
        <div
          onClick={() => {
            localStorage.removeItem('previousPage');
          }}
          className="flex  items-center"
        >
          <Link className="font-bold" to="/" prefetch="intent">
            {/* {title} */}
            <img
              src={nav_logo}
              style={{
                position: 'relative',
                height: 'auto',
                minWidth: '170px',
              }}
              className="xl:w-full lg:w-[80%] mr-5"
            />
          </Link>
        </div>
        <div
          style={{ fontSize: '17px' }}
          className="flex items-center h-[44.7px] gap-8 text-[#001A5F] text-[19px]  pb-0 xl:leading-1 lg:leading-5  tracking-tight"
        >
          {(menu?.items || []).map((item) => {
            return (
              <div
                onClick={() => {
                  setWalletPayment(false);
                  setWalletPlan(false);
                  setWalletPurchase(false);
                }}
                key={item.id}
                prefetch="intent"
              // className={`${({isActive}) =>
              //   isActive ? 'navitem-active' : 'navitems'}`}
              >
                <div
                  className="dropdown"
                // onMouseEnter={() => handleDropdownEnter('integrations')}
                // onMouseLeave={handleDropdownLeave}
                >
                  <div className="font-[600] flex navitems items-center gap-[7px] text-[#001a5f] hover:text-[#EF6E6E]">
                    {item.items.length > 0 ? (
                      <FlyoutLink
                        FlyoutContent={PricingContent}
                        data={item.items}
                      >
                        {item.title}
                      </FlyoutLink>
                    ) : (
                      <Link to="/pages/business-page">
                        <span className="hover:text-[#EF6E6E]">
                          {item.title}
                        </span>
                      </Link>
                    )}
                    {/* {item.items && item.items.length > 0 && <IoIosArrowDown />} */}
                  </div>
                  {/* <div className="font-[600]">{item.title}</div> */}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-1">
          <div className="tooltip" style={{ transition: 'all 700ms' }}>
            {cartCountVal && cartCountVal !== undefined ? (
              <>
                <Link to="/cart">
                  <div
                    className="bg-[#1b5299] w-[20px] h-[20px] rounded-[20px] flex justify-center items-center text-xs"
                    style={{ marginLeft: '22px', marginBottom: '16px' }}
                  >
                    <span className="text-[white]">
                      {cartCountVal ? cartCountVal : ''}
                    </span>
                  </div>
                  <HiOutlineShoppingBag className="navbar-cart-icon" />
                </Link>
              </>
            ) : (
              <Link to="/cart">
                {/* This div is just for aligning the cart icon */}
                <div
                  className="w-[20px] h-[20px] rounded-[20px] flex justify-center items-center text-xs"
                  style={{ marginLeft: '22px', marginBottom: '16px' }}
                ></div>
                <HiOutlineShoppingBag className="navbar-cart-icon" />
              </Link>
            )}
          </div>
          {isInitialRender || isAccountLoader ? (
            <div className="h-6 w-6 lg:min-w-[80.61px]">
              <CircularLoader color="#ef6e6e" height="20px" width="20px" />
            </div>
          ) : (
            <DynamicButton
              text={isLoggedIn ? 'Account' : 'Login'}
              className="!font-semibold py-[10px] px-[12px] rounded border border-[#1E1E1E] h-[44px] text-base !text-black hover:!text-[#001a5f]"
              onHoverColorEnabled={false}
              onClickFunction={() => {
                setActiveTab(0);
                setAccountTabName('General');
                if (isLoggedIn && pathname.pathname !== '/account') {
                  setIsAccountLoader(true);
                  navigate('/account');
                }
                else {
                  navigate('/account/login');
                }
              }}
            />
          )}

          <DynamicButton
            // style={{padding: '11px 20px 10px 20px', fontWeight: '700 !important'}}
            text="REQUEST A SAMPLE"
            className="request-button text-base rounded h-[44px] font-semibold px-[20px] py-[10px]"
            onClickFunction={() =>
            (window.location.href =
              'https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb')
            }
          />
        </div>
      </header>
      <LoginModal
        title={' Create a Card'}
        show={checkLogin}
        setLoginModal={setCheckLogin}
        onCancel={() => setCheckLogin(false)}
        confirmText="Login"
        cancelText="Register"
        cross={true}
      />
    </>
  );
}

const FlyoutLink = ({ children, href, FlyoutContent, data }) => {
  const [open, setOpen] = useState(false);
  const showFlyout = FlyoutContent && open;
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit text-[#001a5f] hover:text-[#EF6E6E]"
    >
      <a href={href} className="relative  text-[#001a5f] hover:text-[#EF6E6E]">
        {children}
        <span
          style={{
            transform: showFlyout ? 'scaleX(1)' : 'scaleX(0)',
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full"
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: '-50%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <FlyoutContent props={data} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingContent = ({ props }) => {
  const navigate = useNavigate()

  let storedCustomerId;
  useEffect(() => {
    storedCustomerId = localStorage.getItem('customerId');
  }, []);


  const { customerId, setCheckLogin } = useStateContext()
  function onCLickCheck() {
    if (customerId === null && customerId === undefined && storedCustomerId === null) {
      setCheckLogin(true)
    } else {
      navigate('/customise-your-card')
    }
  }

  return (
    <div className="w-64 bg-wheat p-6 shadow-xl">
      {props.map((item) => (
        <div key={item.id} className="mb-3 space-y-3 ">
          {item.to === "/customise-your-card" ?

            <button className="block text-sm hover:text-blue-700 font-[400]" onClick={() => onCLickCheck()}
            >
              {item.title}
            </button> :
            <Link
              to={item.to}
              className="block text-sm  font-[400]"
            >
              {item.title}
            </Link>
          }
        </div>
      ))}
    </div>
  );
};

function AccountLink({ className }) {
  const [root] = useMatches();
  const isLoggedIn = root.data?.isLoggedIn;
  return isLoggedIn ? (
    <Link to="/account" className={`${className}`}>
      <IconAccount />
    </Link>
  ) : (
    <Link to="/account/login" className={`${className}`}>
      <IconLogin />
    </Link>
  );
}

function CartCount({ isHome, openCart }) {
  const [root] = useMatches();

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={root.data?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({ openCart, dark, count }) {
  const isHydrated = useIsHydrated();

  const navigate = useNavigate();

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag />
        <div
          className={`${dark
            ? 'text-primary bg-contrast dark:text-contrast dark:bg-primary'
            : 'text-contrast bg-primary'
            } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
        >
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count, dark],
  );

  return isHydrated ? (
    <button
      onClick={() => navigate('/cart')}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
}

function Footer({ menu }) {
  const isHome = useIsHomePath();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 600) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const itemsCount = menu
    ? menu?.items?.length + 1 > 4
      ? 4
      : menu?.items?.length + 1
    : [];

  return (
    <div
      divider={isHome ? 'none' : 'top'}
      as="footer"
      role="contentinfo"
      //   className={`block min-h-[25rem] items-start grid-flow-row w-full gap-2 md:px-8 lg:px-12 md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsCount}
      //  bg-[#2d4271] dark:text-primary text-contrast overflow-hidden`}
      className={`bg-[#2d4271] text-white p-0  `}
    >
      <FooterMenu menu={menu} />
      {/* <ScrolltoTop/> */}

      {showButton && (
        <button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
          className="button-top"
        >
          <img className="w-6" src={top} alt=""></img>
        </button>
      )}
      {/* <CountrySelector /> */}
      <div
        className={` bg-[#2c3b68] h-[45px] flex pl-[6px] pt-[10px] text-lg justify-center`}
      >
        &copy; Simply Noted {new Date().getFullYear()}. All Rights Reserved
      </div>
    </div>
  );
}

function FooterLink({ item }) {
  if (item.to.startsWith('http')) {
    return (
      <a href={item.to} target={item.target} rel="noopener noreferrer">
        {item.title}
      </a>
    );
  }

  return (
    <Link to={item.to} target={item.target} prefetch="intent">
      {item.title}
    </Link>
  );
}

function FooterMenu({ menu }) {
  const styles = {
    section: 'grid gap-4',
    nav: 'grid gap-2 pb-6',
  };

  return (
    <>
      <div className="grid md:flex justify-center xl:gap-[120px] lg:gap-[75px] gap-[40px] md:text-[16px]  text-[18px] md:text-left text-center md:pt-[70px] pt-[20px] pb-[30px] mx-auto w-[98%] font-normal">
        <div className="md:mx-0 mx-auto">
          <div className="lg:w-[200px] sm:w-[165px] w-[50%] sm:mx-0 mx-auto pt-10 md:pt-0">
            <img src={footerlogo} alt=""></img>
          </div>
          <div className="flex mt-5 sm:w-full  w-[50%] sm:mx-0 mx-auto gap-[10px] justify-center items-center">
            <a
              target='_blank'
              href="https://www.linkedin.com/company/simplynoted/?viewAsMember=true">
              <img
                className="w-[55px] min-w-[55px] min-h-[55px] tab:min-w-[55px]  h-[55px]"
                src={linkdin}
                alt="linkdin-link"
              ></img>
            </a>
            <a
              target='!blank'
              href="https://m.facebook.com/profile.php/?id=100054865066445&name=xhp_nt__fb__action__open_user">
              <img
                className="w-[55px] min-w-[55px] min-h-[55px] tab:min-w-[55px]  h-[55px]"
                src={fb}
                alt="facebook-link"
              ></img>
            </a>
            <a
              target='_blank'
              href="https://twitter.com/SimplyNotedLLC">
              <img
                className="w-[55px] min-w-[55px] min-h-[55px] tab:min-w-[55px]  h-[55px] ml-[-3px]"
                src={twitter}
                alt="twitter-link"
              ></img>
            </a>
          </div>
        </div>
        <div className="  text-white md:text-left text-center grid justify-center gap-[8px]">
          <div className="lg:text-xl md:text-[18px] text-[22px] font-bold ">
            Quick Links
          </div>
          <div className="md:text-left text-center">
            {(menu?.items || []).map((item) => (
              <section key={item.id}>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="md:text-left text-center md:cursor-default">
                        <Link to={item.to}>
                          <Heading
                            className="flex justify-between  !font-base leading-loose hover:text-white capitalize"
                            size="lead"
                            as="h3"
                          >
                            {item.title}
                            {item?.items?.length > 0 && (
                              <span className="md:hidden">
                                <IconCaret direction={open ? 'up' : 'down'} />
                              </span>
                            )}
                          </Heading>
                        </Link>
                      </Disclosure.Button>
                      {item?.items?.length > 0 ? (
                        <div
                          className={`${open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                            } overflow-hidden transition-all duration-300`}
                        >
                          <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                            <Disclosure.Panel static>
                              <nav className={styles.nav}>
                                {item.items.map((subItem) => (
                                  <FooterLink key={subItem.id} item={subItem} />
                                ))}
                              </nav>
                            </Disclosure.Panel>
                          </Suspense>
                        </div>
                      ) : null}
                    </>
                  )}
                </Disclosure>
              </section>
            ))}
          </div>
        </div>
        <div className=" text-white ">
          <div className='grid gap-[8px]'>
            <div className="lg:text-xl md:text-[18px] text-[22px]  font-bold ">Address</div>
            <div className="w-[99%] ">
              5025 S Ash Ave Suite B16 Tempe AZ 85282
            </div>
          </div>

          <div className="md:mt-24 mt-[40px] text-white grid gap-[8px]">
            <div className="lg:text-xl md:text-[18px] text-[22px] font-bold ">Email</div>
            <div className="">
              <a href="mailto:support@simplynoted.com" className='hover:text-white'>
                support@simplynoted.com
              </a>
            </div>
          </div>
        </div>

        <div className=" text-white">
          <div className="lg:text-xl md:text-[18px] text-[22px] font-bold mb-[8px]">Hours</div>
          <div>Monday-Friday</div>
          <div>9:00am - 5:00pm MST</div>
        </div>
      </div>
    </>
  );
}
