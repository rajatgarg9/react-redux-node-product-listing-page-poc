/**
     * selectedFilterAndSortByHandler -- it will cmodify current Dropdown State(like rating filter sort BY)
     * @param {Object} currentAppliedFilters -- Applied Filter and Sort By  category
     * @param {String} categoryId -- Hotel city Id and it will be unique
     * @param {String} name -- name of dropdown
     *  @param {value} categoryId -- new selected value filter
     *  @return {Object} -- new updated filter and Sort By data
  */
export const selectedFliterAndSortByObjCreator = (currentAppliedFilters, categoryId, type, name, value) => {
    return {
        ...currentAppliedFilters,
        [categoryId]: {
            ...currentAppliedFilters[categoryId],
            [type]: {
                "name": name,
                "value": value
            }
        }
    }
}

/**
     * classNameValidator -- it validate targetClass is in  node or not
     * @param {array} node --node elemnt 
     * @param {String} targetClass -- class which need to be verified in nodeArray
     *  @return {Boolean} -- if targetClass exist in nodeArray it return true otherwise false
  */
export const classNameValidator = (node, targetClass) => {
    let classes = node && node.className && node.className.split(" "),
        index = classes && classes.indexOf(targetClass);
    if (`${index}` && (index >= 0)) {
        return true;
    }
    return false;
}