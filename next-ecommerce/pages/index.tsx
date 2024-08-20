import React, { useEffect, useState } from "react";
import { FooterBanner, Product, HeroBanner } from "@/components";
import { client } from "@/lib/client";
import { BannerType, ProductType } from "@/types";
// import { InferGetServerSidePropsType } from "next";
export default function Home({ products, bannerData }
  : { products: ProductType[], bannerData: BannerType[] }) {

  return (
    <>
      <HeroBanner heroBanner={bannerData.length ? bannerData[0] : undefined} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product: ProductType) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
      <FooterBanner footerBanner={bannerData.length ? bannerData[0] : undefined} />
    </>
  );
}
export const getServerSideProps = async () => {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);
  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: {
      products,
      bannerData
    }
  }
};