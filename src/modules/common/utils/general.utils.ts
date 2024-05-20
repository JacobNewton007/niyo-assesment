import { ConfigService } from '@nestjs/config';
import * as fs from 'fs/promises';
import * as path from 'path';

export class GeneralUtil {
  /**
   *@name fileExist
   * @param path
   */
  public static async fileExist(path: string) {
    try {
      await fs.access(path);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   *@name createDirectory
   */
  public static async createDirectory(dir: string) {
    const basePath = path.resolve(dir);

    const exists = await this.fileExist(basePath);

    if (!exists) await fs.mkdir(basePath);
  }

  /**
   *@name snakeCase
   * @param text
   */
  public static snakeCase(text: string) {
    text = text
      .toLowerCase()
      .trim()
      .replace(/[^a-zA-Z0-9 ]/g, '');

    let result: string = text;

    if (text.search(/\s/g) !== -1) result = text.replace(/\s/g, '_');

    return result;
  }

  /**
   * @name randomize
   * @description generate random chars (string,numbers,special characters, or mixed)
   * @default count = 10
   * @default result = mixed
   * @param options
   */

  /**
   * Ensure that all required environment variables are set.
   * @param configService
   * @returns { success: boolean, message: string }
   */
  public static ensureAllEnvironmentVariablesAreSet(configService: ConfigService): {
    success: boolean;
    message: string;
  } {
    const requiredEnvironmentVariables = [
      'NODE_ENV',
      'PORT',
      'CORS_ALLOWED_ORIGINS',
      'DEVELOPMENT_DATABASE_URL',
      'JWT_EXPIRES_IN',
    ];

    const unsetEnvironmentVariables = requiredEnvironmentVariables.filter(
      (env) => !configService.get(env),
    );

    if (unsetEnvironmentVariables.length) {
      const errorMessage = `The API failed to start because the following environment variables are not defined: [${unsetEnvironmentVariables}]`;
      // return { success: false, message: errorMessage };
      throw new Error(errorMessage);
    }

    return { success: true, message: '' };
  }

  /**
   *
   * @param array
   * @param key
   * @param hasObjects
   */
  public static removeDuplicatesFromArray<T>(array: T[], key: keyof T, hasObjects = false) {
    if (hasObjects) {
      return array.filter((obj, index) => {
        return index === array.findIndex((o) => obj[key] === o[key]);
      });
    }

    return new Set(array);
  }
}
