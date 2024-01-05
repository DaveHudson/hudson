import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const sbApiKey = process.env.SUPABASE_API_KEY as string;
const sbUrl = process.env.SUPABASE_URL as string;

if (!sbApiKey || !sbUrl) {
  console.error("Environment variables not set");
  process.exit(1);
}

const supabase = createClient(sbUrl, sbApiKey);

const { error, status } = await supabase.from("documents").delete().neq("id", 0);
console.log("status", status);
