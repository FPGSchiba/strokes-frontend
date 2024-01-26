import { Amplify } from 'aws-amplify';
import { signIn, signOut, fetchAuthSession, getCurrentUser, AuthUser } from 'aws-amplify/auth';
import { post, get, del } from 'aws-amplify/api';
import Cookies from 'js-cookie';
import { AuthSession } from '@aws-amplify/core/dist/esm/singleton/Auth/types';
import amplifyconfig from '../amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

const existingConfig = Amplify.getConfig();

// Add existing resource to the existing configuration.
Amplify.configure({
    ...existingConfig,
    API: {
        ...existingConfig.API,
        REST: {
            ...existingConfig.API?.REST,
            StrokesAPI: {
                endpoint: 'https://tbdt8noyvk.execute-api.eu-central-1.amazonaws.com/dev'
            }
        }
    }
});

export const handleSignIn = async (username: string, password: string): Promise<AuthSession | undefined> => {
    const { isSignedIn, nextStep } = await signIn({ username, password });
    if (isSignedIn) {
        return await getSession();
    }
    return undefined;
}

export const getSession = async (): Promise<AuthSession> => {
    const session = await fetchAuthSession();
    return session;
}

export const getUser = async (): Promise<AuthUser> => {
    return await getCurrentUser();
}

export async function handleSignOut() {
    await signOut();
    const cookies = Cookies.get();
    Object.keys(cookies).forEach((key) => {
        Cookies.remove(key);
    });
    localStorage.clear();
}

export async function getHeaders() {
    return { Authirozation: `Bearer ${(await fetchAuthSession()).tokens?.accessToken}` };
}

export async function test() {
    const response = await get({ apiName: 'StrokesAPI', path: '/stroke', options: { headers: { Authorization: 'test' } } });
    console.log(response);
}