import * as React from 'react';
import PersistentDrawerRight from "../components/PersistentDrawerRight";
import {AmplifySignOut } from "@aws-amplify/ui-react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function Manual() {

  const redirectToApiManual = () => {
    window.location.href = "https://apimanual01.s3.ap-northeast-1.amazonaws.com/index.html";
  };

  const redirectToLineAPIkeyManual = () => {
    window.location.href = "https://linenotifymanual.s3.ap-northeast-1.amazonaws.com/index.html";
  };

  return (
    <>
      <PersistentDrawerRight />
      <div>
        <h1>各種マニュアル</h1>
        <Link target="_blank" to="">
          <div onClick={redirectToApiManual}>・アプリ操作手順</div>
        </Link>
        <Link target="_blank" to="">
          <div onClick={redirectToLineAPIkeyManual}>・LINEAPIキー発行手順</div>
        </Link>
      </div>
    </>
  );
}