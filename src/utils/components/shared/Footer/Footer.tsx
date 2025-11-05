import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Facebook } from "./Facebook";
import { Instagram } from "./Instagram";
import { Linkedin } from "./Linkedin";
import { Twitter } from "./Twitter";
import { Youtube } from "./Youtube";
import Link from "next/link";

export const Footer = memo(() => {
    const { t } = useTranslation();

    const socialMediaLinks = [
        { Component: Youtube, labelKey: "footer.socials.youtube" },
        { Component: Facebook, labelKey: "footer.socials.facebook" },
        { Component: Twitter, labelKey: "footer.socials.twitter" },
        { Component: Instagram, labelKey: "footer.socials.instagram" },
        { Component: Linkedin, labelKey: "footer.socials.linkedin" },
    ];

    const navigationLinks = [
        { textKey: "footer.customers", href: "/" },
        { textKey: "footer.serviceProviders", href: "/service-providers" },
        { textKey: "footer.partnerships", href: "/investors" },
    ];

    return (
        <footer className="flex w-full flex-col items-center gap-8 bg-[#fcfdff] px-4 py-12 shadow-[0px_-4px_4px_#00000040] sm:px-8 md:px-20">
            <div className="flex w-full max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
                <Link href="/public">
                    <img
                        className="h-[50px] w-[59px]"
                        alt={t("footer.alt.logo")}
                        src="/gler.svg"
                    />
                </Link>
                <nav
                    className="flex flex-wrap items-center justify-center gap-4"
                    aria-label={t("footer.aria.social")}
                >
                    {socialMediaLinks.map(({ Component, labelKey }, index) => (
                        <a
                            key={index}
                            href="#"
                            aria-label={t("footer.aria.visit", { label: t(labelKey) })}
                            className="transition-opacity duration-200 hover:opacity-70"
                        >
                            <Component className="h-6 w-6" />
                        </a>
                    ))}
                </nav>
            </div>

            <hr className="h-px w-full max-w-7xl border-0 bg-[#0b0b0d]" />

            <div className="flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-8 md:flex-row">
                <p className="whitespace-nowrap font-['Poppins-Regular',Helvetica] text-sm font-normal leading-[19.6px] tracking-[0] text-[#0a0b0c]">
                    {t("footer.rightsReserved")}
                </p>
                <nav
                    className="flex flex-wrap items-center justify-center gap-4"
                    aria-label={t("footer.aria.navigation")}
                >
                    {navigationLinks.map(({ textKey, href }, index) => (
                        <Link
                            key={index}
                            href={href}
                            className="inline-flex items-center gap-2 px-2 py-3 transition-opacity duration-200 hover:opacity-70"
                        >
                            <span className="whitespace-nowrap font-['Poppins-Medium',Helvetica] text-base font-medium leading-4 tracking-[0] text-[#0a0b0c]">
                                {t(textKey)}
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>
        </footer>
    );
});