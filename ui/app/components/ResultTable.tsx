import type { ResultData } from "../../types" ;

type ResulTableProps = {
  data: ResultData[];
}

export default function ResultTable({ data }: ResulTableProps) {
  return (
    <table className="border-separate border-spacing-2 border border-slate-500 w-full">
    <caption className="text-xl pb-5">Best Solution</caption>
      <thead>
        <tr>
          {Object.keys(data[0]).map((item, index) => (
            <th
              key={`header-${index}`}
              className="border border-slate-600 p-2"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: object, index: number) => (
          <tr key={`row-${index}`}>
            {Object.values(item).map((value, idx) => (
              <td
                key={`col-${index}-${idx}`}
                className="border border-slate-600 p-2"
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
