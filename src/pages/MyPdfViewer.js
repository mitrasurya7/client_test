import React, { useEffect } from "react";
import ButtonBack from "../components/ButtonBack";
import { useAtom } from "jotai";
import { ebookOneAtom } from "../stores/store";

const MyPdfViewer = () => {
  const [ebookOne] = useAtom(ebookOneAtom);
  useEffect(() => {
    const clientId = "af710d6dee7944d9b4c05adbd88edf1f";
    const adobeDCView = new window.AdobeDC.View({
      clientId: clientId,
      divId: "adobe-dc-view",
    });

    adobeDCView.previewFile(
      {
        content: {
          location: {
            url: ebookOne.linkPdf, // URL of file
          },
        },
        metaData: { fileName: ebookOne.title },
      },
      {}
    );
  }, []);
  console.log(ebookOne.linkPdf);
  return (
    <>
      <div id="adobe-dc-view" className="h-screen"></div>
      <ButtonBack />
    </>
  );
};

export default MyPdfViewer;
