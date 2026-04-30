"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useHistory } from "@/features/manage-form-version/hooks/use-history";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Check, Clock } from "lucide-react";

export function HistoryButton() {
  const { snapshots, jumpToSnapshot, currentIndex } = useHistory();

  const formatTimestamp = (timestamp: number) =>
    formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={snapshots.length === 0}>
        <Button variant="ghost" size="default" className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          History
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {snapshots.map((snapshot, index) => (
            <DropdownMenuItem
              key={snapshot.timestamp}
              onClick={() => jumpToSnapshot(index)}
              className={cn("flex items-center gap-2", index === currentIndex && "bg-accent")}
            >
              <div className="flex h-4 w-4 items-center justify-center">
                {index === currentIndex && <Check className="h-3 w-3 text-primary" />}
              </div>
              <div className="flex w-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{snapshot.formTitle || "Untitled Form"}</span>
                  <span className="text-xs opacity-70">#{snapshots.length - index}</span>
                </div>
                <div className="flex items-center justify-between text-xs opacity-70">
                  <span>{snapshot.components.length} components</span>
                  <span>{formatTimestamp(snapshot.timestamp)}</span>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
