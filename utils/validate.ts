import Schema, { Rules, Values } from "async-validator";
import { Context } from "vm";

async function validate<T extends Values>(
  ctx: Context,
  rules: Rules
): Promise<{ data: T; error: any | null }> {
  const validator = new Schema(rules);
  let data = {};
  try {
    await validator.validate(data);
    return {
      data: data as T,
      error: null,
    };
  } catch (error) {
    return {
      error,
      data: {} as T,
    };
  }
}

export default validate;
