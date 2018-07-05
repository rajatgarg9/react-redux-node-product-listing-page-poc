import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ProductTile } from "../../presentation/product-tile/product-tile-component.jsx";
import DropdownComponent from "../../presentation/dropdown/dropdown-component.jsx";
import { selectedFliterAndSortByObjCreator } from "../../../utility.js";




class ProductListing extends Component {

    constructor(props) {
        super(props);
        this.dropDownType = ["filter", "sort"];
        this.sortPrice = ["Price low to high", "Price high to low"];
    }

    /**
         * defaultfilterAndSortBy-- it is extracting applied filter and Sort By data from Product Data API
         * @param {object} data -- contain all the data product data API
         * @return {Object} _result --contain whole object of appled and Sort By filter
      */
    defaultfilterAndSortBy = (data) => {
        let _result = [];
        const _dataLength = data && data.length;

        for (let i = 0; i < _dataLength; i++) {
            const _filterAndSortByData = data[i].filterAndSortByData,
                _filterAndSortByDataLength = _filterAndSortByData && _filterAndSortByData.length;

            for (let j = 0; j < _filterAndSortByDataLength; j++) {
                const _activeTab = _filterAndSortByData[j].activeTab;
                if (_activeTab) {
                    const { name, type, dropDownList } = _filterAndSortByData[j];
                    _result = selectedFliterAndSortByObjCreator(_result, data[i].categoryId, type, name, dropDownList[_activeTab]);
                }
            }
        }
        return _result;
    }

    /**
         * componentWillMount-- default life cycle function used to make API call
         * @param {undefined} 
         * @return {undefined} 
      */
    componentWillMount = () => {

        const apiURL = 'http://localhost:8990/product-listing-api';

        axios.get(`${apiURL}?file=productTilesData`)
            .then((response) => {
                if (response && response.status === 200) {
                    this.props.productsDataSetter(response.data);
                    this.props.productAppliedFiltersAndSorByDataSetter(this.defaultfilterAndSortBy(response.data));
                }
            })
            .catch(function (error) {
                console.log(`messsage for product list file: ${error}`);
            });
        axios.get(`${apiURL}?file=productTileKeys`)
            .then((response) => {
                if (response && response.status === 200) {
                    this.props.productTilesKeysSetter(response.data);
                }
            })
            .catch(function (error) {
                console.log(`messsage for Global file: ${error}`);
            });
    }

    /**
         * ratingFilterHandler-- it give Number of hotels with Selected Rating
         * @param {String} selectedRating -- Rating which is selected currently
         * @param {Object} hotels -- list of Hotels
         * @return {Object} -- list of Hotels with applird rating
      */
    ratingFilterHandler = (selectedRating, hotels) => {
        let _selectedRating = Number(selectedRating);
        return hotels && hotels.filter((hotel) => {
            const _hotelRating = Number(hotel.starRating);
            return _hotelRating === _selectedRating
        })
    }

    /**
         * priceSortByHandler -- it give Number of hotels in seleted Sorted Order
         * @param {String} selectedPrice -- Sort which is selected currently
         * @param {Object} hotels -- list of Hotels
         *  @return {Object} -- list of Hotels with sorted order on the basis of offer Price
      */
    priceSortByHandler = (selectedPrice, hotels) => {
        const _selectedPrice = selectedPrice;
        let _hotels = JSON.parse(JSON.stringify(hotels));

        if (_selectedPrice === this.sortPrice[0]) {
            _hotels = _hotels && _hotels.sort((a, b) => {
                return Number(a.price.offerPrice) - Number(b.price.offerPrice);
            });
        }
        else {
            _hotels = _hotels && _hotels.sort((a, b) => {
                return Number(b.price.offerPrice) - Number(a.price.offerPrice);
            });
        }

        return _hotels;

    }

    /**
        * selectedFilterAndSortByHandler -- it apply sorting and filtering and return hotels array
        * @param {Object} appliedFilter -- Applied Filter and Sort By of a category
        * @param {String} categoryId -- Hotel city Id and it will be unique
        *  @return {Object} -- _hotelsResult --ner formatted array
     */
    selectedFilterAndSortByHandler = (appliedFilter, categoryId, hotels) => {
        const _currentCategoryAppliedFilter = appliedFilter && appliedFilter[categoryId];

        let _hotelsResult = hotels,
            _ratingFilter,
            _priceSortBy;


        if (_currentCategoryAppliedFilter) {
            _ratingFilter = _currentCategoryAppliedFilter[this.dropDownType[0]];
            _priceSortBy = _currentCategoryAppliedFilter[this.dropDownType[1]];
            if (_ratingFilter) {
                _hotelsResult = this.ratingFilterHandler(_ratingFilter.value, hotels);
            }
            if (_priceSortBy) {
                _hotelsResult = this.priceSortByHandler(_priceSortBy.value, _hotelsResult);
            }
        } else {
            return _hotelsResult;
        }
        return _hotelsResult;
    }

    render() {

        const { productsData, productTilesKeys, productAppliedFilterAndSortBy } = this.props


        return (
            <div className="product-listing-container">
                {
                    productsData && productsData.map((item, index) => {
                        const { hotels, filterAndSortByData, hotelPlace, categoryId } = item,
                            _filteredAndSortedHotels = this.selectedFilterAndSortByHandler(productAppliedFilterAndSortBy, categoryId, hotels);

                        return (
                            <React.Fragment key={index}>
                                <div className="product-listing-header">
                                    <div className="product-listing-hotel-city-info-container">
                                        <p className="product-listing-hotel-city-name">{hotelPlace}
                                            <span className="product-listing-hotel-count"> {`(${_filteredAndSortedHotels && _filteredAndSortedHotels.length} ${productTilesKeys && productTilesKeys.hotelText})`}</span>
                                        </p>
                                    </div>
                                    <div className="product-listing-dropdown-container">
                                        {
                                            filterAndSortByData && filterAndSortByData.map((item, index) =>
                                                <DropdownComponent
                                                    key={index}
                                                    dropDownData={item}
                                                    categoryId={categoryId}
                                                    currentAppliedFilters={productAppliedFilterAndSortBy}
                                                    productAppliedFiltersAndSorByDataSetter={this.props.productAppliedFiltersAndSorByDataSetter}
                                                />)
                                        }
                                    </div>
                                </div>
                                <div className="product-listing-tile-container">
                                    {
                                        _filteredAndSortedHotels && _filteredAndSortedHotels.map((hotel, index) => {
                                            return (<ProductTile
                                                productTileData={hotel}
                                                productTileKeys={productTilesKeys}
                                                key={index}
                                            />)
                                        })
                                    }
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        );
    }
}

export default ProductListing;


ProductListing.propTypes = {
    productsData: PropTypes.array.isRequired,
    productTilesKeys: PropTypes.object.isRequired,
    productAppliedFilterAndSortBy: PropTypes.object.isRequired,
    productsDataSetter: PropTypes.func.isRequired,
    productTilesKeysSetter: PropTypes.func.isRequired,
    productAppliedFiltersAndSorByDataSetter: PropTypes.func.isRequired
}