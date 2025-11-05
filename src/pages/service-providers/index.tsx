import React, { JSX } from "react";
import { ContactFormSection } from "@/utils/components/shared/ContactFormSection";
import { ContentWrapperSection } from "@/utils/components/service-providers/ContentWrapperSection";
import { Footer } from "@/utils/components/shared/Footer/Footer";
import { MainContentSection } from "@/utils/components/service-providers/MainContentSection";
import { NavigationBarSection } from "@/utils/components/shared/NavigationBarSection";

const ServiceProviders = (): JSX.Element => {
    return (
        <div className="relative bg-defaultwhite">
            <NavigationBarSection />
            <main className="flex w-full flex-col items-center">
                <MainContentSection />
                <ContentWrapperSection />
                <div id="contact-us">
                    <ContactFormSection />
                </div>
                <Footer />
            </main>
        </div>
    );
};

export default ServiceProviders;