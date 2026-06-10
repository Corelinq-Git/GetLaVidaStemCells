/**
 * Phone number validation + E.164 normalization.
 *
 * Single source of truth used by:
 *   - All landing-page phone inputs (squeeze, qualify, consultation,
 *     voice-agent-widget callback) for client-side validation +
 *     submit-button gating.
 *   - The /api/retell/callback route to validate before dialing.
 *
 * Scope intentionally narrow:
 *   - US (10 digits) and US-with-country-code (11 digits starting with 1)
 *     are the primary path — they normalize to "+1XXXXXXXXXX".
 *   - Any input starting with "+" is accepted if it has 11–15 digits
 *     total (E.164 spec).
 *   - Everything else is rejected with a human-readable error.
 *
 * If Perry expands into non-US markets, swap in `libphonenumber-js`
 * here — every caller already routes through this module.
 */

export interface PhoneValidation {
  valid: boolean;
  /** E.164 format (e.g. "+15125551234"). Null if invalid. */
  e164: string | null;
  /** User-facing error message. Null if valid. */
  error: string | null;
}

/**
 * Validate and normalize a phone number string to E.164.
 *
 * Accepted shapes:
 *   "5125551234"          -> +15125551234
 *   "(512) 555-1234"      -> +15125551234
 *   "512.555.1234"        -> +15125551234
 *   "1-512-555-1234"      -> +15125551234
 *   "+1 512 555 1234"     -> +15125551234
 *   "+44 20 7946 0958"    -> +442079460958
 *
 * Rejected: too short, all-zeros, letters, etc.
 */
export function normalizePhone(input: string | null | undefined): PhoneValidation {
  if (!input) return invalid("Phone number is required");

  const trimmed = input.trim();
  if (!trimmed) return invalid("Phone number is required");

  // If user included a "+", treat as international E.164
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");

  if (digits.length === 0) {
    return invalid("Phone number must contain digits");
  }

  // International (+ prefix).
  if (hasPlus) {
    // US country code (+1): enforce a real 10-digit national number. A US
    // national number never starts with 0 or 1, so a leading trunk "0" (e.g.
    // "+1 09497340624") is spurious — strip it. Reject anything that still isn't
    // a valid 10-digit US number rather than dialing garbage.
    if (digits.startsWith("1")) {
      let national = digits.slice(1);
      if (national.length === 11 && national[0] === "0") {
        national = national.slice(1);
      }
      if (national.length !== 10 || national[0] === "0" || national[0] === "1") {
        return invalid("Enter a valid 10-digit US phone number");
      }
      return { valid: true, e164: `+1${national}`, error: null };
    }
    // Other countries — accept 11..15 digit lengths per E.164.
    if (digits.length < 11 || digits.length > 15) {
      return invalid("International number must be 11–15 digits after country code");
    }
    return { valid: true, e164: `+${digits}`, error: null };
  }

  // US — 10 digits is standard, 11 digits if user typed leading 1
  if (digits.length === 10) {
    if (digits[0] === "0" || digits[0] === "1") {
      return invalid("US area code can't start with 0 or 1");
    }
    return { valid: true, e164: `+1${digits}`, error: null };
  }

  if (digits.length === 11) {
    if (digits[0] !== "1") {
      return invalid("11-digit numbers must start with country code 1");
    }
    if (digits[1] === "0" || digits[1] === "1") {
      return invalid("US area code can't start with 0 or 1");
    }
    return { valid: true, e164: `+${digits}`, error: null };
  }

  if (digits.length < 10) {
    return invalid("Phone number is too short");
  }
  return invalid("Phone number is too long — include country code with + for international");
}

/** Human-readable display: "(512) 555-1234" for US, otherwise the E.164 itself. */
export function formatPhoneDisplay(e164: string | null): string {
  if (!e164) return "";
  // US +1XXXXXXXXXX → (XXX) XXX-XXXX
  const usMatch = /^\+1(\d{3})(\d{3})(\d{4})$/.exec(e164);
  if (usMatch) {
    return `(${usMatch[1]}) ${usMatch[2]}-${usMatch[3]}`;
  }
  return e164;
}

function invalid(message: string): PhoneValidation {
  return { valid: false, e164: null, error: message };
}
