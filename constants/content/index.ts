export interface ServiceContent {
    title: string;
    description: string[];
    features: string[];
    process: { title: string; desc: string }[];
    faq: { q: string; a: string }[];
}

import { trContent } from './tr';
import { enContent } from './en';
import { arContent } from './ar';
import { ruContent } from './ru';
import { deContent } from './de';
import { frContent } from './fr';
import { esContent } from './es';
import { itContent } from './it';
import { faContent } from './fa';
import { azContent } from './az';
import { nlContent } from './nl';
import { ukContent } from './uk';

export const richContent: Record<string, Record<string, ServiceContent>> = {
    tr: trContent,
    en: enContent,
    ar: arContent,
    ru: ruContent,
    de: deContent,
    fr: frContent,
    es: esContent,
    it: itContent,
    fa: faContent,
    az: azContent,
    nl: nlContent,
    uk: ukContent,
};
