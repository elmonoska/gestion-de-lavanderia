/// <reference types='vite/client' />

interface ImportMetaEnv {
readonly APP_SCHEMA: string;
readonly VITE_APP_NAME: string;
readonly BUSINESS_NAME: string;
// readonly VITE_: string;
}

interface ImportMeta {
readonly env: ImportMetaEnv;
}