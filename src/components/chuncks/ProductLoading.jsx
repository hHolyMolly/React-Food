import React from "react";
import ContentLoader from "react-content-loader";

const ProductLoading = (props) => (
  <article className="product-card">
    <ContentLoader speed={1} width="100%" height={375} backgroundColor="#f3f3f3" foregroundColor="#ecebeb" {...props}>
      <rect x="0" y="0" rx="8" ry="0" width="100%" height="225" />
      <rect x="20%" y="235" rx="6" ry="6" width="60%" height="20" />
      <rect x="10%" y="265" rx="4" ry="4" width="55%" height="15" />
      <rect x="10%" y="285" rx="4" ry="4" width="40%" height="15" />
      <rect x="10%" y="320" rx="4" ry="4" width="20%" height="10" />
      <rect x="10%" y="335" rx="6" ry="6" width="20%" height="20" />
      <rect x="50%" y="315" rx="8" ry="8" width="40%" height="40" />
    </ContentLoader>
  </article>
);

export default React.memo(ProductLoading);
