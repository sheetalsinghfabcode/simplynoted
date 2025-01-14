import {json, redirect} from '@shopify/remix-oxygen';
import {Form, useActionData, useLoaderData} from '@remix-run/react';
import {useState} from 'react';
import {getInputStyleClasses} from '~/lib/utils';
import {useStateContext} from '~/context/StateContext';
import {Link} from '~/components';
import CircularLoader from '~/components/CircularLoder';
import Underline from '../../assets/Image/underline-2-img.png';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';

export const handle = {
  isPublic: true,
};

export async function loader({context, params}) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  if (customerAccessToken) {
    return redirect(params.locale ? `${params.locale}/account` : '/account');
  }

  // TODO: Query for this?
  return json({shopName: 'Simplynoted'});
}

const badRequest = (data) => json(data, {status: 400});

export const action = async ({request, context, params}) => {
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');

  if (
    !email ||
    !password ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return badRequest({
      formError: 'Please provide both an email and a password.',
    });
  }

  const {session, storefront, cart} = context;

  try {
    const customerAccessToken = await doLogin(context, {email, password});
    session.set('customerAccessToken', customerAccessToken);



    // Sync customerAccessToken with existing cart
    const result = await cart.updateBuyerIdentity({customerAccessToken});

    // Update cart id in cookie
    const headers = cart.setCartId(result.cart.id);

    headers.append('Set-Cookie', await session.commit());

    return redirect(params.locale ? `/${params.locale}/account` : '/account', {
      headers,
    });
  } catch (error) {
    if (storefront.isApiError(error)) {
      return badRequest({
        formError: 'Something went wrong. Please try again later.',
      });
    }

    /**
     * The user did something wrong, but the raw error from the API is not super friendly.
     * Let's make one up.
     */
    return badRequest({
      formError:
        'Sorry. We did not recognize either your email or password. Please try to sign in again or create a new account.',
    });
  }
};

export const meta = () => {
  return [{title: 'Login'}];
};

export default function Login() {
  const {shopName} = useLoaderData();
  const actionData = useActionData();
  const [nativeEmailError, setNativeEmailError] = useState(null);
  const [nativePasswordError, setNativePasswordError] = useState(null);
  const {loaderTitle, setLoaderTitle, showLoader, setShowLoader} =
    useStateContext();

    const recaptchaRef = useRef()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifid, setVerifid] = useState(false);

  function onChange(value) {
    if (value) {
      setVerifid(true);
    }
  }

  const handleLogin = async () => {
    if (
      !email.trim() ||
      nativeEmailError ||
      nativePasswordError ||
      !password.trim()
    ) {
      return;
    }
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 2300);
  };

  return (
    <div className="flex relative md:min-w-[540px] justify-center sm:mt-12 mt-4 mb-10 px-4">
      {showLoader && (
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-80 flex justify-center items-center z-50">
          <CircularLoader textColor="text-white" title="Logging in..." />
        </div>
      )}
      <div className="max-w-[32rem] p-[20px] border border-[#f2f2f2] w-full rounded-3xl  shadow-box">
        <h1 className="name text-4xl flex mt-[0px] justify-center font-bold text-blue-900">
          Sign in
        </h1>
        <div className="flex justify-center">
          <img className="mt-2 w-32" src={Underline} />
        </div>
        <p className="mt-[20px] text-black text-opacity-80 text-[15px] text-center">
          If you have an account with us, please log in.
        </p>
        {/* TODO: Add onSubmit to validate _before_ submission with native? */}
        <Form method="post" noValidate className="pb-0 mt-4 mb-4 space-y-3">
          {actionData?.formError && (
            <div className="flex items-center text-left text-red">
              <p className="text-red text-[red]">{actionData.formError}</p>
            </div>
          )}
          <div>
            <input
              className={`mb-1 h-12 ${getInputStyleClasses(nativeEmailError)}`}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter-E-mail"
              aria-label="Email address"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={email}
              onChange={(e) => {
                if (actionData) {
                  actionData.formError = '';
                }
                setEmail(e.target.value);
              }}
            />

            {nativeEmailError && (
              <p className="text-red-500 text-xs">{nativeEmailError} &nbsp;</p>
            )}
          </div>
          <div className="!mb-3">
            <input
              className={`mb-1 h-12 ${getInputStyleClasses(
                nativePasswordError,
              )}`}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter-Password"
              aria-label="Password"
              minLength={8}
              required
              value={password}
              onChange={(e) => {
                if (actionData) {
                  actionData.formError = '';
                }
                setPassword(e.target.value);
              }}
            />
            {nativePasswordError && (
              <p className="text-red-500 text-xs">
                {nativePasswordError} &nbsp;
              </p>
            )}
          </div>
          <ReCAPTCHA
            sitekey="6LdZCogiAAAAAF90CyxrwcnpuKDLAXD8LG4i_WRM"
            onChange={onChange}
          />
          <div
            onClick={handleLogin}
            className="flex !mt-2 items-center justify-between"
          >
            <button
              className=" shadow-custom h-12 sign-in-modal shadow-lg bg-ef6e6e text-contrast py-2 px-4 focus:shadow-outline block w-full"
              type="submit"
              disabled={
                !!(
                  nativePasswordError ||
                  nativeEmailError ||
                  actionData?.formError ||
                  !verifid
                )
              }
            >
              Sign in
            </button>
          </div>
          <div className="flex  justify-between items-center sm:mt-6 mt-4 border-t border-gray-300">
            <p className="align-baseline  mt-[12px]">
              <Link
                className="text-[16px] mt-4 inline underline"
                to="/account/register"
              >
                Create an account
              </Link>
            </p>
            <Link
              className="inline-block mt-[12px] align-baseline text-[16px] text-primary/50"
              to="/account/recover"
            >
              Lost your password?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

const LOGIN_MUTATION = `#graphql
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerUserErrors {
          code
          field
          message
        }
        customerAccessToken {
          accessToken
          expiresAt
        }
      }
    }
  `;

export async function doLogin({storefront}, {email, password}) {
  const data = await storefront.mutate(LOGIN_MUTATION, {
    variables: {
      input: {
        email,
        password,
      },
    },
  });

  if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
    return data.customerAccessTokenCreate.customerAccessToken.accessToken;
  }

  /**
   * Something is wrong with the user's input.
   */
  throw new Error(
    data?.customerAccessTokenCreate?.customerUserErrors.join(', '),
  );
}
