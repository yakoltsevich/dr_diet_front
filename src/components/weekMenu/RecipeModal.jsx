'use client';


import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Button} from "@heroui/button";

export const RecipeModal = ({isOpen, onClose, title, recipe})=> {
    if (!recipe) return null;

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <ModalContent>
                {(close) => (
                    <>
                        <ModalHeader className="text-xl font-bold text-textColor">{title}</ModalHeader>
                        <ModalBody className="space-y-4 text-textColor text-sm">
                            <div>
                                <h3 className="font-semibold text-primaryColor">Ингредиенты:</h3>
                                <ul className="list-disc list-inside mt-1">
                                    {recipe.ingredients.map((item, i) => (
                                        <li key={i}>
                                            {item.item} — {item.amount}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-primaryColor">Шаги приготовления:</h3>
                                <ol className="list-decimal list-inside mt-1">
                                    {recipe.steps.map((step, i) => (
                                        <li key={i}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button className="bg-primaryColor text-white w-full" onPress={close}>
                                Закрыть
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
