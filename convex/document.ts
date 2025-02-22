import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// NGO-related queries and mutations
export const getAllNgos = query({
  handler: async ({ db }) => {
    return await db.query("ngos").collect();
  },
});

export const isNgoRegistered = query({
  args: { userId: v.string() },
  handler: async ({ db }, { userId }) => {
    const ngo = await db
      .query("ngos")
      .withIndex("by_createdBy", (q) => q.eq("createdBy", userId))
      .first();
    return ngo ? ngo.isRegistered : false;
  },
});

export const registerNgo = mutation({
  args: {
    userId: v.string(),
    name: v.string(),
    description: v.string(),
    registrationNumber: v.string(),
    email: v.string(),
    phone: v.string(),
    website: v.optional(v.string()),
    address: v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      country: v.string(),
      postalCode: v.string(),
      latitude: v.float64(),
      longitude: v.float64(),
    }),
  },
  handler: async ({ db }, { userId, ...ngoData }) => {
    await db.insert("ngos", {
      ...ngoData,
      createdBy: userId,
      createdAt: Date.now(),
      isRegistered: true,
    });
    return { success: true };
  },
});

// Help Request queries and mutations
export const createHelpRequest = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    type: v.union(
      v.literal("FOOD"),
      v.literal("FINANCIAL"),
      v.literal("OTHER")
    ),
    amount: v.optional(v.number()),
    location: v.object({
      address: v.string(),
      city: v.string(),
      state: v.string(),
      latitude: v.optional(v.float64()),
      longitude: v.optional(v.float64()),
    }),
    urgencyLevel: v.union(
      v.literal("HIGH"),
      v.literal("MEDIUM"),
      v.literal("LOW")
    ),
    ngoId: v.optional(v.string()),
  },
  handler: async ({ db }, args) => {
    const requestId = await db.insert("helpRequests", {
      ...args,
      status: "PENDING",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      receivedAmount: 0,
      requestedBy: "", // You'll need to get this from auth context
    });
    return { id: requestId };
  },
});

export const listHelpRequests = query({
  handler: async ({ db }) => {
    return await db
      .query("helpRequests")
      .withIndex("by_status", (q) => q.eq("status", "PENDING"))
      .order("desc")
      .collect();
  },
});

export const offerHelp = mutation({
  args: {
    requestId: v.string(),
    message: v.string(),
    type: v.union(
      v.literal("FOOD"),
      v.literal("FINANCIAL"),
      v.literal("OTHER")
    ),
    amount: v.optional(v.number()),
    contactPreference: v.union(
      v.literal("EMAIL"),
      v.literal("PHONE"),
      v.literal("IN_PERSON")
    ),
    availability: v.object({
      from: v.number(),
      to: v.optional(v.number()),
    }),
  },
  handler: async ({ db }, args) => {
    const offerId = await db.insert("helpOffers", {
      ...args,
      offeredBy: "", // You'll need to get this from auth context
      status: "PENDING",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await db.insert("helpRequestUpdates", {
      requestId: args.requestId,
      updateType: "GENERAL_UPDATE",
      message: "New help offer received",
      createdBy: "", // You'll need to get this from auth context
      createdAt: Date.now(),
    });

    return { id: offerId };
  },
});
