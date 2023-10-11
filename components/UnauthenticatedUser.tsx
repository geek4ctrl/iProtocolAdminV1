import { NavigationClientComponent } from "./NavigationClientComponent";
import UnauthenticatedUserEventsComponent from "./UnauthenticatedUserEventsComponent";

interface UnauthenticatedUserProps {
    allEventsToDisplay: any;
    allGomaPlaces: any;
    allKinshasaPlaces: any;
}

export default function UnauthenticatedUser({ allEventsToDisplay, allGomaPlaces, allKinshasaPlaces }: UnauthenticatedUserProps) {
    return (
        <div className="w-full flex flex-col items-center">
            <NavigationClientComponent allGomaPlaces={allGomaPlaces} allKinshasaPlaces={allKinshasaPlaces} />
            <UnauthenticatedUserEventsComponent allEventsToDisplay={allEventsToDisplay} />
        </div>
    )
}