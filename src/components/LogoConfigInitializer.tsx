import { useLogoConfig } from '../hooks/useLogoConfig';

// Component to initialize logo configuration from backend
// This should be used once in the app to trigger the backend fetch
export default function LogoConfigInitializer() {
  useLogoConfig();
  return null; // This component doesn't render anything
}
