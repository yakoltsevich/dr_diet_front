'use client';

import React, {useEffect, useState} from 'react';
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,} from '@heroui/modal';
import {Input} from '@heroui/input';
import {Button} from '@heroui/button';
import {axiosClient} from "@/lib/axiosClient";
import {NumberInput} from "@heroui/react";
import isEqual from 'lodash/isEqual';
import {Icon} from "@/components/common/Icon";
import {faBarcode} from "@fortawesome/free-solid-svg-icons";
import {BarcodeScannerContainer} from "@/components/scanner/BarcodeScannerContainer";

const NUTRIENT_CONF = [
    {
        key: 'calories',
        label: 'Calories',
        placeholder: 'Calories',
    },
    {
        key: 'protein',
        label: 'Protein per 100g',
        placeholder: 'Proteins',
    },
    {
        key: 'fat',
        label: 'Fat per 100g',
        placeholder: 'Fats',
    },
    {
        key: 'carbs',
        label: 'Carbs',
        placeholder: 'Carbs',
    },
]

export const createdBy = {
    user: 'user',
    admin: 'admin',
    ai: 'ai',
}

export function AddIngredientModal({isOpen, onClose, onCreated}) {
    const [loading, setLoading] = useState(false);
    const [enableScan, setEnableScan] = useState(false);
    const [scannedData, setScannedData] = useState(null);

    const [form, setForm] = useState({
        name: '',
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
    });

    useEffect(() => {
        if (!scannedData) return;
        const updated = {
            name: scannedData?.name || '',
            calories: scannedData?.calories || 0,
            protein: scannedData?.protein || 0,
            fat: scannedData?.fat || 0,
            carbs: scannedData?.carbs || 0,
        };

        setForm((prev) => (isEqual(prev, updated) ? prev : updated));
    }, [scannedData]);

    const handleChange = (field, value) => {
        setForm((prev) => ({...prev, [field]: value}));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.post('/ingredients', {
                ...form,
                calories: parseFloat(form.calories),
                protein: parseFloat(form.protein),
                fat: parseFloat(form.fat),
                carbs: parseFloat(form.carbs),
                createdBy: createdBy.user
            });

            const ingredient = res.data;
            onCreated(ingredient);
            onClose();
            setForm({name: '', calories: '', protein: '', fat: '', carbs: ''});
        } catch (err) {
            alert(err?.response?.data?.message || 'Ошибка при создании ингредиента');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal scrollBehavior='outside' isOpen={isOpen} onClose={onClose} size="md">
            <ModalContent>
                <ModalHeader>New Ingredient</ModalHeader>
                <ModalBody className="space-y-3 relative">
                    {enableScan &&
                        <div className="absolute inset-0 w-full h-full z-[9999]">
                            <div className="absolute inset-0 w-full h-full backdrop-blur-sm  z-0" />
                            <div className="relative z-10">
                                <BarcodeScannerContainer
                                    setScannedData={setScannedData}
                                    onClose={() => setEnableScan(false)}
                                />
                            </div>
                        </div>}
                    <Input
                        isRequired
                        label="Name"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    {NUTRIENT_CONF.map(item => (
                        <NumberInput
                            key={item.key}
                            label={item.label}
                            placeholder={item.placeholder}
                            minValue={0}
                            onFocus={(e) => e.target.select()}
                            isRequired
                            value={form[item.key]}
                            onValueChange={(value) => handleChange(item.key, value)}
                        />
                    ))}

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onPress={() => setEnableScan(prev => !prev)}
                        isLoading={loading}
                        className="bg-[#5e7a76] text-white"
                        isIconOnly
                    >
                        <Icon icon={faBarcode}/>
                    </Button>

                    <div className='flex-1'/>
                    <Button variant="light" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button
                        isDisabled={form.name.length === 0}
                        color="primary"
                        onPress={handleSubmit}
                        isLoading={loading}
                        className="bg-[#5e7a76] text-white"
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
