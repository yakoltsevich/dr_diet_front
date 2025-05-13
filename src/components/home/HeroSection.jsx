'use client';

import Image from 'next/image';
import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';
import { useRouter } from 'next/navigation';

export const HeroSection = () => {
    const router = useRouter();

    const onLearnMorePress = () => {
        router.push('/learn-more');
    };

    return (
        <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16">
            <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-[#353535]">
                    Your personalized meal plan — effortlessly
                </h1>
                <p className="text-lg text-primaryColor">
                    Generate a balanced weekly menu, explore recipes, and get a shopping list tailored to your goals.
                </p>
                <div className="flex gap-4">
                    <Button size="lg" className="bg-primaryColor text-white px-6 py-3 rounded-lg shadow-lg">
                        Get Started
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border border-primaryColor text-primaryColor px-6 py-3 rounded-lg bg-transparent"
                        onPress={onLearnMorePress}
                    >
                        Learn More
                    </Button>
                </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
                <Card className="shadow-none border-0 bg-transparent">
                    <CardBody className="p-0">
                        <Image
                            src="/woman.png"
                            alt="Healthy food"
                            width={500}
                            height={500}
                            className="w-full h-auto object-cover"
                        />
                    </CardBody>
                </Card>
            </div>
        </section>
    );
};
