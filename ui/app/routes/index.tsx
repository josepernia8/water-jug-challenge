import type { ActionFunction, LoaderFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { validateFormInput } from "utils";

export const loader: LoaderFunction = async () => {
  const res = await fetch(process.env.SERVER_URL as string);

  return json(await res.text());
};

export const action: ActionFunction = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());

  const formErrors = validateFormInput(formData);
  if(formErrors) return formErrors;

  return redirect(`/result?X=${formData.bucketA}&Y=${formData.bucketB}&Z=${formData.amount}`);
};

const inputClassname = `flex-1 rounded-md border-2 px-3 text-lg leading-loose
  border-emerald-600 caret-emerald-600 bg-slate-400 text-emerald-700 focus:outline-none`;

export default function Main() {
  const welcomeText = useLoaderData();
  const actionData = useActionData();
  const transition = useTransition();
  const isLoading = Boolean(transition.submission);

  return (
    <main className="p-10">
      <h1
        className="text-3xl pb-14 pt-5"
        style={{ transform: "rotate3d(0, 5, 3, 10deg)" }}
      >
        {welcomeText}
      </h1>
      <Form method="post">
        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <label className="flex w-full flex-col gap-1">
              <span>Bucket A: </span>
              <input
                name="bucketA"
                className={`${inputClassname} ${actionData?.errors?.bucketA ? "border-red-700" : ""}`}
                aria-invalid={actionData?.errors?.bucketA ? true : undefined}
                aria-errormessage={
                  actionData?.errors?.bucketA ? "title-error" : undefined
                }
                disabled={isLoading}
              />
            </label>
            {actionData?.errors?.bucketA && (
              <div className="pt-1 text-red-700" id="title-error">
                {actionData.errors.bucketA}
              </div>
            )}
          </div>

          <div>
            <label className="flex w-full flex-col gap-1">
              <span>Bucket B: </span>
              <input
                name="bucketB"
                className={`${inputClassname} ${actionData?.errors?.bucketB ? "border-red-700" : ""}`}
                aria-invalid={actionData?.errors?.bucketB ? true : undefined}
                aria-errormessage={
                  actionData?.errors?.bucketB ? "title-error" : undefined
                }
                disabled={isLoading}
              />
            </label>
            {actionData?.errors?.bucketB && (
              <div className="pt-1 text-red-700" id="title-error">
                {actionData.errors.bucketB}
              </div>
            )}
          </div>

          <div>
            <label className="flex w-full flex-col gap-1">
              <span>Amount Wanted: </span>
              <input
                name="amount"
                className={`${inputClassname} ${actionData?.errors?.amount ? "border-red-700" : ""}`}
                aria-invalid={actionData?.errors?.amount ? true : undefined}
                aria-errormessage={
                  actionData?.errors?.amount ? "title-error" : undefined
                }
                disabled={isLoading}
              />
            </label>
            {actionData?.errors?.amount && (
              <div className="pt-1 text-red-700" id="title-error">
                {actionData.errors.amount}
              </div>
            )}
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            className="rounded bg-emerald-600 py-2 px-4 hover:bg-emerald-700 focus:bg-emerald-500"
            disabled={isLoading}
          >
            {isLoading ? 'Calculating...' : "Run!"}
          </button>
        </div>
      </Form>
    </main>
  );
};
