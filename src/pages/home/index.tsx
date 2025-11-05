import "@/i18n";
import React from 'react';
import Waitlist from "@/utils/components/home/joinWaitlist";
import { NavigationBarSection } from "@/utils/components/shared/NavigationBarSection";
import { Footer } from "@/utils/components/shared/Footer/Footer";
import { ContactFormSection } from "@/utils/components/shared/ContactFormSection";
import { MainContentSection } from "@/utils/components/home/MainContentSection";

export interface ILandingPageCostumerWebProps {
    className?: string;
}

export default function LandingPageCostumerWeb({
    className,
    ...props
}: ILandingPageCostumerWebProps) {
    return (
        <div
            className={
                "bg-default-white flex flex-col gap-0 items-center justify-start relative w-full " +
                (className || '')
            }
        >
            <NavigationBarSection />
            <Waitlist />
            <MainContentSection />
            <div id="contact-us">
                <ContactFormSection />
            </div>
            <Footer />
        </div>
    );
};