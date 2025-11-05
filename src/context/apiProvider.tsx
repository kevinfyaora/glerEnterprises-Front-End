'use client';
import React, { createContext, useContext, useState } from 'react';
import { Api } from '@/api/Api';
import { useRouter } from "next/navigation";

export interface RefreshKeyDTO {
    refreshToken?: string;
}

const ApiContext = createContext<{
    apiClient: Api<any>;
    setRefreshKeyDTO: (dto: RefreshKeyDTO) => void;
    refreshKeyDTO: RefreshKeyDTO | null;
    setBearer: (token: string) => void; // Function to set Bearer token
} | null>(null);

let externalRefreshKey: RefreshKeyDTO | null = null; // External variable for refreshKeyDTO

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    const [refreshKeyDTO, setRefreshKeyDTOState] = useState<RefreshKeyDTO | null>(null); // State to manage refreshKeyDTO
    const apiClient = new Api(); // Create the Api instance here
    const router = useRouter();

    // Function to update both internal state and external variable
    const updateRefreshKeyDTO = (dto: RefreshKeyDTO) => {
        setRefreshKeyDTOState(dto);
        externalRefreshKey = dto; // Synchronize external variable
    };

    const setBearer = (token: string) => {
        apiClient.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    apiClient.instance.interceptors.response.use(
        (response: any) => response,
        async (error: { response: { status: number }; config: { headers: { [x: string]: string } } }) => {
            if (error.response?.status === 403 && refreshKeyDTO) {
                try {
                    // Attempt to refresh the token using generateNewAccessKey API
                    const refreshResponse = await apiClient.api.generateNewAccessKey(refreshKeyDTO);
                    const newToken = refreshResponse.data.accessToken;
                    const newRefreshToken = refreshResponse.data.refreshToken;

                    if (newToken) {
                        // Update token and retry original request
                        setBearer(newToken);

                        // Update the refreshKeyDTO if a new refresh token is provided
                        if (newRefreshToken) {
                            updateRefreshKeyDTO({ refreshToken: newRefreshToken.toString() });
                        }

                        return apiClient.instance.request(error.config);
                    }
                } catch {
                    await router.push('/login'); // Redirect to login if token refresh fails
                }
            }
            return Promise.reject(error);
        }
    );

    return (
        <ApiContext.Provider value={{ apiClient, refreshKeyDTO, setRefreshKeyDTO: updateRefreshKeyDTO, setBearer }}>
            {children}
        </ApiContext.Provider>
    );
};

// Hook to access API and refresh token data
export const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
};