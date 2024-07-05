"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import DetailsModal from "../components/DetailsModal";
import OpinionModal from "../components/OpinionModal";
import RepliesModal from "../components/RepliesModal";
export default function Modal() {
  const [selectedOpinion, setSelectedOpinion] = useState(true);
  const [showRepliesModal, setShowRepliesModal] = useState(true);

  const closeModal = () => {
    setSelectedOpinion(false);
  };

  const closeReplies = () => {
    setShowRepliesModal(false);
  };

  const fetchOpinions = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving opinions");
      }
      const response = await res.json();
      console.log("data: ", response.data);
    } catch (error) {
      console.log("Error Fetching Opinions: ", error);
    }
  };

  useEffect(() => {
    fetchOpinions();
  });

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
        {/* {showRepliesModal && (
          <RepliesModal closeModal={closeReplies} />
        )} */}
      </div>
    </div>
  );
}
