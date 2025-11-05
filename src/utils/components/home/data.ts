import { IBenefitsData, IFormFields, IHowItWorksSteps, IServices } from './types'
const benefitsData: IBenefitsData[] = [
    {
        id: 1,
        title: "benefits.verified",
        icon: "/greenCheck.svg",
    },
    {
        id: 2,
        title: "benefits.noSearch",
        icon: "/greenCheck.svg",
    },
    {
        id: 3,
        title: "benefits.convenient",
        icon: "/greenCheck.svg",
    },
];

const formFields: IFormFields[] = [
    {
        name: "email",
        label: "joinWaitlist.form.email.label",
        placeholder: "joinWaitlist.form.email.placeholder",
        type: "email",
        required: true,
    },
    {
        name: "phone",
        label: "joinWaitlist.form.phone.label",
        placeholder: "joinWaitlist.form.phone.placeholder",
        type: "tel",
        required: false,
    },
    {
        name: "postcode",
        label: "joinWaitlist.form.postcode.label",
        placeholder: "joinWaitlist.form.postcode.placeholder",
        type: "text",
        required: false,
    },
];

const howItWorksSteps: IHowItWorksSteps[] = [
    {
        icon: "/calendarView.svg",
        alt: "calendar view",
        title: 'home.requestBooking',
        description: 'home.requestBookingDescription'
    },
    {
        icon: "/clientCommunicate.svg",
        alt: "Client Communicate",
        title: 'home.getMatched',
        description: 'home.getMatchedDescription'
    },
    {
        icon: "/clockWait.svg",
        alt: "clock wait",
        title: 'home.relaxAndReview',
        description: 'home.relaxAndReviewDescription'
    }
]

const services: IServices[] = [
    {
        name: 'home-cleaning',
        image: "/HomeCleaning.svg",
        alt: "Home Cleaning Service",
        title: 'home.homeCleaning',
        description: 'home.homeCleaningDescription',
        buttonText: 'home.bookPropertyCleaning',
        imagePosition: 'left',
        imageContainerClass: "w-full md:w-1/2 flex items-center justify-center"
    },
    {
        name: 'car-valet',
        image: "/carwashCleaing.svg",
        alt: "Carwash Cleaning Service",
        title: 'home.carValet',
        description: 'home.carValetDescription',
        buttonText: 'home.bookCarValetService',
        imagePosition: 'right',
        imageContainerClass: "w-full md:w-1/2 relative"
    },
    {
        name: 'window-cleaning',
        image: "/windowCleaning.svg",
        alt: "Window cleaning Service",
        title: 'home.windowCleaning',
        description: 'home.windowCleaningDescription',
        buttonText: 'home.bookWindowCleaning',
        imagePosition: 'left',
        imageContainerClass: "w-full md:w-1/2 relative"
    }
]

export {
    benefitsData,
    formFields,
    howItWorksSteps,
    services,
}