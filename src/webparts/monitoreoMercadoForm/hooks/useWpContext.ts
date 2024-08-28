import { WpContext } from "@/context/webPart";
import { useContext } from "react";

export const useWpContext = ()=>{
    const context = useContext(WpContext)

    if (context === undefined) {
        throw Error("useWpContext must be used within the WpProvider")
    }

    return context;
}