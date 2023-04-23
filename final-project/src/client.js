import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://xgerwyxavdllyttpeaku.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnZXJ3eXhhdmRsbHl0dHBlYWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyNjk2OTUsImV4cCI6MTk5Nzg0NTY5NX0.lURV3HN4hE-bgJS5g-g6fC0byFwrdaWUE0xLqenrbRc";

export const supabase = createClient(supabaseUrl, supabaseKey);
