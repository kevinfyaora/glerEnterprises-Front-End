import { IServiceStepProps, IServiceBenefitProps } from './types';

const steps: IServiceStepProps[] = [
    {
        id: 1,
        image: "/SignUp.svg",
        alt: "Element",
        title: "joinWaitlistServiceProviders.steps.signUp.title",
        description: "joinWaitlistServiceProviders.steps.signUp.description",
        imageClass: "relative w-[90px] h-[90px] aspect-[1]",
    },
    {
        id: 2,
        image: "/female.svg",
        alt: "Frame",
        title: "joinWaitlistServiceProviders.steps.verification.title",
        description: "joinWaitlistServiceProviders.steps.verification.description",
        imageClass: "relative w-[90px] h-[90px]",
    },
    {
        id: 3,
        image: "/jobHunt.svg",
        alt: "Job hunt amico",
        title: "joinWaitlistServiceProviders.steps.getJobs.title",
        description: "joinWaitlistServiceProviders.steps.getJobs.description",
        imageClass: "relative w-[90px] h-[90px] aspect-[1]",
    },
    {
        id: 4,
        image: "/calendarGuy.svg",
        alt: "Group",
        title: "joinWaitlistServiceProviders.steps.getPaid.title",
        description: "joinWaitlistServiceProviders.steps.getPaid.description",
        imageClass: "relative w-[142.38px] h-[90px] aspect-[1.58]",
    },
];

const benefits: IServiceBenefitProps[] = [
    { id: "beYourOwnBoss", title: "benefitsProviders.beYourOwnBoss" },
    { id: "growingCustomerNetwork", title: "benefitsProviders.growingCustomerNetwork" },
    { id: "getPaidOnTime", title: "benefitsProviders.getPaidOnTime" },
    { id: "communityTrust", title: "benefitsProviders.communityTrust" },
    { id: "competitiveRates", title: "benefitsProviders.competitiveRates" },
];

export {
    steps,
    benefits
}