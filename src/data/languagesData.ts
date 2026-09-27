import { Language } from '../types';

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', popular: true },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', popular: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', popular: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', popular: true },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', popular: true },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', popular: false },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', popular: false },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', popular: true },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', popular: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', popular: false },
];
