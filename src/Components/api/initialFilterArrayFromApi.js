const initialFilterArrayFromApi = (allProductsDataFromApi) => {
    const rawColorList = allProductsDataFromApi.map((item) => item.color);
    const rawGenderList = allProductsDataFromApi.map((item) => item.gender);
    const rawTypeList = allProductsDataFromApi.map((item) => item.type);
    const rawPriceList = allProductsDataFromApi.map((item) => item.price).sort();
    const removeDuplicates = (arr) => {
        return [...new Set(arr)];
    }
    const pureGenderList = removeDuplicates(rawGenderList).map((value) => ({ 'fval': value, 'selected': false }));
    const pureTypeList = removeDuplicates(rawTypeList).map((value) => ({ 'fval': value, 'selected': false }));
    const pureColorList = removeDuplicates(rawColorList).map((value) => ({ 'fval': value, 'selected': false }));
    // const purePriceList = removeDuplicates(rawPriceList).map((value) => ({ 'fval': parseInt(value), 'selected': false }));
    const purePriceList = removeDuplicates(rawPriceList).map((value) => {
        const range = value <= 300 ? '0 - 300' : value <= 400 ? '301 - 400' : '401 - 500';
        return ({ 'fval': range, 'selected': false });
    });
    const jsonObject = purePriceList.map(JSON.stringify);
    const uniquePriceRangeSet = new Set(jsonObject);
    const uniquePriceRangeArray = Array.from(uniquePriceRangeSet).map(JSON.parse);
    
    // console.log(purePriceList);
    // console.log(uniquePriceRangeArray);

    return { 'gender': [...pureGenderList], 'type': [...pureTypeList], 'price': [...uniquePriceRangeArray], 'color': [...pureColorList] };
    // return {'gender': [...pureGenderList], 'type': [...pureTypeList], 'color': [...pureColorList]};
}
export default initialFilterArrayFromApi;