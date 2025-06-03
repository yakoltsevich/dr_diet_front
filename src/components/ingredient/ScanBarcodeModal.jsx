'use client';

import {Modal, ModalBody, ModalContent, ModalHeader,} from '@heroui/modal';
import {BarcodeScannerContainer} from "@/components/scanner/BarcodeScannerContainer";

export const ScanBarcodeModal = ({isOpen, onClose, onCreated, setAddModal, setScannedData}) => {

    return (
        <Modal scrollBehavior='outside' isOpen={isOpen} onClose={onClose} size="md">
            <ModalContent>
                <ModalHeader>Scan Barcode</ModalHeader>
                <ModalBody className="space-y-3">
                    <BarcodeScannerContainer setAddModal={setAddModal} setScannedData={setScannedData} onClose={onClose}
                                             isOpen={isOpen}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
