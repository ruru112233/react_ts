import * as React from 'react';
import PersistentDrawerRight from "../components/PersistentDrawerRight";
import {AmplifySignOut } from "@aws-amplify/ui-react";

export default function SignOutSide() {
  
  return (
    <>
      <PersistentDrawerRight />
      <AmplifySignOut />
    </>
  );
}