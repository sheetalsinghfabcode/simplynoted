import {defer} from '@shopify/remix-oxygen';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  LiveReload,
  ScrollRestoration,
  useLoaderData,
  useMatches,
  useRouteError,
} from '@remix-run/react';
import {ShopifySalesChannel, Seo, useNonce} from '@shopify/hydrogen';
import invariant from 'tiny-invariant';

import {Layout} from '~/components';
import {seoPayload} from '~/lib/seo.server';

import favicon from '../public/favicon.ico';

import {GenericError} from './components/GenericError';
import {NotFound} from './components/NotFound';
import styles from './styles/app.css';
import productStyles from './styles/products.css';
import {DEFAULT_LOCALE, parseMenu} from './lib/utils';
import {useAnalytics} from './hooks/useAnalytics';
import {StateContextProvider} from './context/StateContext';
import {useEffect, useLayoutEffect, useRef} from 'react';

// This is important to avoid re-fetching root queries on sub-navigations
export const shouldRevalidate = ({formMethod, currentUrl, nextUrl}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') {
    return true;
  }

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) {
    return true;
  }

  return false;
};

export const links = () => {
  return [
    {rel: 'stylesheet', href: styles},
    {rel: 'stylesheet', href: productStyles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
};

export async function loader({request, context}) {
  const {session, storefront, cart} = context;
  const [customerAccessToken, layout] = await Promise.all([
    session.get('customerAccessToken'),
    getLayoutData(context),
  ]);

  const seo = seoPayload.root({shop: layout.shop, url: request.url});

  return defer({
    isLoggedIn: Boolean(customerAccessToken),
    layout,
    selectedLocale: storefront.i18n,
    cart: cart.get(),
    analytics: {
      shopifySalesChannel: ShopifySalesChannel.hydrogen,
      shopId: layout.shop.id,
    },
    seo,
  });
}

export default function App() {
  const nonce = useNonce();
  const data = useLoaderData();
  const locale = data.selectedLocale ?? DEFAULT_LOCALE;
  const hasUserConsent = true;
  const isMounted = useRef(false);

  useEffect(() => {
    if (!data.isLoggedIn) {
      localStorage.clear();
    }
    if (!isMounted.current) {
      isMounted.current = true;

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-X1D2VJQ3LE');

      (function (c, l, a, r, i, t, y) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, 'clarity', 'script', 'mr8fm8dv9t');
    }
  }, []);

  useAnalytics(hasUserConsent);

  return (
    <StateContextProvider>
      <html lang={locale.language}>
        <head>
          <meta charSet="utf-8" />

          <meta
            name="google-site-verification"
            content="pwZ54nt5azNKUe_olhEo10QlwgogX315hOXtfjPEXng"
          />
          <meta
            name="google-site-verification"
            content="QGpj3O3aTREvEJmQKJVQmEDp_J8IjCuZBBr8jNKNqls"
          />
          <meta
            name="google-site-verification"
            content="pufqJ0q35yyCllyfMRe9wrc-c0-Z2aIFYiI8hcLvO-M"
          />
          <meta
            name="google-site-verification"
            content="bpeVfYNJuxGDBdO4-ILSDUqRBikvy5prBzPNvGzHetM"
          />
          <meta
            name="google-site-verification"
            content="x04VnoyVjG2G7tiib1qgc7EnE7fyoRzdXNwhgg3G_Wk"
          />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta
            name="facebook-domain-verification"
            content="q3xpgu5qz9wlus48ett2p2p4dxt15v"
          />
          <meta
            name="facebook-domain-verification"
            content="lu5iuajp669xmj62mgeeos8haa5sf8"
          />
          <meta
            name="ahrefs-site-verification"
            content="97e56e9d1eb6053922d7700f69079d07b6055abbb22c43a3ea00e965046b0318"
          ></meta>

          <script
            src="https://www.googletagmanager.com/gtag/js?id=AW-777809600"
            async=""
          ></script>
          <script
            type="text/javascript"
            async=""
            src="https://www.googletagmanager.com/gtag/js?id=G-Z60WCK1S1P&amp;l=dataLayer&amp;cx=c"
          ></script>
          <script
            type="text/javascript"
            async=""
            src="https://www.googletagmanager.com/gtag/destination?id=MC-XZVHC517D3&amp;l=dataLayer&amp;cx=c"
          ></script>
          <script
            async=""
            src="https://www.googletagmanager.com/gtag/js?id=AW-777809600"
          ></script>
          <script
            async=""
            src="https://www.googletagmanager.com/gtm.js?id=GTM-PB7P5VV"
          ></script>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-X1D2VJQ3LE"
          ></script>
          <meta property="og:site_name" content="SimplyNoted"></meta>
          <meta property="og:type" content="website"></meta>
          <Seo />
          <meta
            property="og:image"
            content="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/Screen_Shot_2021-02-07_at_12.31.19_PM_05bc08b9-5541-4dee-84d5-bd72a9f67297.png?v=1622150650"
          />

          <meta
            property="og:image:secure_url"
            content="https://cdn.shopify.com/s/files/1/0275/6457/2777/files/Screen_Shot_2021-02-07_at_12.31.19_PM_05bc08b9-5541-4dee-84d5-bd72a9f67297.png?v=1622150650"
          />
          <meta property="og:image:width" content="3304" />
          <meta property="og:image:height" content="1602" />
          <Meta />
          <Links />
        </head>
        <body>
          <script src="https://sdk.amazonaws.com/js/aws-sdk-2.1475.0.min.js"></script>
          <script src="https://js.stripe.com/v3/"></script>
          <Layout
            key={`${locale.language}-${locale.country}`}
            layout={data.layout}
            isLoggedIn={data.isLoggedIn}
          >
            <Outlet />
          </Layout>
          <ScrollRestoration nonce={nonce} />
          <Scripts nonce={nonce} />
          <LiveReload nonce={nonce} />
        </body>
      </html>
    </StateContextProvider>
  );
}

export function ErrorBoundary({error}) {
  const nonce = useNonce();
  const [root] = useMatches();
  const locale = root?.data?.selectedLocale ?? DEFAULT_LOCALE;
  const routeError = useRouteError();
  const isRouteError = isRouteErrorResponse(routeError);

  let title = 'Error';
  let pageType = 'page';

  if (isRouteError) {
    title = 'Not found';
    if (routeError.status === 404) pageType = routeError.data || pageType;
  }

  return (
    <html lang={locale.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout
          layout={root?.data?.layout}
          key={`${locale.language}-${locale.country}`}
        >
          {isRouteError ? (
            <>
              {routeError.status === 404 ? (
                <NotFound type={pageType} />
              ) : (
                <GenericError
                  error={{message: `${routeError.status} ${routeError.data}`}}
                />
              )}
            </>
          ) : (
            <GenericError error={error instanceof Error ? error : undefined} />
          )}
        </Layout>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  );
}

const LAYOUT_QUERY = `#graphql
  query layout(
    $language: LanguageCode
    $headerMenuHandle: String!
    $footerMenuHandle: String!
  ) @inContext(language: $language) {
    shop {
      ...Shop
    }
    headerMenu: menu(handle: $headerMenuHandle) {
      ...Menu
    }
    footerMenu: menu(handle: $footerMenuHandle) {
      ...Menu
    }
  }
  fragment Shop on Shop {
    id
    name
    description
    primaryDomain {
      url
    }
    brand {
      logo {
        image {
          url
        }
      }
    }
  }
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
  fragment Menu on Menu {
    id
    items {
      ...ParentMenuItem
    }
  }
`;

async function getLayoutData({storefront, env}) {
  const data = await storefront.query(LAYOUT_QUERY, {
    variables: {
      headerMenuHandle: 'main-menu-second',
      footerMenuHandle: 'footer',
      language: storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');

  /*
        Modify specific links/routes (optional)
        @see: https://shopify.dev/api/storefront/unstable/enums/MenuItemType
        e.g here we map:
          - /blogs/news -> /news
          - /blog/news/blog-post -> /news/blog-post
          - /collections/all -> /products
      */
  const customPrefixes = {BLOG: 'blogs', CATALOG: 'products'};
  const headerMenu = data?.headerMenu
    ? parseMenu(
        data.headerMenu,
        data.shop.primaryDomain.url,
        env,
        customPrefixes,
      )
    : undefined;

  const footerMenu = data?.footerMenu
    ? parseMenu(
        data.footerMenu,
        data.shop.primaryDomain.url,
        env,
        customPrefixes,
      )
    : undefined;

  return {shop: data.shop, headerMenu, footerMenu};
}
