import { IStepProps, IBenefitProps } from "./types";

const steps: IStepProps[] = [
    {
        id: 1,
        image: "/registerInterest.svg",
        alt: "Charity concept",
        title: "Register Your Interest",
        description: "Tell us where you operate and what you offer",
        imageClass: "relative w-[90px] h-[90px] aspect-[1] object-cover",
    },
    {
        id: 2,
        image: "/freepikAdjust.svg",
        alt: "Freepik adjust",
        title: "Review Our Investor Deck",
        description: "Get access to our business model & key metrics.",
        imageClass: "relative w-[135px] h-[90px] aspect-[1.5] object-cover",
    },
    {
        id: 3,
        image: "/freepikBackground.svg",
        alt: "Freepik background",
        title: "Book a Discovery Call",
        description: "Speak directly with our founders to explore alignment.",
        imageClass: "relative w-[90px] h-[90px] aspect-[1] object-cover",
    },
    {
        id: 4,
        image: "/growingCuate.svg",
        alt: "Growing cuate",
        title: "Join Our Growth Journey",
        description:
            "Stay updated & be first in line for future investment rounds.",
        imageClass: "relative w-[90px] h-[90px] aspect-[1]",
    },
];

const benefits:IBenefitProps[] = [
    {id: "industry", title: "benefitsInvestors.industry"},
    {id: "scalable", title: "benefitsInvestors.scalable"},
    {id: "high", title: "benefitsInvestors.high"},
    {id: "built", title: "benefitsInvestors.built"},
    {id: "thorough", title: "benefitsInvestors.thorough"},
];

export {
    steps,
    benefits
}