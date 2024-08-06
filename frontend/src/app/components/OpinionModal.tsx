"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDropdown, IoIosSend } from "react-icons/io";
import RebuttalShort from "./RebuttalShort";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPaperPlane, FaFlag, FaX } from "react-icons/fa6";
import ProgressBar from "progressbar.js";
import InteractionModal from "./InteractionModal";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { motion } from "framer-motion";

import SurveyPrompt from "./SurveyPrompt";
import {
  faFlag,
  faPaperPlane,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import OpenRebuttal from "./RebuttalModal";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import StateIt from "./stateIt";
import { useAuth } from "../hooks/AuthContext";
import { v4 as uuidv4 } from 'uuid';
import { Content } from "next/font/google";


function valuetext(value: number) {
  return `${value}`;
}

interface OpinionModalProps {
  opinionData: {
    id: number;
    author: string;
    title: string;
    textcontent: string;
    backgroundimage: string;
    authorprofileimage?: string;
  };
  toggleStateIt: () => void;
  toggleDebateIt: () => void;
  hasSubmittedSurvey?: boolean;
  survey?: Survey;
}

interface Rebuttal {
  id: number;
  author: string;
  title: string;
  textcontent: string;
  authorprofileimage?: string;
  parentopinionid: number;
}

interface Highlight {
  highlightId: string;
  container: HTMLElement;
  highlightedText: string;
  reactionText: string;
  reactionType: string;

}

interface SurveyQuestion {
  questionId: number;
  questionText: string;
}

export interface Survey {
  surveyId: number;
  questions: SurveyQuestion[];
}

const OpinionModal: React.FC<OpinionModalProps> = ({
  opinionData,
  toggleStateIt,
  toggleDebateIt,
  hasSubmittedSurvey,
  survey,
}) => {
  const [selectedTab, setSelectedTab] = useState("Opinion");
  const [hideOpinion, setHideOpinion] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [replyMenu, setReplyMenu] = useState(false);
  const [rebuttals, setRebuttals] = useState<Rebuttal[]>([]);

  const [highlightedText, setHighlightedText] = useState("");
  const [highlightContainer, setHighlightContainer] =
    useState<HTMLElement | null>(null);
  const [showEmojiPicker, setShowEmorjiPicker] = useState(false);
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [showInteractionModal, setShowInteractionModal] = useState(false);
  const [interactionType, setInteractionType] = useState<
    "emoji" | "comment" | null
  >(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [currentHighlightId, setCurrentHighlightId] = useState<string | null>(
    null
  );
  const [openDiscussion, setOpenDiscussion] = useState(false);
  const [sliderValue, setSliderValue] = useState<number>(50);
  const { currentUser } = useAuth();
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [userHasDisliked, setUserHasDisliked] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [userHasRated, setUserHasRated] = useState(false);
  const [userRating, setuserRating] = useState<null | number>(null);
  const [userRatingId, setuserRatingId] = useState<null | number>(null);
  const [answers, setAnswers] = useState<{ [questionId: number]: number }>({});
  const [numLikes, setNumLikes] = useState<number>(0);
  const [numDislikes, setNumDislikes] = useState<number>(0);

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
    console.log("answers object: ", answers);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  const openDiscussionModal = () => {
    setOpenDiscussion(true);
  };

  const closeDiscussion = () => {
    setOpenDiscussion(false);
  };

  const openReplies = () => {
    setReplyMenu((e) => !e);
  };

  //Progress bar
  const containerRef = useRef(null);

  const generateHighlightId = () => uuidv4();


  const closeInteractionModal = () => {
    setShowInteractionModal(false);
  };
  const addEmojiToHighlight = (emoji: string) => {
    console.log("in addemoji currenthighlightId: ", currentHighlightId);
    console.log("in addemoji current Highlights state: ", highlights);

    if (currentHighlightId) {
      setHighlights((prevHighlights) =>
        prevHighlights.map((highlight) =>
          highlight.highlightId === currentHighlightId
            ? {
              ...highlight,
              container: updateHighlightContainer(
                highlight.container,
                emoji,
                "emoji"
              ),
              reactionType: "emoji",
              reactionText: emoji

            }
            : highlight
        )
      );
      setShowInteractionModal(false);
      const updatedHighlight = highlights.find((highlight) => highlight.highlightId == currentHighlightId);
      console.log("updated highlight: ", updatedHighlight);

      if (updatedHighlight) {
        updateHighlight({
          ...updatedHighlight,
          reactionText: emoji,
          reactionType: "emoji",
        });
      }

    }
  };

  const addCommentToHighlight = (comment: string) => {
    if (currentHighlightId) {
      setHighlights((prevHighlights) =>
        prevHighlights.map((highlight) =>
          highlight.highlightId === currentHighlightId
            ? {
              ...highlight,
              container: updateHighlightContainer(
                highlight.container,
                comment,
                "comment"
              ),
              reactionType: "comment",
              reactionText: comment
            }
            : highlight
        )
      );
      setShowInteractionModal(false);
      const updatedHighlight = highlights.find((highlight) => highlight.highlightId == currentHighlightId);
      console.log("updated highlight: ", updatedHighlight);

      if (updatedHighlight) {
        updateHighlight({
          ...updatedHighlight,
          reactionText: comment,
          reactionType: "comment",
        });
      }
    }
  };

  const updateHighlightContainer = (
    container: HTMLElement,
    content: string,
    type: "emoji" | "comment"
  ) => {
    console.log("in update highlight, container: ", container);

    container.querySelectorAll(".emoji, .comment").forEach((element) => element.remove());

    const newElement = document.createElement("span");
    newElement.className = type;
    newElement.textContent = content;
    container.appendChild(newElement);

    console.log("in updatehighlightcontainer currenthighlightId: ", currentHighlightId);
    if (currentHighlightId) {
      const oldContainer = document.getElementById(currentHighlightId);
      container.id = currentHighlightId

      if (oldContainer) {
        oldContainer.replaceWith(container);
      }

    }


    return container;
  };



  const handleTextSelect = () => {
    if (!highlightEnabled) return;
    const opinionText = document.querySelector(".opinion-text");
    const selection = window.getSelection();
    const selectedText = selection?.toString();
    const highlightId = generateHighlightId();

    if (selection && !opinionText?.contains(selection.anchorNode)) return;
    if (selectedText) {
      setShowInteractionModal(true);
      setHighlightedText(selectedText);
      const range = selection?.getRangeAt(0);
      const container = document.createElement("span");
      container.style.position = "relative";
      container.style.display = "inline-block";
      container.style.textIndent = "0";

      const highlightedText = document.createElement("span");
      highlightedText.className = "highlightedText";
      highlightedText.textContent = selectedText;
      highlightedText.style.fontSize = "1.2em";

      const closeButton = document.createElement("button");
      closeButton.className = "highlight-close-button";
      closeButton.textContent = "✕";

      closeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        setShowInteractionModal(false);
        setHighlightContainer(null);
        const parent = container.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(selectedText), container);
        }
        const highlight = highlights.find((highlight) => highlight.highlightId == highlightId);
        if (highlight) {
          deleteHighlight(highlight);
        }
        setHighlights((prev) =>
          prev.filter((highlight) => highlight.highlightId !== highlightId)
        );

      });

      const editButton = document.createElement("button");
      editButton.className = "highlight-edit-button";
      editButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/>
      </svg>
    `;
      editButton.addEventListener("click", (event) => {
        event.stopPropagation();
        setCurrentHighlightId(highlightId);
        setShowInteractionModal(true);
      });

      container.appendChild(highlightedText);
      container.appendChild(closeButton);
      container.appendChild(editButton);
      container.id = highlightId;
      setHighlightContainer(container);

      // Remove the selected text and insert the container in its place
      range?.deleteContents();
      range?.insertNode(container);

      // Move the cursor after the inserted container
      range?.setStartAfter(container);
      selection?.removeAllRanges();
      if (range) {
        selection?.addRange(range);
      }

      setCurrentHighlightId(highlightId);
      const newHighlight = {
        highlightId: highlightId,
        container,
        highlightedText: selectedText,
        reactionType: "",
        reactionText: ""
      };

      setHighlights((prev) => [
        ...prev,
        newHighlight,
      ]);
      createHighlight(newHighlight);



    }

  };


  const applyHighlights = (fetchedHighlights: Highlight[]) => {
    const opinionText = document.querySelector(".opinion-text") as HTMLElement;

    // Extract existing highlight IDs
    const existingHighlights = new Set<string>(
      Array.from(opinionText.querySelectorAll('span[id]')).map(span => span.id)
    );

    const highlightsWithContainers: Highlight[] = []

    fetchedHighlights.forEach((highlight) => {
      // Skip already highlighted text
      if (existingHighlights.has(highlight.highlightId)) return;

      // Replace the highlighted text in the opinionElement with HTML containing the highlight span and buttons
      const highlightHTML = `
        <span id="${highlight.highlightId}" style="position: relative; display: inline-block; text-indent: 0px;">
          <span class="highlightedText" style="font-size: 1.2em;">${highlight.highlightedText}</span>
          <button class="highlight-close-button">✕</button>
          <button class="highlight-edit-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/>
            </svg>
          </button>
          <span class="${highlight.reactionType}">${highlight.reactionText}</span>
        </span>`;

      // Replace highlighted text in the HTML
      opinionText.innerHTML = opinionText.innerHTML.replace(
        highlight.highlightedText,
        highlightHTML
      );

      // Update highlight container reference
      const highlightContainer = document.getElementById(highlight.highlightId);
      if (highlightContainer) {
        highlight.container = highlightContainer;
        highlightsWithContainers.push(highlight);
      }
    });

    

    return highlightsWithContainers;

  };



  const fetchHighlights = async () => {
    try {
      console.log("fetching highlights: ")
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/highlights/userHighlights/${opinionData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser?.uid })
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving opinion dislike count");
      }
      const response = await res.json();
      const fetchedHighlights = await response.data.highlights;
      return fetchedHighlights;

    } catch (error) {
      console.log("Error Fetching Opinion dislike count: ", error);
    }
  }


  const loadHighlightOnclicks = () => {

    const closeButtons = document.querySelectorAll(".highlight-close-button");
    closeButtons.forEach((button) => {

      
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const parentSpan = button.closest("span[id]");
        if (parentSpan) {
          const highlightId = parentSpan.id;
          // Remove highlight from state and DOM
          const highlight = highlights.find((highlight) => highlight.highlightId === highlightId);
          if (highlight) {
            const originalTextNode = document.createTextNode(highlight.highlightedText);
            parentSpan.parentNode?.replaceChild(originalTextNode, parentSpan);
            deleteHighlight(highlight);
          }
          setHighlights((prev) => prev.filter((highlight) => highlight.highlightId !== highlightId));
        }
      });
    });

    const editButtons = document.querySelectorAll(".highlight-edit-button");

    editButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const parentSpan = button.closest("span[id]");
        if (parentSpan) {
          const highlightId = parentSpan.id;
          // Open the interaction modal for editing
          setCurrentHighlightId(highlightId);
          const highlight = highlights.find((highlight) => highlight.highlightId == highlightId);
          console.log("in edit button, slectedHIghlight find: ", highlight, " highlight text: ", highlight?.highlightedText);
          if (highlight && highlight.highlightedText) {
            console.log("highlighted text: ", highlight.highlightedText)
            setHighlightedText(highlight.highlightedText);
          }
          console.log("highlightId: ", highlightId);
          console.log("currenthighlightId state: ", currentHighlightId);
          console.log("highlightedtext state: ", highlightedText);
          setShowInteractionModal(true);
        }
      });
    });

  }

  useEffect(() => {
    const loadHighlights = async () => {
      try {
        const fetchedHighlights = await fetchHighlights();
        console.log("fetched highlights: ", fetchedHighlights);
        const updatedHighlights: Highlight[] = applyHighlights(fetchedHighlights);
        console.log("updated highlights after calling applyhighlights: ", updatedHighlights);
        if (updatedHighlights?.length > 0) {
          setHighlights(updatedHighlights);
        }
      } catch (error) {
        console.error("Error fetching highlights:", error);
      }
    };

    loadHighlights();
    loadHighlightOnclicks();


  }, []);

  useEffect(() => {
    console.log("state variable highlights: ", highlights);
    loadHighlightOnclicks();
  }, [highlights]);


  const createHighlight = async (highlight: Highlight) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/highlights`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            highlightId: highlight.highlightId,
            userId: currentUser?.uid,
            opinionId: opinionData.id,
            highlightedText: highlight.highlightedText,
            reactionText: highlight.reactionText,
            reactionType: highlight.reactionType
          })
        }
      );
      if (!res.ok) {
        throw new Error("Error creating highlight");
      }

    } catch (error) {
      console.log("Error creating highlight: ", error);
    }
  };

  const updateHighlight = async (highlight: Highlight) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/highlights`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            highlightId: highlight.highlightId,
            userId: currentUser?.uid,
            opinionId: opinionData.id,
            highlightedText: highlight.highlightedText,
            reactionText: highlight.reactionText,
            reactionType: highlight.reactionType
          })
        }
      );
      if (!res.ok) {
        throw new Error("Error updating highlight");
      }

    } catch (error) {
      console.log("Error updating highlight: ", error);
    }
  };

  const deleteHighlight = async (highlight: Highlight) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/highlights/${highlight.highlightId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      if (!res.ok) {
        throw new Error("Error deleting highlight");
      }

    } catch (error) {
      console.log("Error deleting highlight: ", error);
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("mouseup", handleTextSelect);
      return () => {
        document.removeEventListener("mouseup", handleTextSelect);
      };
    }
  }, [highlightEnabled]);


  const fetchRebuttals = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinion/rebuttals/${opinionData.id}`,
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
      setRebuttals(response.data.opinions);
    } catch (error) {
      console.log("Error Fetching Opinions: ", error);
    }
  };

  const getNumOpinionLikes = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions/numlikes/${opinionData.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving opinion like count");
      }
      const response = await res.json();
      setNumLikes(response.data.numLikes);
    } catch (error) {
      console.log("Error Fetching Opinion like count: ", error);
    }
  };

  const getNumDislikes = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions/numDislikes/${opinionData.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving opinion dislike count");
      }
      const response = await res.json();
      setNumDislikes(response.data.numDislikes);
    } catch (error) {
      console.log("Error Fetching Opinion dislike count: ", error);
    }
  };

  useEffect(() => {
    getNumDislikes();
    getNumOpinionLikes();
    fetchRebuttals();
  }, []);

  const handleLikeOpinion = async () => {
    try {
      if (!userHasLiked) {
        if (userHasDisliked) {
          await unDislikeOpinion();
          setUserHasDisliked(false);
        }
        await likeOpinion();
        setUserHasLiked(true);
      } else {
        await unLikeOpinion();
        setUserHasLiked(false);
      }
    } catch (error) {
      console.log("Error in handlelike opinion: ", error);
    }
  };

  const handleDislikeOpinion = async () => {
    try {
      if (!userHasDisliked) {
        if (userHasLiked) {
          await unLikeOpinion();
          setUserHasLiked(false);
        }
        await dislikeOpinion();
        setUserHasDisliked(true);
      } else {
        await unDislikeOpinion();
        setUserHasDisliked(false);
      }
    } catch (error) {
      console.log("Error in handledislike opinion: ", error);
    }
  };

  const likeOpinion = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions/like/${opinionData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser?.uid }),
        }
      );
      if (!res.ok) {
        throw new Error("Error liking opinion");
      }
    } catch (error) {
      console.log("Error liking Opinion: ", error);
    }
  };

  const unLikeOpinion = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions/unlike/${opinionData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser?.uid }),
        }
      );
      if (!res.ok) {
        throw new Error("Error unliking opinion");
      }
      const response = await res.json();
    } catch (error) {
      console.log("Error unliking opinion: ", error);
    }
  };

  const hasUserLiked = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions/userLiked/${opinionData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser?.uid }),
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving has liked");
      }
      const response = await res.json();
      return response.data.userHasLiked;
    } catch (error) {
      console.log("Error retrieving hasliked: ", error);
    }
  };

  const dislikeOpinion = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions/dislike/${opinionData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser?.uid }),
        }
      );
      if (!res.ok) {
        throw new Error("Error disliking opinion");
      }
    } catch (error) {
      console.log("Error disliking Opinion: ", error);
    }
  };

  const unDislikeOpinion = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions/undislike/${opinionData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser?.uid }),
        }
      );
      if (!res.ok) {
        throw new Error("Error undisliking opinion");
      }
    } catch (error) {
      console.log("Error undisliking Opinion: ", error);
    }
  };

  const hasUserDisliked = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/opinions/userDisliked/${opinionData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser?.uid }),
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving has liked");
      }
      const response = await res.json();
      return response.data.userHasDisliked;
    } catch (error) {
      console.log("Error retrieving hasdisliked: ", error);
    }
  };

  useEffect(() => {
    const loadLiked = async () => {
      const hasLiked: boolean = await hasUserLiked();
      const hasDisliked: boolean = await hasUserDisliked();
      setUserHasLiked(hasLiked);
      setUserHasDisliked(hasDisliked);
    };
    if (opinionData) {
      loadLiked();
      getUserRating();
    }
  }, [opinionData]);

  const getUserRating = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/ratings/userRated/${opinionData.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser?.uid }),
        }
      );
      if (!res.ok) {
        throw new Error("Error retrieving rating");
      }
      const response = await res.json();
      if (response.data.userHasRated) {
        setuserRating(response.data.rating.value);
        setuserRatingId(response.data.rating.ratingId);
      }
      setUserHasRated(response.data.userHasRated);
    } catch (error) {
      console.log("Error retrieving user rating: ", error);
    }
  };

  const rateOpinion = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/ratings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser?.uid,
            opinionId: opinionData.id,
            value: sliderValue,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Error rating opinion");
      }
      const response = await res.json();
      setuserRating(response.data.rating.value);
      setuserRatingId(response.data.rating.ratingId);
      setUserHasRated(response.data.userHasRated);
    } catch (error) {
      console.log("Error rating opinion: ", error);
    }
  };

  const updateRating = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/ratings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ratingId: userRatingId,
            userId: currentUser?.uid,
            opinionId: opinionData.id,
            value: sliderValue,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Error updating");
      }
      const response = await res.json();
      setuserRating(response.data.rating.value);
    } catch (error) {
      console.log("Error rating opinion: ", error);
    }
  };

  const handleRateOpinion = async () => {
    try {
      await rateOpinion();
    } catch (error) {
      console.log(error);
    }
    setOpenRating(false);
  };

  const handleUpdateRating = async () => {
    try {
      await updateRating();
    } catch (error) {
      console.log(error);
    }
    setOpenRating(false);
  };

  const submitSurvey = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_SERVER_URL}/api/surveys/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser?.uid,
            surveyId: survey?.surveyId,
            answers: answers,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Error submitting survey");
      }
      setHideOpinion(false);
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="z-30  w-[75%] h-[750px] bg-white text-black p-6 shadow-lg relative rounded-md">
      <div className="border-b-[1px] -mx-6 border-[#C5C5C5] mb-[3%] text-xl font-bold flex items-center px-8 gap-12">
        <a
          className={`cursor-pointer ${selectedTab === "Opinion"
            ? "border-b-[4px] border-[#606060] "
            : "border-b-0"
            }`}
          onClick={() => setSelectedTab("Opinion")}
        >
          Opinion
        </a>
        <a
          className={`cursor-pointer ${selectedTab === "Rebuttal"
            ? "border-b-[4px] border-[#606060] "
            : "border-b-0"
            }`}
          onClick={() => setSelectedTab("Rebuttal")}
        >
          Rebuttal
        </a>
      </div>
      {/* Survey Container */}
      {!hasSubmittedSurvey && currentUser && survey && (
        <div
          className={`absolute inset-x-0 bottom-0 left-0 h-[90%]     bg-[#2b2b2b] z-30 flex justify-center shadow-lg rounded-md ${
            hideOpinion ? "" : "invisible"
          }`}
        >
          <div className="absolute -top-[5rem] left-0 w-full   bg-[#2b2b2b] rounded-md text-white p-4  z-40">
            <h3 className="text-5xl  font-bold  p-4 mt-4">Tell Us..</h3>
            <p className="p-4 text-gray-300">
              This Survey is to help us personalize your User Experience.{" "}
            </p>
          </div>
          <div className=" flex flex-col justify-center text-white relative">
            {survey.questions.map((question, index) => (
              <SurveyPrompt
                key={index}
                onChange={handleAnswerChange}
                questionId={question.questionId}
                prompt={question.questionText}
              />
            ))}
          </div>
          <button
            onClick={submitSurvey}
            className="shadow-lg rounded-xl absolute bottom-8 left-4 text-white p-4  gap-x-4 hover:scale-95 ease-in-out duration-200 bg-gradient-to-br from-gray-400 to-blue-300 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="text-2xl" /> Send
          </button>
        </div>
      )}
      {showConfirmation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute w-full h-[100%] z-50 inset-0 bg-gradient-to-t from-[#2b2b2b] to-[#2b2b2b]/95 bg-opacity-100 rounded-md flex items-center justify-center"
        >
          <div className="px-4 py-[10%]  flex flex-col ">
            <div className="p-4  mx-auto my-4 border-4 border-green-300 bg-green-300 rounded-full flex justify-center items-center">
              <FontAwesomeIcon icon={faCheck} className="text-3xl text-white" />
            </div>
            <span className="mx-auto text-4xl my-2 font-bold text-white">
              Response Recorded
            </span>
            <span className="mx-auto text-white">
              Your response has been recorded!
            </span>
          </div>
        </motion.div>
      )}

      <div className="w-full  overflow-y-auto">
        <div className="w-full flex justify-evenly relative items-center  p-4">
          <div className="relative w-[100%] flex">
            <h2 className="text-5xl leading-tight mb-4 w-4/6 font-black px-4">
              {opinionData.title.toUpperCase()}
            </h2>
            <button
              onClick={openReplies}
              className={`font-bold w-1/4 h-10 mt-2 border shadow-md rounded-full text-white flex items-center justify-center gap-x-2 bg-[#000] `}
            >
              Reply
              <IoIosArrowDropdown
                className={`${replyMenu ? "rotate-0" : "-rotate-180"
                  } transition ease-in-out duration-150`}
              />
            </button>
            {replyMenu && (
              <section
                className={`absolute top-full right-4 gap-y-4 w-2/5 overflow-hidden transition-opacity ${replyMenu ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }  transition-all ease-in-out duration-150 z-10 bg-[#fafafa] rounded-lg shadow-lg text-white `}
              >
                <button
                  onClick={toggleStateIt}
                  className="w-full p-4 text-left hover:bg-white text-black ease-in-out   duration-200 transition rounded-tl-lg hover:scale-110 rounded-tr-lg border-b  "
                >
                  <span className="font-semibold">State It</span>
                  <p className="  text-xs">
                    Support this Claim.. Better yet, add on
                  </p>
                </button>
                <button
                  onClick={toggleDebateIt}
                  className="w-full p-4 text-left text-black ease-in-out rounded-bl-lg rounded-br-lg hover:scale-110 duration-200 transition "
                >
                  <span className="font-semibold">Debate It</span>
                  <p className=" text-xs">Give them a fierce second opinion</p>
                </button>
              </section>
            )}
          </div>
        </div>

        <div className="flex-1 max-h-[500px] overflow-y-auto custom-scrollbar ">
          {/* Opinion Content */}
          {selectedTab == "Opinion" && (
            <div>
              <div className="relative mx-4 px-4">
                <p className="opinion-text text-sm my-4 indent-3">
                  {opinionData.textcontent}
                </p>
              </div>
              {/* Rate it */}
              <div className="w-[90%] mx-auto  p-4 rounded-xl text-black">
                <div className="w-full my-4">
                  <h1 className=" text-center font-semibold">
                    Does this essay belong in this topic?
                  </h1>
                  <div className="p-4 mx-auto mt-[2%] rounded-full w-[50%] flex justify-evenly items-center">
                    <button
                      onClick={() => handleLikeOpinion()}
                      className={`w-20 h-20 rounded-full hover:scale-105 ease-in-out duration-200 transition  text-3xl shadow-lg ${userHasLiked ? "bg-green-500 scale-105" : "bg-white"
                        }`}
                    >
                      👍
                    </button>
                    <button
                      onClick={() => handleDislikeOpinion()}
                      className={`w-20 h-20 rounded-full hover:scale-105 ease-in-out duration-200 transition  text-3xl shadow-lg ${userHasDisliked ? "bg-red-500 scale-105" : "bg-white"
                        }`}
                    >
                      👎
                    </button>
                  </div>
                </div>
                <div className="w-full mx-auto">
                  <div className="w-full flex flex-col justify-center items-center">
                    {userHasRated ? (
                      <div>
                        {!openRating && (
                          <div>
                            <p>
                              Your Rating:{" "}
                              <span className="text-lg">{userRating}%</span>
                            </p>
                            <button
                              onClick={() => setOpenRating(true)}
                              className="font-bold  px-2 py-2 mt-2 border shadow-md rounded-full text-white flex items-center justify-center bg-blue-400"
                            >
                              Update Rating
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <h2 className="my-4 text-center font-semibold">
                          How much do you agree with this Essay?
                        </h2>
                        {!openRating && (
                          <button
                            onClick={() => setOpenRating(true)}
                            className="font-normal text-sm px-4 py-2 mt-2 border shadow-md rounded-full text-white flex items-center justify-center gap-x-2 bg-blue-400"
                          >
                            Rate Opinion
                          </button>
                        )}
                      </div>
                    )}

                    {openRating && (
                      <div>
                        <Box sx={{ width: 300 }}>
                          <Slider
                            aria-label="Temperature"
                            defaultValue={50}
                            value={sliderValue}
                            onChange={handleSliderChange}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={10}
                            max={100}
                            className="mx-auto "
                          />
                        </Box>
                        <p className="text-center text-3xl font-bold mb">
                          {valuetext(sliderValue)}%
                        </p>
                      </div>
                    )}

                    {openRating && !userHasRated && (
                      <button
                        onClick={() => handleRateOpinion()}
                        className="relative mt-4 px-4 py-2  h-10   shadow-md rounded-full text-white flex items-center justify-center gap-x-2 bg-blue-400"
                      >
                        Submit Rating
                      </button>
                    )}
                    {openRating && userHasRated && (
                      <button
                        onClick={() => handleUpdateRating()}
                        className=" mt-4 shadow-sm rounded-full px-4 py-2 text-white flex items-center justify-center gap-x-2 border bg-blue-400"
                      >
                        Submit Rating
                      </button>
                    )}
                    {openRating && (
                      <button
                        onClick={() => setOpenRating(false)}
                        className=" text-gray-400 mt-4 relative"
                      >
                        cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Rebuttals */}

        {selectedTab == "Rebuttal" && (
          <div className="flex flex-col items-center gap-y-2 max-h-[500px] overflow-y-auto relative">
            <div className="w-[90%]">
              {rebuttals.map((rebuttalData) => (
                <RebuttalShort key={rebuttalData.id} rebuttal={rebuttalData} />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Interaction Modal */}
      {showInteractionModal && (
        <InteractionModal
          highlightedText={highlightedText}
          onClose={closeInteractionModal}
          onAddEmoji={addEmojiToHighlight}
          onAddComment={addCommentToHighlight}
        />
      )}
    </div>
  );
};

export default OpinionModal;
