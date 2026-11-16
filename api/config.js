/* Vercel serverless function: exposes public settings from environment variables.
   Set these in Vercel > Project > Settings > Environment Variables. None of them is a secret (the App ID is public). */
module.exports=(req,res)=>{
res.setHeader("Content-Type","application/json; charset=utf-8");
res.setHeader("Cache-Control","no-store");
res.status(200).send(JSON.stringify({
FB_APP_ID:process.env.FB_APP_ID||"",
FB_API_VERSION:process.env.FB_API_VERSION||"",
FB_SCOPES:process.env.FB_SCOPES||"",
FB_CONFIG_ID:process.env.FB_CONFIG_ID||"",
MAX_PRODUCTS:process.env.MAX_PRODUCTS?Number(process.env.MAX_PRODUCTS):""
}));
};
