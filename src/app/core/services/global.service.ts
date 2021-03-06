export let caches: any = {
    isMenuAction: false 
    
};

export const getFormattedDate = function (date) {
    if (date == '') return '';
    try {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return month + '/' + day + '/' + year;
    }
    catch (err) {
        return 'error';
    }
}

export const isNumeric = function(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

//Convert to UpperCamelCase.
export const camelize = function(str: string): string {
    return str.replace(/\b\w/g, chr => chr.toUpperCase()).replace(/ /g, '');
}

export const deepClone = function(source: any): any {
    // return value is input is not an Object or Array.
    if (typeof (source) !== 'object' || source === null) {
        return source;
    }
    let clone: any;
    if (Array.isArray(source)) {
        clone = source.slice();  // unlink Array reference.
    } else {
        clone = Object.assign({}, source); // Unlink Object reference.
    }
    let keys = Object.keys(clone);
    for (let i = 0; i < keys.length; i++) {
        clone[keys[i]] = deepClone(clone[keys[i]]); // recursively unlink reference to nested objects.
    }
    return clone; // return unlinked clone.
}

export const isArray = function(source : any): boolean {
    return Array.isArray(source);
}
