import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { environment } from "@/environment";
import Notification from "@/utils/components/shared/Notification";
import { benefitsData, formFields } from './data'
import { INotificationProps } from './types';

export default function JoinWaitlist() {
    const { t } = useTranslation();
    const [notification, setNotification] = useState<INotificationProps | null>(null);
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        postcode: "",
    });

    const validateEmail = (email: string) => {
        if (!email) {
            setEmailError(t("joinWaitlist.errors.email.required"));
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setEmailError("");
            return true;
        } else {
            setEmailError(t("joinWaitlist.errors.email.invalid"));
            return false;
        }
    };

    const validatePhone = (phone: string) => {
        if (!phone) {
            setPhoneError("");
            return true;
        }
        // Basic UK phone number validation (starts with 07 or +447, followed by 9 digits)
        const cleanedPhone = phone.replace(/\s/g, '');
        const ukPhoneRegex = /^(07\d{9}|\+447\d{9})$/;
        if (ukPhoneRegex.test(cleanedPhone)) {
            setPhoneError("");
            return true;
        } else {
            setPhoneError(t("joinWaitlist.errors.phone.invalid"));
            return false;
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        if (field === "phone") {
            validatePhone(value);
        }
        if (field === "email") {
            validateEmail(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isEmailValid = validateEmail(formData.email);
        const isPhoneValid = validatePhone(formData.phone);

        if (!isEmailValid || !isPhoneValid) {
            return;
        }
        try {
            const response = await axios.post(`${environment.apiUrl}/waitlist/customer/join`, {
                email: formData.email,
                telnum: formData.phone,
                postcode: formData.postcode,
            });

            if (response.status === 200 || response.status === 201) {
                setNotification({ message: t("joinWaitlist.notifications.success"), type: 'success' });
                setFormData({
                    email: "",
                    phone: "",
                    postcode: "",
                });
                setEmailError("");
                setPhoneError("");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setNotification({ message: t("joinWaitlist.notifications.error"), type: 'error' });
        }
    };
    const buttonBaseClasses = "flex h-12 items-center justify-center rounded-full px-8 font-poppins text-base font-medium shadow-[1px_1px_3px_rgba(0,0,0,0.1),_5px_3px_6px_rgba(0,0,0,0.09),_10px_8px_8px_rgba(0,0,0,0.05),_18px_13px_9px_rgba(0,0,0,0.01),_29px_21px_10px_rgba(0,0,0,0)] transition-all duration-300 ease-in-out hover:opacity-90";

    return (
        <>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <main className="w-full flex flex-col items-center gap-10 md:gap-12 py-12 px-4 md:py-24 md:px-20">
                <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
                    <div className="w-full md:w-1/2 items-start justify-center">
                        <header className="w-full max-w-7xl flex flex-col mb-8 items-start md:items-center justify-center gap-2">
                            <p className="self-stretch text-primary-90 font-['Poppins-Bold',Helvetica] font-bold text-lg md:text-xl text-center md:text-left tracking-[1.00px] leading-tight">
                                {t("joinWaitlist.header.subtitle")}
                            </p>
                            <h1 className="self-stretch text-coolgray-90 font-['Poppins-Bold',Helvetica] font-bold text-4xl md:text-[54px] text-center md:text-left leading-tight md:leading-[59.4px]">
                                {t("joinWaitlist.header.title")}
                            </h1>
                        </header>
                        <section className="w-full flex flex-col items-start justify-center">
                            <form
                                onSubmit={handleSubmit}
                                className="w-full flex flex-col items-start gap-8"
                            >
                                {formFields.map((field) => (
                                    <div key={field.name} className="w-full flex flex-col items-start gap-2">
                                        <label
                                            htmlFor={field.name}
                                            className="flex items-center gap-2 self-stretch text-coolgray-90 font-['Poppins-SemiBold',Helvetica] font-semibold text-xl md:text-2xl tracking-[-0.48px] leading-[28.8px]"
                                        >
                                            {t(field.label)}
                                            {!field.required && (
                                                <img
                                                    className="w-6 h-6"
                                                    alt={t("joinWaitlist.alt.optionalIndicator")}
                                                    src="/indicator.svg"
                                                />
                                            )}
                                        </label>
                                        <div className="flex h-12 items-center gap-2 px-4 py-3 self-stretch w-full bg-[#f3f8ff] border-b-2 border-[#c1c7cd]">
                                            <input
                                                id={field.name}
                                                type={field.type}
                                                value={formData[field.name as keyof typeof formData]}
                                                onChange={(e) =>
                                                    handleInputChange(field.name, e.target.value)
                                                }
                                                placeholder={t(field.placeholder)}
                                                required={field.required}
                                                className="flex-1 font-['Poppins-Regular',Helvetica] font-normal text-coolgray-60 text-base bg-transparent border-none outline-none placeholder:text-coolgray-60"
                                            />
                                        </div>
                                        {field.name === 'email' && emailError && (
                                            <p className="text-red-500 text-sm">{emailError}</p>
                                        )}
                                        {field.name === 'phone' && phoneError && (
                                            <p className="text-red-500 text-sm">{phoneError}</p>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="submit"
                                    className={`${buttonBaseClasses} w-auto bg-blue-600 text-white`}
                                    style={{ letterSpacing: '0.5px' }}
                                >
                                    {t("joinWaitlist.form.submit")}
                                </button>
                            </form>
                        </section>
                    </div>
                    <div className="w-full md:w-1/2 content-center justify-center">
                        <aside className="flex flex-col justify-center md:gap-20 gap-8 p-4 md:p-8 bg-variable-collection-bg rounded-lg">
                            {benefitsData.map((benefit) => (
                                <div
                                    className="w-full flex items-center gap-4"
                                    key={benefit.id}
                                >
                                    <img
                                        className="w-12 h-12"
                                        alt={t("joinWaitlist.alt.greenCheck")}
                                        src={benefit.icon}
                                    />
                                    <p className="flex-1 font-['Poppins-Bold',Helvetica] font-bold text-coolgray-90 text-lg md:text-2xl leading-snug">
                                        {t(benefit.title)}
                                    </p>
                                </div>
                            ))}
                        </aside>
                    </div>
                </div>
            </main>
        </>
    );
}