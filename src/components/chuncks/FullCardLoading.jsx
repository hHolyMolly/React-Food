import React from "react";
import ContentLoader from "react-content-loader";

const FullCardLoading = (props) => (
  <div className="full-card-main">
    <div className="full-card-main__slider full-card-slider">
      <ContentLoader
        speed={1}
        width="100%"
        height={400}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        <rect x="0" y="0" rx="12" ry="12" width="100%" height="320" />
        <rect x="0" y="340" rx="8" ry="8" width="23%" height="55" />
        <rect x="26%" y="340" rx="8" ry="8" width="23%" height="55" />
        <rect x="52%" y="340" rx="8" ry="8" width="23%" height="55" />
        <rect x="78%" y="340" rx="8" ry="8" width="22%" height="55" />
      </ContentLoader>
    </div>
    <div className="full-card-main__inner" style={{ width: "100%" }}>
      <ContentLoader
        speed={1}
        width="100%"
        height={350}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        {/* Title */}
        <rect x="0" y="0" rx="6" ry="6" width="70%" height="28" />

        {/* Price */}
        <rect x="0" y="58" rx="6" ry="6" width="80" height="24" />
        {/* Buy button */}
        <rect x="110" y="50" rx="8" ry="8" width="130" height="40" />
        {/* Favorite button */}
        <rect x="260" y="50" rx="8" ry="8" width="160" height="40" />

        {/* Contain */}
        <rect x="0" y="120" rx="4" ry="4" width="50%" height="16" />

        {/* Weight */}
        <rect x="0" y="160" rx="4" ry="4" width="25%" height="16" />

        {/* Description lines */}
        <rect x="0" y="206" rx="4" ry="4" width="100%" height="14" />
        <rect x="0" y="228" rx="4" ry="4" width="95%" height="14" />
        <rect x="0" y="250" rx="4" ry="4" width="85%" height="14" />
        <rect x="0" y="272" rx="4" ry="4" width="90%" height="14" />
        <rect x="0" y="294" rx="4" ry="4" width="60%" height="14" />
      </ContentLoader>
    </div>
  </div>
);

export default React.memo(FullCardLoading);
