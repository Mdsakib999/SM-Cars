import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiSlice } from "@/redux/apiSlice";

import socket from "@/lib/socketClient";

export function useAuctionSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    // When auction becomes active
    socket.on("auctionStarted", () => {
      // invalidate all Auction tags so components refetch
      dispatch(apiSlice.util.invalidateTags([{ type: "Auction" }]));
    });

    // When specific auction ends
    socket.on("auctionEnded", ({ auctionId }) => {
      dispatch(
        apiSlice.util.invalidateTags([{ type: "Auction", id: auctionId }])
      );
    });

    // When a new bid is placed
    socket.on("auctionBidPlaced", ({ auctionId }) => {
      dispatch(
        apiSlice.util.invalidateTags([{ type: "Auction", id: auctionId }])
      );
    });

    return () => {
      socket.off("auctionStarted");
      socket.off("auctionEnded");
      socket.off("auctionBidPlaced");
    };
  }, [dispatch]);
}
