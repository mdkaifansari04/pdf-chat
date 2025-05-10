"use server";

import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server";

const userApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_HOST_URL });

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error("Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local");
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    try {
      const { first_name, last_name, email_addresses, id } = evt.data;
      console.log(first_name, last_name, email_addresses, id);

      const { data } = await userApi.post("/users", {
        name: first_name + " " + last_name,
        email: email_addresses[0].email_address,
        clerkId: id,
      });

      console.log("user", data);

      if (data?.user) {
        const client = await clerkClient();
        client.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: data.user?._id,
          },
        });
      }

      return NextResponse.json({
        message: "User created successfully",
        user: data.user,
      });
    } catch (error) {
      console.log("Backend error", error);
    }
  }

  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", body);

  return new Response("Webhook received", { status: 200 });
}
