
import { Share2 } from "lucide-react";
import { Button } from "./ui/button";

export function HelperHeader() {
    return (
        <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center ">
            <div className="__btn_container flex gap-1"></div>
            <Button variant="success">Save</Button>
            <Button className="flex justify-center item-center gap-1" variant="secondary">
                <Share2 size={16} />
                Share
            </Button>
        </div>
    );
}