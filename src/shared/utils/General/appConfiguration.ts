import { z } from "zod";

const AppConfigSchema = z.object({
    hiSudokuBaseUrl: z.string().min(1),
    krzysztofDamianBasiorPersonalWebsiteBaseUrl: z.string().min(1),
    krzysztofDamianBasiorGithubBaseUrl: z.string().min(1),
    krzysztofDamianBasiorLinkedinBaseUrl: z.string().min(1),
    krzysztofDamianBasiorFacebookBaseUrl: z.string().min(1),
    krzysztofDamianBasiorInstagramBaseUrl: z.string().min(1),
});

// This will throw if validation fails during build
export const appConfig = AppConfigSchema.parse({
    hiSudokuBaseUrl: import.meta.env.VITE_HISUDOKU_BASE_URL,
    krzysztofDamianBasiorPersonalWebsiteBaseUrl: import.meta.env.VITE_KRZYSZTOF_BASIOR_PERSONAL_WEBSITE_BASE_URL,
    krzysztofDamianBasiorGithubBaseUrl: import.meta.env.VITE_KRZYSZTOF_BASIOR_GITHUB_BASE_URL,
    krzysztofDamianBasiorLinkedinBaseUrl: import.meta.env.VITE_KRZYSZTOF_BASIOR_LINKEDIN_BASE_URL,
    krzysztofDamianBasiorFacebookBaseUrl: import.meta.env.VITE_KRZYSZTOF_BASIOR_FACEBOOK_BASE_URL,
    krzysztofDamianBasiorInstagramBaseUrl: import.meta.env.VITE_KRZYSZTOF_BASIOR_INSTAGRAM_BASE_URL,
});
