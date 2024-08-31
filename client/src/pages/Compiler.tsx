import CodeEditor from "@/components/CodeEditor";
import { HelperHeader } from "@/components/HelperHeader";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";


export default function Compiler() {
    
   
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className=""
        >
            <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]" defaultSize={50}>
                {/* left side */}
                <HelperHeader/>
                <CodeEditor />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="h-[calc(100dvh-60px" defaultSize={50}>
                right side
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}   