import { useEffect, useState } from "react";
import QrScanner from "../module/reader";
import { getAllUsers, getOneUsers } from "../module/db";
import User from "../module/user";
import { UserList } from "../module/userList";

export default function UsersPage({ setPath }: any) {
  const [busy, setbusy] = useState(true);
  const [userId, setuserId] = useState("");
  const [isScan, setisScan] = useState(false);
  const [users, setusers]: any[] = useState([]);
  const [user, setuser]: any[] = useState(null);
  const [total, settotal]: any[] = useState(0);
  const [_page, setpage]: any[] = useState(1);

  useEffect(() => {
    loadDada(1);
  }, []);

  const onClickScan = async () => {
    setisScan(true);
  };

  const onEnterValue = async (value: string) => {
    if (value.length > 4) {
      if (busy) return;
      setbusy(true);
      let res = await getOneUsers(value);
      if (res) {
        setuser(res);
        setuserId("");
      }
    }
    setbusy(false);
  };

  const loadDada = async (_page: number) => {
    setpage(_page);
    let res: any = await getAllUsers(_page);
    console.log(res.total);
    setusers(res.data || []);
    settotal(res.total || 0);
    setbusy(false);
  };

  // const totalPage = total / 20;

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex flex-col items-center p-4 lg:p-6">
      <button
        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        onClick={() => setPath("Home")}
      >
        Go to Dashboard
      </button>
      <br />
      {/* Search Box */}
      <form
        className="bg-white shadow-md p-3 lg:p-6 rounded-xl w-full max-w-3xl flex gap-1 lg:gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          onEnterValue(userId);
        }}
      >
        <input
          type="text"
          placeholder="Enter the ID"
          onChange={(e) => setuserId(e.target.value)}
          autoFocus
          value={userId}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
          Enter
        </button>
        <div
          className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          onClick={onClickScan}
        >
          Scan
        </div>
      </form>
      {/* Table */}
      <UserList users={users} onSelect={onEnterValue} />
      {/* Pagination */}
      {/* <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          className="px-3 py-1 border rounded-md hover:bg-gray-200"
          onClick={() => {
            if (page > 1) loadDada(page - 1);
          }}
        >
          Prev
        </button>
        &nbsp;{page}&nbsp;
        <button
          className="px-3 py-1 border rounded-md hover:bg-gray-200"
          onClick={() => {
            if (page < totalPage) loadDada(page + 1);
          }}
        >
          Next
        </button>
      </div> */}
      {isScan && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#000000CC]"
          onClick={() => setisScan(false)}
        >
          <div
            className="bg-white border rounded overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <QrScanner
              onResult={(data: any) => {
                setisScan(false);
                setuserId(data);
                onEnterValue(data);
              }}
            />
          </div>
        </div>
      )}

      <div className="text-gray-600 mb-4 text-sm text-center mt-3">
        Showing 20 of {total}
      </div>
      {user && (
        <User onClose={() => setuser(null)} user={user} reload={onEnterValue} />
      )}
      {busy && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#000000CC]"
          onClick={() => setisScan(false)}
        >
          loading...
        </div>
      )}
    </div>
  );
}
