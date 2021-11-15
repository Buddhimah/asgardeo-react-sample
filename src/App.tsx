
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { AuthenticationResponse } from "./components";

function App() {
  const {
    getBasicUserInfo,
    getIDToken,
    getDecodedIDToken
} = useAuthContext();

  const { state, signIn, signOut } = useAuthContext();
  const [ derivedAuthenticationState, setDerivedAuthenticationState ] = useState<any>(null);
  const [ hasAuthenticationErrors, setHasAuthenticationErrors ] = useState<boolean>(false);

  useEffect(() => {

    if (!state?.isAuthenticated) {
        return;
    }

    (async (): Promise<void> => {
        const basicUserInfo = await getBasicUserInfo();
        const idToken = await getIDToken();
        const decodedIDToken = await getDecodedIDToken();

        const derivedState = {
            authenticateResponse: basicUserInfo,
            idToken: idToken.split("."),
            decodedIdTokenHeader: JSON.parse(atob(idToken.split(".")[0])),
            decodedIDTokenPayload: decodedIDToken
        };

        setDerivedAuthenticationState(derivedState);
    })();
}, [ state.isAuthenticated ]);
  

  return (
    <div className="App">
      {
        state.isAuthenticated
          ? (
            <div>
              <ul>
                <h1>Welcome</h1>
                <li>{state.username}</li>
              </ul>
              <AuthenticationResponse
                                derivedResponse={ derivedAuthenticationState }
                            />

              <button onClick={() => signOut()}>Logout</button>
            </div>
          )
          : <button onClick={() => signIn()}>Login</button>
      }
    </div>
  );
}

export default App;
