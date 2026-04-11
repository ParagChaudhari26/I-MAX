const createLocalizedString = (requiredMsg, maxLength) => ({
  en: {
    type: String,
    required: requiredMsg ? [true, requiredMsg] : false,
    trim: true,
    ...(maxLength && { maxlength: [maxLength, `Content cannot exceed ${maxLength} characters`] })
  },
  hi: {
    type: String,
    default: '',
    trim: true
  },
  mr: {
    type: String,
    default: '',
    trim: true
  }
});

module.exports = { createLocalizedString };
