"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  File,
  FileText,
} from "lucide-react";

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartFromScratch: () => void;
}

export function WelcomeDialog({
  open,
  onOpenChange,
  onStartFromScratch,
}: WelcomeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full lg:max-w-3xl overflow-y-auto pb-0 [&>button]:hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            Welcome
          </DialogTitle>
          <DialogDescription className="text-base">
            Quick start by choosing a template or create a form from scratch
          </DialogDescription>
        </DialogHeader>

        <div className="pt-4 grid grid-cols-2 gap-4">
          {/* Start from scratch option */}
          <Card
            className="border-2 border-dashed shadow-none border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer group mb-6 flex flex-col items-center justify-center"
            onClick={onStartFromScratch}
          >
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <File className="h-10 w-10" strokeWidth={1} />
              <div className="flex-1 text-center flex flex-col items-center gap-2">
                <CardTitle className="font-semibold text-lg">
                  Start with a blank form
                </CardTitle>
                <CardDescription>
                  Build your form from scratch with complete creative control
                </CardDescription>
              </div>
            </CardContent>
          </Card>

          <Card className=" border-muted-foreground/25 transition-colors group mb-6 shadow-none">
            <CardContent className="">
              <div className="flex flex-col items-center gap-4">
                <div className="flex-1 text-center flex flex-col items-center gap-2">
                  <CardTitle className="font-semibold text-lg">
                    Quick Start
                  </CardTitle>
                  <CardDescription>
                    Choose from common form types to get started quickly
                  </CardDescription>
                </div>

                <div className="space-y-3">
                  <a
                    href="/builder?template=screening&key=patient_registration"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-between"
                    )}
                  >
                    <FileText className="h-4 w-4 mr-2" strokeWidth={1} />
                    <span className="flex-1 text-left">Patient Registration</span>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </a>
                  <a
                    href="/builder?template=screening&key=appointment_request"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-between"
                    )}
                  >
                    <FileText className="h-4 w-4 mr-2" strokeWidth={1} />
                    <span className="flex-1 text-left">Appointment Request</span>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </a>
                  <a
                    href="/builder?template=screening&key=medical_history"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-between"
                    )}
                  >
                    <FileText className="h-4 w-4 mr-2" strokeWidth={1} />
                    <span className="flex-1 text-left">Medical History Form</span>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </a>
                  <a
                    href="/builder?template=screening&key=telemedicine_consultation"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full justify-between"
                    )}
                  >
                    <FileText className="h-4 w-4 mr-2" strokeWidth={1} />
                    <span className="flex-1 text-left">Telemedicine Consultation</span>
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
