interface IService {
    id: number;
    name: string;
}

interface IFormErrors {
    email: string;
    phone: string;
    postcode: string;
    services: string;
}

interface IServiceStepProps {
    id: number,
    image: string,
    alt: string,
    title: string,
    description: string,
    imageClass: string
}

interface IServiceBenefitProps {
    id: string,
    title: string
}

export type {
    IService,
    IFormErrors,
    IServiceBenefitProps,
    IServiceStepProps
}