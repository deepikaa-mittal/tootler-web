export function validateWaitlistInput(data: unknown): {
    valid: boolean;
    errors: string[];
    parsed?: { name: string; email: string };
  } {
    const errors: string[] = [];
  
    if (typeof data !== "object" || data === null) {
      return { valid: false, errors: ["Invalid request body"] };
    }
  
    const { name, email } = data as Record<string, unknown>;
  
    if (typeof name !== "string" || name.trim().length < 2) {
      errors.push("Name must be at least 2 characters");
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.push("Enter a valid email address");
    }
  
    if (errors.length > 0) {
      return { valid: false, errors };
    }
  
    return {
      valid: true,
      errors: [],
      parsed: {
        name: (name as string).trim(),
        email: (email as string).trim().toLowerCase(),
      },
    };
  }