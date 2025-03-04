export interface ProfileObject {
  id: number;
  username: string;
  password: string;
  email: string | null;
  firstname: string | null;
  lastname: string | null;
  salutation: string | null;
  image: string | null;
  address: string | null;
  country_code: string | null;
  postal_code: string | null;
  gender: string | null;
  birthday: string | null;
  marital_status: string | null;
  spouse_firstname: string | null;
  spouse_lastname: string | null;
  spouse_salutation: string | null;
  sports: string | null;
  music: string | null;
  shows: string | null;
  hobbies: string | null;
}

interface Timezone {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

export interface CountryProps {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  region_id: string;
  subregion: string;
  subregion_id: string;
  nationality: string;
  timezones: Timezone[];
  translations: Record<string, string>;
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
}
