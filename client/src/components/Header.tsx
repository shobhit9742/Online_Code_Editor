import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Header() {
    return (
        <nav className="w-full h-[60] bg-gray-900 text-white p-3 flex justify-between items-center ">
            <Link to="/">
                <h2 className="font-bold select-none"> Open Code Dev </h2>
            </Link>

            <ul className=" flex gap-2">
                <li>
                    <Link to="/compiler">
                        <Button variant="secondary"> Compiler </Button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}