import { useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QrScanner({ onResult }: any) {
  // useEffect(() => {
  //   const scanner = new Html5QrcodeScanner(
  //     "qr-reader",
  //     {
  //       fps: 10,
  //       qrbox: 250,
  //       videoConstraints: { facingMode: { exact: "environment" } },
  //     },
  //     false
  //   );

  //   scanner.render(
  //     (decodedText) => {
  //       onResult(decodedText);
  //     },
  //     (_error) => {
  //       console.log(_error);
  //     }
  //   );

  //   return () => {
  //     scanner.clear().catch((err) => console.error(err));
  //   };
  // }, []);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("qr-reader");
    async function startCamera() {
      try {
        await html5QrCode.start(
          { facingMode: { exact: "environment" } },
          { fps: 10, qrbox: 250 },
          (decodedText: any) => onResult(decodedText),
          () => {}
        );
      } catch (err) {
        console.error("Camera start error:", err);
      }
    }

    startCamera();

    return () => {
      html5QrCode.stop().catch(() => {});
    };
  }, []);

  return <div id="qr-reader" style={{ width: "300px" }} />;
}
