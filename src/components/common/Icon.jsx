import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Icon = ({
                         size,
                         className,
                         pulse,
                         icon,
                         inverse,
                         transform,
                         click,
                         spin,
                     }) => {
    return (
        <FontAwesomeIcon
            icon={icon}
            size={size ?? "1x"}
            className={className}
            pulse={pulse}
            inverse={inverse}
            transform={transform}
            onClick={click}
            spin={spin}
        />
    );
};
