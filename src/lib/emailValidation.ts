// Email validation utilities for preventing subscription and account issues

export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
  suggestions?: string[];
}

export interface EmailValidationOptions {
  checkTypo?: boolean;
  checkDisposable?: boolean;
  checkCommonDomains?: boolean;
}

// Common email domains for typo suggestions
const COMMON_DOMAINS = [
  'gmail.com',
  'yahoo.com', 
  'hotmail.com',
  'outlook.com',
  'icloud.com',
  'aol.com',
  'live.com'
];

// Disposable email domains (basic list - you might want to expand this)
const DISPOSABLE_DOMAINS = [
  '10minutemail.com',
  'tempmail.org',
  'guerrillamail.com',
  'mailinator.com',
  'yopmail.com',
  'temp-mail.org'
];

// Common typos in email domains - much more comprehensive
const DOMAIN_TYPOS: Record<string, string> = {
  // Gmail variations
  'gmai.com': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.coom': 'gmail.com',
  'gmail.cpm': 'gmail.com',
  'gmail.ocm': 'gmail.com',
  'gmial.co': 'gmail.com',
  'gmai.co': 'gmail.com',
  'gmail.om': 'gmail.com',
  'gmail.omc': 'gmail.com',
  
  // Yahoo variations
  'yahooo.com': 'yahoo.com',
  'yahoo.co': 'yahoo.com',
  'yahoo.cm': 'yahoo.com',
  'yahoo.con': 'yahoo.com',
  'yahoo.ocm': 'yahoo.com',
  'yahoo.om': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'yaho.co': 'yahoo.com',
  'yahooo.co': 'yahoo.com',
  
  // Hotmail variations
  'hotmial.com': 'hotmail.com',
  'hotmail.co': 'hotmail.com',
  'hotmail.cm': 'hotmail.com',
  'hotmail.con': 'hotmail.com',
  'hotmail.ocm': 'hotmail.com',
  'hotmail.om': 'hotmail.com',
  'hotmial.co': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'hotmai.co': 'hotmail.com',
  
  // Outlook variations
  'outlok.com': 'outlook.com',
  'outlook.co': 'outlook.com',
  'outlook.cm': 'outlook.com',
  'outlook.con': 'outlook.com',
  'outlook.ocm': 'outlook.com',
  'outlook.om': 'outlook.com',
  'outlok.co': 'outlook.com',
  'outook.com': 'outlook.com',
  'outook.co': 'outlook.com',
  
  // iCloud variations
  'iclud.com': 'icloud.com',
  'icloud.co': 'icloud.com',
  'icloud.cm': 'icloud.com',
  'icloud.con': 'icloud.com',
  'icloud.ocm': 'icloud.com',
  'icloud.om': 'icloud.com',
  'iclud.co': 'icloud.com',
  
  // AOL variations
  'ao.com': 'aol.com',
  'aol.co': 'aol.com',
  'aol.cm': 'aol.com',
  'aol.con': 'aol.com',
  'aol.ocm': 'aol.com',
  'aol.om': 'aol.com',
  'ao.co': 'aol.com',
  'aol.fake': 'aol.com', // Catch fake domains
  'gmail.fake': 'gmail.com',
  'yahoo.fake': 'yahoo.com',
  'hotmail.fake': 'hotmail.com',
  'outlook.fake': 'outlook.com',
  'test.com': 'gmail.com', // Common test domain
  'example.com': 'gmail.com', // Common example domain
  
  // Live variations
  'live.co': 'live.com',
  'live.cm': 'live.com',
  'live.con': 'live.com',
  'live.ocm': 'live.com',
  'live.om': 'live.com',
  
  // Common extension typos (catch .fake, .comx, etc.)
  '.fake': '.com',
  '.comx': '.com',
  '.comm': '.com',
  '.cpm': '.com',
  '.coom': '.com',
  '.ocm': '.com',
  '.om': '.com',
  '.con': '.com',
  '.cm': '.com',
  '.co': '.com'
};

/**
 * Validates an email address with comprehensive checks
 * @param email - The email address to validate
 * @param options - Additional validation options
 * @returns EmailValidationResult with validation status and suggestions
 */
