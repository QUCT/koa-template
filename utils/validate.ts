import Schema, { Rules, Values } from "async-validator";
import { Context } from "vm";

async function validate<T extends Values>(
  ctx: Context,
  rules: Rules
): Promise<{ data: T; error: any | null }> {
  const validator = new Schema(rules);
  let data: any = {};
  switch (ctx.method) {
    case "GET":
      break;
    case "POST":
      data = getFormData(ctx);
      break;
    case "DELETE":
      break;
  }

  try {
    await validator.validate(data);
    return {
      data: data as T,
      error: null,
    };
  } catch (err: any) {
    return {
      error: err,
      data: {} as T,
    };
  }
}

function getFormData(ctx: Context) {
  return ctx.request.body;
}

export default validate;
