"use client";

export default function Game() {
  return (
    <main className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gray-300">
      <table className="table-fixed w-64 h-64 text-center">
        <tbody className="border-4 border-yellow-200">
          <tr className="border-4 border-yellow-200">
            <td
              onClick={() => console.log("Clicked 1!")}
              className="border-r-4 border-yellow-200 cursor-pointer"
            >
              1
            </td>
            <td
              onClick={() => console.log("Clicked 2!")}
              className="border-r-4 border-yellow-200 cursor-pointer"
            >
              2
            </td>
            <td
              onClick={() => console.log("Clicked 3!")}
              className="cursor-pointer"
            >
              3
            </td>
          </tr>
          <tr className="border-4 border-yellow-200">
            <td
              onClick={() => console.log("Clicked 4!")}
              className="border-r-4 border-yellow-200 cursor-pointer"
            >
              4
            </td>
            <td
              onClick={() => console.log("Clicked 5!")}
              className="border-r-4 border-yellow-200 cursor-pointer"
            >
              5
            </td>
            <td
              onClick={() => console.log("Clicked 6!")}
              className="cursor-pointer"
            >
              6
            </td>
          </tr>
          <tr>
            <td
              onClick={() => console.log("Clicked 7!")}
              className="border-r-4 border-yellow-200 cursor-pointer"
            >
              7
            </td>
            <td
              onClick={() => console.log("Clicked 8!")}
              className="border-r-4 border-yellow-200 cursor-pointer"
            >
              8
            </td>
            <td
              onClick={() => console.log("Clicked 9!")}
              className="cursor-pointer"
            >
              9
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
