import Immutable from 'seamless-immutable';

//default States
let defaultProductListingStore = Immutable({
    productsData: [],
    productTilesKeys: {},
    productAppliedFilterAndSortBy: {}
});


/**
     * productListComponent-- of any dispatch action of product tiles it will update store
     * @param {object} state -- contain previous sate or default states
      * @param {object} action -- contain action.type and action.payload (data)
     * @return {Object} type of action and its data in payload
  */
export const productListComponent = (state = defaultProductListingStore, action) => {

    switch (action.type) {
        case "PRODUCT_LISTING_SET_PRODUCT_DATA":
            return Immutable.set(state, "productsData", action.payload);
        case "PRODUCT_LISTING_SET_PRODUCT_TILES_KEYS":
            return Immutable.set(state, "productTilesKeys", action.payload);
        case "PRODUCT_LISTING_SET_PRODUCT_APPLIED_FILTERS_SORTBY":
            return Immutable.set(state, "productAppliedFilterAndSortBy", action.payload);
        default:
            return state;
    }
}