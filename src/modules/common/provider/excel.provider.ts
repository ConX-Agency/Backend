export class ExcelProvider {
    static CLIENT_SHEET_NAME = "Client Data";
    static CLIENT_COMPANY_NAME = "Company Name";
    static CLIENT_PIC_NAME = "PIC Name";
    static CLIENT_PIC_EMAIL = "PIC Email";
    static CLIENT_COMPANY_EMAIL = "Company Email";
    static CLIENT_CONTACT = "Contact Number";
    static CLIENT_ADDITIONAL_CONTACT = "Additional Contact Number";
    static CLIENT_INDUSTRY = "Industry";
    static CLIENT_CUISINE_TYPE = "Cuisine Type";
    static CLIENT_TNC_CONSENT = "Tnc Consent";
    static CLIENT_STATUS = "Status";
    static CLIENT_ADDRESS = "Address";
    static CLIENT_CITY = "City";
    static CLIENT_COUNTRY = "Country";
    static CLIENT_POSTCODE = "Postcode";
    static CLIENT_STATE = "State";

    static INFLUENCER_SHEET_NAME = "Influencer Data";
    static INFLUENCER_FULL_NAME = "Full Name";
    static INFLUENCER_PREFERRED_NAME = "Preferred Name";
    static INFLUENCER_CONTACT = "Contact Number";
    static INFLUENCER_ADDITIONAL_CONTACT = "Additional Contact Number";
    static INFLUENCER_EMAIL = "Email Address";
    static INFLUENCER_COUNTRY = "Country";
    static INFLUENCER_CITY = "City";
    static INFLUENCER_STATE = "State";
    static INFLUENCER_POSTCODE = "Postcode";
    static INFLUENCER_ADDRESS = "Address";
    static INFLUENCER_INSTAGRAM_URL = "Instagram URL";
    static INFLUENCER_TIKTOK_URL = "TikTok URL";
    static INFLUENCER_REDBOOK_URL = "RedBook URL";
    static INFLUENCER_INSTAGRAM_FOLLOWER_COUNT = "Instagram Follower Count";
    static INFLUENCER_TIKTOK_FOLLOWER_COUNT = "TikTok Follower Count";
    static INFLUENCER_REDBOOK_FOLLOWER_COUNT = "RedBook Follower Count";
    static INFLUENCER_INSTAGRAM_AUDIENCE_COUNTRY = "Instagram Audience Country";
    static INFLUENCER_TIKTOK_AUDIENCE_COUNTRY = "TikTok Audience Country";
    static INFLUENCER_REDBOOK_AUDIENCE_COUNTRY = "RedBook Audience Country";
    static INFLUENCER_INSTAGRAM_ACCOUNT_FOCUS = "Instagram Account Focus";
    static INFLUENCER_TIKTOK_ACCOUNT_FOCUS = "TikTok Account Focus";
    static INFLUENCER_REDBOOK_ACCOUNT_FOCUS = "RedBook Account Focus";
    static INFLUENCER_MULTIPLE_COUNTRIES = "Multiple Countries";
    static INFLUENCER_ADDITIONAL_COUNTRY = "Additional Country";
    static INFLUENCER_INDUSTRY = "Industry";
    static INFLUENCER_WHATSAPP_CONSENT = "Consent WhatsApp Group?";
    static INFLUENCER_WHATSAPP_INVITED = "WhatsApp Invited?";
    static INFLUENCER_COMMUNITY_INVITED = "Community?";
    static INFLUENCER_INVITE_COUNT = "Invite Count";
    static INFLUENCER_TNC_CONSENT = "TnC Consent";
    static INFLUENCER_STATUS = "Status";

    static convertNumberToInt(val: string): number {
        const multiplier = {
            k: 1000,
            m: 1000000,
            b: 1000000000,
        };
        const match = val.match(/^(\d+)([kmb])?$/i);
        if (!match) {
            // throw new Error('Invalid format');
            return 0;
        }
        const [_, numberPart, suffix] = match;
        const number = parseInt(numberPart, 10);
        return suffix ? number * (multiplier[suffix.toLowerCase() as keyof typeof multiplier] || 1) : number;
    }
}