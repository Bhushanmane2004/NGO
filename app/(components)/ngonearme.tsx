import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Globe } from "lucide-react";

export function NgoNearMe() {
  const [searchQuery, setSearchQuery] = useState("");
  const ngos = useQuery(api.document.getAllNgos);

  if (ngos === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-lg text-muted-foreground">
          Loading NGOs...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">NGOs Near Me</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search NGOs..."
              className="pl-10 w-full sm:w-[280px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select defaultValue="name">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by Name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by Name</SelectItem>
              <SelectItem value="location">Sort by Location</SelectItem>
              <SelectItem value="type">Sort by Type</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ngos.map((ngo) => (
          <Card
            key={ngo._id}
            className="transition-all hover:shadow-lg dark:bg-[#18181B]"
          >
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">{ngo.name}</h3>

              <p className="text-muted-foreground text-sm line-clamp-2">
                {ngo.description}
              </p>

              <div className="space-y-2 text-sm text-muted-foreground border-t pt-4">
                <p>{ngo.address.street}</p>
                <p>
                  {ngo.address.city}, {ngo.address.state}
                </p>
                <p>{ngo.phone}</p>
                <p className="truncate">{ngo.email}</p>
              </div>

              {ngo.website && (
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => window.open(ngo.website, "_blank")}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default NgoNearMe;
