interface INotificationProps {
    message: string;
    type: 'success' | 'error' | 'warning',
}

interface IBenefitsData {
    id: number,
    title: string,
    icon: string
}

interface IFormFields {
    name: string,
    label: string,
    placeholder: string,
    type: string,
    required: boolean,
}

interface IServices {
    name: string,
    image: string,
    alt: string,
    title: string,
    description: string,
    buttonText: string,
    imagePosition: string,
    imageContainerClass: string,
}

interface IHowItWorksSteps {
    icon: string,
    alt: string,
    title: string,
    description: string
}

export type {
    INotificationProps,
    IBenefitsData,
    IFormFields,
    IHowItWorksSteps,
    IServices
}