import type { AppProps } from "next/app";
import { ApiProvider } from "@/context/apiProvider";
import '@/styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApiProvider>
            <Component {...pageProps} />
        </ApiProvider>
    );
}