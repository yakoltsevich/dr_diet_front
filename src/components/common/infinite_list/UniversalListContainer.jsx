import {useRef, useState} from "react";
import {ContactItem} from "@/components/common/infinite_list/contactItem/ContactItem";
import {UniversalList} from "@/components/common/infinite_list/UniversalList";


export const UniversalListContainer = () => {
    const LIST_CONFIG = {
        mainKey: 'pubId',
        requestData: {
            route: 'contact/get',
            sessionId: "25HJJ8",
        },
        scrollToTop: true,
        groupBy: {
            title: 'Date',
            count: true,
            key: 'timestamp'
        },
        checkBoxEnabled: true,
        itemContent: (index, item, highlightValue) => {
            if (!item) {
                return null
            }
            return (
                <ContactItem item={item}/>
            )
        }
    }

    const scrollToFifth = () => {
        listRef.current?.scrollToIndex?.(5); // 👈 вызываем scrollToIndex
    };
    const listRef = useRef(null); // 👈 создаём ref
    return (
            <UniversalList ref={listRef} listConfig={LIST_CONFIG}/>
    );
};
