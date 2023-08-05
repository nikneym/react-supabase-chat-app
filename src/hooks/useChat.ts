import { useContext, useEffect, useRef, useState } from "react";
import SupabaseContext from "../contexts/SupabaseContext";
import { RealtimeChannel } from "@supabase/supabase-js";

function useChat() {
  // get the client
  const supabaseClient = useContext(SupabaseContext);
  // this will hold our channel between rerenders
  const channelRef = useRef<RealtimeChannel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // join/create to realtime channel
    channelRef.current = supabaseClient
      .channel("chat", {
        config: {
          broadcast: {
            self: false,
          },
        },
      })
      .subscribe();

    setIsLoading(false);

    return () => {
      channelRef.current!.unsubscribe();
      channelRef.current = null;
      setIsLoading(true);
    };
  }, []);

  return {
    channel: channelRef.current!,
    isLoading,
  };
}

export default useChat;
