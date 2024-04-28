"use client";
import React from "react";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "./ui";

const ExplainerCard = ({ icon, title, description }) => {
  return (
    <div className="flex items-center justify-center antialiased">
      <GlowingStarsBackgroundCard icon={icon} className="flex flex-col gap-y-5">
        <GlowingStarsTitle className="mb-2">{title}</GlowingStarsTitle>
        <div className="flex justify-start items-end">
          <GlowingStarsDescription>{description}</GlowingStarsDescription>
        </div>
      </GlowingStarsBackgroundCard>
    </div>
  );
};

export default ExplainerCard;
