import { ContainerPage } from "@/components/container";
import React from "react";
import { CategoriesClient } from "./_components/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

const CategoriesPage = () => {
  return (
    <ContainerPage
      breadcrumbs={[{ label: "Home", url: "/" }, { label: "Categories" }]}
    >
      <CategoriesClient />
    </ContainerPage>
  );
};

export default CategoriesPage;
