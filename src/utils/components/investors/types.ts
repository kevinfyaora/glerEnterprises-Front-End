interface IStepProps {
    id: number,
    image: string,
    alt: string,
    title: string,
    description: string,
    imageClass: string
}

interface IBenefitProps {
    id: string,
    title: string
}

export type {
    IStepProps,
    IBenefitProps
}