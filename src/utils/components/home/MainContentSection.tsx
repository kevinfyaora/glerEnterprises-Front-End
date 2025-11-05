import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Notification from "@/utils/components/shared/Notification";
import { howItWorksSteps, services } from './data';
export const MainContentSection = () => {
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        name: "",
    });
    const { t } = useTranslation();
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    const handleBookButtonClick = () => {
        setNotification({
            message: "This functionality will come soon",
            type: 'warning',
        });
    };

    return (
        <>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <section className="w-full flex-col items-center gap-8 bg-GLORIOUS-ui-section-bg px-4 py-10 md:gap-16 md:p-20 flex">
                <header className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2">
                    <h2 className="self-stretch text-center font-['Poppins-Bold',_sans-serif] text-3xl font-bold leading-tight text-coolgray-90 md:text-[42px] md:leading-[110%]">
                        {t('home.howItWorks')}
                    </h2>
                </header>
                <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-8 md:flex-row md:gap-4">
                    {howItWorksSteps.map((step, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center text-center gap-4 px-4">
                            <div className="p-3 rounded-full flex items-center justify-center">
                                <img
                                    className="w-12 h-12"
                                    src={step.icon}
                                    alt={step.alt}
                                />
                            </div>
                            <h3 className="text-coolgray-90 font-['Poppins-SemiBold',_sans-serif] text-lg font-semibold self-stretch leading-[140%]">
                                {t(step.title)}
                            </h3>
                            <p className="text-coolgray-90 font-['Poppins-Regular',_sans-serif] text-lg font-normal self-stretch leading-[140%]">
                                {t(step.description)}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="flex w-full flex-col items-center gap-8 px-4 py-10 md:gap-16 md:p-20">
                <header className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2">
                    <h2 className="self-stretch text-center font-['Poppins-Bold',_sans-serif] text-3xl font-bold leading-tight text-[#21272a] md:text-[42px] md:leading-[110%]">
                        {t('home.whatCanYouBook')}
                    </h2>
                </header>
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:gap-20">
                    {services.map((service, index) => {
                        const imageContent = (
                            <div className={service.imageContainerClass}>
                                <div className={`relative ${service.name === 'home-cleaning' ? 'max-w-[520px]' : service.name === 'car-valet' ? 'max-w-[470px]' : 'max-w-[440px]'} mx-auto`}>
                                    <img
                                        className="h-auto w-full"
                                        src={service.image}
                                        alt={service.alt}
                                    />
                                    {service.name === 'car-valet' &&
                                        <div className="absolute top-[20%] left-[40%] text-xl font-bold text-white">
                                            {t('home.carWash')}
                                        </div>
                                    }
                                </div>
                            </div>
                        );
                        const textContent = (
                            <div className="flex w-full flex-col items-start justify-center gap-8 py-8 md:w-1/2 md:gap-12">
                                <div className="flex flex-col items-start self-stretch gap-2">
                                    <h3 className="self-stretch text-left font-['Poppins-Bold',_sans-serif] text-2xl font-bold leading-[110%] text-[#21272a] md:text-[32px]">
                                        {t(service.title)}
                                    </h3>
                                </div>
                                <p className="self-stretch text-left font-['Poppins-Regular',_sans-serif] text-lg font-normal leading-[140%] text-[#21272a]">
                                    {t(service.description)}
                                </p>
                                <button
                                    type="button"
                                    onClick={handleBookButtonClick}
                                    className="flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 font-poppins text-base font-medium text-white shadow-[1px_1px_3px_rgba(0,0,0,0.1),_5px_3px_6px_rgba(0,0,0,0.09),_10px_8px_8px_rgba(0,0,0,0.05),_18px_13px_9px_rgba(0,0,0,0.01),_29px_21px_10px_rgba(0,0,0,0)] transition-opacity hover:opacity-90"
                                    style={{ letterSpacing: "0.5px" }}
                                >
                                    {t(service.buttonText)}
                                </button>
                            </div>
                        );

                        return (
                            <div key={index} className={`flex flex-col items-center gap-10 ${service.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                                {imageContent}
                                {textContent}
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    );
};