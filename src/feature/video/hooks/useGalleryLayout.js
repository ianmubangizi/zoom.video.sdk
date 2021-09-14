import { useCallback, useEffect, useState } from "react";
import { getVideoLayout } from "../video-layout-helper";
import { useRenderVideo } from "./useRenderVideo";

/**
 * Default order of video:
 *  1. video's participants first
 *  2. self on the second position
 */

export function useGalleryLayout(
  zmClient,
  mediaStream,
  isVideoDecodeReady,
  videoRef,
  dimension,
  pagination
) {
  const [visibleParticipants, setVisibleParticipants] = useState([]);
  const [layout, setLayout] = useState([]);
  const [subscribedVideos, setSubscribedVideos] = useState([]);
  const { page, pageSize, totalPage, totalSize } = pagination;
  let size = pageSize;
  if (page === totalPage - 1) {
    size = Math.min(size, totalSize % pageSize || size);
  }

  useEffect(() => {
    setLayout(getVideoLayout(dimension.width, dimension.height, size));
  }, [dimension, size]);

  const onParticipantsChange = useCallback(() => {
    const participants = zmClient.getAllUser();
    const currentUser = zmClient.getCurrentUserInfo();

    if (currentUser && participants.length > 0) {
      let pageParticipants = [];
      if (participants.length === 1) {
        pageParticipants = participants;
      } else {
        pageParticipants = participants
          .filter((user) => user.userId !== currentUser.userId)
          .sort(
            (user1, user2) => Number(user2.bVideoOn) - Number(user1.bVideoOn)
          );
        pageParticipants.splice(1, 0, currentUser);
        pageParticipants = pageParticipants.filter(
          (_user, index) => Math.floor(index / pageSize) === page
        );
      }
      setVisibleParticipants(pageParticipants);
      const videoParticipants = pageParticipants
        .filter((user) => user.bVideoOn)
        .map((user) => user.userId);
      setSubscribedVideos(videoParticipants);
    }
  }, [zmClient, page, pageSize]);

  useEffect(() => {
    zmClient.on("user-added", onParticipantsChange);
    zmClient.on("user-removed", onParticipantsChange);
    zmClient.on("user-updated", onParticipantsChange);

    return () => {
      zmClient.off("user-added", onParticipantsChange);
      zmClient.off("user-removed", onParticipantsChange);
      zmClient.off("user-updated", onParticipantsChange);
    };
    
  }, [zmClient, onParticipantsChange]);

  useEffect(() => {
    onParticipantsChange();
  }, [onParticipantsChange]);

  useRenderVideo(
    mediaStream,
    isVideoDecodeReady,
    videoRef,
    layout,
    subscribedVideos,
    visibleParticipants
  );

  return {
    visibleParticipants,
    layout,
  };
}
