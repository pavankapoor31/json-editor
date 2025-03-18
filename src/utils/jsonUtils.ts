export const validateJson = (jsonString: string): { isValid: boolean; error: string | null } => {
    try {
      JSON.parse(jsonString);
      return { isValid: true, error: null };
    } catch (e) {
      return { isValid: false, error: e instanceof Error ? e.message : 'Invalid JSON' };
    }
  };
  
  export const formatJson = (jsonString: string): string => {
    const { isValid, error } = validateJson(jsonString);
    if (!isValid) return jsonString;
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  };