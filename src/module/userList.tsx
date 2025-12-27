export function UserList({ users, onSelect }: any) {
  return (
    <div className="mt-6 bg-white shadow-lg rounded-xl w-full max-w-4xl overflow-hidden">
      <table className="w-full text-sm lg:text-base">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left hidden lg:block">Name</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left hidden lg:block">Store</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((it: any, i: number) => (
            <tr
              key={i}
              className="odd:bg-white even:bg-gray-50"
              onClick={() => onSelect(it.uniqueId)}
            >
              <td className="p-3">
                <span className="text-[blue] font-bold">{it.uniqueId}</span>
                <br />
                <span className="lg:hidden block">{it.participantName}</span>
              </td>
              <td className="p-3 hidden lg:block">{it.participantName}</td>
              <td className="p-3">{it.primaryContactNumber}</td>
              <td className="p-3 hidden lg:block">{it.storeStatus || "-"}</td>
              <td className="p-3">
                {it.checkInStatus || "Waiting"}
                <br />
                <span className="lg:hidden block">{it.storeStatus || "-"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
