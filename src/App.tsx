import "./styles.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Home } from "./components/Home";
// import SignInSide from "./components/Login";
import SignOutSide from "./components/Logout";
import Manual from "./components/manual";
import SampleCalendar from "./components/Calender";
// import PersistentDrawerRight from "./components/PersistentDrawerRight";
// import { RoleSetting } from "./components/RoleSetting";
import RoleSetting from "./components/RoleSetting";
import RoleGroupSetting from "./components/RoleGroupSetting";
import { UserSetting } from "./components/UserSetting";
// import { MainListItems } from "./components/RoleSetting";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

Amplify.configure({
  aws_project_region: "ap-northeast-1",
  aws_cognito_region: "ap-northeast-1",
  aws_user_pools_id: "ap-northeast-1_S7v45u54b",
  aws_user_pools_web_client_id:  "3bdhdj4r1i3fjq6149bhs7t3p2",
});

const AuthStateApp: React.FunctionComponent = () => {
  const [authState, setAuthState] = React.useState<AuthState>();
  const [user, setUser] = React.useState<object | undefined>();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <>
    <BrowserRouter>
    <div className="App">
        <Routes>
             {/* <Route path="/" element={<Home />} /> */}
             {/* <Route path="/Calender" element={<SampleCalendar {...user} />} /> */}
             <Route path="/" element={<SampleCalendar {...user} />} />
             <Route path="/RoleSetting" element={<RoleSetting />} />
             <Route path="/RoleGroupSetting" element={<RoleGroupSetting />} />
             <Route path="/UserSetting" element={<UserSetting {...user} />} />
             <Route path="/Manual" element={<Manual />} />
             <Route path="/Logout" element={<SignOutSide />} />
        </Routes>
        </div>
   </BrowserRouter>
   {/* <AmplifySignOut /> */}
   </>
  ) : (
    <AmplifyAuthenticator />
  );

}

export default AuthStateApp;
