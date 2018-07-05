import ProductListing from './product-listing-component.jsx';
import { connect } from 'react-redux';

import { productsDataAction, productTilesKeysAction, productAppliedFiltersAndSortByAction } from '../../../ActionReducers/productListing/productListingActions.js';

const mapStateToProps = (state, props) => {

    return {
        productsData: state.productListComponent.productsData,
        productTilesKeys: state.productListComponent.productTilesKeys,
        productAppliedFilterAndSortBy: state.productListComponent.productAppliedFilterAndSortBy
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        productsDataSetter: (productsdata) => {
            dispatch(productsDataAction(productsdata));
        },
        productTilesKeysSetter: (productsTilesKeysdata) => {
            dispatch(productTilesKeysAction(productsTilesKeysdata));
        },
        productAppliedFiltersAndSorByDataSetter: (productAppliedFiltersAndSortByDate) => {
            dispatch(productAppliedFiltersAndSortByAction(productAppliedFiltersAndSortByDate));
        }
    }
}


export const ProductListingContainer = connect(mapStateToProps, mapDispatchToProps)(ProductListing);