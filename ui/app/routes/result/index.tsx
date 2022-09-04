import type { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ResultTable from "../../components/ResultTable";
import type { ResultData } from "../../../types" ;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const X = Number(url.searchParams.get("X"));
  const Y = Number(url.searchParams.get("Y"));
  const Z = Number(url.searchParams.get("Z"));

  const serverUrl = process.env.SERVER_URL as string;
  const response = await fetch(`${serverUrl}/api/steps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ X, Y, Z }),
  });

  return await response.json();
};

export default function Result() {
  const data: ResultData[] = useLoaderData();

  return (
    <main className="p-10">
      {typeof data !== 'string' ?
        <ResultTable data={data} />
      : <h1 className="text-2xl pt-5 text-red-600">{data}</h1>}
      <button
        type="button"
        className="rounded bg-emerald-600 py-2 px-4 mt-5 hover:bg-emerald-700 focus:bg-emerald-500"
      >
        <Link to="/">Go Back</Link>
      </button>
    </main>
  );
}
