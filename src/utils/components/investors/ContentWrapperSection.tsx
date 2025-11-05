import React, { memo } from "react";
import { steps } from './data';

export const ContentWrapperSection = memo(() => {

    return (
        <section className="w-full flex flex-col items-center gap-12 md:gap-16 px-4 py-10 md:p-20 bg-GLORIOUS-ui-section-bg relative">
            <div className="w-full max-w-7xl flex flex-col items-start gap-8 md:gap-12 relative">
                <header className="flex-col gap-2 flex items-center relative self-stretch w-full">
                    <h2 className="relative self-stretch [font-family:'Poppins-Bold',Helvetica] font-bold text-coolgray-90 text-3xl md:text-[42px] text-center tracking-[0] leading-tight md:leading-[46.2px]">
                        HOW IT WORKS
                    </h2>
                </header>
            </div>

            <div
                className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-4 relative w-full max-w-7xl"
                role="list"
            >
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="flex flex-col items-center gap-4 px-4 py-0 relative flex-1"
                        role="listitem"
                    >
                        <img className={step.imageClass} alt={step.alt} src={step.image} />

                        <h3 className="relative self-stretch [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-coolgray-90 text-lg text-center tracking-[0] leading-[25.2px]">
                            {step.title}
                        </h3>

                        <p className="[font-family:'Poppins-Regular',Helvetica] text-center relative self-stretch font-normal text-coolgray-90 text-lg tracking-[0] leading-[25.2px]">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
});

ContentWrapperSection.displayName = "ContentWrapperSection";