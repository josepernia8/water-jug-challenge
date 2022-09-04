import { json } from "@remix-run/node";
import type { ActionData } from "types";

export default function(formData: object) {
  let errors = {}

  for (let [key, value] of Object.entries(formData)) {
    if (typeof value !== 'string' || value.length === 0) {
      errors[key] = `${key} is required`;
    }
    else if (isNaN(Number(value))) {
      errors[key] = `${key} should be a number`;
    }
  }

  if (Object.keys(errors).length !== 0) {
    return json<ActionData>({ errors }, { status: 400 });
  }

}
