import { NavigationClientComponent } from "./NavigationClientComponent";
import UnauthenticatedUserEventsComponent from "./UnauthenticatedUserEventsComponent";

export default function UnauthenticatedUser({ allEventsToDisplay, allGomaPlaces, allKinshasaPlaces }: { allEventsToDisplay: any, allGomaPlaces: any, allKinshasaPlaces: any }) {
    return (
        <div className="w-full flex flex-col items-center">
            <NavigationClientComponent allGomaPlaces={allGomaPlaces} allKinshasaPlaces={allKinshasaPlaces} />
            <UnauthenticatedUserEventsComponent allEventsToDisplay={allEventsToDisplay} />
        </div>
    )
}