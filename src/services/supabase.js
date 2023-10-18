import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://pxenfuasnkmuieedgdvz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZW5mdWFzbmttdWllZWRnZHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc1MTU2MzEsImV4cCI6MjAxMzA5MTYzMX0.7RRFk6nNdn3taZ2nKTD7TBJPFaRnkvncOhcFaOBBZAw";
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
