import React, { JSX } from "react";
import { ContactFormSection } from "@/utils/components/shared/ContactFormSection";
import { ContentWrapperSection } from "@/utils/components/investors/ContentWrapperSection";
import { Footer } from "@/utils/components/shared/Footer/Footer";
import { MainContentSection } from "@/utils/components/investors/MainContentSection";
import { NavigationBarSection } from "@/utils/components/shared/NavigationBarSection";

const ServiceProviders = (): JSX.Element => {
    return (
        <div className="flex w-full flex-col items-center relative bg-defaultwhite">
            <NavigationBarSection />
            <MainContentSection />
            <ContentWrapperSection />
            <div id="contact-us">
                <ContactFormSection />
            </div>
            <Footer />
        </div>
    );
};

export default ServiceProviders;