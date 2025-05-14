'use client';

import {StepsSection} from "@/components/home/StepsSection";
import {HeroSection} from "@/components/home/HeroSection";
import {BenefitsSection} from "@/components/home/BenefitsSection";
import {CallToAction} from "@/components/home/CallToAction";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

export default function HomePage() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    if (loading) return <div>Loading...</div>;
    return (
        <main className="bg-[#f3f3f2] text-[#353535] flex flex-col items-center justify-center w-full">
            <HeroSection/>
            <StepsSection/>
            <BenefitsSection/>
            <CallToAction/>
        </main>
    );
}
