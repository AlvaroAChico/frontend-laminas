import settingsEnv from "./settings-env.json";
import settingsDEV from "./development.json";
import settingsINT from "./integration.json";
import settingsPROD from "./production.json";

let name_APP = "";
let blocked_APP = false;
let activeMocks_APP = true;
let urlBaseProject_APP = "http://localhost";
let environment_APP = "development";
let urlLaminas_API = "http://localhost:8000/api";
let urlOpenAI_API = "http://localhost:8000/api";
let urlLanding_API = "http://localhost:8000/api";

if (settingsEnv.environment == "dev") {
  name_APP = settingsDEV.app.name;
  blocked_APP = settingsDEV.app.blocked;
  activeMocks_APP = settingsDEV.app.mocks;
  urlBaseProject_APP = settingsDEV.app.urlBase;
  environment_APP = settingsDEV.cloudEnv;
  urlLaminas_API = settingsDEV.api.laminas;
  urlOpenAI_API = settingsDEV.api.openai;
  urlLanding_API = settingsDEV.api.landing;
}

if (settingsEnv.environment == "int") {
  name_APP = settingsINT.app.name;
  blocked_APP = settingsINT.app.blocked;
  activeMocks_APP = settingsINT.app.mocks;
  urlBaseProject_APP = settingsINT.app.urlBase;
  environment_APP = settingsDEV.cloudEnv;
  urlLaminas_API = settingsINT.api.laminas;
  urlOpenAI_API = settingsDEV.api.openai;
  urlLanding_API = settingsDEV.api.landing;
}

if (settingsEnv.environment == "prod") {
  name_APP = settingsPROD.app.name;
  blocked_APP = settingsPROD.app.blocked;
  activeMocks_APP = settingsPROD.app.mocks;
  urlBaseProject_APP = settingsPROD.app.urlBase;
  environment_APP = settingsDEV.cloudEnv;
  urlLaminas_API = settingsPROD.api.laminas;
  urlOpenAI_API = settingsDEV.api.openai;
  urlLanding_API = settingsDEV.api.landing;
}

export const settingsAPP = {
  app: {
    name: name_APP,
    blocked: blocked_APP,
    mocks: activeMocks_APP,
    urlBase: urlBaseProject_APP,
  },
  api: {
    landing: urlLanding_API,
    laminas: urlLaminas_API,
    openai: urlOpenAI_API,
  },
  environment: environment_APP,
};
