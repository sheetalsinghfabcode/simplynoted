import {
  useParams,
  Form,
  Await,
  useMatches,
  useNavigate,
} from '@remix-run/react';
import { useState, useRef, Suspense, useEffect, useMemo } from 'react';
import { useWindowScroll } from 'react-use';
import { Disclosure } from '@headlessui/react';
import { CartForm, Image } from '@shopify/hydrogen';
import LogoShopify from '../../assets/Image/simply-noted-logo.avif';
import CartShopify from '../../assets/Image/cart_icon.png';
import footerlogo from '../../assets/Image/logo-footer.webp';
import linkdin from '../../assets/Image/Linkdin.svg';
import fb from '../../assets/Image/fb.png';
import twitter from '../../assets/Image/twitter.png';
import DynamicButton from './DynamicButton';
import top from '../../assets/Image/top.png';
import Data2 from './home/Data2';
import Bottom from '~/components/home/Bottom';
import Card from '~/components/home/Card';
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
import ConfirmationModal from './modal/ConfirmationModal';
import LoginModal from './modal/LoginModal';

let customerid;

export function Layout({ children, layout }) {
  const { headerMenu, footerMenu } = layout;

  const [loginModal, setLoginModal] = useState(false);

  return (
    <>
      <div className="flex flex-col min-h-screen ">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        {headerMenu && (
          <Header
            setLoginModal={setLoginModal}
            title={layout.shop.name}
            menu={headerMenu}
          />
        )}
        <main role="main" id="mainContent" className="flex-grow">
          <LoginModal
          title={" Create a Card"}
            show={loginModal}
            setLoginModal={setLoginModal}
            onCancel={() => setLoginModal(false)}
            confirmText="Login"
            cancelText="Register"
          />

          {children}
        </main>
      </div>
      <Data2 />
      <Card />
      <Bottom />
      {footerMenu && <Footer menu={footerMenu} />}
    </>
  );
}

