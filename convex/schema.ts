import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ngos: defineTable({
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
    createdBy: v.string(),
    createdAt: v.number(),
    isRegistered: v.boolean(),
  })
    .index("by_registration", ["registrationNumber"])
    .index("by_createdBy", ["createdBy"]),

  helpRequests: defineTable({
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
    requestedBy: v.string(),
    ngoId: v.optional(v.string()),
    status: v.union(
      v.literal("PENDING"),
      v.literal("FULFILLED"),
      v.literal("CANCELLED")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
    urgencyLevel: v.union(
      v.literal("HIGH"),
      v.literal("MEDIUM"),
      v.literal("LOW")
    ),
    targetAmount: v.optional(v.number()),
    receivedAmount: v.optional(v.number()),
    images: v.optional(v.array(v.string())),
  })
    .index("by_requestedBy", ["requestedBy"])
    .index("by_status", ["status"])
    .index("by_type", ["type"])
    .index("by_ngoId", ["ngoId"]),

  helpOffers: defineTable({
    requestId: v.string(),
    offeredBy: v.string(),
    message: v.string(),
    amount: v.optional(v.number()),
    status: v.union(
      v.literal("PENDING"),
      v.literal("ACCEPTED"),
      v.literal("REJECTED")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
    type: v.union(
      v.literal("FOOD"),
      v.literal("FINANCIAL"),
      v.literal("OTHER")
    ),
    availability: v.object({
      from: v.number(),
      to: v.optional(v.number()),
    }),
    contactPreference: v.union(
      v.literal("EMAIL"),
      v.literal("PHONE"),
      v.literal("IN_PERSON")
    ),
  })
    .index("by_requestId", ["requestId"])
    .index("by_offeredBy", ["offeredBy"])
    .index("by_status", ["status"]),

  helpRequestUpdates: defineTable({
    requestId: v.string(),
    updateType: v.union(
      v.literal("STATUS_CHANGE"),
      v.literal("AMOUNT_UPDATE"),
      v.literal("GENERAL_UPDATE")
    ),
    message: v.string(),
    createdBy: v.string(),
    createdAt: v.number(),
    oldValue: v.optional(v.string()),
    newValue: v.optional(v.string()),
  })
    .index("by_requestId", ["requestId"])
    .index("by_createdAt", ["createdAt"]),
});
