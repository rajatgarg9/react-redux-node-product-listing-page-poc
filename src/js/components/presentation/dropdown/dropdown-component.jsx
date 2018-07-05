import React, { Component } from "react";
import PropTypes from "prop-types";
import { ProductRating } from "../product-rating/product-rating-component.jsx";
import { selectedFliterAndSortByObjCreator, classNameValidator } from "../../../utility.js";


class DropdownComponent extends Component {
    constructor(props) {
        super(props);
        const { activeTab, dropDownList, name } = props.dropDownData;
        this.activeTab = activeTab ? Number(activeTab) : "";
        this.selectedValue = (dropDownList && dropDownList[this.activeTab]) || "";
        this.dropDownParentClass = "dropdown-list-item";

        this.state = {
            dropDownExpand: false
        }

        this.dropDownStateSetter = this.dropDownStateSetter.bind(this);

        // initialize dropDownItemCreator function to make dropdown 
        if (name === "rating") {
            this.dropDownItemCreator = this.starItemCreator;
        }
        else {
            this.dropDownItemCreator = this.normalItemItemCreator;
        }
    }


    /**
        * dropDownOutSideClickHandler -- on document click remove document event and if click outside 
        * the dropdown then close dropdown
        * @param {undefined} item 
        * @return {undefined} 
       */
    dropDownOutSideClickHandler = (event) => {
        let _currentNode = event.target,
            _outsideDropdownFlag = false;

        document.removeEventListener("click", this.dropDownOutSideClickHandler);

        // check if click is indide dropdown or not
        while (true) {
            if (!_currentNode) {
                break;
            }
            if (classNameValidator(_currentNode, this.dropDownParentClass)) {
                _outsideDropdownFlag = true;
                break;
            }
            _currentNode = _currentNode.parentNode;
        }

        //close dropdown if clicked outside
        if (!_outsideDropdownFlag) {
            this.dropDownStateSetter();
        }
    }

    /**
        * dropDownStateSetter -- on call revert state of dropdown
        * @param {undefined} item 
        * @return {undefined} 
     */
    dropDownStateSetter = () => {
        this.setState({
            dropDownExpand: !this.state.dropDownExpand
        });
    }
    /**
        * dropDownClickHandler -- on Click on dropdown change state of dropdown 
        * update redux store with new filter or sort By and rerender componet to update UI
        * @param {Object} event -- click event Info
        *  @return {undefined}
     */
    dropDownClickHandler = (event) => {
        if (!this.state.dropDownExpand) {
            document.addEventListener("click", this.dropDownOutSideClickHandler);
        }
        this.dropDownStateSetter();
        if (classNameValidator(event.target, this.dropDownParentClass)) {
            this.dropDownItemAction(event.target, this.props);
        } else if (classNameValidator(event.target.parentNode, this.dropDownParentClass)) {
            this.dropDownItemAction(event.target.parentNode, this.props);
        }
        else if (classNameValidator(event.target.parentNode.parentNode, this.dropDownParentClass)) {
            this.dropDownItemAction(event.target.parentNode.parentNode, this.props);
        }
    }

    /**
        * dropDownItemAction -- on call update store with new selected filter and sort by data and update global variables
        * in this components with new Value
        * update redux store with new filter or sort By and rerender componet to update UI
        * @param {Object} node -- html node
        * @param {Object} propData -- contain current dropdown info
        *  @return {undefined}
     */
    dropDownItemAction = (node, propData) => {
        if (!node) {
            return null;
        }
        const { dropDownData: { name, type }, categoryId, currentAppliedFilters } = propData;
        let _newFilterANDSortByObj = {};
        this.selectedValue = node.dataset['tabdata'];
        this.activeTab = Number(node.dataset['tabnumber']);

        _newFilterANDSortByObj = selectedFliterAndSortByObjCreator(currentAppliedFilters, categoryId, type, name, this.selectedValue);
        this.props.productAppliedFiltersAndSorByDataSetter(_newFilterANDSortByObj);
    }

    /**
       * starItemCreator -- make markUp for rating filter  item
       * @param {Number} item -- rating number
       * @param {Number} index -- index of particular item
       *  @return {array} -- li elemnet
    */
    starItemCreator = (item, index) => {
        return (<li
            className={`dropdown-list-item ${(this.activeTab === index) ? 'dropdown-list-item-active' : ''}`}
            key={index}
            data-tabnumber={index}
            data-tabdata={index + 1}
        ><ProductRating rating={item} />
        </li>);
    }

    /**
       * normalItemItemCreator -- make markUp for sort By item 
       * @param {String} item -- dropdown list name
       * @param {Number} index -- index of particular item
       *  @return {array} -- li elemnet
    */
    normalItemItemCreator = (item, index) => {
        return (<li
            className={`dropdown-list-item ${(this.activeTab === index) ? 'dropdown-list-item-active' : ''}`}
            key={index}
            data-tabnumber={index}
            data-tabdata={item}
        >{item}
        </li>);
    }

    render() {
        const { DropdownBox, dropDownList } = this.props.dropDownData;
        return (
            <div className={`dropdown-container  ${this.state.dropDownExpand ? '' : 'dropdown-list-close'}`}
                onClick={this.dropDownClickHandler}>
                <div className="dropdown-select-box">
                    <span className="dropdown-select-box-key">{DropdownBox.key} {DropdownBox.colonSymbol}</span>
                    {` ${DropdownBox.value ? DropdownBox.value : this.selectedValue}`}</div>
                <ul className="dropdown-list-container">
                    {
                        dropDownList && dropDownList.map((item, index) => this.dropDownItemCreator(item, index)
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default DropdownComponent;

DropdownComponent.propTypes = {
    categoryId: PropTypes.string.isRequired,
    productAppliedFiltersAndSorByDataSetter: PropTypes.func.isRequired,
    currentAppliedFilters: PropTypes.object.isRequired,
    dropDownData: PropTypes.object.isRequired
}