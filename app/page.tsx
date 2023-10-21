import { createRouteHandlerClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { useStore } from '@/src/store';
import StoreInitializer from '@/components/StoreInitializer';
import FooterComponent from '@/components/FooterComponent';
import UnauthenticatedUser from '@/components/UnauthenticatedUser';
import NavigationBar from '@/components/NavigationBar';
import AuthenticatedUserDashboard from '@/components/AuthenticatedUserDashboard';
import AuthenticatedUserRegistrationClientComponent from '@/components/AuthenticatedUserRegistrationClientComponent';
import TabNavItemClientComponent from '@/components/TabNavItemClientComponent';
import AllRequestsClientComponent from '@/components/AllRequestsClientComponent';
import AllValidationsClientComponent from '@/components/AllValidationsClientComponent';
import AllValidatedAccreditationsClientComponent from '@/components/AllValidatedAccreditationsClientComponent';
import AllValidatedInvitationsClientComponent from '@/components/AllValidatedInvitationsClientComponent';
import AllAccreditationsClientComponent from '@/components/AllAccreditationsClientComponent';
import AllInvitationsClientComponent from '@/components/AllInvitationsClientComponent';

export const dynamic = 'force-dynamic'

const publicSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publicSupabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const navigation = [
  { title: "Francais", path: "javascript:void(0)" },
  { title: "English", path: "javascript:void(0)" },
  { title: "Italien", path: "javascript:void(0)" },
];

const posts = [
  {
    title: "Saturday July 2, 2022",
    desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people what they did for their anxiety, and some",
    img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    authorLogo: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
    authorName: "Abbé Ken",
    date: "Jan 4 2022",
    href: "javascript:void(0)"
  },
  {
    title: "Sunday July 3, 2022",
    desc: "According to him, â€œI'm still surprised that this has happened. But we are surprised because we are so surprised.â€More revelations about Whittington will be featured in the film",
    img: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    authorLogo: "https://api.uifaces.co/our-content/donated/FJkauyEa.jpg",
    authorName: "Abbé Pierrot",
    date: "Jan 4 2022",
    href: "javascript:void(0)"
  },
  {
    title: "Tuesday July 5, 2022",
    desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks. I realized today that I have all this stuff that",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    authorLogo: "https://randomuser.me/api/portraits/men/46.jpg",
    authorName: "Abbé Justin",
    date: "Jan 4 2022",
    href: "javascript:void(0)"
  },
];

const footerNavs = [
  {
    href: 'javascript:void()',
    name: 'About'
  },
  {
    href: 'javascript:void()',
    name: 'Blog'
  },
  {
    href: 'javascript:void()',
    name: ''
  },
  {
    href: 'javascript:void()',
    name: 'Team'
  },
  {
    href: 'javascript:void()',
    name: 'Careers'
  },

  {
    href: 'javascript:void()',
    name: 'Support'
  }
];

const plans: any = [
  {
    name: "Invitation",
    price: 12,
    image: "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    features: [
      "Appeal",
      "Bid",
      "Challenge",
      "Date",
      "Petition",
      "Proposition",
      "Encouragement",

    ],
  },
  {
    name: "Accreditation",
    price: 35,
    image: "https://images.unsplash.com/photo-1592347093417-0e95eb5851aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    features: [
      "Authorization",
      "Card",
      "Certificate",
      "Deed",
      "Endorsement",
      "License",
      "Docket",
    ],
  },
];


// Added recently

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()

  const title = String(formData.get('title'))
  const firstname = String(formData.get('firstname'))
  const surname = String(formData.get('surname'))
  const postname = String(formData.get('postname'))
  const email = String(formData.get('email'))
  const category = String(formData.get('category'))
  const diocese = String(formData.get('diocese'))
  const uploadpicture = String(formData.get('uploadpicture'))
  const uploaddocument = String(formData.get('uploaddocument'))

  const supabase = createRouteHandlerClient({ cookies })

  console.log('Show me the form object: ', {
    title,
    firstname,
    surname,
    postname,
    category,
    diocese,
    uploadpicture,
    uploaddocument,
  })
}

interface Title {
  value: string;
  viewValue: string;
}

interface Designation {
  value: string;
  viewValue: string;
}

