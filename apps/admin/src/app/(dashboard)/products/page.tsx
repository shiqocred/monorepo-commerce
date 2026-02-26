import { ContainerPage } from "@/components/container";
import React from "react";
import { ProductsClient } from "./_components/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

const ProductsPage = () => {
  return (
    <ContainerPage
      breadcrumbs={[{ label: "Home", url: "/" }, { label: "Products" }]}
    >
      <ProductsClient />
    </ContainerPage>
  );
};

export default ProductsPage;
