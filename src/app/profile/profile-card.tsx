"use client";
import { useState } from "react";
import ViewDialog from "./profile-view";
import { format, parse } from "date-fns";
// import UpsertDialog from "./profile-update";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  CalendarDays,
  Edit,
  Eye,
  Mail,
  MoreHorizontal,
  UserRound,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
type KidCardProps = {
  kid: Kid;
};

const KidCard = ({ kid }: KidCardProps) => {
  const [openViewDialog, setOpenViewDialog] = useState<boolean>(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);

  return (
    <>
      {openViewDialog && (
        <ViewDialog
          kid={kid}
          openDialog={openViewDialog}
          setOpenDialog={setOpenViewDialog}
        />
      )}
      {/* {openUpdateDialog && <UpsertDialog kid={kid} openDialog={openUpdateDialog} setOpenDialog={setOpenUpdateDialog} />} */}
      <Card className="w-full max-w-sm">
        <CardHeader className="relative flex w-full flex-col items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="absolute right-0 top-0 size-8"
                size="icon"
                variant="secondary"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => setOpenViewDialog(!openViewDialog)}
              >
                <Eye size={16} />
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpenUpdateDialog(!openUpdateDialog)}
              >
                <Edit size={16} />
                Update
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar className="size-24 border-2 border-secondary p-0.5">
            <AvatarImage
              alt={kid?.firstName}
              className="rounded-full object-cover"
              src={kid?.user?.avatarUrl || undefined}
            />
            <AvatarFallback className="text-4xl font-light text-secondary">
              {kid?.firstName?.at(0)}
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="flex w-full flex-col justify-stretch">
          <div className="flex w-full gap-2">
            <UserRound className="stroke-secondary stroke-1" size={32} />
            <div className="flex w-full flex-col">
              <h1 className="text-xs text-muted-foreground">Name</h1>
              <p className="break-all text-sm font-medium">
                {kid?.middleName
                  ? `${kid?.title} ${kid?.firstName} ${kid?.middleName} ${kid?.lastName}`
                  : `${kid?.title} ${kid?.firstName} ${kid?.lastName}`}
              </p>
            </div>
          </div>
          <div className="flex w-full gap-2">
            <Mail className="stroke-secondary stroke-1" size={32} />
            <div className="flex w-full flex-col">
              <h1 className="text-xs text-muted-foreground">Email</h1>
              <p className="break-all text-sm font-medium">
                {kid?.user?.email}
              </p>
            </div>
          </div>
          <div className="flex w-full gap-2">
            <CalendarDays className="stroke-secondary stroke-1" size={32} />
            <div className="flex w-full flex-col">
              <h1 className="text-xs text-muted-foreground">Date of Birth</h1>
              <p className="break-all text-sm font-medium">
                {format(
                  parse(kid?.dateOfBirth, "yyyy-MM-dd", new Date()),
                  "MMM do, yyyy"
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default KidCard;
