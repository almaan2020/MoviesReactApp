import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items)     //return a lodash object
        .slice(startIndex)   //slice lodash array from this index
        .take(pageSize)    //take array to this index
        .value();    //return a regular array
}
