export function extractDomain(input: string): string {
  try {
    const url = new URL(input.startsWith("http") ? input : `https://${input}`);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return input.replace(/^www\./, "");
  }
}
