import React from "react";
import { motion } from "framer-motion";
import { FaFile } from "react-icons/fa6";
import { HiOutlineDownload } from "react-icons/hi";
import { MdCancel } from "react-icons/md";

function Card({ data, reference, onCancel }) {
  const handleDownload = () => {
    // Your download logic goes here
    // For example, you can use the File API to create a downloadable file
    const fileContent = "This is the content of your file.";
    const blob = new Blob([fileContent], { type: "text/plain" });

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = data.filename || "downloaded-file.txt";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleCancel = () => {
    // Your cancellation logic goes here
    onCancel(data);
  };

  const tagColor = data.tag.tagcolor === "blue" ? "bg-sky-600" : "bg-green-600";

  const modalVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.9 } },
  };

  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.1 }}
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-72 p-5 mb-3 w-60 bg-zinc-900 relative overflow-hidden rounded-[40px] text-white"
    >
      <div className="flex items-center justify-between">
        <FaFile />
        <div className="truncate w-[140px]">{data.filename}</div>
      </div>

      <p className="text-sm leading-tight mt-5 font-semibold">{data.desc}</p>

      <div className="footer absolute bottom-0 left-0 w-full">
        <div className="flex justify-between items-center px-8 py-4">
          <p>{data.filesize}</p>
          <motion.div>
            <MdCancel
              onClick={handleCancel}
              className="cursor-pointer"
            />
          </motion.div>
        </div>

        {data.tag.isopen && (
          <div
            className={`tag w-full py-4 ${tagColor} flex justify-center cursor-pointer items-center`}
          >
            <HiOutlineDownload
              size={25}
              className="cursor-pointer"
              onClick={handleDownload}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Card;
