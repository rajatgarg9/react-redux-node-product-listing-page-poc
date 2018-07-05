import React from "react";
import { ProductRating } from "../product-rating/product-rating-component.jsx";
import PropTypes from "prop-types";

/**
   * ProductTile -- make markup for rating stars based on suppled rating
   * @param {Object} props -- contain productTileData Object and productTileKeys data
   *  @return {array} -- rating markUP
  */
export const ProductTile = (props) => {

    const { productTileData, productTileKeys } = props;

    if (!productTileData && !productTileKeys) {
        return null;
    }

    /**
       * currencyFormatter -- add comma to burrency after 3 digits
       * @param {String} price -- currency value
       *  @return {String} -- currency with Comma
     */
    const currencyFormatter = (price) => {
        return price.replace(/\B(?=(\d{3})+\b)/g, ",")
    }

    const { productTileData: { ProductImages, tagInfo, ratingInfo, landMarkInfo, nearByInfo, dealOfferInfo, loginInOfferInfo, price },
        productTileKeys: { loginOfferInfoKeys, dealOfferInfoKeys } } = props;


    return (
        <div className={`product-tile-container ${dealOfferInfo ? 'product-tile-deal-variant' : ''}`}>
            <div className="product-tile-top-container">
                {
                    ProductImages && (<div className="product-tile-image-container">
                        <picture>
                            <source srcSet={ProductImages.desktop && ProductImages.desktop.src} media="(min-width: 1024px)" />
                            <img alt={ProductImages.imageAltText} className="product-tile-image" src={ProductImages.mobile && ProductImages.mobile.src} />
                        </picture>
                    </div>)
                }
                <div className="product-tile-top-promoted-tag-container">
                    <span className="product-tile-top-promoted-tag">{tagInfo && tagInfo.specialTag}</span>
                </div>
                {
                    ratingInfo && (<div className="product-tile-top-rating-review-container">
                        <p className="product-tile-top-rating-container">
                            <span className="product-tile-top-avg-rating">{ratingInfo.avg}</span>
                            <span className="product-tile-top-rating-seprator">{productTileKeys.avgRatingSeaprator}</span>
                            <span className="product-tile-top--out-of-rating">{ratingInfo.total}</span>
                        </p>
                        <p className="product-tile-top-review-container">{ratingInfo.overallExp}</p>
                    </div>)
                }
                <div className="product-tile-top-general-tag-container">
                    {tagInfo && tagInfo.generalTag &&
                        tagInfo.generalTag.map((tag, index) =>
                            (<span className="product-tile-top-general-tag" key={index}>{tag}</span>))
                    }
                </div>
                <p className="product-tile-top-general-image-text">{productTileData.generalText}</p>
            </div>
            <div className="product-tile-bottom-container">
                <div className="product-tile-bottom-general-details-container">
                    <div className="product-tile-bottom-row">
                        <p className="product-tile-bottom-product-name">{productTileData.title}</p>
                        <div className="product-tile-bottom-product-rating">
                            <ProductRating rating={productTileData.starRating} />
                        </div>
                    </div>
                    {landMarkInfo &&
                        (<div className="product-tile-bottom-row product-tile-bottom-near-info">
                            <span className="product-tile-bottom-near-landmark">{`${productTileKeys.nearText} ${landMarkInfo.title}`}</span>
                            <span className="product-tile-bottom-landmark-seprator">{` ${productTileKeys.landMarkSeprator} `}</span>
                            {landMarkInfo.nearByInfo && <span className="product-tile-bottom-details-landmark">{`${landMarkInfo.nearByInfo.distance} ${productTileKeys.nearByFrom} ${landMarkInfo.nearByInfo.title}`}</span>}
                        </div>)
                    }
                    {
                        nearByInfo && (<div className="product-tile-bottom-row product-tile-bottom-distance-info">
                            <span className="product-tile-bottom-distance-match">{`${nearByInfo.matchPercentage}${productTileKeys.percentageSymbol} ${productTileKeys.nearByMatchText} `}</span>
                            {nearByInfo.placesInfo && nearByInfo.placesInfo.map((place, index) => {
                                return <span key={index}>
                                    <span className="product-tile-bottom-distance-km"> {place.distance} </span>
                                    {productTileKeys.nearByFrom} {place.title} {(nearByInfo.placesInfo.length === index + 1) ? "" : productTileKeys.commaSeprator}
                                </span>
                            })
                            }
                        </div>)
                    }
                    {
                        dealOfferInfo && dealOfferInfoKeys && (<div className="product-tile-bottom-row product-tile-bottom-deal-offer">
                            <span className="product-tile-bottom-deal-keyword">{dealOfferInfoKeys.dealText}</span>
                            <span className="product-tile-bottom-deal-details">{`${dealOfferInfoKeys.getText} ${dealOfferInfo.discountPercentahe}${productTileKeys.percentageSymbol} ${dealOfferInfoKeys.instantDiscountText} ${dealOfferInfo.upToAmount}${productTileKeys.tripleDot}`}
                                {dealOfferInfoKeys.morelink && <a className="product-tile-bottom-deal-link" href={dealOfferInfoKeys.morelink.href}>{dealOfferInfoKeys.morelink.title}</a>}
                            </span>
                        </div>)
                    }
                    {
                        loginOfferInfoKeys && loginInOfferInfo && (<div className="product-tile-bottom-row product-tile-bottom-login-offer">
                            {loginOfferInfoKeys.discountIconImage && <img alt={loginOfferInfoKeys.discountIconImage.imageAltText} className="product-tile-bottom-discount-icon" src={loginOfferInfoKeys.discountIconImage.src} />}
                            <span className="product-tile-bottom-flat-word">{loginOfferInfoKeys.flatText} </span>
                            <span className="product-tile-bottom-flat-amount-off">{`${loginInOfferInfo.offAmount} ${loginOfferInfoKeys.offPlusSign} `}</span>
                            <span>{loginOfferInfoKeys.uptoText} </span>
                            <span className="product-tile-bottom-flat-amount-upto">{loginInOfferInfo.upToAmount} </span>
                            <span>{loginOfferInfoKeys.fromWallet}</span>
                            {loginOfferInfoKeys.loginLink && <a className="product-tile-bottom-login" href={loginOfferInfoKeys.loginLink.href}>{loginOfferInfoKeys.loginLink.title}</a>}
                        </div>)
                    }
                </div>
                <div className="product-tile-bottom-price-details-container">
                    {price && (<div className="product-tile-bottom-price-info">
                        <div className="product-tile-bottom-actual-price-container">
                            <span className="product-tile-bottom-actual-price"> {`${productTileKeys.rupeeSymbol}${currencyFormatter(price.listPrice)}`} </span>
                            <span className="product-tile-bottom-off-percentage">{`${price.discountPercentage}${productTileKeys.percentageSymbol}`}</span>
                        </div>
                        <p className="product-tile-bottom-offer-price">{`${productTileKeys.rupeeSymbol}${currencyFormatter(price.offerPrice)}`}</p>
                        <p className="product-tile-bottom-offer-price-unit">{price.unit}</p>
                    </div>)
                    }
                    <div className="product-tile-bottom-free-service-container">
                        {productTileData.freeService && productTileData.freeService.map((item, index) =>
                            <span className="product-tile-bottom-free-service-item" key={index}>{item}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

ProductTile.propTypes = {
    productTileData: PropTypes.shape({
        ProductImages: PropTypes.object.isRequired,
        tagInfo: PropTypes.object.isRequired,
        ratingInfo: PropTypes.object.isRequired
        , landMarkInfo: PropTypes.object.isRequired
        , nearByInfo: PropTypes.object.isRequired,
        dealOfferInfo: PropTypes.object,
        loginInOfferInfo: PropTypes.object,
        price: PropTypes.object.isRequired
    }),
    productTileKeys: PropTypes.object.isRequired
}