const userTitle: Title[] = [
  { value: 'cardinal', viewValue: 'Steak' },
  { value: 'monseigneur', viewValue: 'Pizza' },
  { value: 'excellence', viewValue: 'Tacos' },
  { value: 'honorable', viewValue: 'Pizza' },
  { value: 'abbe', viewValue: 'Tacos' },
  { value: 'pere', viewValue: 'Pizza' },
  { value: 'soeur', viewValue: 'Tacos' },
  { value: 'frere', viewValue: 'Pizza' },
  { value: 'mr', viewValue: 'Tacos' },
  { value: 'mme', viewValue: 'Pizza' },
  { value: 'mlle', viewValue: 'Tacos' },
];

const userDesignation: Designation[] = [
  { value: 'corpsMedical', viewValue: 'Steak' },
  { value: 'agentPresse', viewValue: 'Pizza' },
  { value: 'securite', viewValue: 'Tacos' },
  { value: 'officielGouvernementC1', viewValue: 'Pizza' },
  { value: 'officielGouvernementC2', viewValue: 'Tacos' },
  { value: 'officielGouvernementC3', viewValue: 'Tacos' },
  { value: 'officielEcclesialC1', viewValue: 'Pizza' },
  { value: 'officielEcclesialC2', viewValue: 'Tacos' },
  { value: 'liturgieConcelebrant', viewValue: 'Pizza' },
  { value: 'liturgieC1', viewValue: 'Pizza' },
  { value: 'liturgieC2', viewValue: 'Pizza' },
  { value: 'personnesAssistees', viewValue: 'Pizza' },
  { value: 'religieux', viewValue: 'Tacos' },
  { value: 'staff', viewValue: 'Pizza' },
  { value: 'protocol', viewValue: 'Pizza' },
];

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser();


  // Fetching all places
  const places = await supabase.from('getplaces').select();
  const allPlaces = places.data ?? [];

  if (allPlaces !== undefined && allPlaces?.length > 1) {

    useStore.setState({ name: "Laurent" });
    useStore.setState({ place: allPlaces });

  }


  // Fetching Goma place
  const gomaPlaces = await supabase.from('place_in_goma_view').select();
  const allGomaPlaces = gomaPlaces.data ?? [];


  // Fetching Kinshasa place
  const kinshasaPlaces = await supabase.from('place_in_kinshasa_view').select();
  const allKinshasaPlaces = kinshasaPlaces.data ?? [];


  // Fetching all events
  const events = await supabase.from('getevents').select();
  const allEvents = events.data ?? [];

  if (allEvents !== undefined && allEvents?.length > 1) {
    useStore.setState({ event: allEvents });
  }

  const allEventsToDisplay = useStore.getState().event;

  let { data: users, error } = await supabase
    .from('users')
    .select("*")
    .eq('email', `${user?.email}`)

  // All requests
  const requests = await supabase.from("pending_event_reservations").select();
  const allRequests: any = requests.data;

  // All invitations
  const invitations = await supabase.from("pending_invitation_event_reservations").select();
  const allInvitations: any = invitations.data;

  // All accreditations
  const accreditations = await supabase.from("pending_accreditation_event_reservations").select();
  const allAccreditations: any = accreditations.data;

  // Validated invitations
  const validatedInvitations = await supabase.from("validated_invitation_event_reservations").select();
  const allValidatedInvitations: any = validatedInvitations.data;

  // Validated accreditations
  const validatedAccreditations = await supabase.from("validated_accreditation_event_reservations").select();
  const allValidatedAccreditations: any = validatedAccreditations.data;

  // All validations
  const validations = await supabase.from("validated_event_reservations").select();
  const allValidations: any = validations.data;

  return (
    <>
      <StoreInitializer name={"Laurent"} place={allPlaces} event={allEventsToDisplay} navigationState={0} />

      <div className="w-full flex flex-col items-center">
        {/* <NavigationBar navigation={navigation} user={user} /> */}
        <div className="w-full flex flex-col items-center" style={{ marginBottom: "2rem" }}>
          <div className="px-4 md:px-8">
            <ul role="tablist" className="max-w-screen-xl mx-auto border-b flex items-center gap-x-6 overflow-x-auto text-sm">
              <TabNavItemClientComponent />
            </ul>
          </div>
        </div>

        <AllRequestsClientComponent allRequests={allRequests} />

        <AllInvitationsClientComponent allInvitations={allInvitations} />

        <AllAccreditationsClientComponent allAccreditations={allAccreditations} />

        <AllValidatedInvitationsClientComponent allValidatedInvitations={allValidatedInvitations} />

        <AllValidatedAccreditationsClientComponent allValidatedAccreditations={allValidatedAccreditations} />

        <AllValidationsClientComponent allValidations={allValidations} />

      </div>

      {/* <FooterComponent footerNavs={footerNavs} /> */}
    </>
  )
}

