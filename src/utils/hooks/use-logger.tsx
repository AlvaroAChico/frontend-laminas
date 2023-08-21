import React from "react";
import { settingsAPP } from "../../config/environments/settings";

export enum ELog {
  DEBUG = "DEBUG",
  INFO = "INFO",
  ERROR = "ERROR",
  WARNING = "WARNING",
}
const useLogger = () => {
  const Logger = (key?: string, value: any = null, type?: ELog) => {
    if (settingsAPP.environment.toUpperCase() != "prod".toUpperCase()) {
      if (type == ELog.DEBUG) {
        console.log(
          `%c K_${key} -> ${value ?? JSON.stringify(value)}`,
          "background: #00ffaa; color: #000"
        );
      }
      if (type == ELog.INFO) {
        console.info(
          `%c K_${key} -> ${value ?? JSON.stringify(value)}`,
          "background: #0000ff; color: #ffffff"
        );
      }
      if (type == ELog.ERROR) {
        console.error(
          `%c K_${key} -> ${value ?? JSON.stringify(value)}`,
          "background: #ff0000; color: #ffffff"
        );
      }
      if (type == ELog.WARNING) {
        console.warn(
          `%c K_${key} -> ${value ?? JSON.stringify(value)}`,
          "background: #ffff00; color: #000000"
        );
      }
      console.log(
        `%c K_${key} --> ${value ?? JSON.stringify(value)}`,
        "background: #ffffff; color: #0000ff"
      );
    }
  };

  return { Logger };
};

export default useLogger;
