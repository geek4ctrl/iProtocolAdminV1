import { NavigationClientComponent } from "./NavigationClientComponent";
import UnauthenticatedUserEventsComponent from "./UnauthenticatedUserEventsComponent";

export default function UnauthenticatedUser({ allEventsToDisplay }: { allEventsToDisplay: any }) {
    return (
        <div className="w-full flex flex-col items-center">
            <NavigationClientComponent />
            <UnauthenticatedUserEventsComponent allEventsToDisplay={allEventsToDisplay} />
        </div>
    )
}