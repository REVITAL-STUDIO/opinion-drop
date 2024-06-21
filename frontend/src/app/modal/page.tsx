"use client";
import Image from "next/image";
import { useState } from "react";
import DetailsModal from "../components/DetailsModal";
import OpinionModal from "../components/OpinionModal";

export default function Modal() {
  const [selectedOpinion, setSelectedOpinion] = useState(true);

  const closeModal = () => {
    setSelectedOpinion(false);
  };

  return (
    <div className="min-h-screen">
      <div>
        {selectedOpinion && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={closeModal}
            ></div>
            <DetailsModal />
            <OpinionModal closeModal={closeModal} />
          </>
        )}
      </div>
    </div>
  );
}
