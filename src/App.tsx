import { createClient } from "@supabase/supabase-js";
import SupabaseContext from "./contexts/SupabaseContext";
import Chat from "./pages/Chat";

const supabaseClient = createClient(
  "https://oxfmzweycphqefmwkyca.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Zm16d2V5Y3BocWVmbXdreWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEyNDY0NDcsImV4cCI6MjAwNjgyMjQ0N30.q-IEl56y89scmniitS7iEFxd7qF0qKWOCRw5pl4ggmY",
  {
    realtime: {
      params: {
        eventsPerSecond: 20,
      },
    },
  }
);

function App() {
  return (
    <>
      <SupabaseContext.Provider value={supabaseClient}>
        <Chat />
      </SupabaseContext.Provider>
    </>
  );
}

export default App;
