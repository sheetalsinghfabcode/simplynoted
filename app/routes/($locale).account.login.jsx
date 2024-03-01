import {json, redirect} from '@shopify/remix-oxygen';
import {
  Form,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {getInputStyleClasses} from '~/lib/utils';
import {Link} from '~/components';
import {useStateContext} from '~/context/StateContext';
import CircularLoader from '~/components/CircularLoder';

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
    console.log(params);

    return redirect(params.locale ? `/${params.locale}/account` : '/account', 
    {
      // headers,
    }
    );
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

  return (
    <div className="flex justify-center sm:mt-12 mt-4 mb-24 px-4">

      <div className="max-w-md w-full">
        <h1 className="name text-4xl text-blue-900">Sign in</h1>
        <img
          className="mt-2 w-32"
          src="https://simplynoted.com/cdn/shop/files/menu-underline.png"
        />
        <p className="mt-[12px] text-black text-opacity-80 text-xs">
          If you have an account with us, please log in.
        </p>
        {/* TODO: Add onSubmit to validate _before_ submission with native? */}
        <Form method="post" noValidate className="pb-8 mt-4 mb-4 space-y-3">
          {actionData?.formError && (
            <div className="flex items-center justify-center mb-6 bg-zinc-500">
              <p className="m-4 text-s text-contrast">{actionData.formError}</p>
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
              onBlur={(event) => {
                setNativeEmailError(
                  event.currentTarget.value.length &&
                    !event.currentTarget.validity.valid
                    ? 'Invalid email address'
                    : null,
                );
              }}
            />
            {nativeEmailError && (
              <p className="text-red-500 text-xs">{nativeEmailError} &nbsp;</p>
            )}
          </div>
          <div>
            <input
              className={`mb-1 h-12 ${getInputStyleClasses(
                nativePasswordError,
              )}`}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder=" Enter-Password"
              aria-label="Password"
              minLength={8}
              required
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              onBlur={(event) => {
                if (
                  event.currentTarget.validity.valid ||
                  !event.currentTarget.value.length
                ) {
                  setNativePasswordError(null);
                } else {
                  setNativePasswordError(
                    event.currentTarget.validity.valueMissing
                      ? 'Please enter a password'
                      : 'Passwords must be at least 8 characters',
                  );
                }
              }}
            />
            {nativePasswordError && (
              <p className="text-red-500 text-xs">
                {nativePasswordError} &nbsp;
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
             
              className=" shadow-custom h-12 sign-in-modal shadow-lg bg-ef6e6e text-contrast py-2 px-4 focus:shadow-outline block w-full"
              type="submit"
              disabled={!!(nativePasswordError || nativeEmailError)}
            >
              Sign in
            </button>
          </div>
          <div className="md:flex grid justify-between items-center sm:mt-8 mt-4 border-t border-gray-300">
            <p className="align-baseline text-sm mt-6">
              New to {shopName}? &nbsp;
              <Link className="text-xs inline underline" to="/account/register">
                Create an account
              </Link>
            </p>
            <Link
              className="mt-6 inline-block align-baseline text-sm text-primary/50"
              to="/account/recover"
            >
              Forgot password
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
