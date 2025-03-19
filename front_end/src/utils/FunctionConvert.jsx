export const getOjectById = (data, id) => {
    
    return data?.find(e => e.id === id);
};

export const filterListById = (data,id,title) => {

    return data?.filter(e => e[title]   === id);
}