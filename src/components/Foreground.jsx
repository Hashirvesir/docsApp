import React, { useRef, useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Card from "./Card.jsx"; // Assuming the correct path for the Card component
import { motion, AnimatePresence } from "framer-motion";

function Foreground() {
  const ref = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileTitle, setFileTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [data, setData] = useState(() => {
    // Retrieve data from local storage on initial component mount
    const storedData = localStorage.getItem("foregroundData");
    return storedData ? JSON.parse(storedData) : [];
  });

  const modalVariants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: "-100%", transition: { duration: 0.3 } },
  };

  useEffect(() => {
    // Save data to local storage whenever it changes
    localStorage.setItem("foregroundData", JSON.stringify(data));
  }, [data]);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form fields
    setFileTitle("");
    setSelectedFile(null);
  };

  const handleFileTitleChange = (e) => {
    setFileTitle(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
 const [validate , setValidate] = useState()
  const handleUpload = async () => {
    if (!selectedFile) {
      // Display an error message or take appropriate action
      setValidate("Please select a file **");
      return;
    }
  
    console.log('Title:', fileTitle);
    console.log('File:', selectedFile);

    // Mocking the upload process as you don't have Firebase authentication
    // Replace this with your own upload logic
    // For example, you can use a mock URL for downloadURL
    const mockDownloadURL = 'https://example.com/mock-download-url';

    // Create a new card with the uploaded file information
    const newCard = {
      desc: fileTitle,
      filesize: selectedFile
        ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)}mb`
        : '',
      filename: selectedFile.name,
      close: false,
      tag: {
        isopen: true,
        tagtitle: 'Download',
        tagcolor: 'blue',
      },
      downloadURL: mockDownloadURL, // Replace with the actual download URL
    };

    // Add the new card to the local data
    setData((prevData) => [...prevData, newCard]);

    // Clear form and close modal
    setFileTitle('');
    setSelectedFile(null);
    setIsModalOpen(false);
  };

  const handleCloseCard = (cardData) => {
    const updateData = data.filter((item) => item !== cardData);
    localStorage.setItem('foreground', JSON.stringify(updateData));
    setData(updateData);
  };

  return (
    <>
      <div
        ref={ref}
        className="fixed top-0 left-0 z-[3] w-full h-full flex gap-5 flex-wrap p-5 "
      >
        
        <IoIosAddCircle
          className="text-zinc-400 cursor-pointer"
          size={29}
          onClick={handleAddClick}
        />
        {data.map((item, index) => (
          <Card data={item} reference={ref} key={index} onCancel={handleCloseCard} />
        ))}

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-70 flex items-center justify-center"
            >
              <div className="bg-white p-8 rounded-[40px]">
                <div className="relative   float-label-input">
                  <input
                    id="fileTitle"
                    value={fileTitle}
                    onChange={handleFileTitleChange}
                    type="text"
                    placeholder=" "
                    className="block bg-white w-full focus:outline-none focus:shadow-outline border border-black rounded-md py-3 px-3 appearance-none leading-normal"
                  />
                  <label htmlFor="fileTitle" className="absolute top-3 left-0 text-black pointer-events-none transition duration-200 ease-in-outbg-white px-2">
                    Description
                  </label>
                </div>
                <div className="text-red-900">{validate}</div>
                <label
                  htmlFor="fileUpload"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Choose File:
                </label>
                <input
                  type="file"
                  id="fileUpload"
                  onChange={handleFileChange}
                  className="border border-none cursor-pointer rounded-md p-2 mb-4 "
                />
                <button
                  onClick={handleUpload}
                  className="bg-zinc-500 text-white rounded-md p-2 cursor-pointer"
                >
                  Upload
                </button>

                <button
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-700 rounded-md p-2 cursor-pointer ml-2"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Foreground;
