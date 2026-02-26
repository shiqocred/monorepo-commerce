import { ContainerPage } from "@/components/container";
import React from "react";
import { HomeClient } from "./_components/client";

const HomePage = () => {
  return (
    <ContainerPage breadcrumbs={[{ label: "Home" }]}>
      <HomeClient />
    </ContainerPage>
  );
};

export default HomePage;
