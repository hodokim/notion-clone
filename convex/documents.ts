import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {Id} from "./_generated/dataModel";

export const archive = mutation({
    args: {id: v.id("documents")},
    handler: async(ctx, args)=>{
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) {
            throw new Error("인증되지 않았습니다.");
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id);

        if(!existingDocument){
            throw new Error("노트를 찾을 수 없습니다.");
        }

        if(existingDocument.userId !== userId){
            throw new Error("권한이 없습니다.");
        }

        const recursiveArchive = async (documentId: Id<"documents">)=>{
            const children = await ctx.db
                .query("documents")
                .withIndex("by_user_parent", (query) =>
                    (query
                        .eq("userId", userId)
                        .eq("parentDocument", documentId)
                ))
                .collect();

            for (const child of children){
                await ctx.db.patch(child._id, {
                    isArchived: true,
                });

                await recursiveArchive((child._id));
            }
        }

        const document = await ctx.db.patch(args.id,{
            isArchived: true,
        })

        recursiveArchive(args.id);

        return document;
    }
})

export const getSidebar = query({
    args : {
      parentDocument: v.optional(v.id("documents"))
    },

    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) {
            throw new Error("인증되지 않았습니다.");
        }

        const userId = identity.subject;
        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user_parent", (query) =>
                query.eq("userId", userId)
                     .eq("parentDocument", args.parentDocument)
            )
            .filter((query) =>
                query.eq(query.field("isArchived"), false)
            )
            .order("desc")
            .collect();
        return documents;
    }
})
export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("documents"))
    },

    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) {
            throw new Error("인증되지 않았습니다.");
        }

        const userId = identity.subject;
        const document = await ctx.db.insert("documents", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isArchived: false,
            isPublished: false,
        })
        return document;
    }
})