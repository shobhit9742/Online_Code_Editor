
import { Save, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux";
// import { Value } from "@radix-ui/react-select";
import { compilerSliceStateType, updateCurrentLanguage } from "@/redux/slices/compilerSlice";
import { RootState } from "@/redux/store";


export function HelperHeader() {

    const dispatch = useDispatch();

    const currentlanguage = useSelector(
        (state: RootState) => state.compilerSlice.currentLanguage
    );

    return (
        <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center ">
            <div className="__btn_container flex gap-1"></div>
            <Button className="flex justify-center item-center gap-1" variant="success">
                <Save size={16} />
                Save</Button>

            <Button className="flex justify-center item-center gap-1" variant="secondary">
                <Share2 size={16} />
                Share
            </Button>


            <div className="__tab_switcher flex justify-center item-center gap-1">
                <small>Current Language:</small>
                <Select defaultValue={currentlanguage}
                    onValueChange={(value) =>
                        dispatch(
                            updateCurrentLanguage(
                                value as compilerSliceStateType["currentLanguage"]
                            )
                        )
                    }
                >
                    <SelectTrigger className="w-[180px] bg-gray-800 outline-none focus:ring-0">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="javascript">JAVASCRIPT</SelectItem>
                    </SelectContent>
                </Select>


            </div>
        </div>

    );
} 