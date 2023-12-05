import {
  useParams,
  Form,
  Await,
  useMatches,
  useNavigate,
  useLocation,
} from '@remix-run/react';
import {useState, useRef, Suspense, useEffect, useMemo} from 'react';
import {useWindowScroll} from 'react-use';
import {Disclosure} from '@headlessui/react';
import {CartForm, Image} from '@shopify/hydrogen';
import LogoShopify from '../../assets/Image/simply-noted-logo.avif';
import CartShopify from '../../assets/Image/cart_icon.png';
import footerlogo from '../../assets/Image/logo-footer.webp';
import linkdin from '../../assets/Image/Linkdin.svg';
import fb from '../../assets/Image/fb.png';
import twitter from '../../assets/Image/twitter.png';
import DynamicButton from './DynamicButton';
import top from '../../assets/Image/top.png';
import Swipers from './home/Swipers';
import Card from '~/components/home/Card';
import arrow_rights from '../../assets/Image/arrow-right-faq.png';
import arrow_down from '../../assets/Image/arrow-down.png';

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
import {useIsHomePath} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import LoginModal from './modal/LoginModal';
import {useStateContext} from '../context/StateContext';
import CircularLoader from './CircularLoder';

let customerId;

export function Layout({children, layout}) {
  const {headerMenu, footerMenu} = layout;

  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        {headerMenu && <Header title={layout.shop.name} menu={headerMenu} />}
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

function Header({title, menu}) {
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

  useEffect(() => {
    let aa = localStorage.getItem('cartCount');
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader
        isHome={isHome}
        title={
          <div>
            <img src="http://localhost:3000/build/_assets/simply-noted-logo-SVKACL4I.avif" />
          </div>
        }
        menu={menu}
        openCart={openCart}
      />
      <MobileHeader
        isHome={isHome}
        title={
          <div>
            <img
              className="w-[100px]"
              src="http://localhost:3000/build/_assets/simply-noted-logo-SVKACL4I.avif"
            />
          </div>
        }
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function CartDrawer({isOpen, onClose}) {
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

export function MenuDrawer({isOpen, onClose, menu}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({menu, onClose}) {
  console.log('menu', menu);
  const [show, setShow] = useState(false);
  const [showSendCard, setShowSendCard] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showLearn, setShowLearn] = useState(false);


  const handleChangeLearn = () => {
    setShowLearn(!showLearn);
  };

  const handleChangePricing = () => {
    setShowPricing(!showPricing);
  };

  const handleChangeSendCard = () => {
    setShowSendCard(!showSendCard);
  };

    const handleChange = () => {
      setShow(!show);

    };
    return (
      <div className="">
      <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12  sm:py-8">
        {/* Top level menu items */}
        {(menu?.items || []).map((item) => (
          <span key={item.id} className="">
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
                    <div className="">Bussiness</div>
                  </Link>
                ) : null}
                {item.title === ''}
                {item.title === 'Send a Card' ? (
                  <>
                    <div className="">
                      <div className="flex justify-between items-center" onClick={handleChangeSendCard} style={{ fontWeight: showSendCard ? 'bold' : 'normal' }}>
                        Send A Card
                        {showSendCard ? (
                          <img className='h-[12px]' src={arrow_down} alt=''/> 
                             ):(
                              <img className='h-[12px]' src={arrow_rights} alt=""/>
                              )}
                      </div>
                      {showSendCard && (
                        <div className="">
                          <ul onClick={onClose} className='text-thin' style={{ color: 'black' }}>
                            <Link to="/collections/best-sellers">
                              <li>Cards</li>
                            </Link>
                            <Link to="/customise-your-card">
                              <li>Create a Card</li>
                            </Link>
                            <Link to="/collections/birthday">
                              <li>Birthday Automation</li>
                            </Link>
                            <Link to="/collections/gift-cards">
                              <li>Gift Cards </li>
                            </Link>
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {item.title === 'Integrations' ? (
                  <div className=''>
                  <div className="flex justify-between items-center" onClick={handleChange} style={{ fontWeight: show ? 'bold' : 'normal'}}>
                    Integrations
                   {show ? (
                   <img className='h-[12px]' src={arrow_down} alt=''/> 
                   ):(
                    <img className='h-[12px]' src={arrow_rights} alt=""/>
                   )}  
                  </div>
                    {show && (
                      <div>
                        <ul onClick={onClose} className='integration-color' style={{ color: 'black' }}>
                          <Link to="/zapier">
                            {' '}
                            <li className={`mt-[-21px] ${show === 'Zapier' ? 'selected' : 'green'}}`}>Zapier</li>
                          </Link>
                          <Link to="/shopify">
                            {' '}
                            <li className='mt-[-21px]'>Shopify</li>
                          </Link>
                          <Link to="/salesforce">
                            {' '}
                            <li className='mt-[-21px]'>Salesforce</li>{' '}
                          </Link>
                          <Link to="/apidocs">
                            {' '}
                            <li className='mt-[-21px]'>API</li>
                          </Link>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null}
                {item.title === 'Pricing' ? (
                  <div className="">
                    <div className="flex justify-between items-center" onClick={handleChangePricing} style={{ fontWeight: showPricing ? 'bold' : 'normal'}}>
                      Pricing
                      {showPricing ? (
                     <img className='h-[12px]' src={arrow_down} alt=''/>     
                      ):(
                     <img className='h-[12px]' src={arrow_rights} alt=""/>
                      )}
                    </div>
                    {showPricing && (
                      <div className="">
                        <ul onClick={onClose} className='text-thin' style={{ color: 'black' }}>
                          <Link to="/price">
                            <li>Credit Packages</li>
                          </Link>
                          <Link to="#">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                window.location.href =
                                  'https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb';
                                return false;
                              }}
                            >
                             <li>Get a Custom Quote</li> 
                            </button>
                          </Link>
                          <Link to="/roicalculator">
                            {' '}
                            <li>ROI Calculator</li>
                          </Link>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null}
                {item.title === 'Learn' ? (
                  <div className="">
                    <div className="flex justify-between items-center" onClick={handleChangeLearn} style={{ fontWeight: showLearn ? 'bold' : 'normal'}} >
                      Learn
                      {showLearn ? (
                     <img className='h-[12px]' src={arrow_down} alt=''/>     
                      ):(
                     <img className='h-[12px]' src={arrow_rights} alt=""/>
                      )}
                    </div>
                    {showLearn &&
                    <div className="">
                      <ul onClick={onClose} className="text-thin"style={{ color: 'black' }}>
                        <Link to="/blog">
                          <li onClick={onClose}>Blog.</li>
                        </Link>
                        <Link to="/tutorials">
                          <li onClick={onClose}>Tutorials</li>
                        </Link>
                        <a href="https://www.youtube.com/@simplynoted">
                          <li>Videos</li>
                        </a>
                        <Link to="/faq">
                          <li>F.A.Q.</li>
                        </Link>
                      </ul>
                    </div>}
                  </div>
                ) : null}
                {item.title === 'About Us' ? (
                  <Link onClick={onClose} to="/about-us">
                    About Us
                  </Link>
                ) : null}
              </Text>
            </Link>
          </span>
        ))}
      </nav>
    </div>
  );
}
function MobileHeader({title, isHome, openCart, openMenu}) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);

  const params = useParams();

  return (
    <header
      role="banner"
      className={`${
        isHome ? 'bg-primary' : 'bg-contrast/80 text-primary'
      } flex lg:hidden items-center h-nav relative backdrop-blur-lg z-40 top-0 justify-between w-full bg-[#deeaf6] leading-none gap-4 px-4 md:px-8`}
    >
      <div className="flex items-center justify-start w-full gap-4">
        <button
          onClick={openMenu}
          className="relative flex color-white bg-ef6e6e items-center justify-center w-8 h-8"
        >
          <IconMenu />
        </button>
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
        <Heading
          className="font-bold text-center leading-none"
          as={isHome ? 'h1' : 'h2'}
        >
          {title}
        </Heading>
      </Link>

      <div className="flex items-center justify-end w-full gap-4">
        <AccountLink className="relative flex items-center justify-center w-8 h-8" />
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

function DesktopHeader({isHome, menu}) {
  const stateContext = useStateContext() || {
    cartCountVal: 0,
    setCartCountVal: () => {},
  };

  const {
    cartCountVal,
    setCartCountVal,
    customerId,
    setCustomerId,
    isInitialRender,
    isAccountLoader,
    setIsAccountLoader,
    loginModal,
    setLoginModal,
  } = stateContext;

  const navigate = useNavigate();
  const pathname = useLocation();

  useEffect(() => {
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

  const params = useParams();
  const {y} = useWindowScroll();
  return (
    <>
      <header
        role="banner"
        className={`${
          isHome
            ? ' dark:bg-contrast/60 text-contrast !relative dark:text-primary shadow-darkHeader '
            : 'bg-contrast/80 text-primary'
        } ${
          !isHome && y > 50 && ' shadow-lightHeader'
        } hidden h-nav lg:flex items-center lg-text-white  sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none xl:gap-8 lg:gap-1 px-12 py-8`}
      >
        <div className="flex xl:gap-12 lg:gap-1 items-center">
          <Link className="font-bold" to="/" prefetch="intent">
            {/* {title} */}
            <img
              src={LogoShopify}
              style={{
                position: 'relative',
                height: 'auto',
                marginleft: '-10px',
              }}
              className="xl:w-full lg:w-[80%]"
            />
          </Link>
          <nav className="flex xl:gap-8 lg:gap-3 text-[#001A5F] xl:text-base lg:text-[14px] text-17 pb-0 xl:leading-1 lg:leading-5 font-medium tracking-tight">
            {(menu?.items || []).map((item) => {
              if (
                [
                  'Send a Card',
                  'Integrations',
                  'Pricing',
                  'Learn',
                  'Business',
                ].includes(item.title)
              ) {
                return (
                  <div
                    key={item.id}
                    prefetch="intent"
                    className={({isActive}) =>
                      isActive ? 'navitem-active' : 'navitems'
                    }
                  >
                    {item.title === 'Send a Card' ? (
                      <div className="dropdown">
                        <div>Send A Card</div>
                        <div className="dropdown-content">
                          <ul className="dropdown-list">
                            <Link to="/collections/best-sellers">
                              {' '}
                              <li>Cards</li>
                            </Link>
                            <Link to="/customise-your-card">
                              {' '}
                              <li>Create a Card</li>
                            </Link>
                            <Link to="/collections/birthday">
                              <li>Birthday Automation</li>
                            </Link>
                            <Link to="collections/gift-cards">
                              {' '}
                              <li>Gift Cards </li>
                            </Link>
                          </ul>
                        </div>
                      </div>
                    ) : null}
                    {item.title === 'Integrations' ? (
                      <div className="dropdown">
                        <div>Integrations</div>
                        <div className="dropdown-content">
                          <ul className="dropdown-list">
                            <Link to="/zapier">
                              {' '}
                              <li> Zapier</li>
                            </Link>
                            <Link to="/shopify">
                              {' '}
                              <li> Shopify</li>
                            </Link>
                            <Link to="/salesforce">
                              {' '}
                              <li> Salesforce</li>{' '}
                            </Link>
                            <Link to="/apidocs">
                              {' '}
                              <li> API</li>
                            </Link>
                          </ul>
                        </div>
                      </div>
                    ) : null}
                    {item.title === 'Pricing' ? (
                      <div className="dropdown">
                        <div>Pricing</div>
                        <div className="dropdown-content">
                          <ul className="dropdown-list">
                            <Link to="/price">
                              <li>Credit Packages</li>
                            </Link>
                            <Link to="#">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  window.location.href =
                                    'https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb';
                                  return false;
                                }}
                              >
                                {' '}
                                Get a Custom Quote
                              </button>
                            </Link>
                            <Link to="/roicalculator">
                              {' '}
                              <li>ROI Calculator</li>
                            </Link>
                          </ul>
                        </div>
                      </div>
                    ) : null}

                    {item.title === 'Learn' ? (
                      <div className="dropdown">
                        <div>Learn</div>
                        <div className="dropdown-content">
                          <ul className="dropdown-list">
                            <Link to="/blog">
                              <li>Blog.</li>
                            </Link>
                            <Link to="/tutorials">
                              <li>Tutorials</li>
                            </Link>
                            <a href="https://www.youtube.com/@simplynoted">
                              <li>Videos</li>
                            </a>
                            <Link to="/faq">
                              <li>F.A.Q.</li>
                            </Link>
                          </ul>
                        </div>
                      </div>
                    ) : null}

                    {item.title === 'Business' ? (
                      <Link to="/business-page">
                        <div className="navitems">Business</div>
                      </Link>
                    ) : null}

                    {/* ... (other dropdown menus for 'Pricing' and 'Learn') */}
                  </div>
                );
              } else {
                return (
                  <Link
                    key={item.id}
                    to={item.to}
                    target={item.target}
                    prefetch="intent"
                    className={({isActive}) =>
                      isActive ? 'navitem-active' : 'navitems'
                    }
                  >
                    {item.title}
                  </Link>
                );
              }
            })}
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <div className="tooltip">
            {cartCountVal && cartCountVal !== undefined ? (
              <>
                <Link to="/carts">
                  <div className="bg-[#1b5299] w-[20px] h-[20px] rounded-[20px] flex justify-center items-center ml-[1rem]">
                    <span className="text-[white]">
                      {cartCountVal ? cartCountVal : ''}
                    </span>
                  </div>
                  <img
                    src={CartShopify}
                    alt="cart-icon"
                    style={{
                      width: '32px',
                      height: '29px',
                      marginTop: '-11px',
                    }}
                  />
                </Link>
              </>
            ) : (
              <Link to="/carts">
                <img
                  src={CartShopify}
                  alt="cart-icon"
                  style={{
                    width: '32px',
                    height: '29px',
                    marginTop: '-11px',
                  }}
                />
              </Link>
            )}

            {/* <span className="tooltiptext">Cart</span> */}
          </div>

          <DynamicButton
            text="REQUEST A SAMPLE"
            className="request-button"
            onClickFunction={() =>
              (window.location.href =
                'https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb')
            }
          />

          {isInitialRender || isAccountLoader ? (
            <div className="h-6 w-6 lg:min-w-[110px]">
              <CircularLoader color="#ef6e6e" height="20px" width="20px" />
            </div>
          ) : (
            <DynamicButton
              text={customerId ? 'Account →' : 'Sign in →'}
              className="login-button"
              onClickFunction={() => {
                if (customerId && pathname.pathname !== '/account') {
                  setIsAccountLoader(true);
                }
                navigate('/account/login');
              }}
            />
          )}
        </div>
      </header>
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
  );
}

function AccountLink({className}) {
  const [root] = useMatches();
  const isLoggedIn = root.data?.isLoggedIn;
  return isLoggedIn ? (
    <Link to="/account" className={className}>
      <IconAccount />
    </Link>
  ) : (
    <Link to="/account/login" className={className}>
      <IconLogin />
    </Link>
  );
}

function CartCount({isHome, openCart}) {
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

function Badge({openCart, dark, count}) {
  const isHydrated = useIsHydrated();

  const navigate = useNavigate();

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag />
        <div
          className={`${
            dark
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
      onClick={()=>navigate('/carts')}
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

function Footer({menu}) {
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
      className={`bg-[#2d4271] text-white p-0  font-karla`}
    >
      <FooterMenu menu={menu} />
      {/* <ScrolltoTop/> */}

      {showButton && (
        <button
          onClick={() => {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
          }}
          className="button-top"
        >
          <img className="w-6" src={top} alt=""></img>
        </button>
      )}
      {/* <CountrySelector /> */}
      <div
        className={` bg-[#2c3b68] h-[45px] flex pl-[6px] pt-[10px] md:justify-normal  justify-center`}
      >
        &copy;Simply Noted {new Date().getFullYear()}.All Rights Reserved
      </div>
    </div>
  );
}

function FooterLink({item}) {
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

function FooterMenu({menu}) {
  const styles = {
    section: 'grid gap-4',
    nav: 'grid gap-2 pb-6',
  };

  return (
    <>
      {/* {(menu?.items || []).map((item) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {({open}) => (
              <>
                <Disclosure.Button className="text-left md:cursor-default">
                  <Heading className="flex justify-between" size="lead" as="h3">
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
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
      ))} */}
      {/* 
<div className="bg-[#2d4271]  text-white"> */}
      <div className="grid md:flex justify-evenly gap-[40px] lg:text-[16px] md:text-[12px] text-[17px] md:text-left text-center pt-[50px] pb-[30px] mx-auto w-[88%] ">
        <div className="md:mx-0 mx-auto">
          <div className="lg:w-48 md:w-28 sm:w-48 w-[50%] sm:mx-0 mx-auto pt-10 md:pt-0">
            <img src={footerlogo} alt=""></img>
          </div>
          <div className="flex mt-5 sm:w-full  w-[84%] ">
            <a href="https://www.linkedin.com/company/simplynoted/?viewAsMember=true">
              <img
                className="lg:w-14 md:w-7 sm:w-14 w-[30%] m-1 sm:ml-0 ml-auto sm:mr-0 mr-[31px]"
                src={linkdin}
                alt=""
              ></img>
            </a>
            <a href="#">
              <img
                className="lg:w-14 md:w-7 sm:w-14 w-[65%] m-1"
                src={fb}
                alt=""
              ></img>
            </a>
            <a href="#">
              <img
                className="lg:w-14 md:w-7 sm:w-14 w-[65%] m-1"
                src={twitter}
                alt=""
              ></img>
            </a>
          </div>
        </div>
        <div className="  text-white md:text-left text-center  ">
          <div className="lg:text-xl md:text-[18px] text-[22px] font-semibold">
            Quick Links{' '}
          </div>
          <div className="text-center md:w-full w-[66%] md:ml-0 ml-auto">
            {(menu?.items || []).map((item) => (
              <section key={item.id} className={styles.section}>
                <Disclosure>
                  {({open}) => (
                    <>
                      <Disclosure.Button className="md:text-left text-center md:cursor-default">
                        <Link to={item.to}>
                          <Heading
                            className="flex justify-between  !font-base leading-loose hover:text-white"
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
                          className={`${
                            open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
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
          <div>
            <div className="lg:text-xl text-[16px]  font-semibold">Address</div>
            <div className="w-[99%] ">
              5025 S Ash Ave Suite B16 Tempe AZ 85282
            </div>
          </div>

          <div className="md:mt-24 mt-[40px] text-white">
            <div className="lg:text-xl text-[16px] font-semibold">Email</div>
            <div className="">
              <a href="mailto:support@simplynoted.com">
                support@simplynoted.com
              </a>
            </div>
          </div>
        </div>

        <div className=" text-white ">
          <div className="lg:text-xl text-[16px] font-semibold">Hours</div>
          <div>Monday-Friday</div>
          <div>9:00am - 5:00pm MST</div>
        </div>
      </div>
    </>
  );
}
