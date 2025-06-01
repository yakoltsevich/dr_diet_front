import {axiosClient} from "@/lib/axiosClient";

export const postSourceData = (data) => {
    return axiosClient({
        method: 'POST',
        url: `?route=${data.route}`,
        data,
    });
};


export const getIngredients = (data) => {
    return axiosClient({
        method: 'GET',
        url: `ingredients`,
        data,
    });
};

