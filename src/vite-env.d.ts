/// <reference types='vite/client' />

interface ImportMetaEnv {
readonly APP_SCHEMA: string;
// readonly VITE_: string;
}

interface ImportMeta {
readonly env: ImportMetaEnv;
}