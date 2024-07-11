const checkEmtyArray = (value: any): boolean => {
    if(value && Array.isArray(value) && value.length > 0) return true
    return false
}

export {checkEmtyArray}