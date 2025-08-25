'use client';

import { useState, useEffect, memo } from 'react';

interface ProcessingButtonProps {
  next: () => void;
  isVideoLoading: boolean;
  isVideoPlaying: boolean;
  canNavigate: boolean;
  onClick: () => void;
  isScrolling: boolean;
  isStop: boolean;
}

const ProcessingButton = memo(function ProcessingButton({
  next,
  isVideoLoading,
  isVideoPlaying,
  canNavigate,
  onClick,
  isScrolling,
  isStop,
}: ProcessingButtonProps) {
  const [index, setIndex] = useState(0);

  // Show loading state while video is loading OR playing
  const shouldShowLoading = isVideoLoading || isVideoPlaying;

  // Reset index when component becomes invisible, loading state changes, or scrolling
  useEffect(() => {
    if (!shouldShowLoading || isScrolling) {
      setIndex(0);
    }
  }, [shouldShowLoading, isScrolling]);

  useEffect(() => {
    // Clear any existing interval first
    let interval: NodeJS.Timeout | null = null;

    // Start interval immediately when visible and not scrolling, regardless of loading state
    if (!isStop) {
      interval = setInterval(() => {
        setIndex((prev) => {
          if (prev >= 190) {
            // Use setTimeout to defer the next() call to avoid render-time state updates
            setTimeout(() => next(), 0);
            return 0;
          }
          return prev + 1;
        });
      }, 35);
    }

    // Cleanup function to clear interval
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [next, isStop, isScrolling]);

  return (
    <div className="home__arrow__wrapper" data-v-6b59c062="">
      <div
        className="home-arrow"
        data-v-bf281ce8=""
        onClick={() => {
          if (canNavigate) {
            setIndex(0);
            onClick();
          }
        }}
        style={{
          cursor: canNavigate ? 'pointer' : 'default',
        }}
      >
        <svg
          version="1.1"
          id="bg"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 60 60"
          className="home-arrow__background"
          data-v-bf281ce8=""
        >
          <circle cx="30" cy="30" r="29" className="background" data-v-bf281ce8="" />
          <circle
            cx="30"
            cy="30"
            r="29"
            className="progress"
            data-v-bf281ce8=""
            style={{
              strokeDashoffset: isStop ? 330 : shouldShowLoading ? 326.726 - index : 330,
              opacity: shouldShowLoading ? 1 : 0,
            }}
          />
        </svg>
        <svg
          version="1.1"
          id="arrow"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 60 60"
          className="home-arrow__arrow"
          data-v-bf281ce8=""
        >
          <polyline points="35.7,29 30,34.7 24.3,29" />
        </svg>
      </div>
    </div>
  );
});

export default ProcessingButton;
