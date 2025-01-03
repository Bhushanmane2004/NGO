import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { error } from "console";
import { use } from "react";

export const archive = mutation({
  args: {
    id: v.id("document"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    const extingDocumnet = await ctx.db.get(args.id);
    if (!extingDocumnet) {
      throw new Error("Not found");
    }

    if (extingDocumnet.userId !== userId) {
      throw new Error("Not authenticated");
    }

    const recurrciveArchive = async (documentId: Id<"document">) => {
      const children = await ctx.db
        .query("document")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocumnet", documentId)
        )
        .collect();
      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchive: true,
        });
        await recurrciveArchive(child._id);
      }
    };

    const document = await ctx.db.patch(args.id, {
      isArchive: true,
    });
    recurrciveArchive(args.id);
    return document;
  },
});

export const getSideBar = query({
  args: {
    parentDocument: v.optional(v.id("document")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;

    const document = await ctx.db
      .query("document")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocumnet", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchive"), false))
      .order("desc")
      .collect();
    return document;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("document")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    const document = await ctx.db.insert("document", {
      title: args.title,
      parentDocumnet: args.parentDocument,
      userId,
      isArchive: false,
      isPublished: false,
    });
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    const document = await ctx.db
      .query("document")
      .withIndex("by_user_parent", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchive"), true))
      .order("desc")
      .collect();
    return document;
  },
});

export const restore = mutation({
  args: { id: v.id("document") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;

    const extingDocumnet = await ctx.db.get(args.id);
    if (!extingDocumnet) {
      throw new Error("Not found");
    }
    if (extingDocumnet.userId !== userId) {
      throw new Error("Not authenticated");
    }
    const recurrciveRestore = async (documentId: Id<"document">) => {
      const children = await ctx.db
        .query("document")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocumnet", documentId)
        )
        .collect();
      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchive: false,
        });
        await recurrciveRestore(child._id);
      }
    };
    const options: Partial<Doc<"document">> = {
      isArchive: false,
    };
    if (extingDocumnet.parentDocumnet) {
      const parentDocument = await ctx.db.get(extingDocumnet.parentDocumnet);
      if (parentDocument!.isArchive) {
        options.parentDocumnet = undefined;
      }
    }
    const document = await ctx.db.patch(args.id, options);
    recurrciveRestore(args.id);
    return document;
  },
});

export const remove = mutation({
  args: { id: v.id("document") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;

    const extingDocumnet = await ctx.db.get(args.id);

    if (!extingDocumnet) {
      throw new Error("Not found");
    }
    if (extingDocumnet.userId !== userId) {
      throw new Error("Not authenticated");
    }
    const document = await ctx.db.delete(args.id);
    return document;
  },
});
