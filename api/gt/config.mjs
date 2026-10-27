const __handler=async()=>new Response(JSON.stringify({supabaseUrl:process.env.SUPABASE_URL,supabaseAnonKey:process.env.SUPABASE_ANON_KEY}),{headers:{'content-type':'application/json','cache-control':'public,max-age=300'}});
export default { fetch: __handler };
