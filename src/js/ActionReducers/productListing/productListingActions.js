/**
     * productsDataAction-- on call fire action to update product tiles data
     * @param {object} payload -- contain data for Products tiles
     * @return {Object} type of action and its data in payload
  */

export const productsDataAction = (payload) => ({
    type: "PRODUCT_LISTING_SET_PRODUCT_DATA",
    payload
})

/**
     * productTilesKeysAction-- on call fire action to update product tiles keys
     * @param {object} payload -- contain data for Products toiles keys
     * @return {Object} type of action and its data in payload
  */
export const productTilesKeysAction = (payload) => ({
    type: "PRODUCT_LISTING_SET_PRODUCT_TILES_KEYS",
    payload
})

/**
     * productsDataAction-- on call fire action to update applied filter and Sort By data
     * @param {object} payload -- contain data for applied filter and Sort By
     * @return {Object} type of action and its data in payload
  */
export const productAppliedFiltersAndSortByAction = (payload) => ({
    type: "PRODUCT_LISTING_SET_PRODUCT_APPLIED_FILTERS_SORTBY",
    payload
})