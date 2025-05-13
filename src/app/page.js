'use client';

import {StepsSection} from "@/components/home/StepsSection";
import {HeroSection} from "@/components/home/HeroSection";
import {BenefitsSection} from "@/components/home/BenefitsSection";
import {CallToAction} from "@/components/home/CallToAction";
import {useEffect, useState} from "react";
import {axiosClient} from "@/lib/axiosClient";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "@/store/slices/authSlice";

export default function HomePage() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {isAuthenticated, user} = useSelector(state => state.auth);
    useEffect(() => {
        if (isAuthenticated) {
            getUser()
        }
    }, [isAuthenticated]);

    const getUser = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/users/me');
            console.log('response', response);
            dispatch(setUser(response.data));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
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
