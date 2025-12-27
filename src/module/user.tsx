// import { useState } from "react";
// import { updateUserStatus, updateUserStore } from "./db";

const User = ({ user, onClose }: any) => {
  // const [busy, setbusy] = useState(false);
  const checkInStatus = user.checkInStatus || "";
  // const storeStatus = user.storeStatus || "Empty";

  // const handleStatusClick = async () => {
  //   if (busy) return;
  //   setbusy(true);
  //   if (checkInStatus === "") await updateUserStatus(user.uniqueId, "Entered");
  //   if (checkInStatus === "Entered")
  //     await updateUserStatus(user.uniqueId, "Exited");
  //   await reload(user.uniqueId);
  //   setbusy(false);
  // };

  // const handleStoreClick = async () => {
  //   if (busy) return;
  //   setbusy(true);
  //   await updateUserStore(
  //     user.uniqueId,
  //     checkInStatus === "Empty" ? "Load" : "Empty"
  //   );
  //   await reload(user.uniqueId);
  //   setbusy(false);
  // };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000aa] bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>

        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {user.participantName}
          </p>
          <p>
            <strong>Gender:</strong> {user.gender}
          </p>
          <p>
            <strong>Parent Name:</strong> {user.parentSignature}
          </p>

          <p>
            <strong>Number:</strong> {user.primaryContactNumber}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                checkInStatus === "Signed In"
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {checkInStatus}
            </span>
          </p>
        </div>

        {/* {busy && "Loading..."} */}

        <div className="mt-6 flex justify-center gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
          {/* {checkInStatus === "Entered" && (
            <button
              className={`px-4 py-2 rounded ${
                storeStatus === "Load"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
              onClick={handleStoreClick}
            >
              {storeStatus === "Empty" ? "Load" : "Empty"}
            </button>
          )}
          {checkInStatus !== "Exited" && (
            <button
              className={`px-4 py-2 rounded ${
                checkInStatus === "Entered"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              } text-white`}
              onClick={handleStatusClick}
            >
              {checkInStatus === "" ? "Enter" : "Exit"}
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default User;
