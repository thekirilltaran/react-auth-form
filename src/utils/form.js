/**
 * @description Utility function to check if an email exists and is deliverable by making an API call.
 * This function is typically used in forms to validate email addresses in real-time.
 */

export const checkEmailExists = async (value, url, setCheckEmailLoader) => {
  if (!value) return null;
  setCheckEmailLoader(true);
  try {
    const response = await fetch(url + value);
    if (!response.ok) {
      // Optionally handle non-OK responses
      return false;
    }
    const data = await response.json();
    return data?.deliverability === "DELIVERABLE";
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  } finally {
    setCheckEmailLoader(false);
  }
};
