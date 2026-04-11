/**
 * Language Middleware
 * Detects the preferred language from query parameters or headers
 */
const supportedLanguages = ['en', 'hi', 'mr'];
const defaultLanguage = 'en';

const languageMiddleware = (req, res, next) => {
  // 1. Check query parameter (e.g. ?lang=hi)
  let lang = req.query.lang;

  // 2. Check Accept-Language header
  if (!lang) {
    const acceptLanguage = req.headers['accept-language'];
    if (acceptLanguage) {
      // Very basic parsing: en-US,en;q=0.9 -> en
      lang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
    }
  }

  // 3. Validate and set requested language
  if (lang && supportedLanguages.includes(lang)) {
    req.language = lang;
  } else {
    req.language = defaultLanguage;
  }

  next();
};

/**
 * Helper function to extract a specific language string 
 * from a localized object, falling back to English if missing
 */
const getLocalizedValue = (localizedObj, lang) => {
  if (!localizedObj) return '';
  if (typeof localizedObj === 'string') return localizedObj; // Fallback for old unmigrated data
  
  if (localizedObj[lang] && localizedObj[lang].trim() !== '') {
    return localizedObj[lang];
  }
  
  // Fallback to default
  return localizedObj[defaultLanguage] || '';
};

module.exports = {
  languageMiddleware,
  getLocalizedValue,
  supportedLanguages,
  defaultLanguage
};
