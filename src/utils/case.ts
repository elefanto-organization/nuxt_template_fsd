import { objectToSnake, objectToCamel } from "@allure-ai/ts-case-convert";
import {
  ObjectToCamel,
  ObjectToSnake,
} from "@allure-ai/ts-case-convert/lib/caseConvert";
interface CaseSerializer {
  serialize<T extends object>(data: T): ObjectToCamel<T>;
  deserialize<T extends object>(data: T): ObjectToSnake<T>;
}
class CaseSerializerImpl implements CaseSerializer {
  serialize<T extends object>(data: T): ObjectToCamel<T> {
    return objectToCamel(data);
  }

  deserialize<T extends object>(data: T): ObjectToSnake<T> {
    return objectToSnake(data);
  }
}

export const caseSerializer = new CaseSerializerImpl();
