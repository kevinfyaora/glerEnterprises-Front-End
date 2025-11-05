import React, { useState } from "react";
import TermsAndConditionsDialog from "@/pages/terms-and-conditions";
import axios from "axios";
import Notification from "@/utils/components/shared/Notification";
import { environment } from "@/environment";
import { useTranslation } from "react-i18next";
import { INotificationProps } from "../home/types";

export const ContactFormSection = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });
    const [notification, setNotification] = useState<INotificationProps | null>(null);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const { t } = useTranslation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (agreedToTerms && formData.email && formData.message) {
                const response = await axios.post(`${environment.apiUrl}/inquiry`, formData);

                if (response.status === 200 || response.status === 201) {
                    setNotification({ message: t("Form submitted successfully"), type: 'success' });
                    setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        message: "",
                    });
                }
            }

        } catch (error) {
            console.error("Form submission error:", error);
            setNotification({ message: t("Failed to submit your form. Please try again later."), type: 'error' });
        }
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
            <section className="flex w-full flex-col items-center justify-center gap-12 bg-uisectionbg p-4 sm:p-8 md:flex-row md:p-12 lg:p-20">
                <div className="flex w-full max-w-md items-center justify-center md:max-w-lg lg:max-w-xl">
                    <img
                        className="h-auto w-full max-w-[510.89px]"
                        src="/familyClean.svg"
                        alt={"Family Cleaning Service"} />
                </div>
                <div className="flex flex-col items-start justify-start gap-8">
                    <div className="flex flex-col items-start justify-start gap-2 self-stretch">
                        <div className="flex flex-col items-center justify-start gap-2 self-stretch">
                            <div className="self-stretch text-left font-['Poppins-Bold',_sans-serif] text-3xl font-bold leading-[110%] text-coolgray-90 md:text-[42px]">
                                {t('home.contactGlerTeam')}
                            </div>
                        </div>
                        <div className="self-stretch text-left font-['Poppins-Regular',_sans-serif] text-lg font-normal leading-[140%] text-coolgray-90">
                            {t('home.contactGlerTeamDescription')}
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col items-start justify-start gap-4 md:max-w-lg lg:max-w-xl">
                        <div className="flex w-full flex-col gap-4 sm:flex-row">
                            <div className="flex flex-1 flex-col items-start justify-start gap-1">
                                <div className="flex flex-col items-start justify-start gap-2 self-stretch">
                                    <label htmlFor="firstName" className="self-stretch text-left font-['Poppins-Regular',_sans-serif] text-sm font-normal leading-[140%] text-coolgray-90">
                                        {t('home.firstName')}
                                    </label>
                                    <div className="flex h-12 flex-row items-center justify-start gap-2 self-stretch border-b border-solid border-coolgray-30 bg-coolgray-10 pt-3 pr-4 pb-3 pl-4">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder={t('home.enterFirstName')}
                                            className="relative flex-1 bg-transparent text-left font-['Poppins-Regular',_sans-serif] text-base font-normal leading-[140%] text-coolgray-60 placeholder-coolgray-60 focus:text-coolgray-90 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col items-start justify-start gap-1">
                                <div className="flex flex-col items-start justify-start gap-2 self-stretch">
                                    <label htmlFor="lastName" className="self-stretch text-left font-['Poppins-Regular',_sans-serif] text-sm font-normal leading-[140%] text-coolgray-90">
                                        {t('home.lastName')}
                                    </label>
                                    <div className="flex h-12 flex-row items-center justify-start gap-2 self-stretch border-b border-solid border-coolgray-30 bg-coolgray-10 pt-3 pr-4 pb-3 pl-4">
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder={t('home.enterLastName')}
                                            className="relative flex-1 bg-transparent text-left font-['Poppins-Regular',_sans-serif] text-base font-normal leading-[140%] text-coolgray-60 placeholder-coolgray-60 focus:text-coolgray-90 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-start gap-1 self-stretch">
                            <div className="flex flex-col items-start justify-start gap-2 self-stretch">
                                <label htmlFor="email" className="self-stretch text-left font-['Poppins-Regular',_sans-serif] text-sm font-normal leading-[140%] text-coolgray-90">
                                    {t('home.email')}
                                </label>
                                <div className="flex h-12 flex-row items-center justify-start gap-2 self-stretch border-b border-solid border-coolgray-30 bg-coolgray-10 pt-3 pr-4 pb-3 pl-4">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder={t('home.enterEmail')}
                                        className="relative flex-1 bg-transparent text-left font-['Poppins-Regular',_sans-serif] text-base font-normal leading-[140%] text-coolgray-60 placeholder-coolgray-60 focus:text-coolgray-90 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-start gap-1 self-stretch">
                            <div className="flex flex-col items-start justify-start gap-2 self-stretch">
                                <label htmlFor="message" className="self-stretch text-left font-['Poppins-Regular',_sans-serif] text-sm font-normal leading-[140%] text-coolgray-90">
                                    {t('home.yourMessage')}
                                </label>
                                <div className="flex h-24 flex-row items-start justify-start gap-2 self-stretch border-b border-solid border-coolgray-30 bg-coolgray-10 pt-3.5 pr-4 pb-3.5 pl-4">
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder={t('home.enterYourMessage')}
                                        className="relative flex-1 resize-none bg-transparent text-left font-['Poppins-Regular',_sans-serif] text-base font-normal leading-[140%] text-coolgray-60 placeholder-coolgray-60 focus:text-coolgray-90 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-2">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="mr-2 appearance-auto"
                            />
                            <label htmlFor="terms">
                                <span className="i-agree-to-the-privacy-policy-terms-span">
                                    {t('home.agreeToTerms')}{' '}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setIsDialogOpen(true)}
                                    className="text-blue-600 hover:underline"
                                >
                                    {t('home.privacyPolicyAndTerms')}
                                </button>
                                <span>.</span>
                            </label>
                            {isDialogOpen && (
                                <TermsAndConditionsDialog onClose={() => setIsDialogOpen(false)} />
                            )}
                        </div>
                        <div className="flex flex-row items-center justify-end gap-4 self-stretch">
                            <button
                                type="submit"
                                className="flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 font-poppins text-base font-medium text-white
                            shadow-[1px_1px_3px_rgba(0,0,0,0.1),_5px_3px_6px_rgba(0,0,0,0.09),_10px_8px_8px_rgba(0,0,0,0.05),_18px_13px_9px_rgba(0,0,0,0.01),_29px_21px_10px_rgba(0,0,0,0)] transition-opacity hover:opacity-90 disabled:opacity-50"
                                style={{ letterSpacing: "0.5px" }}
                                disabled={!agreedToTerms || !formData.email || !formData.message}
                            // onClick={handleSubmit}
                            >
                                {t('home.submit')}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};