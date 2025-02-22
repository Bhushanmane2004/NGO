import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ngos: defineTable({
    name: v.string(),
    description: v.string(),
    registrationNumber: v.string(),
    email: v.string(),
    phone: v.string(),
    website: v.optional(v.string()), // Website is optional
    address: v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      country: v.string(),
      postalCode: v.string(),
      latitude: v.float64(), // For geolocation
      longitude: v.float64(),
    }),
    createdBy: v.string(), // User ID who added the NGO
    createdAt: v.number(), // Timestamp
  }).index("by_registration", ["registrationNumber"]), // Indexing for fast lookups
});