function Header({ title, menu, setLoginModal }) {
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

  // toggle cart drawer when adding to cart
  useEffect(() => {
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
        title={title}
        menu={menu}
        openCart={openCart}
        setLoginModal={setLoginModal}
      />
      <MobileHeader
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
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
  return (
    <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
      {/* Top level menu items */}
      {(menu?.items || []).map((item) => (
        <span key={item.id} className="block">
          <Link
            to={item.to}
            target={item.target}
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? 'pb-1 border-b -mb-px' : 'pb-1'
            }
          >
            <Text as="span" size="copy">
              {item.title}
            </Text>
          </Link>
        </span>
      ))}
    </nav>
  );
}

function MobileHeader({ title, isHome, openCart, openMenu }) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);

  const params = useParams();

  return (
    <header
      role="banner"
      className={`${isHome ? 'bg-primary' : 'bg-contrast/80 text-primary'
        } flex lg:hidden items-center h-nav relative backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8`}
    >
      <div className="flex items-center justify-start w-full gap-4">
        <button
          onClick={openMenu}
          className="relative flex items-center justify-center w-8 h-8"
        >
          <IconMenu />
        </button>
        <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="items-center gap-2 sm:flex"
        >
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8"
          >
            <IconSearch />
          </button>
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
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

function DesktopHeader({ isHome, menu, openCart, title, setLoginModal }) {
  

  function CreateCardCheck(){
   if(typeof window !== 'undefined'){
    let id = localStorage.getItem('customerId');
    // console.log(id,'[[[[[[[]]]]][');
    if(id){
      return(
          <Link to="/createcard">
            <li>Create a Card</li>
          </Link>
      )
    } else{
      return (
        <Link>
      <li onClick={() => setLoginModal(true)}>
        Create a Card
      </li>
    </Link>
      )
    }
   }
    
  }
  // const [customerid, setCustomerid] = useState(null);
  const [customeridLoaded, setCustomeridLoaded] = useState(false);

  // useEffect(() => {
  //   const storedCustomerId = localStorage.getItem('customerId');
  //   console.log(storedCustomerId,'storedCustomerId11111');
  //   if (storedCustomerId) {
  //     setCustomerid(storedCustomerId);
  //     console.log(storedCustomerId,'22222');
  //   }
  //   setCustomeridLoaded(true); // Indicate that the value has been loaded.
  // }, []);

  const navigate = useNavigate();

  const params = useParams();
  const { y } = useWindowScroll();
  return (
    <>
      <header
        role="banner"
        className={`${isHome
            ? ' dark:bg-contrast/60 text-contrast !relative dark:text-primary shadow-darkHeader'
            : 'bg-contrast/80 text-primary'
          } ${!isHome && y > 50 && ' shadow-lightHeader'
          } hidden h-nav lg:flex items-center  sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8`}
      >
        <div className="flex gap-12  items-center">
          <Link className="font-bold" to="/" prefetch="intent">
            {/* {title} */}
            <img
              src={LogoShopify}
              style={{
                position: 'relative',
                height: 'auto',
                marginleft: '-10px',
              }}
            />
          </Link>
          <nav className="flex gap-8 text-[#001A5F] text-base font-karla text-17 pb-0 leading-1.1  font-bold tracking-tight">
            {/* Top level menu items */}
            {(menu?.items || []).map((item) => (
              <Link
                key={item.id}
                to={item.to}
                target={item.target}
                prefetch="intent"
                className={({ isActive }) =>
                  isActive ? 'navitem-active' : 'navitems'
                }
              >
                {item.title === 'Send a Card' ? (
                  <div className="dropdown">
                    <div>Send a Card</div>
                    <div className="dropdown-content">
                      <ul className="dropdown-list">
                        <Link to="/collections/best-sellers">
                          {' '}
                          <li> Card</li>
                        </Link>
                        <CreateCardCheck/>
                        {/* {!customerid ? (
                          customerid ? (
                            <Link to="/createcard">
                              <li>Create a Card</li>
                            </Link>
                          ) : (
                            <Link>
                              <li onClick={() => setLoginModal(true)}>
                                Create a Card
                              </li>
                            </Link>
                          )
                        ) : null // Render a loading indicator or other content while waiting for customerid.
                        } */}
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
                        <Link to="/pages/zapier-integration">
                          {' '}
                          <li> Zapier</li>
                        </Link>
                        <Link to="/pages/shopify-integration">
                          {' '}
                          <li> Shopify</li>
                        </Link>
                        <Link to="/pages/salesforce">
                          {' '}
                          <li> Salesforce</li>{' '}
                        </Link>
                        <Link to="/pages/api-automation">
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
                        <Link to="/pages/pricing">
                          <li>Credit Packages</li>
                        </Link>
                        <Link to="">
                          <li>Get a Custom Quote</li>
                        </Link>
                        <Link to="/pages/marketing">
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
                        <li>Blog.</li>
                        <li>Tutorials</li>
                        <li>Videos</li>
                        <Link to="/pages/faq">
                          <li>F.A.Q.</li>
                        </Link>
                      </ul>
                    </div>
                  </div>
                ) : null}
                {['Send a Card', 'Integrations', 'Pricing', 'Learn'].includes(
                  item.title,
                )
                  ? null
                  : item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <div className="tooltip">
            <img
              src={CartShopify}
              alt="cart-icon"
              style={{
                width: '32px',
                height: '29px',
                marginTop: '-11px',
              }}
            />
            <span className="tooltiptext">Cart</span>
          </div>

          <DynamicButton
            text="REQUEST A SAMPLE"
            className="request-button"
            onClickFunction={() =>
            (window.location.href =
              'https://share.hsforms.com/1goN6DmMuTFaYMfPPD4I5ng39obb')
            }
          />

          <DynamicButton
            text=" Account →"
            className="login-button"
            onClickFunction={() => navigate('/account/login')}
          />

          {/* <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="flex items-center gap-2"
        >
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
          >
            <IconSearch />
          </button>
        </Form> */}
          {/* <AccountLink className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5" /> */}
        </div>
      </header>
    </>
  );
}

function AccountLink({ className }) {
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
      onClick={openCart}
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
      className={`bg-[#2d4271] text-white p-0  font-karla`}
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
        className={` bg-[#2c3b68] h-[45px] flex pl-[6px] pt-[10px] text-base`}
      >
        &copy;Simply Noted {new Date().getFullYear()}.All Rights Reserved
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
      <div className="row flex">
        <div className="gap-x-6 my-20 mr-24 ml-3">
          <div className="w-48">
            <img src={footerlogo} alt=""></img>
          </div>
          <div className="flex mt-5">
            <img className="w-14 m-1" src={linkdin} alt=""></img>
            <img className="w-14 m-1" src={fb} alt=""></img>
            <img className="w-14 m-1" src={twitter} alt=""></img>
          </div>
        </div>
        <div className="gap-x-6 mx-16 my-20">
          <div className="text-xl font-semibold">Quick Links </div>
          {(menu?.items || []).map((item) => (
            <section key={item.id} className={styles.section}>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="text-left md:cursor-default">
                      <Link to={item.to}>
                        <Heading
                          className="flex justify-between !font-base hover:text-white"
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
        <div className="gap-x-6 ml-20 mr-10 my-20">
          <div>
            <div className="text-xl  font-semibold">Address</div>
            <div>
              5025 S Ash Ave Suite B16 Tempe AZ<br></br>
              85282
            </div>
          </div>

          <div className="mt-24">
            <div className="text-xl font-semibold">Email</div>
            <div>support@simplynoted.com</div>
          </div>
        </div>

        <div className="gap-x-6 mr-20 my-20">
          <div className="text-xl font-semibold">Hours</div>
          <div>Monday-Friday</div>
          <div>9:00am - 5:00pm MST</div>
        </div>
      </div>
    </>
  );
}
