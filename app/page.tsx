import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'

import { useStore } from '@/src/store';
import StoreInitializer from '@/components/StoreInitializer';
import FooterComponent from '@/components/FooterComponent';
import UnauthenticatedUser from '@/components/UnauthenticatedUser';
import NavigationBar from '@/components/NavigationBar';
import AuthenticatedUserDashboard from '@/components/AuthenticatedUserDashboard';

export const dynamic = 'force-dynamic'

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

const plans = [
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

  return (
    <>
      <StoreInitializer name={"Laurent"} place={allPlaces} event={allEventsToDisplay} />

      <div className="w-full flex flex-col items-center">
        <NavigationBar navigation={navigation} user={user} />

        {user ?
          (
            <AuthenticatedUserDashboard plans={plans} />
          )
          :
          (
            <UnauthenticatedUser allEventsToDisplay={allEventsToDisplay} allGomaPlaces={allGomaPlaces} allKinshasaPlaces={allKinshasaPlaces} />
          )}
      </div>

      <FooterComponent footerNavs={footerNavs} />
    </>
  )
}

