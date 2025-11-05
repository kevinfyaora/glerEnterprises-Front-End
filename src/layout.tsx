import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gler",
    description: "Your trusted network of cleaning pros.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}