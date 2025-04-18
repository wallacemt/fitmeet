import { ActivityTypeComponent } from "@/components/ActivityTypeComponent";
import { useParams } from "react-router";

export const ActivityTypePage = () => {
    const type = useParams().type;

    return (
        <ActivityTypeComponent type={type}/>
    )
};


