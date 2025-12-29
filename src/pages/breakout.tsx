import { useEffect, useState } from "react";
import { getAllUsersOnBreak, getOneUsers, updateOneUsers } from "../module/db";
import QrScanner from "../module/reader";
import { showErrorToast, showToast, showWarningToast } from "../module/toast";

export default function BreakOutPage({ setPath }: any) {
  const [busy, setbusy] = useState(false);
  const [isScan, setisScan] = useState(false);
  const [userId, setuserId] = useState("");
  // const [users, setusers]: any[] = useState([]);
  // const [user, setuser]: any[] = useState(null);
  const [total, settotal]: any[] = useState(0);
  // const [page, setpage]: any[] = useState(1);

  useEffect(() => {
    loadData(1);
  }, []);

  const loadData = async (_page: number) => {
    // setpage(_page);
    let res: any = await getAllUsersOnBreak(_page);
    // setusers(res.data || []);
    settotal(res.total || 0);
    setbusy(false);
  };

  const onClickScan = async () => {
    setisScan(true);
  };

  const onEnterValue = async (value: string) => {
    // DGK-283
    if (value.length > 4) {
      if (busy) return;
      value = value.toUpperCase();
      setbusy(true);
      let user = await getOneUsers(value);

      if (!user) {
        showErrorToast("User not found");
      } else if (user?.checkInStatus !== "Entered") {
        showWarningToast("User Is not Sined In");
      } else {
        const updated = await updateOneUsers(value, {
          checkInStatus: "OnBreak",
          breakOutUpdatedAt: new Date(),
        });
        if (updated) {
          loadData(1);
          showToast("User Status changed to Break");
        } else showErrorToast("Failed On Break");
      }
      setuserId("");
    }
    setbusy(false);
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 lg:p-6">
      <div className="mt-6 flex justify-center gap-3">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => setPath("Home")}
        >
          Go to Dashboard
        </button>
      </div>
      <br />
      <div className="w-full max-w-3xl mx-auto mb-6 text-center">
        <div className="inline-flex items-center gap-3 bg-white/60 px-4 py-2 rounded-full shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-blue-600"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zM13 3h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zM13 13h2v2h-2v-2zm4 0h2v2h-2v-2zM17 17h2v2h-2v-2z" />
          </svg>

          <div className="text-left">
            <h1 className="text-lg lg:text-2xl font-semibold text-gray-800">
              Break Out with QR or ID{" "}
              <span className="text-[#2780F5]">({total})</span>
            </h1>
            <p className="mt-1 text-xs lg:text-sm text-gray-500">
              Scan a QR code or type your ID to sign out quickly and securely.
            </p>
          </div>
        </div>
      </div>

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
                onEnterValue(data);
              }}
            />
          </div>
        </div>
      )}
      {busy && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#000000CC] text-white font-bold"
          onClick={() => setisScan(false)}
        >
          loading...
        </div>
      )}
    </div>
  );
}
