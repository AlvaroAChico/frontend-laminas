import settingsEnv from "./settings-env.json";
import settingsDEV from "./development.json";
import settingsINT from "./integration.json";
import settingsPROD from "./production.json";

let name_APP = "";
let blocked_APP = false;
let activeMocks_APP = true;
let urlBaseProject_APP = "http://localhost";
let environment_APP = "development";
let recaptcha_key_APP = "";
let recaptcha_secret_key_APP = "";
let g_client_id = "";
let g_secret_id = "";
// URLs APIs
let urlLaminas_API = "http://localhost:8000/api";
let urlOpenAI_API = "http://localhost:8000/api";
let urlLanding_API = "http://localhost:8000/api";
let urlAuth_API = "http://localhost:8000/api";
let urlSheets_API = "http://localhost:8000/api";
let urlCategories_API = "http://localhost:8000/api";

if (settingsEnv.environment.toUpperCase() == "dev".toUpperCase()) {
  name_APP = settingsDEV.app.name;
  blocked_APP = settingsDEV.app.blocked;
  activeMocks_APP = settingsDEV.app.mocks;
  urlBaseProject_APP = settingsDEV.app.urlBase;
  recaptcha_key_APP = settingsDEV.app.recaptcha_key;
  recaptcha_secret_key_APP = settingsDEV.app.recaptcha_secret_key;
  g_client_id = settingsDEV.app.g_client_id;
  g_secret_id = settingsDEV.app.g_secret_id;
  environment_APP = settingsDEV.cloudEnv;
  urlLaminas_API = settingsDEV.api.laminas;
  urlOpenAI_API = settingsDEV.api.openai;
  urlLanding_API = settingsDEV.api.landing;
  urlAuth_API = settingsDEV.api.auth;
  urlSheets_API = settingsDEV.api.sheets;
  urlCategories_API = settingsDEV.api.categories;
}

if (settingsEnv.environment.toUpperCase() == "int".toUpperCase()) {
  name_APP = settingsINT.app.name;
  blocked_APP = settingsINT.app.blocked;
  activeMocks_APP = settingsINT.app.mocks;
  urlBaseProject_APP = settingsINT.app.urlBase;
  recaptcha_key_APP = settingsINT.app.recaptcha_key;
  recaptcha_secret_key_APP = settingsINT.app.recaptcha_secret_key;
  g_client_id = settingsINT.app.g_client_id;
  g_secret_id = settingsINT.app.g_secret_id;
  environment_APP = settingsINT.cloudEnv;
  urlLaminas_API = settingsINT.api.laminas;
  urlOpenAI_API = settingsINT.api.openai;
  urlLanding_API = settingsINT.api.landing;
  urlAuth_API = settingsINT.api.auth;
  urlSheets_API = settingsINT.api.sheets;
  urlSheets_API = settingsINT.api.sheets;
  urlCategories_API = settingsINT.api.categories;
}

if (settingsEnv.environment.toUpperCase() == "prod".toUpperCase()) {
  name_APP = settingsPROD.app.name;
  blocked_APP = settingsPROD.app.blocked;
  activeMocks_APP = settingsPROD.app.mocks;
  urlBaseProject_APP = settingsPROD.app.urlBase;
  recaptcha_key_APP = settingsPROD.app.recaptcha_key;
  recaptcha_secret_key_APP = settingsPROD.app.recaptcha_secret_key;
  g_client_id = settingsPROD.app.g_client_id;
  g_secret_id = settingsPROD.app.g_secret_id;
  environment_APP = settingsPROD.cloudEnv;
  urlLaminas_API = settingsPROD.api.laminas;
  urlOpenAI_API = settingsPROD.api.openai;
  urlLanding_API = settingsPROD.api.landing;
  urlAuth_API = settingsPROD.api.auth;
  urlSheets_API = settingsPROD.api.sheets;
  urlCategories_API = settingsPROD.api.categories;
}

export const settingsAPP = {
  app: {
    name: name_APP,
    blocked: blocked_APP,
    mocks: activeMocks_APP,
    urlBase: urlBaseProject_APP,
    recaptchaKey: recaptcha_key_APP,
    recaptchaSecretKey: recaptcha_secret_key_APP,
    g_client_id: g_client_id,
    g_secret_id: g_secret_id,
  },
  api: {
    landing: urlLanding_API,
    laminas: urlLaminas_API,
    openai: urlOpenAI_API,
    auth: urlAuth_API,
    sheets: urlSheets_API,
    categories: urlCategories_API,
  },
  environment: environment_APP,
};
