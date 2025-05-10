import { SignedIn, UserButton } from "@clerk/nextjs";
import { FileText, Upload } from "lucide-react";
import { ModeToggle } from "../theme-toggler";
import Logo from "./logo";
import UserProfile from "../data-display/user-profile";
import { Button } from "../ui/button";

function Header() {
  return (
    <div className="flex justify-between items-center py-4 px-10 border-b">
      <Logo />
      <SignedIn>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border rounded-md px-3 py-1.5">
            <FileText className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-green-500">demo.pdf</span>
          </div>
          <Button className="flex items-center border hover:bg-primary/80 rounded-md px-4 py-1.5 cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            <span>Upload PDF</span>
          </Button>
          <ModeToggle />
          <UserProfile />
        </div>
      </SignedIn>
    </div>
  );
}

export default Header;
