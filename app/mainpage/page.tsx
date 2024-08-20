"use client";

import { WithAuth } from "../components/withAuth";
import { MainPage } from "./main-page";

const Page = () => {

  return (
    <WithAuth>
      <MainPage />
    </WithAuth>
  );
};

export default Page;
