const Orders = () => {
  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <th className="h-12 px-4 text-left align-middle font-medium text-[#a1a1aa] [&:has([role=checkbox])]:pr-0 w-[100px]">
              Advertiser
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-[#a1a1aa] [&:has([role=checkbox])]:pr-0">
              Rate
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-[#a1a1aa] [&:has([role=checkbox])]:pr-0">
              Available
            </th>
            <th className="h-12 px-4 text-left align-middle font-medium text-[#a1a1aa] [&:has([role=checkbox])]:pr-0">
              Payment
            </th>
            <th className="h-12 px-4 align-middle font-medium text-[#a1a1aa] [&:has([role=checkbox])]:pr-0 text-right">
              Trade
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {new Array(7).fill("order").map((_, i) => (
            <tr key={i.toString()} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-medium">
                onihani.testnet
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                14.19 USDT
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                200 ETH
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                USDT
              </td>
              <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
                <button className="px-4 py-2 backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
                  Trade
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {/* <tfoot className="border-t bg-muted/50 font-medium [&>tr]:last:border-b-0">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            <td
              className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
              colSpan={3}
            >
              Total
            </td>
            <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right">
              $2,500.00
            </td>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
};

export default Orders;