export function validateEmail(
  email: string, 
  options: EmailValidationOptions = {}
): EmailValidationResult {
  const { checkTypo = true, checkDisposable = true, checkCommonDomains = true } = options;
  
  // Basic validation
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Please enter an email address' };
  }

  const trimmedEmail = email.trim().toLowerCase();
  
  if (!trimmedEmail) {
    return { isValid: false, error: 'Please enter an email address' };
  }

  // Basic format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  // Additional format checks
  if (trimmedEmail.includes('..')) {
    return { isValid: false, error: 'Email address cannot contain consecutive dots' };
  }
  
  if (trimmedEmail.startsWith('.') || trimmedEmail.endsWith('.')) {
    return { isValid: false, error: 'Email address cannot start or end with a dot' };
  }
  
  if (trimmedEmail.startsWith('@') || trimmedEmail.endsWith('@')) {
    return { isValid: false, error: 'Please enter a complete email address' };
  }

  const [localPart, domain] = trimmedEmail.split('@');
  
  // Check for obviously invalid emails
  if (localPart.length < 1 || localPart.length > 64) {
    return { isValid: false, error: 'Email address is too short or too long' };
  }

  if (domain.length < 4 || domain.length > 253) {
    return { isValid: false, error: 'Invalid email domain' };
  }

  const suggestions: string[] = [];

  // Check for disposable emails
  if (checkDisposable && DISPOSABLE_DOMAINS.includes(domain)) {
    return { 
      isValid: false, 
      error: 'Please use a permanent email address for your subscription',
      suggestions: ['Use your personal email address (Gmail, Yahoo, Outlook, etc.)']
    };
  }

  // Check for common typos (both full domain and extension-only)
  if (checkTypo) {
    // First check for full domain typos
    if (DOMAIN_TYPOS[domain]) {
      const correctedDomain = DOMAIN_TYPOS[domain];
      const correctedEmail = `${localPart}@${correctedDomain}`;
      return {
        isValid: false,
        error: 'Did you mean a different email address?',
        suggestions: [`Try: ${correctedEmail}`]
      };
    }
    
    // Check for extension-only typos (like .fake, .comx, etc.)
    const domainParts = domain.split('.');
    if (domainParts.length >= 2) {
      const extension = '.' + domainParts[domainParts.length - 1];
      const baseDomain = domainParts.slice(0, -1).join('.');
      
      if (DOMAIN_TYPOS[extension]) {
        const correctedExtension = DOMAIN_TYPOS[extension];
        const correctedDomain = baseDomain + correctedExtension;
        const correctedEmail = `${localPart}@${correctedDomain}`;
        return {
          isValid: false,
          error: 'Did you mean a different email address?',
          suggestions: [`Try: ${correctedEmail}`]
        };
      }
    }
  }

  // Check for uncommon domains and suggest common ones
  if (checkCommonDomains && !COMMON_DOMAINS.includes(domain) && !domain.includes('.')) {
    suggestions.push('Consider using a well-known email provider (Gmail, Yahoo, Outlook)');
  }

  return { 
    isValid: true, 
    suggestions: suggestions.length > 0 ? suggestions : undefined 
  };
}

/**
 * Validates email specifically for subscription/billing purposes
 * This is stricter validation to prevent subscription issues
 */
export function validateEmailForSubscription(email: string): EmailValidationResult {
  return validateEmail(email, {
    checkTypo: true,
    checkDisposable: true, 
    checkCommonDomains: false // Don't suggest domain changes for subscriptions
  });
}

/**
 * Validates email for account creation
 * This includes suggestions for better email choices
 */
export function validateEmailForAccount(email: string): EmailValidationResult {
  return validateEmail(email, {
    checkTypo: true,
    checkDisposable: true,
    checkCommonDomains: true
  });
}

/**
 * Real-time email validation for forms
 * Returns validation result as user types
 */
export function validateEmailRealTime(email: string): EmailValidationResult {
  if (!email || email.length < 3) {
    return { isValid: false };
  }

  // Only do basic format check for real-time validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false };
  }

  return validateEmail(email, { checkTypo: true, checkDisposable: false, checkCommonDomains: false });
}

/**
 * Helper function to format email suggestions for display
 */
export function formatEmailSuggestions(suggestions?: string[]): string {
  if (!suggestions || suggestions.length === 0) return '';
  return suggestions.join('. ');
}
