import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const SMS_API_URL = "https://api.philsms.com/v1/sms/send" // Swap with your provider's endpoint
const SMS_API_TOKEN = Deno.env.get("SMS_API_TOKEN")

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight check safely
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse the incoming webhook payload from Supabase
    const { record, old_record } = await req.json()

    // Only fire an SMS if the status has actually changed
    if (record.status === old_record.status) {
      return new Response(JSON.stringify({ message: "No status change detected." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      })
    }

    const residentName = `${record.resident_first_name} ${record.resident_last_name}`
    let smsMessage = ""

    // Build template conditions based on your request_status enum
    if (record.status === "Ready for Pickup") {
      smsMessage = `Mula sa Brgy 17: Magandang araw, ${residentName}. Ang inyong hininging dokumento ay HANDA NA para sa pickup sa Barangay Hall. Mangyaring magdala ng kaukulang bayad. Salamat!`
    } else if (record.status === "Rejected") {
      smsMessage = `Mula sa Brgy 17: Paumanhin, ${residentName}. Ang inyong hininging dokumento ay HINDI NAAPRUBAHAN. Dahilan: ${record.rejection_reason || 'Missing requirements'}.`
    }

    // If the status isn't one we text for, exit early
    if (!smsMessage) {
      return new Response(JSON.stringify({ message: "Status update does not require SMS dispatch." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      })
    }

    // Dispatch payload request to the regional SMS Provider Gateway
    const smsResponse = await fetch(SMS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SMS_API_TOKEN}`
      },
      body: JSON.stringify({
        recipient: record.contact_number,
        message: smsMessage,
        sender_id: "BRGY17" // Your approved SMS Mask/Alpha Sender Name
      })
    })

    const smsResult = await smsResponse.json()

    return new Response(JSON.stringify({ success: true, telemetry: smsResult }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400
    })
  }
})