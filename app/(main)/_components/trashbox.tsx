"use client";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { use, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function TrashBox() {
  const router = useRouter();
  const params = useParams();
  const trash = useQuery(api.document.getTrash, {});
  const restore = useMutation(api.document.restore);
  const remove = useMutation(api.document.remove);

  const [search, setSearch] = useState("");
  const filteredTrash = trash?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });
  const onClick = (documentId: string) => {
    // router.push(`/documents/${documentId}`);
  };

  const onRestore = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    documentId: Id<"document">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring...",
      success: "Note Restored",
      error: "Failed to Restore Note",
    });
  };

  const onRemove = async (documentId: Id<"document">) => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Removing...",
      success: "Note Removing",
      error: "Failed to Removing Note",
    });
    if (params.id === documentId) {
      //router.push("/documents");
    }
  };
  if (document === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4 ">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-2 p-2">
        <Search className="h-4 w-4" />
        <Input
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 flex focus-visible:ring-transparent bg-secondary "
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2 ">
          No doucmnets found
        </p>
      </div>
    </div>
  );
}

export default TrashBox;
