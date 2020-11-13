import React, { useEffect, useState } from "react";

async function stall(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}

function useMockMixtape(id: string) {
  const [mixtape, setMixtape] = useState({} as any);
  const [isLoading, setIsLoading] = useState(true);

  const getMixtape = async () => {
    setIsLoading(true);
    await stall(500);
    setMixtape(default_mixtape);
    setIsLoading(false);
    return mixtape;
  };

  const updateMixtape = async (updatedMixtape: any) => {
    console.log(updatedMixtape);
    setIsLoading(true);
    await stall(600);
    setMixtape({ ...mixtape, ...updatedMixtape });
    setIsLoading(false);
  };

  useEffect(() => {
    getMixtape();
  }, [id]);

  return [mixtape, getMixtape, updateMixtape, isLoading];
}

export default useMockMixtape;

const default_mixtape = {
  createdBy: "mango",
  mixtapeName: "Cool mixtape vol.3",
  description:
    "This one here is for all of our boomers out there! You are tasked with creating the most boomer friendly playlist possible. Think drinking Monster on the weekend while mowing your lawn, think summer barbecues, think riding down the highway in your Ford pickup with the windows down.",
  tags: ["Cool"],
  isPublic: true,
  image: null,
  lastUpdated: 1605215322268,
  followers: 33300,
  totalDuration: 0,
  songs: [
    "6mFkJmJqdDVQ1REhVfGgd1",
    "4gMgiXfqyzZLMhsksGmbQV",
    "6K4t31amVTZDgR3sKmwUJJ",
    "5jzma6gCzYtKB1DbEwFZKH",
    "1nYeVF5vIBxMxfPoL0SIWg",
    "2bPGTMB5sFfFYQ2YvSmup0",
    "6NvRxjfYkkT2SpirAlmsjH",
    "2SAqBLGA283SUiwJ3xOUVI",
    "0VjIjW4GlUZAMYd2vXMi3b",
    "7fBv7CLKzipRk6EC6TWHOB",
    "3oP3Tfn86FRmxAGsV0TqCp",
  ],
  tournamentsWon: [],
  _id: "5fada45ae9283600583dc5b9",
};
