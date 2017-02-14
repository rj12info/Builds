/**
 * Created by jayanth on 09/02/17.
 */

var addItemActionCreator = function (item) {
    return {
        type: 'ADD_ITEM',
        item: item
    }
}

export default addItemActionCreator
