import React, { useEffect, useState, useRef, memo } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { environment } from "@/environment";
import Notification from "@/utils/components/shared/Notification";
import { IFormErrors, IService } from './types';
import { benefits } from './data';

export const MainContentSection = memo(() => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        postcode: "",
        vendorType: "INDEPENDENT",
        services: [] as number[],
    });
    const [errors, setErrors] = useState<IFormErrors>({
        email: "",
        phone: "",
        postcode: "",
        services: "",
    });
    const [notification, setNotification] = useState<{
        message: string;
        type: "success" | "error" | "warning";
    } | null>(null);
    const [services, setServices] = useState<IService[]>([]);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const servicesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`${environment.apiUrl}/waitlist/services`);
                setServices(response.data);
            } catch (error) {
                console.error("Failed to fetch services:", error);
            }
        };
        fetchServices();
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
                setServicesDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [servicesRef]);

    const validate = (): IFormErrors => {
        const newErrors: IFormErrors = { email: "", phone: "", postcode: "", services: "" };

        if (!formData.email) {
            newErrors.email = t("joinWaitlistServiceProviders.errors.email.required");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = t("joinWaitlistServiceProviders.errors.email.invalid");
        }

        const phoneRegex = /^(?:\+44|0)7\d{9}$/;
        if (!formData.phone) {
            newErrors.phone = t("joinWaitlistServiceProviders.errors.phone.required");
        } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
            newErrors.phone = t("joinWaitlistServiceProviders.errors.phone.invalid");
        }

        if (!formData.postcode) {
            newErrors.postcode = t("joinWaitlistServiceProviders.errors.postcode.required");
        }

        if (formData.services.length === 0) {
            newErrors.services = t("joinWaitlistServiceProviders.errors.services.required");
        }

        return newErrors;
    };

    const handleInputChange = (field: keyof typeof formData, value: string | number[]) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        if (errors[field as keyof IFormErrors]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const handleServicesChange = (serviceId: number) => {
        const newServices = formData.services.includes(serviceId)
            ? formData.services.filter((id) => id !== serviceId)
            : [...formData.services, serviceId];
        handleInputChange("services", newServices);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.values(newErrors).some(error => error)) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post(
                `${environment.apiUrl}/waitlist/service-provider/join`,
                {
                    email: formData.email,
                    telnum: formData.phone,
                    postcode: formData.postcode,
                    vendorType: formData.vendorType,
                    servicesOffered: formData.services,
                },
            );

            if (response.status === 200 || response.status === 201) {
                setNotification({
                    message: t("joinWaitlistServiceProviders.notifications.success"),
                    type: "success",
                });
                setFormData({
                    email: "",
                    phone: "",
                    postcode: "",
                    vendorType: "INDEPENDENT",
                    services: [],
                });
                setErrors({ email: "", phone: "", postcode: "", services: "" });
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setNotification({
                message: t("joinWaitlistServiceProviders.notifications.error"),
                type: "error",
            });
        }
    };

    const buttonBaseClasses =
        "flex h-12 items-center justify-center rounded-full px-8 font-poppins text-base font-medium shadow-[1px_1px_3px_rgba(0,0,0,0.1),_5px_3px_6px_rgba(0,0,0,0.09),_10px_8px_8px_rgba(0,0,0,0.05),_18px_13px_9px_rgba(0,0,0,0.01),_29px_21px_10px_rgba(0,0,0,0)] transition-all duration-300 ease-in-out hover:opacity-90";

    return (
        <>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <section className="flex w-full flex-col items-center gap-10 md:gap-12 py-12 px-4 md:py-24 md:px-20">
                <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
                    <div className="w-full md:w-1/2 items-start justify-center">
                        <header className="w-full max-w-7xl flex flex-col mb-8 items-start md:items-center justify-center gap-2">
                            <p className="relative self-stretch [font-family:'Roboto-Bold',Helvetica] font-bold text-primary-90 text-base sm:text-lg md:text-xl text-center md:text-left tracking-[1.00px] leading-5">
                                {t("joinWaitlistServiceProviders.header.subtitle")}
                            </p>
                            <h1 className="relative self-stretch [font-family:'Poppins-Bold',Helvetica] font-bold text-coolgray-90 text-3xl sm:text-4xl md:text-[54px] text-center md:text-left tracking-[0] leading-tight md:leading-[59.4px]">
                                {t("joinWaitlistServiceProviders.header.title")}
                            </h1>
                        </header>

                        <div className="w-full flex flex-col items-start justify-center">


                            {/* <div className="flex flex-col w-full lg:w-[655px] items-start justify-center"> */}
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col items-start gap-6 relative self-stretch w-full"
                            >
                                <div className="flex flex-col w-full items-start gap-1 relative">
                                    <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
                                        <label
                                            htmlFor="email"
                                            className="relative self-stretch [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-coolgray-90 text-xl md:text-2xl tracking-[-0.48px] leading-[28.8px]"
                                        >
                                            {t("joinWaitlist.form.email.label")}
                                        </label>
                                        <div className="flex h-12 items-center gap-2 px-4 py-3 relative self-stretch w-full bg-[#f3f8ff] border-b [border-bottom-style:solid] border-[#c1c7cd]">
                                            <input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    handleInputChange("email", e.target.value)
                                                }
                                                placeholder={t("joinWaitlist.form.email.placeholder")}
                                                required
                                                className="relative flex-1 [font-family:'Poppins-Regular',Helvetica] font-normal text-coolgray-60 text-base tracking-[0] leading-[22.4px] bg-transparent border-none outline-none placeholder:text-coolgray-60"
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row w-full items-start gap-6 md:gap-4">
                                    <div className="flex flex-col w-full items-start gap-1 relative">
                                        <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
                                            <label
                                                htmlFor="phone"
                                                className="relative self-stretch [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-coolgray-90 text-xl md:text-2xl tracking-[-0.48px] leading-[28.8px]"
                                            >
                                                {t(
                                                    "joinWaitlistServiceProviders.form.phone.label",
                                                )}
                                            </label>
                                            <div className="flex h-12 items-center gap-2 px-4 py-3 relative self-stretch w-full bg-[#f3f8ff] border-b [border-bottom-style:solid] border-variable-collection-stroke">
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) =>
                                                        handleInputChange("phone", e.target.value)
                                                    }
                                                    placeholder={t(
                                                        "joinWaitlist.form.phone.placeholder",
                                                    )}
                                                    required
                                                    className="relative flex-1 [font-family:'Poppins-Regular',Helvetica] font-normal text-coolgray-60 text-base tracking-[0] leading-[22.4px] bg-transparent border-none outline-none placeholder:text-coolgray-60"
                                                />
                                            </div>
                                            {errors.phone && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-full items-start gap-1 relative">
                                        <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
                                            <label
                                                htmlFor="postcode"
                                                className="relative self-stretch [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-coolgray-90 text-xl md:text-2xl tracking-[-0.48px] leading-[28.8px]"
                                            >
                                                {t(
                                                    "joinWaitlistServiceProviders.form.postcode.label",
                                                )}
                                            </label>
                                            <div className="flex h-12 items-center gap-2 px-4 py-3 relative self-stretch w-full bg-[#f3f8ff] border-b [border-bottom-style:solid] border-variable-collection-stroke">
                                                <input
                                                    id="postcode"
                                                    type="text"
                                                    value={formData.postcode}
                                                    onChange={(e) =>
                                                        handleInputChange("postcode", e.target.value)
                                                    }
                                                    placeholder={t(
                                                        "joinWaitlist.form.postcode.placeholder",
                                                    )}
                                                    required
                                                    className="relative flex-1 [font-family:'Poppins-Regular',Helvetica] font-normal text-coolgray-60 text-base tracking-[0] leading-[22.4px] bg-transparent border-none outline-none placeholder:text-coolgray-60"
                                                />
                                            </div>
                                            {errors.postcode && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.postcode}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col w-full items-start gap-1 relative">
                                    <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
                                        <label className="relative self-stretch [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-coolgray-90 text-xl md:text-2xl tracking-[-0.48px] leading-[28.8px]">
                                            {t("accountType")}
                                        </label>
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleInputChange("vendorType", "INDEPENDENT")
                                                }
                                                className={`${buttonBaseClasses} ${formData.vendorType === "INDEPENDENT"
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-200 text-gray-800"
                                                    }`}
                                            >
                                                {t(
                                                    "joinWaitlistServiceProviders.form.vendorType.independent",
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleInputChange("vendorType", "COMPANY")
                                                }
                                                className={`${buttonBaseClasses} ${formData.vendorType === "COMPANY"
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-gray-200 text-gray-800"
                                                    }`}
                                            >
                                                {t(
                                                    "joinWaitlistServiceProviders.form.vendorType.company",
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full items-start gap-1 relative">
                                    <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
                                        <label
                                            className="relative self-stretch [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-coolgray-90 text-xl md:text-2xl tracking-[-0.48px] leading-[28.8px]"
                                        >
                                            {t("joinWaitlistServiceProviders.form.services.label")}
                                        </label>
                                        <div className="relative w-full" ref={servicesRef}>
                                            <button
                                                type="button"
                                                className="flex h-12 items-center justify-between gap-2 px-4 py-3 relative self-stretch w-full bg-[#f3f8ff] border-b [border-bottom-style:solid] border-variable-collection-stroke text-left"
                                                onClick={() => setServicesDropdownOpen(prev => !prev)}
                                            >
                                                <span className="relative flex-1 [font-family:'Poppins-Regular',Helvetica] font-normal text-coolgray-60 text-base tracking-[0] leading-[22.4px] bg-transparent border-none outline-none placeholder:text-coolgray-60">
                                                    {formData.services.length > 0
                                                        ? t('joinWaitlistServiceProviders.form.services.selected', { count: formData.services.length })
                                                        : t('joinWaitlistServiceProviders.form.services.placeholder')}
                                                </span>
                                            </button>
                                            {servicesDropdownOpen && (
                                                <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                                                    {services.map(service => (
                                                        <label
                                                            key={service.id}
                                                            htmlFor={service.id.toString()}
                                                            className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={service.id.toString()}
                                                                checked={formData.services.includes(service.id)}
                                                                onChange={() => handleServicesChange(service.id)}
                                                                className="mr-2"
                                                            />
                                                            <span>{service.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {errors.services && (
                                            <p className="text-red-500 text-xs mt-1">{errors.services}</p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className={`${buttonBaseClasses} w-auto bg-blue-600 text-white`}
                                    style={{ letterSpacing: "0.5px" }}
                                >
                                    {t("joinWaitlist.form.submit")}
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 content-center justify-center">
                        <aside className="flex flex-col justify-center md:gap-20 gap-8 p-4 md:p-8 bg-variable-collection-bg rounded-lg">
                            {/* <div className="flex flex-col h-full items-center justify-center gap-4 self-stretch w-full"> */}
                            {benefits.map((benefit) => (
                                <div
                                    className="flex items-center gap-4 w-full"
                                    key={benefit.id}
                                >
                                    <img
                                        className="relative w-12 h-12"
                                        alt={t("joinWaitlist.alt.greenCheck")}
                                        src="/greenCheck.svg"
                                    />
                                    <p className="flex-1 [font-family:'Poppins-Bold',Helvetica] font-bold text-coolgray-90 text-xl md:text-2xl tracking-[0] leading-tight md:leading-[26.4px]">
                                        {t(benefit.title)}
                                    </p>
                                </div>
                            ))}
                            {/* </div> */}
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
});
MainContentSection.displayName = "MainContentSection";