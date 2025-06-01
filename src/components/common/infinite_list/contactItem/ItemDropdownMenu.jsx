import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,} from "@heroui/react";
import {faBan, faEllipsis} from "@fortawesome/free-solid-svg-icons";
import {Icon} from "@/components/common/Icon";

export const ItemDropdownMenu = ({pubId}) => {
    const disableContact = () => {
        const requestData = {
            route: 'contact/update',
            status: 'disabled',
            pubId
        }
        // postSourceData(requestData)
    }
    const dropdownItems = [
        {
            key: "disableContact",
            title: "Disable Contact",
            onPress: () => {
                disableContact()
            },
            startContent: <Icon icon={faBan}/>,
        },
    ];

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    className="capitalize -mr-2 -my-2 z-0"
                    isIconOnly
                    variant={"light"}
                    size={"sm"}
                    radius="full"
                >
                    <Icon icon={faEllipsis}/>
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                variant="flat"
                items={dropdownItems}
                aria-label="Example with disabled actions"
            >
                {(item) => {
                    return (
                        <DropdownItem
                            onPress={item.onPress}
                            startContent={item.startContent}
                            key={item.key}
                            title={item.title}
                        />
                    );
                }}
            </DropdownMenu>
        </Dropdown>
    );
}
