import {faCircle, faUser} from "@fortawesome/free-solid-svg-icons";

export const contactsFormatter = (items) => {
    return items.map(item => ({
        ...item,
        value: item.pubId,
        id_slt: item.pubId,
        pubId_slt: item.pubId,
        title_slt: item.name,
        logo_slt: {
            icon: faUser,
            // iconClass: 'text-red-500'
        }
        // tagColor_slt: getColorFromHash(item.title)
    }))
}
export const ingredientFormatter = (items) => {
    return items.map(item => ({
        ...item,
        value: item.pubId,
        id_slt: item.pubId,
        title_slt: item.name,
    }))
}

export const countryFormatter = (items) => {
    return items.map(item => ({
        ...item,
        value: item.id,
        id_slt: item.id,
        pubId_slt: item.alpha3Code,
        title_slt: item.name,
        subtitle_slt: item.objType,
        logo_slt: {
            imageSrc: `assets/images/flags/${item.code}.svg`,
        }
        // flags_slt: ['contact', 'cert', 'batch'],
    }))
}


export default {
    contactsFormatter,
    countryFormatter,
}